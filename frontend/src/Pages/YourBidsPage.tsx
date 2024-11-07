import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { Product, ProductListProps } from "../Components/Product.ts";
import { useFetch } from "../Components/Fetch.ts";

export function YourBidsPage() {
    const productsUrl: string = 'https://raw.githubusercontent.com/Complex-System-and-DevOps-Group-5/Auction-application_DevOps/refs/heads/develop/frontend/src/Mockdata/ongoing_expired_products.json';
    const [products, isLoading, hasError] = useFetch(productsUrl);

   
   

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