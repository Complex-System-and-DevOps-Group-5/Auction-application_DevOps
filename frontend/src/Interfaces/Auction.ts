export interface Auction {
    id: string;
    title: string;
    minimumBidIncrement: number;
    currentBid: number;
    bidCount: number;
    description: string;
    //currency: string;
    //quantity: number;
    sold: boolean;
    inWatchlist: boolean;
    imgUrl: string;
}
