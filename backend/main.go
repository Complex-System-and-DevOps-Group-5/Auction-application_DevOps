package main

import (
	"database/sql"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

type Bid struct {
	Id           int       `json:"id"` // is this necessary?
	Amount       int       `json:"amount"`
	Status       int       `json:"status"` // i guess it's an int?
	CreationTime time.Time `json:"creationTime" db:"creation_time"`
	AuctionId    int       `json:"auctionId" db:"auction_id"`
	BuyerId      int       `json:"buyerId" db:"buyer_id"`
}

type Image struct {
	ImageUrl string `db:"string_url"`
}

type Test struct {
	Id    sql.NullInt32 `db:"id" no-db:"insert"`
	Name  string        `db:"name"`
	Time  sql.NullTime  `db:"time" no-db:"insert"`
	Extra uint
}

func main() {
	ConnectToDatabase()

	app := fiber.New()

	app.Get("/product/:id", func(c *fiber.Ctx) error {
		auction, err := GetSingle[AuctionDb]("auction_post", EqualityCondition("id", c.QueryInt("id", -1)))

		if err != nil {
			return c.Status(fiber.ErrBadRequest.Code).SendString("Invalid Id")
		}

		return c.JSON(auction)
	})

	log.Fatal(app.Listen(":4000"))
}
