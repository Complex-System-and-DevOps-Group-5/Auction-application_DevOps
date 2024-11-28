import {Auction} from "../Interfaces/Auction.ts";

export interface Product {
    /*id: string;
    title: string;
    description: string;
    startingPrice: number;
    currentBidPrice: number;
    CurrentAmountOfBids: number,

    currency: string;
    quantity: number;
    currentlyListed: boolean;
    inwatchlist: boolean;*/
    id: number;
    title: string
    imgUrl?: string;
    price: number;
    views: number;
    sold: boolean;
}

export interface AuctionListProps {
    products?: Auction[];
    product: Auction;
}
