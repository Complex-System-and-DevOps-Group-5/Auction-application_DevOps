package main

import (
	"fmt"
	"log"

	"github.com/Complex-System-and-DevOps-Group-5/Auction-application_DevOps/tokenGeneration"
	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println("Starting the Fiber server on port 4000")

	app := fiber.New()

	app.Post("/login", func(c *fiber.Ctx) error {
		return tokenGeneration.LoginHandler(c)
	})

	app.Get("/protected", func(c *fiber.Ctx) error {
		return tokenGeneration.ProtectedHandler(c)
	})

	log.Fatal(app.Listen(":4000"))
}
