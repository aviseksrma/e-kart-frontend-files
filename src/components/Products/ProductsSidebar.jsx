import useData from "../../hooks/useData";
import Links from "../Navbar/Links";
import "./ProductsSidebar.css";
import config from "../../config.json";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");

  return (
    <aside className='products_sidebar'>
      <h2>Categories</h2>
      <div className='category_links'>
        {error && <em className='form_error'>{error}</em>}
        {categories &&
          categories.map((category) => (
            <Links
              key={category._id}
              title={category.name}
              link={`${config.backendURL}/category=${category.name}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
