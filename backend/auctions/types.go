package auctions

import "time"

type AuctionPost struct {
	Id                  int       `json:"id"`
	Title               string    `json:"title"`
	Description         string    `json:"description"`
	Location            string    `json:"location"`
	BidCount            int       `json:"bidCount"`
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

type Bid struct {
	AuctionId      int    `json:"auctionId"`
	BidderUsername string `json:"bidderUsername"`
	Amount         int    `json:"amount"`
}
