export interface Product {
    id: number;
    title: string;
    startingPrice: number;
    currentBidPrice: number;
    CurrentAmountOfBids: number,
    description: string;
    currency: string;
    quantity: number;
    currentlyListed: boolean;
    inwatchlist: boolean;
}
