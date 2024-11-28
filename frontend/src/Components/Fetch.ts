import {Product} from "./Product.ts";
import {useEffect, useState} from "react";


export async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url, {
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Authorization': 'Bearer '+ localStorage.getItem("authToken")
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

export function useFetch(url: string): [Product[], boolean, boolean] {
    const [data, setData] = useState<Product[]>();
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

    return [data as Product[], isLoading, hasError];
}