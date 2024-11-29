package auctions

import (
	"DevOps/database"
	"DevOps/endpoint"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func getPost(id int) *AuctionPost {
	auction, err := database.GetSingle[database.Auction](database.EqualityCondition("id", id))

	if err != nil {
		return nil
	}

	imageUrl := ""

	image, err := database.GetSingle[database.Image](database.EqualityCondition("id", auction.ImageId))
	if err == nil {
		imageUrl = image.Url
	}

	bids, err := database.GetMultiple[database.Bid](database.EqualityCondition("auction_id", id))
	if err != nil {
		return nil
	}

	return &AuctionPost{
		Id:                  auction.Id,
		Title:               auction.Title,
		Description:         auction.Description,
		Location:            auction.Location,
		BidCount:            len(bids),
		Status:              auction.Status,
		Sold:                (auction.Status%2 == 1),
		InWatchList:         false, // TODO figure it out
		CreationTime:        auction.CreationTime,
		EndingTime:          auction.EndingTime,
		ViewCount:           auction.ViewCount,
		MinimumBidIncrement: auction.MinimumBidIncrement,
		CurrentBid:          auction.CurrentBid,
		CategoryId:          auction.CategoryId,
		SellerId:            auction.SellerId,
		ImageUrl:            imageUrl,
	}
}

func singleAuctionHandler(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id", -1)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	post := getPost(id)

	posts := make([]AuctionPost, 1)
	posts[0] = *post

	return c.Status(fiber.StatusAccepted).JSON(posts)
}

func bidHandler(c *fiber.Ctx) error {
	var bid Bid
	err := c.BodyParser(&bid)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	bidder, err := database.GetSingle[database.User](database.EqualityCondition("name", bid.BidderUsername))
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	//Get the auction inwhich the bid is located
	auction, err := database.GetSingle[database.Auction](database.EqualityCondition("id", bid.AuctionId))
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	//Validation for if the bid is valid
	if bid.Amount < (auction.CurrentBid + auction.MinimumBidIncrement) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	bidDb := database.Bid{
		CreationTime: time.Now(),
		Amount:       bid.Amount,
		Status:       0,
		AuctionId:    bid.AuctionId,
		BuyerId:      bidder.Id,
	}

	err = database.Insert(bidDb)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	updatedAuction := *auction
	updatedAuction.CurrentBid = bid.Amount

	err = database.Update(*auction, updatedAuction, database.EqualityCondition("id", bid.AuctionId))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Status(fiber.StatusOK).JSON(bidDb)
}

func postCreationHandler(c *fiber.Ctx) error {
	var createPost struct {
		Username            string    `json:"username"`
		Title               string    `json:"title"`
		Description         string    `json:"description"`
		Location            string    `json:"location"`
		EndingTime          time.Time `json:"endingTime"`
		InitalPrice         int       `json:"initialPrice"`
		MinimumIncrement    int       `json:"minimumIncrement"`
		AutoAcceptThreshold *int      `json:"autoAcceptThreshold"`
		ImageUrl            string    `json:"imageUrl"`
	}
	err := c.BodyParser(&createPost)
	if err != nil {
		fmt.Printf("Error: '%s'\n", err.Error())
		return c.SendStatus(fiber.StatusBadRequest)
	}

	seller, err := database.GetSingle[database.User](database.EqualityCondition("name", createPost.Username))
	if err != nil {
		fmt.Printf("Error: '%s'\n", err.Error())
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err = database.Insert(database.Image{Id: -1, Url: createPost.ImageUrl})
	if err != nil {
		fmt.Printf("Error: '%s'\n", err.Error())
		return c.SendStatus(fiber.StatusBadRequest)
	}

	imgDb, err := database.GetSingle[database.Image](database.EqualityCondition("string_url", createPost.ImageUrl))
	if err != nil {
		fmt.Printf("Error: '%s'\n", err.Error())
		return c.SendStatus(fiber.StatusBadRequest)
	}

	autoAccept := 0
	if createPost.AutoAcceptThreshold != nil {
		autoAccept = *createPost.AutoAcceptThreshold
	}

	err = database.Insert(database.Auction{
		Id:                  -1,
		Title:               createPost.Title,
		Description:         createPost.Description,
		Location:            createPost.Location,
		CreationTime:        time.Now(),
		EndingTime:          createPost.EndingTime,
		ViewCount:           0,
		InitialPrice:        createPost.InitalPrice,
		MinimumBidIncrement: createPost.MinimumIncrement,
		CurrentBid:          createPost.InitalPrice,
		AutoAcceptThreshold: autoAccept,
		CategoryId:          1,
		SellerId:            seller.Id,
		ImageId:             imgDb.Id,
	})
	if err != nil {
		fmt.Printf("Error: '%s'\n", err.Error())
		return c.SendStatus(fiber.StatusBadRequest)
	}

	return c.SendStatus(fiber.StatusAccepted)
}

func AllEndpoints() []endpoint.Endpoint {
	endpoints := make([]endpoint.Endpoint, 0)

	endpoints = append(endpoints, endpoint.Endpoint{Location: "/product/:id", Handler: singleAuctionHandler, Type: fiber.MethodGet})
	endpoints = append(endpoints, endpoint.Endpoint{Location: "/post", Handler: bidHandler, Type: fiber.MethodPost})
	endpoints = append(endpoints, endpoint.Endpoint{Location: "/create-post", Handler: postCreationHandler, Type: fiber.MethodPost})

	return endpoints
}
