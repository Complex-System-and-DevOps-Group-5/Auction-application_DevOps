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

const getSHA256Hash = async (input: string) => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
      .map((item) => item.toString(16).padStart(2, "0"))
      .join("");
    return hash;
  };
  

export async function postLoginRequest(url: string, user: User) : Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: user.username,
                password: await getSHA256Hash(user.password),
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
                password: await getSHA256Hash(register.password),
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