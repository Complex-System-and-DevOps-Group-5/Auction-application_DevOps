import Bid from "../Interfaces/Bid.ts";
import User from "../Interfaces/User.ts";
import CreateAuction from "../Interfaces/CreateAuction.ts";
import RegisterData from "../Interfaces/RegisterData.ts";


export async function postBidRequest(url: string, bid: Bid) : Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                auctionId: bid.auctionId,
                bidderUserName: bid.bidderUserName,
                amount: bid.amount
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log('The response inside postBidReqeust ' + response.statusText);
        return await response.json();
    } finally {
        // catch later
    }
}
  

export async function postLoginRequest(url: string, user: User) : Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } finally {
        // catch later
    }
}

export async function postCreateRequest(url: string, auctionData: CreateAuction) : Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: auctionData.username,
                title: auctionData.title,
                description: auctionData.description,
                location: auctionData.location,
                endingTime: auctionData.endingTime,
                initialPrice: auctionData.initialPrice,
                minimumIncrement: auctionData.minimumIncrement,
                autoAcceptThreshold: auctionData.autoAcceptThreshold,
                imageUrl: auctionData.imageUrl
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } finally {
        // catch later
    }
}

export async function postRegisterRequest(url: string, register: RegisterData) : Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: register.email,
                username: register.username,
                password: register.password,
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } finally {
        // catch later
    }
}