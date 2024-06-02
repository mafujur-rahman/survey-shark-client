

const Faq = () => {
    return (
        <div className="mx-auto container my-16">
            <h1 className="text-4xl font-extrabold">FAQs</h1>
            <p className="mt-8 mb-12 text-gray-700">Find answers to common questions about our websites and its features. </p>
            <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        How do I crate a survey?
                    </div>
                    <div className="collapse-content">
                        <p>To create a survey, navigate to your Surveyor Dashboard and click on the Create Survey button. Fill in the required details such as the survey title, description, options, category and deadline. </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How do I update a survey?
                    </div>
                    <div className="collapse-content">
                        <p>To update a survey, go to your Surveyor Dashboard and find the survey you want to update.Click on the Edit button and make the necessery changes to the survey details. </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How do I view survey responses?
                    </div>
                    <div className="collapse-content">
                        <p>To view survey responses, go to your Surveyor Dashboard and locate the survey you want to view responses for. Click the View Responses button to see the responses in a tabular format. </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How do I manage users and rolls?
                    </div>
                    <div className="collapse-content">
                        <p>As an Admin, you can manage users and their rolls from the Admin Dashboard.Use the filtering options to find the specifiq users and update their rolls as needed.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How do I update a pro-user?
                    </div>
                    <div className="collapse-content">
                        <p>To update to pro-user, go to the pricing page and follow the payment process.Once the payment is successful, your roll will automatically update to pro-user, unlocking premium features. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;