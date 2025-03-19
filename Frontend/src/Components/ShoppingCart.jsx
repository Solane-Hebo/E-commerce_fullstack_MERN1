import { useCart } from "./CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const ShoppingCart = ({ setIsOpen, isCheckout }) => {
  const { cart, addToCart, removeOne, removeItem, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="container text-dark">
      <div>
        {cart.length === 0 ? (
          <div className="p-3 text-center alert alert-info">
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem key={`cart_${item.product._id || item.product.id}`} item={item} />
          ))
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center p-3 border-top mt-4">
        <div>
          <p className="fs-5 fw-semibold mb-1">Total: {totalPrice.toLocaleString()} SEK</p>
          <p className="text-muted small">(incl. tax)</p>
        </div>

        {isCheckout ? (
          <button
            onClick={() => {
              clearCart();
              alert("Order Placed Successfully!");
            }}
            className="btn btn-success px-4 py-2"
          >
            Place Order
          </button>
        ) : (
          <Link
            onClick={() => setIsOpen && setIsOpen(false)}
            to="/checkout"
            className="btn btn-dark px-4 py-2"
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
