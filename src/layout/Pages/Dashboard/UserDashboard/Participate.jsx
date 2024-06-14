import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import Modal from "react-modal";

const Participate = () => {
    const axiosPublic = UseAxiosPublic();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [responses, setResponses] = useState({});

    const fetchSurveys = async () => {
        const response = await axiosPublic.get("/available-surveys");
        return response.data;
    };

    const { data: surveys = [] } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchSurveys
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSubmitted(false);
        setResponses({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let voteCounts = { yes: 0, no: 0 };
        formData.forEach((value) => {
            if (value === 'Yes') {
                voteCounts.yes++;
            } else if (value === 'No') {
                voteCounts.no++;
            }
        });
        setResponses(Object.fromEntries(formData.entries()));
        setSubmitted(true);
        openModal();
    };

    return (
        <div>
            <h3 className="text-2xl font-bold my-10 text-center">Participate in Surveys</h3>
            <div className="bg-gray-100 border border-[#074B5C] p-5 flex justify-center">
                <div className="w-fit">
                    <h4 className="text-xl font-bold text-center mb-4">Available Surveys:</h4>
                    <table className="table-auto w-full bg-white border-collapse border border-gray-300">
                        <thead className="bg-[#074B5C] border border-[#074B5C] text-white">
                            <tr>
                                <th className="p-4 text-left">Serial No</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map((survey, index) => (
                                <tr key={survey._id} className="border-b last:border-0 hover:bg-gray-100">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{survey.title}</td>
                                    <td className="p-4">
                                        <button
                                            className="btn bg-[#074B5C] text-white px-4 py-2 rounded-lg hover:bg-[#063a4b]"
                                            onClick={openModal}
                                        >
                                            Participate
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
                style={{
                    content: {
                        maxWidth: "90%",
                        width: "auto",
                        border: "1px solid gray",
                        marginTop: "16px",
                        margin: "auto",
                        padding: "0",
                        backgroundColor: "#F2E6F7"
                    }
                }}
            >
                {submitted ? (
                    <div className="grid min-h-screen justify-center items-center">
                        <div className="border border-gray-300 bg-white p-10 rounded-lg">
                            <h3 className="text-xl font-bold mb-6">Survey Results:</h3>
                            {Object.entries(responses).map(([question, response]) => (
                                <div className="mb-4" key={question}>
                                    <p><strong>{question}:</strong> {response}</p>
                                </div>
                            ))}
                            <button onClick={closeModal} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold mb-4 py-2 px-4 rounded">Close</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="mb-6 bg-white w-full p-5 rounded-lg mt-8">
                            <h3 className="text-lg font-bold mb-2">Work Environment:</h3>
                            <label className="block mb-2">
                                <h1 className="text-lg font-medium mb-1">Do you find the overall work environment positive?</h1>
                                <input type="radio" value="Yes" className="mr-2" name="work_environment" />
                                Yes
                            </label>
                            <label className="block">
                                <input type="radio" value="No" className="mr-2" name="work_environment" />
                                No
                            </label>
                        </div>
                        <div className="mb-6 bg-white w-full p-5 rounded-lg">
                            <h3 className="text-lg font-bold mb-2">Management Support:</h3>
                            <label className="block mb-2">
                                <h1 className="text-lg font-medium mb-1">Do you feel supported by immediate supervisor/manager?</h1>
                                <input type="radio" value="Yes" className="mr-2" name="management_support" />
                                Yes
                            </label>
                            <label className="block">
                                <input type="radio" value="No" className="mr-2" name="management_support" />
                                No
                            </label>
                        </div>
                        <div className="mb-6 bg-white w-full p-5 rounded-lg">
                            <h3 className="text-lg font-bold mb-2">Professional Development:</h3>
                            <label className="block mb-2">
                                <h1 className="text-lg font-medium mb-1">Are there sufficient opportunities for professional growth and development?</h1>
                                <input type="radio" value="Yes" className="mr-2" name="professional_development" />
                                Yes
                            </label>
                            <label className="block">
                                <input type="radio" value="No" className="mr-2" name="professional_development" />
                                No
                            </label>
                        </div>
                        <div className="mb-6 bg-white w-full p-5 rounded-lg">
                            <h3 className="text-lg font-bold mb-2">Job Satisfaction:</h3>
                            <label className="block mb-2">
                                <h1 className="text-lg font-medium mb-1">Are you satisfied with your current role?</h1>
                                <input type="radio" value="Yes" className="mr-2" name="job_satisfaction" />
                                Yes
                            </label>
                            <label className="block">
                                <input type="radio" value="No" className="mr-2" name="job_satisfaction" />
                                No
                            </label>
                        </div>
                        <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold mb-10 py-2 px-4 rounded" type="submit">Submit</button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default Participate;
