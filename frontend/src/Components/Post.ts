import Bid from "../Interfaces/Bid.ts";
import User from "../Interfaces/User.ts";
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
        return await response.text;
    } finally {
        // catch later
    }
}