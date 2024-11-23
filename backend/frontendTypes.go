package main

import "time"

// Simple aliases
type Category = CategoryDb
type Image = ImageDb
type Chat = ChatDb
type Bid = BidDb
type WatchlistItem = WatchlistDb
type ChatMessage = MessageDb

type User struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Role     int    `json:"role"` // TODO: should probably be a more human-friendly format
	Verified bool   `json:"verified"`
}

func GetUser(id int) *User {
	user, err := GetSingle[UserDb]("users", EqualityCondition("id", id))

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
	Id        int     `json:"id"`
	Title     string  `json:"title"`
	ImageUrl  string  `json:"imgUrl"`
	Price     float32 `json:"price"`
	ViewCount int     `json:"views"`
}

func GetFrontPageAuctions(amount int, offset int) []AuctionPreview {
	auctions, err := GetAmount[AuctionDb]("auction_posts", amount, offset)
	if err != nil {
		return nil
	}

	previews := make([]AuctionPreview, len(auctions))
	for i, auction := range auctions {
		imageUrl := ""

		image, err := GetSingle[ImageDb]("image", EqualityCondition("id", auction.ImageId))
		if err != nil {
			imageUrl = image.Url
		}

		previews[i] = AuctionPreview{
			Id:        auction.Id,
			Title:     auction.Title,
			ImageUrl:  imageUrl,
			Price:     float32(auction.CurrentBid) / 100,
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
	CreationTime        time.Time `json:"creation_time"`
	EndingTime          time.Time `json:"ending_time"`
	ViewCount           int       `json:"view_count"`
	MinimumBidIncrement int       `json:"minimum_bid_increment"`
	CurrentBid          int       `json:"current_bid"`
	CategoryId          int       `json:"category_id"`
	SellerId            int       `json:"seller_id"`
	ImageId             int       `json:"image_id"`
}

func GetPost(id int) *AuctionPost {
	auction, err := GetSingle[AuctionDb]("auction_posts", EqualityCondition("id", id))

	if err != nil {
		return nil
	}

	return &AuctionPost{
		Id:                  auction.Id,
		Title:               auction.Title,
		Description:         auction.Description,
		Location:            auction.Location,
		Status:              auction.Status,
		CreationTime:        auction.CreationTime,
		EndingTime:          auction.EndingTime,
		ViewCount:           auction.ViewCount,
		MinimumBidIncrement: auction.MinimumBidIncrement,
		CurrentBid:          auction.CurrentBid,
		CategoryId:          auction.CategoryId,
		SellerId:            auction.SellerId,
		ImageId:             auction.ImageId,
	}
}
