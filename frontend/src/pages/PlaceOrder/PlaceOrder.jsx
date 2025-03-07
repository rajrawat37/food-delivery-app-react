import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    console.log("🍎🍎🍎", food_list);

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        console.log("🥝🥝🥝", cartItems[item._id]);
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    console.log(orderItems);
    console.log("Form is submitted");

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      if (token) {
        console.error("🍰🍰🍰", token);
      }

      console.log("🍓", orderData);

      let response = await axios.post(`${url}api/order/place`, orderData, {
        headers: { token },
      });

      console.log("🍓🍓🍓:Response:🍓🍓🍓", `${url}api/order/place`);
      console.log("🍓🍓🍓:Response:🍓🍓🍓", response.data);

      if (response.data.success) {
        console.log("🍓🍓🍓:Response:🍓🍓🍓", response.data);
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error processing your order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">DELIVERY INFORMATION</p>

        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
            value={data.firstName}
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email Address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />

        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="multi-fields">
          <input
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>

      <div className="place-order-right">
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
