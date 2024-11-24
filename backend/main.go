package main

import (
	"errors"
	"fmt"
	"log"

	"DevOps/database"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func main() {
	database.Connect()

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
		fmt.Println("Someone is trying to log in...")

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

	log.Fatal(app.Listen(":4000"))
}
