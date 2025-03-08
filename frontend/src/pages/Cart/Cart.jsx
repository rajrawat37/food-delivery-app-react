import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const cartIsEmpty = Object.values(cartItems).every((value) => value === 0);

  const [removingItem, setRemovingItem] = useState(null); // Track the removing item

  const handleRemove = (itemId) => {
    setRemovingItem(itemId); // Trigger animation
    setTimeout(() => {
      removeFromCart(itemId); // Remove after animation
      setRemovingItem(null); // Reset
    }, 500); // Delay to match animation duration
  };

  return (
    <div className="cart">
      {!cartIsEmpty ? (
        <h2>Orders</h2>
      ) : (
        <h3 style={{ textAlign: "center" }}>No Orders to display</h3>
      )}
      <table className="cart-items">
        {!cartIsEmpty && (
          <thead>
            <tr>
              <th>Items</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
        )}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <tbody>
                <tr className={removingItem === item._id ? "fade-out" : ""}>
                  <td>
                    <img
                      className="cart-item-image"
                      src={
                        !item.isLocal
                          ? url + "images/" + item.image
                          : item.image
                      }
                      alt=""
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{cartItems[item._id]}</td>
                  <td>${item.price * cartItems[item._id]}</td>
                  <td onClick={() => handleRemove(item._id)} className="cross">
                    ❌
                  </td>
                </tr>
              </tbody>
            );
          }
        })}
      </table>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {getTotalCartAmount() > 0 ? <p>${2}</p> : <p>${0}</p>}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() + (getTotalCartAmount() > 0 ? 2 : 0)}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have Promo Code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
