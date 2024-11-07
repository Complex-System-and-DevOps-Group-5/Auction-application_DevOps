import styles from "../Styling/ProductList.module.css";
import DefaultButton from "../Components/DefaultButton.tsx";
import { Product, ProductListProps } from "../Components/Product.ts";
import { useFetch } from "../Components/Fetch.ts";

export function YourBidsPage() {
    const productsUrl: string = 'https://raw.githubusercontent.com/Complex-System-and-DevOps-Group-5/Auction-application_DevOps/feature/your-bids-page/frontend/src/MockData/ongoing_expired_products.json';
    const [products, isLoading, hasError] = useFetch(productsUrl);

   const ongoingBids = products?.filter((product: Product) => product.status === "ongoing");
    const expiredBids = products?.filter((product: Product) => product.status === "expired");
   



    return (
        <div className={styles.productList}>
            <h1>Your Bids</h1>
            
            {hasError && <p>Error fetching products</p>}
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <section className={styles.bidsSection}>
                        <h2>Ongoing Bids</h2>
                        <div className={styles.productGrid}>
                            {ongoingBids?.length ? ongoingBids.map((product: Product) => (
                                <ProductItem product={product} key={product.id} />
                            )) : <p>No ongoing bids available.</p>}
                        </div>
                    </section>

                    <section className={styles.bidsSection}>
                        <h2>Expired Bids</h2>
                        <div className={styles.productGrid}>
                            {expiredBids?.length ? expiredBids.map((product: Product) => (
                                <ProductItem product={product} key={product.id} />
                            )) : <p>No expired bids available.</p>}
                        </div>
                    </section>
                </>
            )}
        </div>
    );

}

function ProductItem({ product }: ProductListProps) {
    const statusClass = product.status === "ongoing" ? "green" : "red"; 

    return (
        <div key={product.id} className={styles.productItem}>
            <div className={`${styles.statusIndicator} ${styles[statusClass]}`} />
            
            <img src={product.imgUrl} alt={`Product ${product.id}`} className={styles.productImage} />

            <div className={styles.productInfo}>
                <p className={styles.productTitle}>{product.title || 'Unnamed Product'}</p>
                <p className={styles.productPrice}>${product.price?.toFixed(2) || 'N/A'}</p>
            </div>

            <div className={styles.buttonContainer}>
                <DefaultButton
                    text="View Item"
                    onClick={() => console.log(`View item ${product.id} clicked`)}
                    color="#dddddd"
                />
            </div>
        </div>
    );
}
