package main

import (
	"log"
	"time"

	"DevOps/database"
	"DevOps/user"

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

		return c.SendStatus(fiber.StatusOK)
	})

	app.Post("/login", user.LoginHandler)
	app.Post("/register", user.RegisterHandler)

	log.Fatal(app.Listen(":4000"))
}
