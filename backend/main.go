package main

import (
	"database/sql"
	"fmt"
	"time"

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
	t1 := Test{Id: sql.NullInt32{Int32: 6, Valid: true}, Name: "Ali", Time: sql.NullTime{Time: time.Now(), Valid: true}, Extra: 10}
	// t2 := Test{Id: 5, Name: "Zach", Time: time.Now()}

	//	println("Inserting...")
	InsertSingle("test", t1)
	//	println("Inserted!")

	// Perform a sample query
	perfect, _ := GetSingle[Test]("test", EqualityCondition("name", "Daniel"))
	if perfect != nil {
		fmt.Printf("[SINGLE] ID: %v, Name: %s, Timestamp: %v, Extra: %v\n", perfect.Id, perfect.Name, perfect.Time, perfect.Extra)
	} else {
		fmt.Println("GetSingle didn't work")
	}

	existing, _ := GetAll[Test]("test")

	// Iterate through the results
	for _, e := range existing {
		fmt.Printf("ID: %v, Name: %s, Timestamp: %v, Extra: %v\n", e.Id, e.Name, e.Time, e.Extra)
	}
}
