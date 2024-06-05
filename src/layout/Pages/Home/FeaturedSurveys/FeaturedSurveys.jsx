import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link} from "react-router-dom";


const fetchTopSurveys = async () => {
  const response = await axios.get('http://localhost:5000/surveys/most-voted');
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div  className="p-4 mx-auto container mt-10">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">Featured Surveys</h2>
      <p className="mb-5 text-gray-600 text-center">Explore our top-rated surveys! Discover the most popular surveys on our platform, voted highly by our community.  Dive into topics that resonate with <br /> our users, ranging from  customer  feedback  to market research.  Join the conversation and contribute your voice to these influential surveys!</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((survey, index) => (
          <li key={survey._id} className="border p-4 rounded-lg mb-4" style={{ backgroundColor: colorCombinations[index % colorCombinations.length].backgroundColor }}>
            <Link to={`/survey-details/${survey._id}`}>
            <h3 className="text-xl font-semibold" style={{ color: colorCombinations[index % colorCombinations.length].textColor }}>{survey.title}</h3>
            <p className="text-gray-600">{survey.description}</p>
            </Link>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default FeaturedSurveys;
