import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import useData from "../../hooks/useData";
import CartContex from "../../contexts/CartContex";
import UserContex from "../../contexts/UserContex";
import config from "../../config.json";

const SingleProductPage = () => {
  const user = useContext(UserContex);
  const { addToCart } = useContext(CartContex);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const { data: product, error } = useData(`/products/${id}`);
  return (
    <section className='align_center single_product'>
      {error && <em className='form_error'>{error}</em>}
      {product && (
        <>
          <div className='align_center'>
            <div className='single_product_thumbnails'>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className='single_product_display'
            />
          </div>

          <div className='single_product_details'>
            <h1 className='single_product_title'>{product.title}</h1>
            <p className='single_product_description'>{product.description}</p>
            <p className='single_product_price'>${product.price.toFixed(2)}</p>

            {user && (
              <>
                <h2 className='quantity_title'>Quantity:</h2>
                <QuantityInput
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={product.stock}
                />
                <button
                  className='search_button add_cart'
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
