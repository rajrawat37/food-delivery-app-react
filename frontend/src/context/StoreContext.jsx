import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";

// creating a context
export const StoreContext = createContext(null);

//create a provider
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const url = "http://backend-url-from-env /";

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "api/food/list");
    setFood_list(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
    console.log("Response is : ", response);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));

        //Load cart data from DB whenever page loads
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) totalItems += cartItems[item];

    return totalItems;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    token,
    setToken,
    url,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children} // Represents the child components wrapped by
      StoreContextProvider.
    </StoreContext.Provider>
  );
};

/** 
export and wrap the App component with the provider and it can be consumed anywhere in the child component
using useContext() .
**/

export default StoreContextProvider;
