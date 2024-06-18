import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const ReportedSurvey = () => {
    const axiosPublic = UseAxiosPublic();
    const { user } = useContext(AuthContext);

    const fetchSurveys = async () => {
        const response = await axiosPublic.get("/reports");
        return response.data;
    };

    const { data: reports = [] } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchSurveys
    });

    const userReports = reports.filter((report) => report.email === user.email);

    return (
        <div>
            <h3 className="text-2xl font-bold my-10 text-center">Reported surveys</h3>
            <div className="bg-gray-100 border min-h-screen border-[#074B5C] rounded-lg p-5 flex justify-center">
                <div className="w-fit mt-8">
                    <h4 className="text-xl font-bold text-center mb-8">My Reports:</h4>
                    <table className="table-auto w-full mt-14 bg-white border-collapse border border-gray-300">
                        <thead className="bg-[#074B5C] border border-[#074B5C] text-white">
                            <tr>
                                <th className="p-4  text-left">Serial No</th>
                                <th className="p-4  text-left">Survey Name</th>
                                <th className="p-4  text-left">Your Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userReports.length > 0 ? (
                                userReports.map((survey, index) => (
                                    <tr key={survey._id} className="border-b last:border-0 hover:bg-gray-100">
                                        <td className="p-4 ">{index + 1}</td>
                                        <td className="p-4 ">{survey.surveyName}</td>
                                        <td className="p-4 ">{survey.reportReason}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="p-4 text-center">No reports found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportedSurvey;
