import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const fetchTopSurveys = async () => {
  const response = await axios.get('https://survey-shark-server.vercel.app/surveys/most-voted');
  return response.data;
};

const colorCombinations = [
  { backgroundColor: '#FDE68A', textColor: '#4B5563' },
  { backgroundColor: '#C7FDF0', textColor: '#1E3A8A' },
  { backgroundColor: '#FBCFE8', textColor: '#6B7280' },
  { backgroundColor: '#D1FAE5', textColor: '#4B5563' },
  { backgroundColor: '#FECACA', textColor: '#B91C1C' },
  { backgroundColor: '#A7F3D0', textColor: '#065F46' },
];

const FeaturedSurveys = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['FeaturedSurveys'], queryFn: fetchTopSurveys });

  if (isLoading){
    return (
      <div>
          <Skeleton height={100} width={100} /> 
          <Skeleton count={3} /> 
      </div>
  );
  }
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-6">Featured Surveys</h2>
      <p className="text-gray-600 text-center mb-10">
        Explore our top-rated surveys! Discover the most popular surveys on our platform, voted highly by our community. Dive into topics that resonate with
        our users, ranging from customer feedback to market research. Join the conversation and contribute your voice to these influential surveys!
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((survey, index) => (
          <li key={survey._id} className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
            <Link to={`/survey-details/${survey._id}`} className="block h-full">
              <div
                className="p-6 h-full"
                style={{
                  backgroundColor: colorCombinations[index % colorCombinations.length].backgroundColor,
                  color: colorCombinations[index % colorCombinations.length].textColor,
                }}
              >
                <h3 className="text-2xl font-semibold mb-4">{survey.title}</h3>
                <p className="text-gray-700">{survey.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedSurveys;
