import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
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

  const { title, description, totalVotes, category, deadline, creationTime } = currentSurvey;

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
    <div className="bg-[#F2E6F7] p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Survey Details</h2>
      <div className="bg-white rounded-lg p-6 mx-auto max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
        <hr className="border-b border-gray-300 mb-4" />
        <p className="text-gray-800 mb-4 text-center">{description}</p>
        <div className="flex flex-col md:flex-row justify-around mb-4">
          <p className="text-gray-700 mb-4 md:mb-0 text-center"><span className="font-semibold">Category:</span> {category}</p>
          <p className="text-gray-700 text-center md:text-right"><span className="font-semibold">Total Votes:</span> {totalVotes}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-around mb-4 md:mb-8">
          <p className="text-gray-700 mb-4 md:mb-0 text-center"><span className="font-semibold">Creation Time:</span> {creationTime}</p>
          <p className="text-gray-700 text-center md:text-right"><span className="font-semibold">Deadline:</span> {deadline}</p>
        </div>
        <div className="flex justify-center">
          <button onClick={openModal} className="btn text-white border-none px-10 bg-[#074B5C]">Vote</button>
        </div>
      </div>
      <div className="mx-auto container">
        <h3 className="text-2xl font-bold my-8 ">Comments:</h3>
        <div className="flex items-center mb-4">
          <div className="w-16 rounded-full overflow-hidden">
            <img src={user?.photoURL} alt="User" />
          </div>
          <input className="p-5 flex-1 ml-4" type="text" placeholder="Add a comment" />
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
        {/* Add your form inside the modal */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-6 bg-white w-full p-5 rounded-lg mt-8">
            <h3 className="text-lg font-bold  mb-2">Work Environment:</h3>
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
          <div className="mb-6  bg-white w-full p-5 rounded-lg">
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

      </Modal>
    </div>
  );
};

export default SurveyDetails;