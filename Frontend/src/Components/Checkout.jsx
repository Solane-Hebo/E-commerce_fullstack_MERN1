import { useCart } from "./CartContext";
import ShoppingCart from "./ShoppingCart";
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding.");
      return;
    }
    alert("Thank you for your purchase! Your order has been placed.");
    clearCart();
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg text-center">
        <h2 className="mb-4">Checkout</h2>
        
        <ShoppingCart isCheckout />

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-danger px-2 py-1" onClick={clearCart}>Clear Cart</button>
          <button className="btn btn-success px-2 py-1 fw-bold shadow-sm" onClick={handlePurchase}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
