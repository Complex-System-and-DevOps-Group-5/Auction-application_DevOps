export interface Product {
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
}
