import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { useProductFetch } from "../Components/Fetch.ts";
import {useNavigate} from "react-router-dom";
import {Product} from "../Components/Product.ts";

export function HomePage() {
    const productsUrl: string = 'http://130.225.170.52:10101/api/frontpage';
    const [products, isLoading, hasError] = useProductFetch(productsUrl);
    const navigate = useNavigate();

    const productBoxItems = products && products.map((product: Product) => (
        !hasError && products !== null && (
            <div key={product.id} className={styles.productItem}>
                <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage}/>
                <div className="productInfo">
                    <p className={styles.productTitle}>{product.title} </p>
                    <p className={styles.productPrice}>${product.price.toFixed(2)} </p>
                </div>
                <div className={styles.buttonContainer}>
                    <DefaultButton text={"View Item"} onClick={() => navigate("/product/" + product.id)}
                                   color={"#dddddd"}></DefaultButton>
                    <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")}
                                   color={"#4be68c"}></DefaultButton>
                </div>
            </div>
        )
    ));

    return (
        <div className={styles.productList}>
            {/*<HighlightedProduct product={products}/>*/}
            <div className={styles.productGrid}>
                {hasError && <p>Error fetching products</p>}
                {isLoading ? <div className="error">Loading...</div> : productBoxItems}
            </div>
        </div>

    )
}
