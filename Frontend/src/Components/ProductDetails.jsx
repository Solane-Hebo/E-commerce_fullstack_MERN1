import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from './CartContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://js2-ecommerce-api.vercel.app/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleClick = () => {
    addToCart(product);
  };

  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold"><p>{error}</p></div>;
  }
  if (loading) {
    return <p className='text-center mt-5 fw-bold text-primary'>Loading...</p>;
  }
  if (!product) {
    return <p className='text-center mt-5 text-warning fw-bold'>Product not found.</p>;
  }

  return (
    <div className='container mt-5'>
      <header className="mb-4">
        <img className='img-fluid w-100 rounded shadow-lg' src="./public/assets/1920*300.svg" alt='' /> 
      </header>

      <div className='row g-4'>
        <div className='col-md-6'>
          <div className='w-100 bg-light p-3 rounded shadow-sm'>
            <img
              src={product?.images?.[0] }
              alt={product?.name || 'Product Image'}
              className='img-fluid rounded shadow-sm'
            />
          </div>
        </div>

        <div className='col-md-6'>
          <h1 className='h2 mt-3 text-primary fw-bold'>{product?.name || "No Name Available"}</h1>
          <p className='mt-3 text-secondary'>{product?.description || "No description available."}</p>
          
          <div className='d-flex justify-content-between align-items-center mt-4'>
            <p className='fw-bold text-success'>Price: {product?.price ? `${product.price.toLocaleString()} SEK` : "Price Not Available"}</p>
            <p className='text-muted'><strong>Category:</strong> {product?.category || "N/A"}</p>
          </div>

          <button
            onClick={handleClick}
            disabled={!product}
            className='btn btn-primary d-flex align-items-center gap-2 mt-3 px-4 py-2 shadow-sm'
          >
            Add to Cart <FaCartArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
