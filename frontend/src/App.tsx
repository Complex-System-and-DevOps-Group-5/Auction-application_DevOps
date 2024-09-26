import './App.css'
import AuthPage from "./Pages/AuthPage.tsx";
import UpperMenu from "./Components/UpperMenu.tsx";
import ProductPage from "./Pages/ProductPage.tsx";
import NavigationMenu from "./Components/NavigationMenu.tsx";
import ProductList from "./Components/ProductList.tsx";
import productList from './Mockdata/ProductListItems.json';

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
              <ProductList products={productList}/>
          </main>
      </>
  )
}

export default App
