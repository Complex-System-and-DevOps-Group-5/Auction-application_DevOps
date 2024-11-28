package main

import (
	"log"

	"DevOps/auctions"
	"DevOps/database"
	"DevOps/endpoint"
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

	app.Get("/frontpage", func(c *fiber.Ctx) error {
		previews := GetFrontPageAuctions(16, 0)

		return c.JSON(previews)
	})

	// Link all the user-related endpoints
	endpoint.Link(app, user.AllEndpoints()...)

	// Link all the auction-related endpoints
	endpoint.Link(app, auctions.AllEndpoints()...)

	log.Fatal(app.Listen(":4000"))
}
