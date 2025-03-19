import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import '../Components/Styles/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userToken = useSelector((state) => state.user.token);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (userToken) {
      fetchOrders();
    }
  }, [userToken]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching order history: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data.orders || data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            { productId: "64df2b3f3fc5a10b7c4b8c5f", quantity: 1 },
            { productId: "64df2b3f3fc5a10b7c4b8c60", quantity: 2 }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error creating order: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Order created:", data);
      alert("Order created!");
      fetchOrders();
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Order History</h1>

      <button className="btn btn-success mb-3" onClick={createOrder}>
        Create a Test Order
      </button>

      <button className="btn btn-outline-secondary mb-3" onClick={fetchOrders}>
        Refresh Order History
      </button>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Number: {order.id}</h5>
                  <p className="card-text">Total Products: <strong>{order.totalQuantity}</strong></p>
                  <p className="card-text">Total Price: <strong>{order.totalPrice} kr</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">You have no previous orders.</p>
      )}

      <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  );
};

export default OrderHistory;
