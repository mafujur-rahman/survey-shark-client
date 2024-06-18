import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { AuthContext } from "../../../../Context/AuthProvider";

const ManageSurveys = () => {
    const AxiosSecure = UseAxiosSecure();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [feedback, setFeedback] = useState("");
    const {user} = useContext(AuthContext)

    const fetchSurveys = async () => {
        const response = await AxiosSecure.get("/surveys");
        return response.data;
    };

    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchSurveys
    });

    const handleManageSurveys = async () => {
        if (selectedSurvey.status === 'publish' && !feedback) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Feedback is required when unpublishing a survey',
            });
            return;
        }

        try {
            if (selectedSurvey.status === 'publish') {
                // Post feedback
                const newFeedback = {
                    surveyId: selectedSurvey._id,
                    feedback,
                    title: selectedSurvey.title,
                    adminName: user.displayName,
                };
                await AxiosSecure.post('/surveyFeedbacks', newFeedback);
            }

            // Update survey status
            const response = await AxiosSecure.patch(`/surveys/admin/${selectedSurvey._id}`);
            if (response.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `Survey status has been updated to ${selectedSurvey.status === 'publish' ? 'unpublish' : 'publish'}`,
                });
                closeModal();
            }
        } catch (error) {
            console.error("Error updating survey status:", error);
        }
    };

    const openModal = (survey) => {
        setSelectedSurvey(survey);
        if (survey.status === 'publish') {
            setModalIsOpen(true);
        } else {
            handleManageSurveys();
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedSurvey(null);
        setFeedback("");
    };

    return (
        <div className="min-h-screen bg-gray-100 border border-[#074B5C] rounded-lg p-10">
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
                                            onClick={() => openModal(survey)}
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

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Feedback Modal"
                ariaHideApp={false}
                className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Feedback</h2>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Please provide your feedback"
                        required
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            className="btn bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={handleManageSurveys}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageSurveys;
