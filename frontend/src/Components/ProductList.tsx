
import * as React from "react";
import styles from '../Styling/ProductList.module.css';
import DefaultButton from "./Button.tsx";
import {ProductListProps} from "./Product.ts";


/*const ProductList: React.FC<ProductListProps> = ({products}) => {
    return (
        <div className={styles.productList}>
            <h2>Auction Items</h2>
            <div
                className={styles.productGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productItem}>
                        <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage}/>
                        <div className="productInfo">
                            <p className={styles.productTitle}>{product.title} </p>
                            <p className={styles.productPrice}>${product.price.toFixed(2)} </p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <DefaultButton text={"View Item"} onClick={() => console.log("Left button clicked")} color={"#dddddd"}></DefaultButton>
                            <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")} color={"#4be68c"}></DefaultButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ProductList;*/