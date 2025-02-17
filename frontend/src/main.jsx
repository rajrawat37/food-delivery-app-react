import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);

// The render() method is responsible for rendering the  JSX (React component tree) into the DOM.

/*

1) The root DOM element (identified by id="root") is targeted.
2) React is initialized with ReactDOM.createRoot().
3) JSX, representing the UI, is rendered inside that root element using render().

Root DOM node is where your React app is mounted 
JSX - describes the UI

Summary of the above Process:

1) JSX → Virtual DOM: The JSX inside your App component is first converted to React elements, which are then placed in the Virtual DOM.
2) Diffing (Reconciliation): React compares the current VDOM with the previous version and calculates what changed.
3) Update the Real DOM: Only the differences between the VDOM and the real DOM are updated in the actual DOM, ensuring efficient rendering.

*/
