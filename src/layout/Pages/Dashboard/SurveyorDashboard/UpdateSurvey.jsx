import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const UpdateSurvey = () => {
    const AxiosSecure = UseAxiosSecure();

    const fetchSurveys = async () => {
        const response = await AxiosSecure.get("/surveys");
        return response.data;
    };

    const { data: surveys = [] } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchSurveys
    });

    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Update Surveys</h2>
            <div className="container mx-auto w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead className="bg-[#074B5C] text-white">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map((survey) => (
                                <tr key={survey._id} className="border-b last:border-0 hover:bg-gray-100">
                                    <td className="p-4">{survey.title}</td>
                                    <td className="p-4">
                                        <Link to={`/dashboard/surveyor/update/${survey._id}`}>
                                            <button className="btn bg-[#074B5C] text-white px-4 py-2 rounded-lg hover:bg-[#063a4b]">
                                                Update
                                            </button>
                                        </Link>
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

export default UpdateSurvey;
