import { useContext } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const Comments = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);

    const fetchSurveys = async () => {
        const response = await axiosSecure.get("/comments");
        return response.data;
    };

    const { data: comments = [] } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchSurveys
    });

    const userComments = comments.filter((comment) => comment.email === user.email);
    return (
        <div>
            <h3 className="text-2xl font-bold my-10 text-center">Commented surveys</h3>
            <div className="bg-gray-100 border min-h-screen border-[#074B5C] rounded-lg p-5 flex justify-center">
                <div className="w-fit mt-8">
                    <h4 className="text-xl font-bold text-center mb-8">My Comments:</h4>
                    <table className="table-auto w-full mt-14 bg-white border-collapse border border-gray-300">
                        <thead className="bg-[#074B5C] border border-[#074B5C] text-white">
                            <tr>
                                <th className="p-4  text-left">Serial No</th>
                                <th className="p-4  text-left">Survey Name</th>
                                <th className="p-4  text-left">Your Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userComments.length > 0 ? (
                                userComments.map((survey, index) => (
                                    <tr key={survey._id} className="border-b last:border-0 hover:bg-gray-100">
                                        <td className="p-4 ">{index + 1}</td>
                                        <td className="p-4 ">{survey.SurveyName}</td>
                                        <td className="p-4 ">{survey.comment}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="p-4 text-center">No Comments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Comments;