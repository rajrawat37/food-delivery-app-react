import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);    // creating a context store to manage state globally

const StoreContextProvider = (props) => {

    const contextValue = {
        food_list
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider