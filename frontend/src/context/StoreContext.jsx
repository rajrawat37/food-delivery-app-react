import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets, foodList } from "../assets/assets";

// creating a context
export const StoreContext = createContext(null);

//create a provider
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const url = process.env.BACKEND_URL;

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
    //await ensures that the function waits for the API response before moving forward.
    const response = await axios.get(url + "api/food/list");

    //food_list is an array of obejcts and for each object(item), adding "isLocal:true" property to identify the image later in child component
    const food_stored = foodList.map((item) => ({ ...item, isLocal: true }));

    setFood_list([...response.data.data, ...food_stored]);
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
    // useEffect cannot directly handle async functions, so an inner async function (loadData) is used.
    async function loadData() {
      await fetchFoodList();

      // If a token is stored in localStorage then setToken
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        await loadCartData(token);
      }
    }
    loadData();
  }, [token]);

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
      {props.children}
    </StoreContext.Provider>
  );
};

/** 
export and wrap the App component with the provider and it can be consumed anywhere in the child component
using useContext() .
**/

export default StoreContextProvider;
