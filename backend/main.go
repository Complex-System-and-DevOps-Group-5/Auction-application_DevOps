package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func main() {
	ConnectToDatabase()

	app := fiber.New()

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

		user, err := GetSingle[UserDb](EqualityCondition("id", id))

		if err != nil {
			return c.SendStatus(fiber.StatusNotFound)
		}

		return c.Status(fiber.StatusAccepted).JSON(user)
	})

	app.Get("/frontpage", func(c *fiber.Ctx) error {
		previews := GetFrontPageAuctions(16, 0)

		return c.JSON(previews)
	})

	log.Fatal(app.Listen(":4000"))
}
