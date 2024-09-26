import '../Styling/ProductPage.css'
import watchList from "../assets/watchlist-icon.png"
import {useState} from "react";
import InputField from "../Components/InputField.tsx";
import DefaultButton from "../Components/DefaultButton.tsx";

export default function ProductPage () {
    // most of these should be context
    const [watchtListed, setWatchlisted] = useState(false)
    const [sold, setSold] = useState(true)
    const [bidPrice, setbidPrice] = useState(175)
    const [amountOfBids, setamountOfBids] = useState(12)

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
                <p>$ {bidPrice}&nbsp;<span style={{color: "gray"}}>{amountOfBids} bids</span></p>
                {sold ? (
                    <span style={{color: "red", display: "flex", paddingTop: 10}}>Expired</span>
                ) : (
                    <div className="bidSection">
                        <InputField name="amount" type="amount" placeholder="Enter bid"></InputField>
                        <DefaultButton text="Submit" color="#868686" onClick={() => {}}></DefaultButton>
                    </div>
                )}
            </div>
        </div>
    )
}