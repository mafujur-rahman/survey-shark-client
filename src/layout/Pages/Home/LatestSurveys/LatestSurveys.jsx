import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const fetchLatestSurveys = async () => {
  const response = await axios.get('https://survey-shark-server.vercel.app/surveys/latest');
  return response.data;
};

const backgroundColors = ['#F0FFFF', '#FFE4E1', '#B0E0E6', '#FFF0F5', '#F0F8FF', '#FFDAB9'];
const textColors = ['#2F4F4F', '#800000', '#4682B4', '#00008B', '#8B008B', '#006400'];

const LatestSurveys = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['LatestSurveys'], queryFn: fetchLatestSurveys });

  if (isLoading) return (
    <div>
        <Skeleton height={100} width={100} /> 
        <Skeleton count={3} /> 
    </div>
);
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-6">Latest Surveys</h2>
      <p className="text-gray-600 text-center mb-10">
        Discover our latest surveys! Stay up-to-date with the newest additions to our platform, covering a range of topics from customer feedback to market trends.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(0, 6).map((survey, index) => (
          <li key={survey._id} className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
            <Link to={`/survey-details/${survey._id}`} className="block h-full">
              <div
                className="p-6 h-full"
                style={{
                  backgroundColor: backgroundColors[index % backgroundColors.length],
                  color: textColors[index % textColors.length],
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

export default LatestSurveys;
