import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const AxiosSecure = UseAxiosSecure();

    useEffect(() => {
        // Fetch surveys when component mounts
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            const response = await AxiosSecure.get("/surveys");
            setSurveys(response.data);
        } catch (error) {
            console.error("Error fetching surveys:", error);
        }
    };

    const handleManageSurveys = async (survey) => {
        try {
            const response = await AxiosSecure.patch(`/surveys/admin/${survey._id}`);
            if (response.data.modifiedCount > 0) {
                fetchSurveys(); 
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `Survey status has been updated to ${survey.status === 'publish' ? 'unpublish' : 'publish'}`,
                });
            }
        } catch (error) {
            console.error("Error updating survey status:", error);
        }
    };

    return (
        <div className="min-h-screen  py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800">Manage Surveys</h2>
            <div className="container mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-[#074B5C] text-white">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map((survey) => (
                                <tr key={survey._id} className="hover:bg-gray-100">
                                    <td className="p-4">{survey.title}</td>
                                    <td className="p-4">{survey.status}</td>
                                    <td className="p-4">
                                        <button
                                            className={`px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
                                                survey.status === 'publish' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                            }`}
                                            onClick={() => handleManageSurveys(survey)}
                                        >
                                            {survey.status === 'publish' ? 'UnPublish' : 'Publish'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSurveys;
