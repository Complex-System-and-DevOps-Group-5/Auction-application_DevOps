package main

import (
    "fmt"
    "github.com/gofiber/fiber/v2"
    "log"
    "auction-application-devops/backend/tokenGeneration" // Sørg for, at importstien er korrekt
)

func main() {
    fmt.Println("Starting the Fiber server on port 4000")

    app := fiber.New()

    // Rute til login
    app.Post("/login", func(c *fiber.Ctx) error {
        return tokenGeneration.LoginHandler(c)
    })

    // Beskyttet rute
    app.Get("/protected", func(c *fiber.Ctx) error {
        return tokenGeneration.ProtectedHandler(c)
    })

    log.Fatal(app.Listen(":4000"))
}
