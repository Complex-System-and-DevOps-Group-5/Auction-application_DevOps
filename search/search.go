package search

import (
	"DevOps/database"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func SearchAuctions(c *fiber.Ctx) error {
	searchQuery := c.Query("q")
	if searchQuery == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Search query is required",
		})
	}

	condition := database.ILIKECondition(
		"title",
		searchQuery,
	)

	results, err := database.GetMultiple[database.Auction](condition)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error fetching results: " + err.Error(),
		})
	}
	return c.Status(http.StatusOK).JSON(results)
}
