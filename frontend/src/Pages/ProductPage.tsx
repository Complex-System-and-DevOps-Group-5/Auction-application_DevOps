import '../Styling/ProductPage.css'
import watchList from "../assets/watchlist-icon.png"
import {useEffect, useState} from "react";

export default function ProductPage () {
    // from DOM:
    const [watchtListed, setWatchlisted] = useState(false)
    const [bidAmount, setbidAmount] = useState(0)
    // from backend:
    const [amountOfBids, setamountOfBids] = useState(1)
    const [winningBidAmount, setWinningBidAmount] = useState(999)
    const [sold, setSold] = useState(false)
    const [minBidAmount, setMinBidAmount] = useState(1)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setbidAmount(Number(event.target.value));  // Number() uhmm skriv bedre kode pls
    }

    async function handleBidSubmit(event: any){
        event.preventDefault();
        try {
            await submitBid(bidAmount)
        } catch(err) {
            console.log(err)
        }
    }
    function submitBid(bid: number) {
        //
        return new Promise((resolve, reject): void => {
            setTimeout(() => {
                // get winningBidAmount from backend this will determine if promise will be resolved or rejected
                if (bid >= winningBidAmount + minBidAmount){
                    resolve(alert('A bit was sucessfully submitted: ' + bidAmount));
                } else {
                    reject(new Error('Backend did not approve your bid. Attempted to  submit: ' + bid));
                }
            }, 1500);
        })
    }
    useEffect(() => {
            setbidAmount(winningBidAmount+minBidAmount);
    }, [winningBidAmount, minBidAmount])
    return(
        <div className="container">
            <div className="images">
                <img src='../../VincentVanGogh00681.jpg'/>
            </div>
            <div className="productInfo">
                <h2>Self portrait of Vincent Van Gough</h2> {/*Context*/}
                {watchtListed ? (
                        <p>
                            <img className="watchList" src={watchList} alt = "watch list icon"/>
                            Add to watchlist
                        </p>
                ) : (
                    <p>
                        <img className="watchList" src={watchList} alt="watch list icon"/>
                        Added to watchlist
                    </p>
                )
                }
                <p> {sold ? "SOLD" : "CURRENT BID"}</p>
                <p>$ {winningBidAmount}&nbsp;<span style={{color: "gray"}}>{amountOfBids} bids</span></p>
                {sold ? (
                    <span style={{color: "red", display: "flex", paddingTop: 10}}>Expired</span>
                ) : (
                    <div className="bidSection">
                        <form onSubmit={handleBidSubmit}>
                            <input name="amount" type="number" value={bidAmount}
                                   min={(winningBidAmount + minBidAmount).toString()}
                                   pattern="[0-9]"
                                   className="bidInput"
                                   onChange={handleChange}
                            />
                            <button id="button">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}