import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

const ViewSurveys = () => {
    const AxiosSecure = UseAxiosSecure();

    const fetchSurveys = async () => {
        const response = await AxiosSecure.get("/responses");
        return response.data;
    };

    const { data: surveys = [], isLoading, isError } = useQuery({
        queryKey: ['responses'],
        queryFn: fetchSurveys
    });

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-600">Error fetching surveys</p>;
    }

    const calculatePercentages = (responses) => {
        const totalResponses = Object.keys(responses).length;
        const yesCount = Object.values(responses).filter(answer => answer === "Yes").length;
        const noCount = Object.values(responses).filter(answer => answer === "No").length;

        return {
            yesPercentage: ((yesCount / totalResponses) * 100).toFixed(2),
            noPercentage: ((noCount / totalResponses) * 100).toFixed(2),
        };
    };

    return (
        <div className="min-h-screen bg-gray-100 border border-[#074B5C] rounded-lg p-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">View Survey Responses</h2>
            <div className="container mx-auto w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead className="bg-[#074B5C] text-white">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Yes %</th>
                                <th className="p-4 text-left">No %</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map((survey) => {
                                const { yesPercentage, noPercentage } = calculatePercentages(survey.formResponses);
                                return (
                                    <tr key={survey._id} className="border-b last:border-0 hover:bg-gray-100">
                                        <td className="p-4">{survey.title}</td>
                                        <td className="p-4">{yesPercentage}%</td>
                                        <td className="p-4">{noPercentage}%</td>
                                        <td className="p-4">
                                            <Link to={`/dashboard/surveyor/surveys/${survey._id}`}>
                                                <button className="btn bg-[#074B5C] text-white px-4 py-2 rounded-lg hover:bg-[#063a4b]">
                                                    Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewSurveys;
