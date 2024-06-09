import { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../../../../Context/AuthProvider';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios.post('http://localhost:5000/create-payment-intent', {
      amount: 999,
    })
    .then(res => {
      setClientSecret(res.data.clientSecret);
    })
    .catch(error => {
      setError(error.message);
    });
  }, []);

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
    else{
      console.log('payment method', paymentMethod)
    }

    // Confirm the payment with the clientSecret
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
      return;
    }

    // Handle successful payment here
    console.log('Payment successful', paymentIntent);
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
