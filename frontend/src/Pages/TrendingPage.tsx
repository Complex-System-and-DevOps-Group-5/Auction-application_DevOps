import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { Product} from "../Components/Product.ts";
import {useProductFetch} from "../Components/Fetch.ts";

export default function TrendingPage() {
    const productsUrl: string = 'http://130.225.170.52:10101/api/frontpage';
    const [products, isLoading, hasError] = useProductFetch(productsUrl);

    //First Sort for views and get the top 10 and then map products
    const trendingProducts = products && products
        .sort((a: Product, b: Product) => b.views - a.views)
        .slice(0, 10)
        .map((product: Product) => (
            <div key={product.id} className={styles.productItem}>
                <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage}/>
                <div className="productInfo">
                    <p className={styles.productTitle}>{product.title}</p>
                    <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <DefaultButton text={"View Item"} onClick={() => console.log("View Item clicked")}
                                   color={"#dddddd"}/>
                    <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")}
                                   color={"#4be68c"}/>
                </div>
            </div>
        ));

    return (
        <div className={styles.productList}>
            <div className={styles.productGrid}>
                {hasError && <p>Error fetching products</p>}
                {isLoading ? <div className="loading">Loading...</div> : trendingProducts}
            </div>
        </div>
    );
}