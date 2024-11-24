package database

import "time"

type DatabaseObject interface {
	TableName() string
}

type Category struct {
	Id   int    `db:"id" no-db:"insert"`
	Name string `db:"name"`
}

func (d Category) TableName() string {
	return "category"
}

type User struct {
	Id           int    `db:"id" no-db:"insert" json:"id"`
	Name         string `db:"name" json:"name"`
	Email        string `db:"email" json:"email"`
	PasswordHash string `db:"password_hash" json:"password_hash"`
	Role         int    `db:"role" json:"role"`
	Verified     bool   `db:"verified" json:"verified"`
}

func (d User) TableName() string {
	return "users"
}

type Image struct {
	Id  int    `db:"id" no-db:"insert"`
	Url string `db:"string_url"`
}

func (d Image) TableName() string {
	return "image"
}

type Auction struct {
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

func (d Auction) TableName() string {
	return "auction_post"
}

type Chat struct {
	Id           int       `db:"id" no-db:"insert"`
	CreationTime time.Time `db:"time"`
	SellerId     int       `db:"seller_id"`
	BuyerId      int       `db:"buyer_id"`
	AuctionId    int       `db:"auction_id"`
}

func (d Chat) TableName() string {
	return "chat"
}

type Bid struct {
	CreationTime time.Time `db:"creation_time"`
	Amount       int       `db:"amount"`
	Status       int       `db:"status"`
	AuctionId    int       `db:"auction_id"`
	BuyerId      int       `db:"buyer_id"`
}

func (d Bid) TableName() string {
	return "bid"
}

type Watchlist struct {
	AuctionId int `db:"auction_id"`
	UserId    int `db:"user_id"`
}

func (d Watchlist) TableName() string {
	return "watchlist"
}

type Message struct {
	Id           int       `db:"message_id"`
	ChatId       int       `db:"chat_id"`
	CreationTime time.Time `db:"creation_time"`
}

func (d Message) TableName() string {
	return "messages"
}
