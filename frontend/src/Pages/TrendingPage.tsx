import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { Product, ProductListProps } from "../Components/Product.ts";
import {useProductFetch} from "../Components/Fetch.ts";

export default function TrendingPage() {
    const productsUrl: string = 'https://raw.githubusercontent.com/Complex-System-and-DevOps-Group-5/Auction-application_DevOps/refs/heads/mock-data/frontend/src/MockData/ProductListItems.json';
    const [products, isLoading, hasError] = useProductFetch(productsUrl);

    //First Sort for views and get the top 10 and then map products
    const trendingProducts = products && products
        .sort((a: Product, b: Product) => b.views - a.views)
        .slice(0, 10)
        .map((product: Product) => (
            <ProductItem key={product.id} product={product}/>
        ));

    return (
        <div className={styles.productList}>
            {/*<h1>Trending Products</h1>*/}
            <div className={styles.productGrid}>
                {hasError && <p>Error fetching products</p>}
                {isLoading ? <div className="loading">Loading...</div> : trendingProducts}
            </div>
        </div>
    );
}

function ProductItem({ product }: ProductListProps) {
    return (
        <div key={product.id} className={styles.productItem}>
            <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage} />
            <div className="productInfo">
                <p className={styles.productTitle}>{product.title}</p>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                {/*For testing purposes: */}
                {/*<p className={styles.productViews}>Views: {product.views}</p>*/}
            </div>
            <div className={styles.buttonContainer}>
                <DefaultButton text={"View Item"} onClick={() => console.log("View Item clicked")} color={"#dddddd"} />
                <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")} color={"#4be68c"} />
            </div>
        </div>
    );
}
