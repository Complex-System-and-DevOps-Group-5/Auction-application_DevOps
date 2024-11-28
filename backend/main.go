package main

import (
	"errors"
	"log"
	"time"

	"DevOps/database"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendFile("/home/user/Auction-application_DevOps/frontend/cursed.png")
	})

	app.Get("/product/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id", -1)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		post := GetPost(id)

		posts := make([]AuctionPost, 1)
		posts[0] = *post

		return c.Status(fiber.StatusAccepted).JSON(posts)
	})

	app.Get("/user/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id", -1)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		user, err := database.GetSingle[database.User](database.EqualityCondition("id", id))

		if err != nil {
			return c.SendStatus(fiber.StatusNotFound)
		}

		return c.Status(fiber.StatusAccepted).JSON(user)
	})

	app.Get("/frontpage", func(c *fiber.Ctx) error {
		previews := GetFrontPageAuctions(16, 0)

		return c.JSON(previews)
	})

	app.Post("/login", func(c *fiber.Ctx) error {
		var login Login
		err := c.BodyParser(&login)

		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		token, err := AuthenticateLogin(login)

		if err != nil {
			var errorStatus int

			if errors.Is(err, UserNotFound{}) {
				errorStatus = fiber.StatusNotFound
			} else if errors.Is(err, InvalidPassword{}) {
				errorStatus = fiber.StatusForbidden
			} else {
				errorStatus = fiber.StatusInternalServerError
			}

			return c.SendStatus(errorStatus)
		}

		response := struct {
			Username string `json:"username"`
			Token    string `json:"token"`
		}{Username: login.Username, Token: token}

		return c.Status(fiber.StatusOK).JSON(response)
	})

	app.Post("/post", func(c *fiber.Ctx) error {
		var bid Bid
		err := c.BodyParser(&bid)

		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		bidder, err := database.GetSingle[database.User](database.EqualityCondition("name", bid.BidderUsername))
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		bidDb := database.Bid{
			CreationTime: time.Now(),
			Amount:       int(bid.Amount * 100),
			Status:       0,
			AuctionId:    bid.AuctionId,
			BuyerId:      bidder.Id,
		}

		err = database.Insert(bidDb)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.Status(fiber.StatusOK).JSON("")
	})

	app.Post("/create-post", func(c *fiber.Ctx) error {
		var createPost struct {
			Username            string    `json:"username"`
			Title               string    `json:"title"`
			Description         string    `json:"description"`
			Location            string    `json:"location"`
			EndingTime          time.Time `json:"endingTime"`
			InitalPrice         int       `json:"initialPrice"`
			MinimumIncrement    int       `json:"minimumIncrement"`
			AutoAcceptThreshold *int      `json:"autoAcceptThreshold"`
			ImageUrl            string    `json:"imageUrl"`
		}
		err := c.BodyParser(&createPost)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		seller, err := database.GetSingle[database.User](database.EqualityCondition("name", createPost.Username))
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		database.Insert(database.Image{Id: -1, Url: createPost.ImageUrl})
		imgDb, err := database.GetSingle[database.Image](database.EqualityCondition("string_url", createPost.ImageUrl))
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		autoAccept := 0
		if createPost.AutoAcceptThreshold != nil {
			autoAccept = *createPost.AutoAcceptThreshold
		}

		err = database.Insert(database.Auction{
			Id:                  -1,
			Title:               createPost.Title,
			Description:         createPost.Description,
			Location:            createPost.Location,
			CreationTime:        time.Now(),
			EndingTime:          createPost.EndingTime,
			ViewCount:           0,
			InitialPrice:        createPost.InitalPrice,
			MinimumBidIncrement: createPost.MinimumIncrement,
			CurrentBid:          createPost.InitalPrice,
			AutoAcceptThreshold: autoAccept,
			CategoryId:          1,
			SellerId:            seller.Id,
			ImageId:             imgDb.Id,
		})
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.SendStatus(fiber.StatusAccepted)
	})

	log.Fatal(app.Listen(":4000"))
}
