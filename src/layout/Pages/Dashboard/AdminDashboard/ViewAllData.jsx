import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";


const ViewAllData = () => {
    const axiosSecure = UseAxiosSecure();

    // Fetch all payments
    const { data: payments = [], isLoading: paymentLoading, isError: paymentError } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const response = await axiosSecure.get('/payments');
            return response.data;
        }
    });

    // Fetch all survey responses
    const { data: surveyResponses = [], isLoading: surveyLoading, isError: surveyError } = useQuery({
        queryKey: ["surveyResponses"],
        queryFn: async () => {
            const response = await axiosSecure.get('/responses');
            return response.data;
        }
    });

    if (paymentLoading || surveyLoading) {
        return <p className="text-center my-8">Loading...</p>;
    }

    if (paymentError || surveyError) {
        return <p className="text-center my-8">Error fetching data</p>;
    }

    return (
        <div className="my-8 overflow-x-auto">
            <h3 className="text-2xl font-bold mb-10 text-center">View All Payments and Survey Responses:</h3>

            {/* Payments Table */}
            <div>
                <h4 className="text-xl font-bold mb-4">Payments History:</h4>
                {payments.length > 0 ? (
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
                        <thead className="bg-[#074B5C] text-white">
                            <tr>
                                <th className="p-4 text-left">Serial No</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Transaction ID</th>
                                <th className="p-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td className="p-4 text-left">{index + 1}</td>
                                    <td className="p-4 text-left">{payment.name}</td>
                                    <td className="p-4 text-left">{payment.email}</td>
                                    <td className="p-4 text-left">{payment.transactionId}</td>
                                    <td className="p-4 text-left">{payment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center my-4">No payments available.</p>
                )}
            </div>

            {/* Survey Responses Table */}
            <div>
                <h4 className="text-xl font-bold mb-4">Survey Responses:</h4>
                {surveyResponses.length > 0 ? (
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#074B5C] text-white">
                                 <tr>
                                    <th className="p-4 text-left">Serial No</th>
                                    <th className="p-4 text-left">User Email</th>
                                    <th className="p-4 text-left">User Name</th>
                                    <th className="p-4 text-left">Vote</th>
                                </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {surveyResponses.map((response, index) => (
                                <tr key={index} className="border-b last:border-0 hover:bg-gray-100">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{response.email}</td>
                                <td className="p-4">{response.name}</td>
                                <td className="p-4">Yes : {response.voteCounts.yes} No : {response.voteCounts.no}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center my-4">No survey responses available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAllData;
