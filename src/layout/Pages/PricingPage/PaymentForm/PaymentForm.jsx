import  { useContext, useState } from 'react';
import {  CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../../../../Context/AuthProvider';



const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const { id } = paymentMethod;
      const response = await axios.post('http://localhost:5000/api/pay', {
        amount: 999, // Amount in cents
        id,
      });

      if (response.data.success) {
        // Update user role to pro-user
        const updatedUser = { ...user, role: 'pro-user' };
        setUser(updatedUser);

        // Save updated user info to backend
        await axios.put(`http://localhost:5000/api/users/${user.id}`, updatedUser);

        alert('Payment Successful! You are now a Pro user.');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Payment</h2>
      <CardElement className="p-4 border rounded-md mb-6 shadow-inner" />
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <button
        type="submit"
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Pay $9.99'}
      </button>
    </form>
  );
};

export default PaymentForm;
