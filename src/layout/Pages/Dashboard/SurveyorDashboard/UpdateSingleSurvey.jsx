import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const fetchSurveys = async () => {
    try {
        const response = await axios.get('http://localhost:5000/surveys');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch surveys");
    }
};

const UpdateSingleSurvey = () => {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const { id } = useParams();
    const { data: surveys, isLoading, isError } = useQuery({
        queryKey: ['SurveyDetails'],
        queryFn: fetchSurveys
    });

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-600">Error fetching survey details</p>;
    }

    const currentSurvey = surveys?.find(item => item._id === id);
    if (!currentSurvey) {
        return <p className="text-center text-red-600">Survey not found</p>;
    }

    const { title, description, category, deadline } = currentSurvey;

    const onSubmit = (data) => {
        const updatedSurvey = { ...data };
        axios.put(`http://localhost:5000/surveyor/update/${currentSurvey._id}`, updatedSurvey)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Successfully update the survey",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('There was an error creating the survey:', error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to update survey",
                    text: error.message
                });
            });
    };

    return (
        <div className="min-h-screen py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update a Survey</h2>
            <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="border p-4 rounded-lg space-y-2">
                        <div className="form-control">
                            <label className="label">Title</label>
                            <input
                                type="text"
                                placeholder="Survey title"
                                className="input input-bordered"
                                defaultValue={title}
                                {...register("title")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Description</label>
                            <textarea
                                placeholder="Survey description"
                                className="textarea textarea-bordered"
                                defaultValue={description}
                                {...register("description")}
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">Options</label>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer label">
                                    <input
                                        type="radio"
                                        className="radio"
                                        value="yes"
                                        {...register("options", {required: true})}
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="cursor-pointer label">
                                    <input
                                        type="radio"
                                        className="radio"
                                        value="no"
                                        {...register("options")}
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
                                defaultValue={category}
                                {...register("category")}
                            >
                                <option value="">Select category</option>
                                <option value="Customer Service">Customer Service</option>
                                <option value="Product">Product</option>
                                <option value="Employee">Employee</option>
                                <option value="Market Research">Market Research</option>
                                <option value="Website">Website</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">Deadline</label>
                            <input
                                type="date"
                                className="input input-bordered"
                                defaultValue={deadline && new Date(deadline).toISOString().split('T')[0]}
                                {...register("deadline")}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success text-white">Update Survey</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateSingleSurvey;
