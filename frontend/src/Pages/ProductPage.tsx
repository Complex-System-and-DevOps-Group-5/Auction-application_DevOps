import '../Styling/ProductPage.css'
import watchList from "../assets/watchlist-icon.png"
import {useEffect, useState} from "react";
import {useAuctionDispatch, useAuctionState} from "../Context/AuctionContext.tsx";
import {Auction} from "../Interfaces/Auction.ts";
import {fetchData} from "../Components/Fetch.ts";
import {useLoginState} from "../Context/LoginContext.tsx";
import Bid from "../Interfaces/Bid.ts";
import {postBidRequest} from "../Components/Post.ts";
import {useParams} from "react-router-dom";

export default function ProductPage () {
    const {id} = useParams();
    const baseURL: string = 'http://130.225.170.52:10101/api/product/' + id
    console.log(baseURL)
    // from DOM:
    const [bidAmount, setbidAmount] = useState(0);

    // from backend:
    const { product, isProductLoading, productError } = useAuctionState();
    const { username, loggedIn } = useLoginState()
    // loading indicators
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const dispatch = useAuctionDispatch();

    useEffect(() => {
        fetchData(baseURL)
            .then(fetchedData => {
                dispatch({ type: "fetchedAuction", payload: { product: fetchedData }});
                dispatch({ type: "auctionError", payload: { failed: false } })
            })
            .catch(() =>
                dispatch({ type: "auctionError", payload: { failed: true } })
            );
        }, [submitting]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setbidAmount(Number(event.target.valueAsNumber.toFixed()));  // Number() uhmm skriv bedre kode pls
    }

    async function handleBidSubmit(event: any) {
        event.preventDefault();
        setSubmitting(true);
        await submitBid(bidAmount)
        setSubmitting(false);
    }

    async function submitBid(amount: number) {

        const submitData: Bid = {
            auctionId: Number(id),
            bidderUserName: username,
            amount: amount,
        }

        try {
           const response = await postBidRequest('/api/post', submitData)
            console.log('the response inside submitBid: ' + response)
            alert('Your submit was successfully submitted, if you dont see your bid, reload the page')
            setSubmitError(false)
            dispatch({type: "updateCurrentBid", payload: { amount: amount }})
        } catch (err){
            console.log('setting error to true because of : ' + err)
            setSubmitError(true)
        }
    }
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13){
            event.preventDefault();
        }
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
            <p>$ {auction.currentBid}&nbsp;<span style={{color: "gray"}}> Placeholder for amount bids</span></p>
            { !loggedIn ? ( /* auction date time thing*/
                <span style={{color: "red", display: "flex", paddingTop: 10}}>Login to submit a bit</span>
            ) : (
                <div className="bidSection">
                    <form onSubmit={handleBidSubmit} onKeyDown={handleKeyPress}>
                        <input name="amount" type="number"
                               min={(auction.minimumBidIncrement).toString()}
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
                        {submitError && <p>Error submitting bid</p>}
                    </form>
                </div>
            )}
        </div>
    ));
    const imageBox = product.map((auction:Auction) => (

            <div className="container">
                <div className="images">
                    <img src={auction.imgUrl}
                         role="presentation"/>
                    <div className="sub-imgs">
                        {/*TODO*/}
                        <img src={auction.imgUrl} alt="small"/>
                        <img src={auction.imgUrl} alt="small"/>
                        <div className="more-imgs">+14 Photos</div>
                    </div>
                </div>
            </div>
    ))

    return (
        <>
        { !isProductLoading && !productError? (
                <div className="container">
                    {imageBox}
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