export default interface CreateAuctionData {
    username: string,
    title: string,
    description: string,
    location: string,
    endingTime: Date,
    initialPrice: number,
    minimumIncrement: number,
    autoAcceptThreshold: number | undefined,
    imageUrl: string,
}
