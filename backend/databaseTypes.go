package main

import "time"

type CategoryDb struct {
	Id   int `db:"id" no-db:"insert"`
	Name int `db:"name"`
}

type UserDb struct {
	Id           int    `db:"id" no-db:"insert"`
	Name         string `db:"name"`
	Email        string `db:"email"`
	PasswordHash string `db:"password_hash"`
	Role         int    `db:"role"`
	Verified     bool   `db:"verified"`
}

type ImageDb struct {
	Id  int    `db:"id" no-db:"insert"`
	Url string `db:"string_url"`
}

type AuctionDb struct {
	Id                  int       `db:"id" no-db:"insert"`
	Title               string    `db:"title"`
	Description         string    `db:"description"`
	Location            string    `db:"location"`
	Status              int       `db:"status"`
	CreationTime        time.Time `db:"creation_time"`
	EndingTime          time.Time `db:"ending_time"`
	ViewCount           int       `db:"view_count"`
	InitialPrice        int       `db:"initial_price"`
	MinimumBidIncrement int       `db:"minimum_bid_increment"`
	CurrentBid          int       `db:"current_bid"`
	AutoAcceptThreshold int       `db:"auto_accept_threshold"`
	CategoryId          int       `db:"category_id"`
	SellerId            int       `db:"seller_id"`
	ImageId             int       `db:"image_id"`
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
