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
	user, err := GetSingle[UserDb](EqualityCondition("id", id))

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
	auctions, err := GetAmount[AuctionDb](amount, offset)
	if err != nil {
		return nil
	}

	previews := make([]AuctionPreview, len(auctions))
	for i, auction := range auctions {
		imageUrl := ""

		image, err := GetSingle[ImageDb](EqualityCondition("id", auction.ImageId))
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
	Sold                bool      `json:"sold"`
	InWatchList         bool      `json:"inWatchList"`
	CreationTime        time.Time `json:"creationTime"`
	EndingTime          time.Time `json:"endingTime"`
	ViewCount           int       `json:"viewCount"`
	MinimumBidIncrement float64   `json:"minimumBidIncrement"`
	CurrentBid          float64   `json:"currentBid"`
	CategoryId          int       `json:"categoryId"`
	SellerId            int       `json:"sellerId"`
	ImageUrl            string    `json:"imgUrl"`
}

func GetPost(id int) *AuctionPost {
	auction, err := GetSingle[AuctionDb](EqualityCondition("id", id))

	if err != nil {
		return nil
	}

	imageUrl := ""

	image, err := GetSingle[ImageDb](EqualityCondition("id", auction.ImageId))
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
		MinimumBidIncrement: float64(auction.MinimumBidIncrement) / 100,
		CurrentBid:          float64(auction.CurrentBid) / 100,
		CategoryId:          auction.CategoryId,
		SellerId:            auction.SellerId,
		ImageUrl:            imageUrl,
	}
}

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
