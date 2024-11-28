import {useEffect, useState} from "react";
import {Auction} from "../Interfaces/Auction.ts";


export async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url, {
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok, tried to access: ' + url);
        }
        return await response.json();
    } finally {
        // catch later
    }
}

export function useFetch(url: string): [Auction[], boolean, boolean] {
    const [data, setData] = useState<Auction[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData(url)
            .then(fetchedData => {
                setData(fetchedData)
                setIsLoading(false);})
            .catch(() =>
            setHasError(true)
        );
    }, [url]);

    return [data as Auction[], isLoading, hasError];
}