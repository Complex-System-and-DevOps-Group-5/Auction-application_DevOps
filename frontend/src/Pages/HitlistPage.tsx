import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { Product, ProductListProps } from "../Components/Product.ts";
import { useFetch } from "../Components/Fetch.ts";

export function HitlistPage() {
    const productsUrl: string = 'https://raw.githubusercontent.com/Complex-System-and-DevOps-Group-5/Auction-application_DevOps/refs/heads/develop/frontend/src/Mockdata/ProductListItems.json';
    //const [products, setProducts] = useState<Product[] | null> (null);
    const [products, isLoading, hasError] = useFetch(productsUrl);
    //const [isLoading, setIsLoading] = useState(false);
    //const [hasError, setHasError] = useState(false);

    /*const hasFetchedProducts = useRef(false);

    const fetchProducts = async (url: string) => {
        setIsLoading(true);

        try {
            const response = await fetch(url);
            const fetchedData = await response.json();
            if(!response.ok) {
                throw new Error('Network response was not ok, could not access: ' + url);
            }
            console.log('Data fetched correctly');
            setProducts(fetchedData);
            setIsLoading(false);
        } catch (error) {
            setHasError(true);
            console.error(error);
        }
    }

    useEffect(() => {
        if(!hasFetchedProducts.current && products === null) {
            fetchProducts(productsUrl)
                .then(() => {
                    console.log("Fetched products from API");
                    hasFetchedProducts.current = true;
                })
                .catch((e) => {
                        setHasError(true);
                        console.error("could not fetch data: ", e)
                });
        }
    },[products, productsUrl]);*/

    const productBoxItems = products && products.map((product: Product) => (
        !hasError && products !== null && (
                    <ProductItem product={product}/>
        )
    ));

    return (
        <div className={styles.productList}>
            <h1>TEST</h1>
            <div className={styles.productGrid}>
                {hasError && <p>Error fetching products</p>}
                    {isLoading ? <div className="error">Loading...</div> : productBoxItems}
            </div>
        </div>

    )
}

function ProductItem({product}: ProductListProps) {
    return (
        <div key={product.id} className={styles.productItem} >
            <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage}/>
            <div className="productInfo">
                <p className={styles.productTitle}>{product.title} </p>
                <p className={styles.productPrice}>${product.price.toFixed(2)} </p>
            </div>
            <div className={styles.buttonContainer}>
                <DefaultButton text={"View Item"} onClick={() => console.log("Left button clicked")}
                               color={"#dddddd"}></DefaultButton>
                <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")}
                               color={"#4be68c"}></DefaultButton>
            </div>
        </div>
    )
}