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
		auction, err := GetSingle[AuctionDb]("auction_post", EqualityCondition("id", c.QueryInt("id", -1)))

		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid Id")
		}

		return c.Status(fiber.StatusAccepted).JSON(auction)
	})

	app.Get("/user/:id", func(c *fiber.Ctx) error {
		user, err := GetSingle[UserDb]("users", EqualityCondition("id", c.QueryInt("id", -1)))

		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid Id")
		}

		return c.Status(fiber.StatusAccepted).JSON(user)
	})

	log.Fatal(app.Listen(":443"))
}
