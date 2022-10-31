import React from "react";
import store from "./redux/redux-store";

export const StoreContext = React.createContext(store)

// const Provider = () => {
//     return <StoreContext
//
// }

export default StoreContext