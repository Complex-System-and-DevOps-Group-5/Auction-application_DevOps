import Bid from "../Interfaces/Bid.ts";
import User from "../Interfaces/User.ts";


export async function postBidRequest(url: string, bid: Bid) :Promise<any> {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            id: bid.id,
            bidder: bid.bidder,
            amount: bid.amount
        }),
        headers: {
            "Content-type": "application/json",
        }
    });
}

export async function postLoginRequest(url: string, user: User) : Promise<any> {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            password: user.password,
        }),
        headers: {
            "Content-type": "application/json",
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error( 'Network respond was not ok'
            )
        }
        const contentType = res.headers.
        get('content-type');
        if (contentType && contentType.
        includes('application/json')) {
            return res.json();
        } else {
            throw new Error(
                'Response is not JSON');
        }
    });

}