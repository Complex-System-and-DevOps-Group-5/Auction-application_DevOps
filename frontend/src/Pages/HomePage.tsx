import HighlightedProduct from "../Components/HighlightedProduct.tsx";
import ProductList from "../Components/ProductList.tsx";
import highlightedProductList from "../MockData/HighlightedProductList.json";
import productList from "../MockData/ProductListItems.json"

export function HomePage() {
    return (
        <>
            <HighlightedProduct products={highlightedProductList} />
            <ProductList products={productList} />
        </>
    )
}

export default HomePage;