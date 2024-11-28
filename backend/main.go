package main

import (
	"errors"
	"fmt"
	"io/fs"
	"log"
	"os"
	"strconv"
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

	app.Get("/image/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id", -1)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.SendFile("/home/user/Auction-application_DevOps/images/" + strconv.FormatInt(int64(id), 10) + ".jpg")
	})

	app.Post("/upload-image", func(c *fiber.Ctx) error {
		err := os.WriteFile("/home/user/Auction-application_DevOps/images/temp.jpg", c.Body(), fs.FileMode(0644))
		if err != nil {
			fmt.Printf("Error: '%s'\n", err.Error())
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		err = database.Insert(database.Image{Id: 1, Url: "temp"})
		if err != nil {
			fmt.Printf("Error: '%s'\n", err.Error())
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		imgDb, err := database.GetSingle[database.Image](database.EqualityCondition("string_url", "temp"))
		if err != nil {
			fmt.Printf("Error: '%s'\n", err.Error())
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		givenId := imgDb.Id
		err = os.Rename("/home/user/Auction-application_DevOps/images/temp.jpg", "/home/user/Auction-application_DevOps/images/"+strconv.FormatInt(int64(givenId), 10)+".jpg")
		if err != nil {
			fmt.Printf("Error: '%s'\n", err.Error())
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		fixed := database.Image{
			Id:  givenId,
			Url: "http://130.225.170.52:10101/api/image/" + strconv.FormatInt(int64(givenId), 10),
		}

		err = database.Update(*imgDb, fixed, database.EqualityCondition("id", imgDb.Id))
		if err != nil {
			fmt.Printf("Error: '%s'\n", err.Error())
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.SendStatus(fiber.StatusAccepted)
	})

	log.Fatal(app.Listen(":4000"))
}
