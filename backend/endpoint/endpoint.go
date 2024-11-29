package endpoint

import (
	"github.com/gofiber/fiber/v2"
)

type Handler = func(c *fiber.Ctx) error

type Endpoint struct {
	Location string
	Handler  Handler
	Type     string
}

func Link(app *fiber.App, endpoints ...Endpoint) {
	for _, endpoint := range endpoints {
		app.Add(endpoint.Type, endpoint.Location, endpoint.Handler)
	}
}
