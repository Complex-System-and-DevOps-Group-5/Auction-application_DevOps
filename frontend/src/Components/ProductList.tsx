
import * as React from "react";
import styles from '../Styling/ProductList.module.css';
import DefaultButton from "./DefaultButton.tsx";
import {useNavigate} from "react-router-dom";


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

    const navigate = useNavigate();
    return (
        <div className={styles.productList}>
            {/*<h2>Auction Items</h2>*/}
            <div
                className={styles.productGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productItem}>
                        <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage}/>
                        <div className={styles.productInfo}>
                            <p className={styles.productTitle}>{product.title} </p>
                            <p className={styles.productPrice}>${product.price.toFixed(2)} </p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <DefaultButton text={"View Item"} onClick={() => navigate("/Product")}></DefaultButton>
                            <DefaultButton text={"Add to watchlist"} onClick={() => console.log("Add to watchlist")}></DefaultButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ProductList;
