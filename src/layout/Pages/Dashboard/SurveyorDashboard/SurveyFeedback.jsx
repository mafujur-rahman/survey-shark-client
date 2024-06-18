import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

const SurveyFeedback = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: feedbackData = [], isLoading, isError } = useQuery({
        queryKey:["surveyFeedbacks"],
        queryFn: async () => {
            const response = await axiosSecure.get('/surveyFeedbacks');
            return response.data;
        }
    });

    if (isLoading) {
        return <p className="text-center my-8">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center my-8">Error fetching feedback data</p>;
    }

    // Ensure feedbackData is an array before using map
    if (!Array.isArray(feedbackData)) {
        return <p className="text-center my-8">Feedback data is not an array.</p>;
    }

    return (
        <div className="mt-8 min-h-screen overflow-x-auto bg-gray-100 border border-[#074B5C] rounded-lg p-10">
            <h3 className="text-2xl font-bold mb-10 text-center">Admin Feedback on Unpublished Survey:</h3>
            {feedbackData.length > 0 ? (
                <table className="table-auto w-full border-collapse bg-white">
                    <thead className="bg-[#074B5C] text-white">
                        <tr>
                            <th className="p-4 text-center">Serial No</th>
                            <th className="p-4 text-center">Survey Name</th>
                            <th className="p-4 text-center">Admin Name</th>
                            <th className="p-4 text-center">Feedback</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {feedbackData.map((feedback, index) => (
                            <tr key={feedback._id} className=" border-b last:border-0 hover:bg-gray-100">
                                <td className="p-4 text-center">{index + 1}</td>
                                <td className="p-4 text-center">{feedback.title}</td>
                                <td className="p-4 text-center">{feedback.adminName}</td>
                                <td className="p-4 text-center">{feedback.feedback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center my-8">No feedback available for this survey.</p>
            )}
        </div>
    );
};

export default SurveyFeedback;

