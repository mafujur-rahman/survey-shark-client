import { useState, useContext } from "react";
import {  useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "react-modal"; 

const fetchSurveys = async () => {
    try {
        const response = await axios.get('http://localhost:5000/surveys');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch surveys");
    }
};

const SurveyDetails = () => {
    const { id } = useParams();
    const { data: surveys, isLoading, isError } = useQuery({ queryKey: ['SurveyDetails'], queryFn: fetchSurveys });
    const currentSurvey = surveys?.find(item => item._id === id);
    const { user } = useContext(AuthContext);

    const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError || !currentSurvey) {
        return <p className="text-center text-red-600">Error fetching survey details</p>;
    }

    const { title, description, totalVotes } = currentSurvey;

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted');
        closeModal(); // Close modal after submission
    };

    return (
        <div className="container mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-8">Survey Details</h2>
            <div className="border border-gray-300 rounded-lg p-6 max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <p className="text-gray-800 mb-4">{description}</p>
                <p className="text-gray-700 mb-4">Total Votes: {totalVotes}</p>
                <button onClick={openModal} className="btn text-white border-none bg-[#074B5C]">Vote</button>
            </div>
            <div>
                <h3 className="text-2xl font-bold my-8">Comments:</h3>
                <div>
                    <div className="avatar online mr-5">
                        <div className="w-16 rounded-full">
                            <img src={user?.photoURL} alt="User" />
                        </div>
                    </div>
                    <input className="p-5" type="text" placeholder="Add a comment" />
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Vote Modal"
            >
                <h2>Vote Modal</h2>
                {/* Add your form inside the modal */}
                <form onSubmit={handleSubmit}>
          <div>
            <h3>Job Satisfaction:</h3>
            <label>
              <input
                type="radio"
                value="Yes"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
              />
              No
            </label>
          </div>
          <div>
            <h3>Work Environment:</h3>
            <label>
              <input
                type="radio"
                value="Yes"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
              />
              No
            </label>
          </div>
          <div>
            <h3>Management Support:</h3>
            <label>
              <input
                type="radio"
                value="Yes"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
              />
              No
            </label>
          </div>
          <div>
            <h3>Professional Development:</h3>
            <label>
              <input
                type="radio"
                value="Yes"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
              />
              No
            </label>
          </div>
          <button className="btn " type="submit">Submit</button>
        </form>
            </Modal>
        </div>
    );
};

export default SurveyDetails;
