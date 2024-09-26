import './App.css'
import AuthPage from "./Pages/AuthPage.tsx";
import UpperMenu from "./Components/UpperMenu.tsx";
import ProductPage from "./Pages/ProductPage.tsx";
import NavigationMenu from "./Components/NavigationMenu.tsx";
import ProductList from "./Components/ProductList.tsx";
import CreatePost from "./Pages/CreatePost.tsx";
import HighlightedProduct from "./Components/HighlightedProduct.tsx";
import highlightedProductList from "./MockData/HighlightedProductList.json";
import productList from "./MockData/ProductList.json";

function App() {
  return (
      <>
          <header>

          </header>
          <main>
              <UpperMenu/>
              <NavigationMenu/>
              <AuthPage/>
              <ProductPage/>
              <HighlightedProduct products={highlightedProductList}/>
              <ProductList products={productList}/>
              <CreatePost/>
          </main>

      </>
  )
}

export default App
