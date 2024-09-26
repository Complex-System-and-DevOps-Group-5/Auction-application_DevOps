import ProductList from "../Components/ProductList.tsx";
import productList from "../MockData/ProductListItems.json";

export function TrendingPage() {
    return (
        <>
            <h1>Trending Page</h1>

            <ProductList products={productList} />
        </>
    )
}

export default TrendingPage;