import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Surveys = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  const fetchSurveys = async () => {
    const response = await axios.get('https://survey-shark-server.vercel.app/surveys');
    return response.data;
  };

  const { data, isLoading, error } = useQuery({ queryKey: ['Surveys'], queryFn: fetchSurveys });

  if (isLoading) return (
    <div>
        <Skeleton height={100} width={100} /> 
        <Skeleton count={3} /> 
    </div>
);
  if (error) return <p>Error: {error.message}</p>;

  // Filter surveys based on selected category
  const filteredSurveys = selectedCategory
    ? data.filter((survey) => survey.category === selectedCategory)
    : data;

  // Sort surveys 
  const sortedSurveys = sortOption
    ? filteredSurveys.slice().sort((a, b) => {
      if (sortOption === 'ascending') {
        return a.totalVotes - b.totalVotes;
      } else {
        return b.totalVotes - a.totalVotes;
      }
    })
    : filteredSurveys;

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen">
      <div className="container mx-auto ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Surveys</h1>
      <div className="flex flex-wrap justify-between items-center mb-8">
        {/* Category filter dropdown */}
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <label className="mr-2 font-medium text-lg text-gray-700">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">All Categories</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Product">Product</option>
            <option value="Employee">Employee</option>
            <option value="Market Research">Market Research</option>
            <option value="Website">Website</option>
            <option value="Event">Event</option>
          </select>
        </div>
        {/* Sort buttons */}
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <label className="mr-2 font-medium text-lg text-gray-700">Sort by Vote Count:</label>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSurveys.map((survey) => (
          <div
            key={survey._id}
            className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundColor: survey.bgColor || '#FFFFFF',
              color: survey.textColor || '#000000'
            }}
          >
            <Link to={`/survey-details/${survey._id}`}>
              <h2 className="text-xl font-semibold mb-2">{survey.title}</h2>
              <p className="text-gray-700 mb-4">{survey.description}</p>
              <p className="font-semibold">Total Votes: {survey.totalVotes}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Surveys;
