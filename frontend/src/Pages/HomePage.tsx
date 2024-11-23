import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { Product, ProductListProps } from "../Components/Product.ts";
import { useFetch } from "../Components/Fetch.ts";
import {useNavigate} from "react-router-dom";

export function HomePage() {
    const productsUrl: string = 'http://130.225.170.52:10101/api/frontpag';
    const [products, isLoading, hasError] = useFetch(productsUrl);


    const productBoxItems = products && products.map((product: Product) => (
        !hasError && products !== null && (
                    <ProductItem product={product}/>
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

function ProductItem({product}: ProductListProps) {
    const navigate = useNavigate();
    return (
        <div key={product.id} className={styles.productItem} >
            <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage}/>
            <div className="productInfo">
                <p className={styles.productTitle}>{product.title} </p>
                <p className={styles.productPrice}>${product.price.toFixed(2)} </p>
            </div>
            <div className={styles.buttonContainer}>
                <DefaultButton text={"View Item"} onClick={()=>navigate("/product/" + product.id)}
                               color={"#dddddd"}></DefaultButton>
                <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")}
                               color={"#4be68c"}></DefaultButton>
            </div>
        </div>
    )
}