import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';
import { useCart } from './CartContext';

const CartItem = ({ item }) => {
  const { addToCart, removeOne, removeItem } = useCart();

  if (!item || !item.product) {
    return (
      <div className="p-3 text-center alert alert-danger">
        <p>Product information is missing or incomplete.</p>
      </div>
    );
  }

  const productId = item.product._id || item.product.id;

  const addOneToCart = () => {
    addToCart(item.product);
  };

  const removeOneFromCart = () => {
    removeOne(productId);
  };

  const deleteItem = () => {
    removeItem(productId);
  };

  return (
    <div key={`cart_${productId}`} className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light rounded">
      <div className="d-flex align-items-center gap-3">
        <div className="rounded overflow-hidden" style={{ width: '60px', height: '60px' }}>
          <img
            src={item.product.images?.[0]}
            className="img-fluid rounded"
            alt={item.product.name || 'Product'}
          />
        </div>
        <div>
          <p className="fw-bold text-truncate mb-1" style={{ maxWidth: '20ch' }}>{item.product.name || "Unknown Product"}</p>
          <p className="text-muted small mb-0">
            {item.quantity} x {item.product.price?.toLocaleString() || "0.00"} SEK
          </p>
        </div>
      </div>

      <div className="d-flex gap-2 align-items-center">
        <div className="btn-group" role="group">
          <button onClick={removeOneFromCart} className="btn btn-outline-secondary btn-sm">
            <FaMinus size={10} />
          </button>
          <button onClick={addOneToCart} className="btn btn-outline-primary btn-sm">
            <FaPlus size={10} />
          </button>
        </div>
        <button onClick={deleteItem} className="btn btn-danger btn-sm" aria-label="Remove item from cart">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
