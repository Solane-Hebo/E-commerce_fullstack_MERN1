import { Link } from "react-router-dom";
import "./Styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="card shadow-sm border-0">
      <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
        <div className="position-relative">
          <img
            src={product.images?.[0] || 'placeholder.jpg'}
            className="card-img-top img-fluid rounded-top"
            alt={product.name || "Product Image"}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title mb-2 fw-bold">{product.name || "No Name Available"}</h5>
          <p className="card-text text-muted mb-2">
            {product.price ? `${product.price} :- SEK` : "Price Unavailable"}
          </p>
          <button className="btn btn-primary w-100">View Product</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
