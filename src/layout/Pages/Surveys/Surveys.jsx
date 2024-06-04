import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Surveys = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  const fetchSurveys = async () => {
    const response = await axios.get('http://localhost:5000/surveys');
    return response.data;
  };

  const { data, isLoading, error } = useQuery({queryKey:'Surveys', queryFn: fetchSurveys});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter surveys based on selected category
  const filteredSurveys = selectedCategory
    ? data.filter((survey) => survey.category === selectedCategory)
    : data;

  // Sort surveys based on selected sort option
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
    <div className="container mx-auto my-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Surveys</h1>
      <div className="flex justify-between items-center mb-6">
        {/* Category filter dropdown */}
        <div>
          <label className="mr-2 font-medium text-lg">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-3 py-2 rounded-md"
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
        <div>
          <label className="mr-2 font-medium text-lg">Sort by Vote Count:</label>
          <button
            onClick={() => setSortOption('ascending')}
            className="px-4 py-2 rounded-md bg-blue-600 text-white mr-2 hover:bg-blue-700"
          >
            Ascending
          </button>
          <button
            onClick={() => setSortOption('descending')}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Descending
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSurveys.map((survey) => (
          <div
            key={survey._id}
            className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundColor: survey.bgColor,
              color: survey.textColor
            }}
          >
            <h2 className="text-xl font-semibold mb-2">{survey.title}</h2>
            <p className="text-gray-700 mb-4">{survey.description}</p>
            <p className="font-semibold">Total Votes: {survey.totalVotes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surveys;
