package main

import (
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
	Id   int       `db:"id" no-db:"insert"`
	Name string    `db:"name"  no-db:"insert,select"`
	Time time.Time `db:"time" no-db:"select"`
}

func main() {
	ConnectToDatabase()
	//	t1 := Test{Id: 4, Name: "Zaid", Time: time.Now()}
	//	t2 := Test{Id: 5, Name: "Zach", Time: time.Now()}

	//	println("Inserting...")
	//	InsertMultiple("test", t1, t2)
	//	println("Inserted!")

	// Perform a sample query
	perfect, _ := GetSingle[Test]("test", EqualityCondition("name", "Daniel"))
	if perfect != nil {
		fmt.Printf("[SINGLE] ID: %d, Name: %s, Timestamp: %v\n", perfect.Id, perfect.Name, perfect.Time)
	} else {
		fmt.Println("GetSingle didn't work")
	}

	existing, _ := GetMultiple[Test]("test", RangeCondition("id", 3, 5))

	// Iterate through the results
	for _, e := range existing {
		fmt.Printf("ID: %d, Name: %s, Timestamp: %v\n", e.Id, e.Name, e.Time)
	}
}
