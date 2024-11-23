export interface Auction {
    id: string;
    title: string;
    startingPrice: number;
    winningBid: number;
    amountOfBids: number,
    description: string;
    currency: string;
    quantity: number;
    sold: boolean;
    inWatchlist: boolean;
    imgUrl: string;
}
