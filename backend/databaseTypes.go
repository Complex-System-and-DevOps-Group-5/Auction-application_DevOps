package main

import "time"

type CategoryDb struct {
	Id   int    `db:"id" no-db:"insert"`
	Name string `db:"name"`
}

type UserDb struct {
	Id           int    `db:"id" no-db:"insert" json:"id"`
	Name         string `db:"name" json:"name"`
	Email        string `db:"email" json:"email"`
	PasswordHash string `db:"password_hash" json:"password"`
	Role         int    `db:"role" json:"role"`
	Verified     bool   `db:"verified" json:"verified"`
}

type ImageDb struct {
	Id  int    `db:"id" no-db:"insert"`
	Url string `db:"string_url"`
}

type AuctionDb struct {
	Id                  int       `db:"id" no-db:"insert" json:"id"`
	Title               string    `db:"title" json:"title"`
	Description         string    `db:"description" json:"description"`
	Location            string    `db:"location" json:"location"`
	Status              int       `db:"status" json:"status"`
	CreationTime        time.Time `db:"creation_time" json:"creation_time"`
	EndingTime          time.Time `db:"ending_time" json:"ending_time"`
	ViewCount           int       `db:"view_count" json:"view_count"`
	InitialPrice        int       `db:"initial_price" json:"initial_price"`
	MinimumBidIncrement int       `db:"minimum_bid_increment" json:"minimum_bid_increment"`
	CurrentBid          int       `db:"current_bid" json:"current_bid"`
	AutoAcceptThreshold int       `db:"auto_accept_bid_threshold" json:"auto_accept"`
	CategoryId          int       `db:"category_id" json:"category_id"`
	SellerId            int       `db:"seller_id" json:"seller_id"`
	ImageId             int       `db:"image_id" json:"image_id"`
}

type ChatDb struct {
	Id           int       `db:"id" no-db:"insert"`
	CreationTime time.Time `db:"time"`
	SellerId     int       `db:"seller_id"`
	BuyerId      int       `db:"buyer_id"`
	AuctionId    int       `db:"auction_id"`
}

type BidDb struct {
	CreationTime time.Time `db:"creation_time"`
	Amount       int       `db:"amount"`
	Status       int       `db:"status"`
	AuctionId    int       `db:"auction_id"`
	BuyerId      int       `db:"buyer_id"`
}

type WatchlistDb struct {
	AuctionId int `db:"auction_id"`
	UserId    int `db:"user_id"`
}

type MessageDb struct {
	Id           int       `db:"message_id"`
	ChatId       int       `db:"chat_id"`
	CreationTime time.Time `db:"creation_time"`
}
