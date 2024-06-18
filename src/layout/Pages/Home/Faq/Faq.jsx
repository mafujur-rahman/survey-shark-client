const Faq = () => {
    return (
        <div className="mx-auto container my-16 px-4 sm:px-6 lg:px-8 max-w-screen-lg">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">Frequently Asked Questions</h1>
            <p className="mt-8 mb-12 text-gray-600 text-center leading-relaxed">
                Find answers to common questions about our website and its features.
            </p>
            <div className="w-full space-y-4">
                <div className="collapse collapse-arrow border border-gray-300 rounded-lg shadow-sm">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title text-lg sm:text-xl font-medium text-gray-800">
                        How do I create a survey?
                    </div>
                    <div className="collapse-content p-4 text-gray-700">
                        <p>
                            To create a survey, navigate to your Surveyor Dashboard and click on the Create Survey button. Fill in the required details such as the survey title, description, options, category, and deadline.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow border border-gray-300 rounded-lg shadow-sm">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-lg sm:text-xl font-medium text-gray-800">
                        How do I update a survey?
                    </div>
                    <div className="collapse-content p-4 text-gray-700">
                        <p>
                            To update a survey, go to your Surveyor Dashboard and find the survey you want to update. Click on the Edit button and make the necessary changes to the survey details.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow border border-gray-300 rounded-lg shadow-sm">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-lg sm:text-xl font-medium text-gray-800">
                        How do I view survey responses?
                    </div>
                    <div className="collapse-content p-4 text-gray-700">
                        <p>
                            To view survey responses, go to your Surveyor Dashboard and locate the survey you want to view responses for. Click the View Responses button to see the responses in a tabular format.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow border border-gray-300 rounded-lg shadow-sm">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-lg sm:text-xl font-medium text-gray-800">
                        How do I manage users and roles?
                    </div>
                    <div className="collapse-content p-4 text-gray-700">
                        <p>
                            As an Admin, you can manage users and their roles from the Admin Dashboard. Use the filtering options to find specific users and update their roles as needed.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow border border-gray-300 rounded-lg shadow-sm">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-lg sm:text-xl font-medium text-gray-800">
                        How do I upgrade to pro-user?
                    </div>
                    <div className="collapse-content p-4 text-gray-700">
                        <p>
                            To upgrade to pro-user, go to the pricing page and follow the payment process. Once the payment is successful, your role will automatically update to pro-user, unlocking premium features.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
