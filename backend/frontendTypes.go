package main

import (
	"DevOps/database"
)

// Simple aliases
type Category = database.Category
type Image = database.Image
type Chat = database.Chat
type WatchlistItem = database.Watchlist
type ChatMessage = database.Message

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
