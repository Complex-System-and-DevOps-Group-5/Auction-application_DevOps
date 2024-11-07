import {Product} from "./Product.ts";
import {useEffect, useState} from "react";


async function fetchData(url: string): Promise<Product[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok, tried to access: ' + url);
        }
        const data = await response.json();
        return data as Product[];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
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
                if (fetchedData.length === 0) {
                    setHasError(true);
                } else {
                    setData(fetchedData);
                }
                setIsLoading(false);
            });
    }, [url]);

    return [data as Product[], isLoading, hasError];
}