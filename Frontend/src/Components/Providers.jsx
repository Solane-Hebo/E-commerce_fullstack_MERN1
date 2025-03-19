import { Provider } from "react-redux";
import { store } from "../Store"; 
import CartContextProvider from "./CartContext";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>  {/*Wrap Redux store */}
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </Provider>
  );
};

export default Providers;
