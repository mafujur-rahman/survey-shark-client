import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentPage = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white">Upgrade to Pro</h1>
            <p className="mt-2 text-lg text-white">
              Get exclusive features and priority support with Pro Membership.
            </p>
          </div>
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    );
  };
  
  export default PaymentPage;