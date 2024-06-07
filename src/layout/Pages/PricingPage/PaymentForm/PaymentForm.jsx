import  { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthProvider';

const stripePromise = loadStripe('your-publishable-key-here');

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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
            <CardElement className="p-4 border rounded-md mb-4" />
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <button
                type="submit"
                className={`btn bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 ${loading ? 'opacity-50' : ''}`}
                disabled={!stripe || loading}
            >
                {loading ? 'Processing...' : 'Pay $9.99'}
            </button>
        </form>
    );
};

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default PaymentPage;
