import '../Styling/ProductPage.css'
import watchList from "../assets/watchlist-icon.png"
import {useEffect, useState} from "react";
import {useAuctionDispatch, useAuctionState} from "../Context/AuctionContext.tsx";
import {Auction} from "../Interfaces/Auction.ts";
import {fetchData} from "../Components/Fetch.ts";

export default function ProductPage () {
    const baseURL: string = 'https://raw.githubusercontent.com/Complex-System-and-DevOps-Group-5/Auction-application_DevOps/refs/heads/mock-data/frontend/src/MockData/vangoghauction.json';
    // from DOM:
    const [bidAmount, setbidAmount] = useState(0);
    // from backend:
    const { product, isProductLoading, productError } = useAuctionState();
    // loading indicators
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useAuctionDispatch();

    useEffect(() => {
        fetchData(baseURL)
            .then(fetchedData => {
                dispatch({ type: "fetchedAuction", payload: { product: fetchedData }});
            })
            .catch(() =>
                dispatch({ type: "auctionError", payload: { failed: true } })
            );
        }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setbidAmount(Number(event.target.value));  // Number() uhmm skriv bedre kode pls
    }

    async function handleBidSubmit(event: any) {
        event.preventDefault();
        setSubmitting(true);
        try {
            await submitBid(bidAmount)
        } catch (err) {
            console.log(err)
        }
    }
// comment to trigger release
    function submitBid(bid: number) {
        //
        return new Promise((resolve, reject): void => {
            setTimeout(() => {
                // get winningBidAmount from backend this will determine if promise will be resolved or rejected
                if (bid >= 100 + 0.10) {
                    resolve(alert('A bit was sucessfully submitted: ' + bidAmount));
                    setSubmitting(false);
                } else {
                    reject(new Error('Backend did not approve your bid. Attempted to  submit: ' + bid));
                    setSubmitting(false);
                }
            }, 3000);
        })
    }
    /*I'm not proud of the way I access the product and or auction info
    * I will find a better way for a ProductPage, however this method will be quite useful
    * on the front page*/
    const InfoBox = product.map((auction:Auction) => (
        <div className="productInfo">
            <h2>{auction.title}</h2>
            {auction.inWatchlist ? (
                <p>
                    <img className="watchList" src={watchList} alt="watch list icon"/>
                    Add to watchlist
                </p>
            ) : (
                <p>
                    <img className="watchList" src={watchList} alt="watch list icon"/>
                    Added to watchlist
                </p>
            )
            }
            <p> {auction.sold ? "SOLD" : "CURRENT BID"}</p>
            <p>$ {auction.winningBid}&nbsp;<span style={{color: "gray"}}>{auction.amountOfBids} bids</span></p>
            {auction.sold ? ( /* auction date time thing*/
                <span style={{color: "red", display: "flex", paddingTop: 10}}>Expired</span>
            ) : (
                <div className="bidSection">
                    <form onSubmit={handleBidSubmit}>
                        <input name="amount" type="number"
                               min={(auction.winningBid + auction.startingPrice * 0.10).toString()}
                               pattern="[0-9]"
                               className="bidInput"
                               onChange={handleChange}
                        />
                        {!submitting ? <button>Submit</button> : (
                            <div className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    ));

    return (
        <>
        { !isProductLoading && !productError? (
            <div className="container">
                <div className="images">
                    <img src='../../VincentVanGogh00681.jpg'
                         role="presentation"/>
                    <div className="sub-imgs">
                        {/*TODO*/}
                        <img src="../../VincentVanGogh00681.jpg" alt="small"/>
                        <img src="../../VincentVanGogh00681.jpg" alt="small"/>
                        <div className="more-imgs">+14 Photos</div>
                    </div>
                </div>
                {InfoBox}
            </div>
        ) : (
            <div className="container">
                <div className="lazy-img">
                    Loading image!
                </div>
                <div className="productInfo">
                    <h2>Fetching auction title</h2>
                </div>
            </div>
        )
        }
        </>
    )
}