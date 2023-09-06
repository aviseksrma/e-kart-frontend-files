import ProductLists from "./ProductsList";
import "./ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";

function ProductsPage() {
  return (
    <section className='products_page'>
      <ProductsSidebar />
      <section className='products_list_section'>
        <ProductLists />
      </section>
    </section>
  );
}

export default ProductsPage;
