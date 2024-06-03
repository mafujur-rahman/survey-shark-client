
import { useForm } from 'react-hook-form';

const CreateSurvey = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const totalVotes = 23;
    const newSurvey = {...data, totalVotes}
    // This is where you would typically handle the form submission, e.g., send data to your backend
    console.log(newSurvey);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a new Survey</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="border p-4 rounded-lg space-y-2">
          <h3 className="text-xl font-semibold">Question</h3>
          
          <div className="form-control">
            <label className="label">Title</label>
            <input 
              type="text"
              placeholder="Question title"
              className="input input-bordered"
              {...register('title', { required: true })}
            />
            {errors.title && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              placeholder="Question description"
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
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
            {errors.category && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="form-control">
            <label className="label">Deadline</label>
            <input 
              type="date"
              className="input input-bordered"
              {...register('deadline', { required: true })}
            />
            {errors.deadline && <span className="text-red-500">This field is required</span>}
          </div>
        </div>
        
        <button type="submit" className="btn btn-success">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
