package main

import (
	"database/sql"
	"fmt"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"log"
)

const (
	host     = "localhost"
	port     = 5433
	user     = "postgres"
	password = "postgres"
	dbname   = "AuctionDb"
)

func main() {
	fmt.Println("Hello World")
	app := fiber.New()

	log.Fatal(app.Listen(":4000"))
}
