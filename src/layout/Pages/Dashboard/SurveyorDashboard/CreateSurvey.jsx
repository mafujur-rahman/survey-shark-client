import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const CreateSurvey = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const totalVotes = 0;
    const newSurvey = { ...data, totalVotes };

    axios.post("https://survey-shark-server.vercel.app/surveys", newSurvey)
      .then(response => {
        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Successfully added a new survey",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('There was an error creating the survey:', error);
        Swal.fire({
          icon: "error",
          title: "Failed to create survey",
          text: error.message
        });
      });
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-100 border border-[#074B5C] rounded-lg p-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create a new Survey</h2>
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="border p-4 rounded-lg space-y-2">
            <div className="form-control">
              <label className="label">Title</label>
              <input
                type="text"
                placeholder="Survey title"
                className="input input-bordered"
                {...register('title', { required: true })}
              />
              {errors.title && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">Description</label>
              <textarea
                placeholder="Survey description"
                className="textarea textarea-bordered"
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">Options</label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    className="radio"
                    value="yes"
                    {...register('options', { required: true })}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    className="radio"
                    value="no"
                    {...register('options', { required: true })}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {errors.options && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">Category</label>
              <select
                className="select select-bordered"
                {...register('category', { required: true })}
              >
                <option value="">Select category</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Product">Product</option>
                <option value="Employee">Employee</option>
                <option value="Market Research">Market Research</option>
                <option value="Website">Website</option>
                <option value="Event">Event</option>
              </select>
              {errors.category && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">Deadline</label>
              <input
                type="date"
                className="input input-bordered"
                min={today}
                {...register('deadline', { required: true })}
              />
              {errors.deadline && <span className="text-red-500">This field is required</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-success">Create Survey</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
