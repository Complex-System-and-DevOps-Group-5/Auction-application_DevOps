import Bid from "../Interfaces/Bid.ts";
import User from "../Interfaces/User.ts";


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

export async function getSearchReqeuest(url: string, query: string) : Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            body: JSON.stringify({
                name: query,
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
