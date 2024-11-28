import '../Styling/CreatePost.css'
import { useState } from "react";
import { useLoginState } from "../Context/LoginContext.tsx";
import { postCreateRequest } from '../Components/Post.ts';
import CreateAuctionData from "../Interfaces/CreateAuction.ts";


export default function CreatePost() {
    //from backend
    const { username } = useLoginState()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [endingTime, setEndingTime] = useState(new Date())
    const [initialPrice, setInitialPrice] = useState(0)
    const [minimumIncrement, setMinimumIncrement] = useState(1)
    const [autoAcceptThreshold, setAcceptThreshold] = useState<number | undefined>()
    const [imageUrl, setImage] = useState("")

    const [submitting, setSubmitting] = useState(false)

    function handleCreatePost(event: any) {
        event.preventDefault();
        setSubmitting(true);
        
        const auctionData: CreateAuctionData = {
            username: username,
            title: title.trim(),
            description: description.trim(),
            location: location.trim(),
            endingTime: endingTime,
            initialPrice: initialPrice,
            minimumIncrement: minimumIncrement,
            autoAcceptThreshold: autoAcceptThreshold,
            imageUrl: imageUrl,
        }
        
        return new Promise((resolve, reject): void => {
            postCreateRequest('api/create-post', auctionData)
            .then(response => {
                resolve(response)
            })
            .catch(error =>{
                reject(error.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
        });
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        // Check for submitting or delete key
        if (submitting) {
            event.preventDefault();
        }
    }

    return (
        <div className="create-post-container">

            <div className="create-post-content">
                <h1>Create a post</h1>

                <form onSubmit={handleCreatePost} onKeyPress={handleKeyPress}>
                    <h2>Product Title</h2>
                    <input name= "title" type="text"
                            value={title}
                            placeholder="Enter title"
                            onChange = {(event) => setTitle(event.target.value)}
                    />
                
                    <h2>Product Description</h2>
                    <textarea
                        value={description}
                        className="product-text"
                        placeholder="Describe your product (200-500 words)"
                        onChange = {(event) => setDescription(event.target.value)}
                    />

                    <h2>Product Location</h2>
                    <input name= "location" type="text"
                        value={location}
                        placeholder="Location"
                        onChange = {(event) => setLocation(event.target.value)}
                    />

                    <h2>Auction End</h2>
                    <input name= "endingTime" type="datetime-local"
                        placeholder="Ending Time"
                        onChange = {(event) => setEndingTime(event.target.valueAsDate!)}
                    />

                    <h2>Initial Price</h2>
                    <input name= "initialPrice" type="number"
                        value={initialPrice}
                        placeholder="Initial Price"
                        onChange = {(event) => setInitialPrice(Number(event.target.valueAsNumber.toFixed()))}
                    />

                    <h2>Minimum Bid Increment</h2>
                    <input name= "minimumIncrement" type="number"
                        value={minimumIncrement}
                        placeholder="Minimum Increment"
                        onChange = {(event) => setMinimumIncrement(Number(event.target.valueAsNumber.toFixed()))}
                    />

                    <h2>Auto Accept Threshold (Optional)</h2>
                    <input name= "autoAccept" type="number"
                        value={autoAcceptThreshold}
                        placeholder="Auto Accept Threshold"
                        onChange = {(event) => setAcceptThreshold(Number(event.target.valueAsNumber.toFixed()))}
                    />

                    <h2>Product Image</h2>
                    <input name= "image" type="text"
                        value={imageUrl}
                        placeholder="Image URL"
                        onChange = {(event) => setImage(event.target.value)}
                    />

                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}
