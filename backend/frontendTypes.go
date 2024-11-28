package main

import (
	"time"

	"DevOps/database"
)

// Simple aliases
type Category = database.Category
type Image = database.Image
type Chat = database.Chat
type WatchlistItem = database.Watchlist
type ChatMessage = database.Message

type Bid struct {
	AuctionId      int    `json:"auctionId"`
	BidderUsername string `json:"bidderUsername"`
	Amount         int    `json:"amount"`
}

type User struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Role     int    `json:"role"` // TODO: should probably be a more human-friendly format
	Verified bool   `json:"verified"`
}

func GetUser(id int) *User {
	user, err := database.GetSingle[database.User](database.EqualityCondition("id", id))

	if err != nil {
		return nil
	}

	return &User{
		Id:       user.Id,
		Name:     user.Name,
		Email:    user.Email,
		Role:     user.Role,
		Verified: user.Verified,
	}
}

type AuctionPreview struct {
	Id        int    `json:"id"`
	Title     string `json:"title"`
	ImageUrl  string `json:"imgUrl"`
	Price     int    `json:"price"`
	ViewCount int    `json:"views"`
}

func GetFrontPageAuctions(amount int, offset int) []AuctionPreview {
	auctions, err := database.GetAmount[database.Auction](amount, offset)
	if err != nil {
		return nil
	}

	previews := make([]AuctionPreview, len(auctions))
	for i, auction := range auctions {
		imageUrl := ""

		image, err := database.GetSingle[database.Image](database.EqualityCondition("id", auction.ImageId))
		if err == nil {
			imageUrl = image.Url
		}

		previews[i] = AuctionPreview{
			Id:        auction.Id,
			Title:     auction.Title,
			ImageUrl:  imageUrl,
			Price:     auction.CurrentBid,
			ViewCount: auction.ViewCount,
		}
	}

	return previews
}

type AuctionPost struct {
	Id                  int       `json:"id"`
	Title               string    `json:"title"`
	Description         string    `json:"description"`
	Location            string    `json:"location"`
	Status              int       `json:"status"` // TODO: should probably be a more human-friendly format
	Sold                bool      `json:"sold"`
	InWatchList         bool      `json:"inWatchList"`
	CreationTime        time.Time `json:"creationTime"`
	EndingTime          time.Time `json:"endingTime"`
	ViewCount           int       `json:"viewCount"`
	MinimumBidIncrement int       `json:"minimumBidIncrement"`
	CurrentBid          int       `json:"currentBid"`
	CategoryId          int       `json:"categoryId"`
	SellerId            int       `json:"sellerId"`
	ImageUrl            string    `json:"imgUrl"`
}

func GetPost(id int) *AuctionPost {
	auction, err := database.GetSingle[database.Auction](database.EqualityCondition("id", id))

	if err != nil {
		return nil
	}

	imageUrl := ""

	image, err := database.GetSingle[database.Image](database.EqualityCondition("id", auction.ImageId))
	if err == nil {
		imageUrl = image.Url
	}

	return &AuctionPost{
		Id:                  auction.Id,
		Title:               auction.Title,
		Description:         auction.Description,
		Location:            auction.Location,
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
