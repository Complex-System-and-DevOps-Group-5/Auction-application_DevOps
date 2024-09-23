
import * as React from "react";
import styles from '../Styling/ProductList.module.css';
import DefaultButton from "./DefaultButton.tsx";


interface Product {
    id: number;
    title: string
    imgUrl?: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
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
                            <DefaultButton text={"View Item"} onClick={() => console.log("Left button clicked")}></DefaultButton>
                            <DefaultButton text={"View Item"} onClick={() => console.log("Add to wishlist")}></DefaultButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ProductList;