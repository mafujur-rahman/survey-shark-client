import React, { useState } from "react";
import Modal from "react-modal";

const SurveyModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jobSatisfaction, setJobSatisfaction] = useState(null);
  const [workEnvironment, setWorkEnvironment] = useState(null);
  const [managementSupport, setManagementSupport] = useState(null);
  const [professionalDevelopment, setProfessionalDevelopment] = useState(null);

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Job Satisfaction:', jobSatisfaction);
    console.log('Work Environment:', workEnvironment);
    console.log('Management Support:', managementSupport);
    console.log('Professional Development:', professionalDevelopment);
    setModalIsOpen(false); // Close the modal after submission
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Survey Modal"
      >
        <h2>Employee Survey</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Job Satisfaction:</h3>
            <label>
              <input
                type="radio"
                value="Yes"
                checked={jobSatisfaction === 'Yes'}
                onChange={(event) => handleInputChange(event, setJobSatisfaction)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={jobSatisfaction === 'No'}
                onChange={(event) => handleInputChange(event, setJobSatisfaction)}
              />
              No
            </label>
          </div>
          {/* Other survey questions */}
          <button type="submit">Submit</button>
          <button onClick={handleCloseModal}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default SurveyModal;
