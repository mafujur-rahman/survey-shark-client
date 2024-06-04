import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const fetchTopSurveys = async () => {
  const response = await axios.get('http://localhost:5000/surveys/most-voted');
  return response.data;
};

const FeaturedSurveys = () => {
  const { data, isLoading, error } = useQuery({queryKey: 'FeaturedSurveys', queryFn:fetchTopSurveys} );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 mx-auto container mt-10 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Featured Surveys</h2>
      <p className="mb-5 text-gray-600 text-center">Explore our top-rated surveys! Discover the most popular surveys on our platform, voted highly by <br /> our community.  Dive into topics that resonate with our users, ranging from customer  feedback <br /> to market research.  Join the conversation and contribute your voice to these influential surveys!</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((survey) => (
          <li key={survey._id} className="border p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold">{survey.title}</h3>
            <p className="text-gray-600">{survey.description}</p>
            <p className="font-semibold">Total Votes: {survey.totalVotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedSurveys;
