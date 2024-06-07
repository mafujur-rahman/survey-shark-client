import { Link } from 'react-router-dom';

const PricingPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">Pro Membership</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Unlock exclusive features and benefits with our Pro Membership.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Why Go Pro?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM10 15l-3.5-3.5 1.42-1.42L10 12.17l5.59-5.59L17 8l-7 7z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Premium Content</h3>
                                    <p className="text-gray-500">Access exclusive articles, videos, and tutorials.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM10 15l-3.5-3.5 1.42-1.42L10 12.17l5.59-5.59L17 8l-7 7z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Ad-Free Experience</h3>
                                    <p className="text-gray-500">Enjoy an uninterrupted, ad-free browsing experience.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM10 15l-3.5-3.5 1.42-1.42L10 12.17l5.59-5.59L17 8l-7 7z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Priority Support</h3>
                                    <p className="text-gray-500">Get quick responses from our dedicated support team.</p>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8">
                            <Link
                                to="/payment"
                                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Upgrade to Pro - $9.99/month
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Already a Pro member? <Link to="/log-in" className="text-blue-600 hover:underline">Log in</Link> to access your account.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
