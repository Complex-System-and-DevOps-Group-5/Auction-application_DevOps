package main

import (
	"log"

	"DevOps/auctions"
	"DevOps/database"
	"DevOps/search"
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

	// Link all the user-related endpoints
	endpoint.Link(app, user.AllEndpoints()...)

	// Link all the auction-related endpoints
	endpoint.Link(app, auctions.AllEndpoints()...)

	app.Get("/search", search.SearchAuctions)

	log.Fatal(app.Listen(":4000"))
}
