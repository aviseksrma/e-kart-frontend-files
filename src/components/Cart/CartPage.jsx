import { useContext, useEffect, useState } from "react";

import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import UserContex from "../../contexts/UserContex";
import CartContex from "../../contexts/CartContex";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContex);
  const [sutTotal, setSutTotal] = useState(0);
  const user = useContext(UserContex);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    setSutTotal(total);
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order places successfully!");
        window.location = "/myorders";
      })
      .catch(() => {
        toast.error("Order not placed!");
        setCart(oldCart);
      });
  };

  return (
    <section className='align_center cart_page'>
      <div className='align_center user_info'>
        <img
          src={`http://localhost:5001/profile/${user?.profilePic}`}
          alt='user profile'
        />
        <div>
          <p className='user_name'>{user?.name}</p>
          <p className='user_email'>{user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className='align_center table_quantity_input'>
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt='remove'
                  className='cart_remove_icon'
                  onClick={() => {
                    removeFromCart(product._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className='cart_bill'>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${sutTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${sutTotal + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className='search_button checkout_button' onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
