import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const fetchLatestSurveys = async () => {
  const response = await axios.get('http://localhost:5000/surveys/latest');
  return response.data;
};

const LatestSurveys = () => {
  const { data, isLoading, error } = useQuery({queryKey: 'LatestSurveys', queryFn: fetchLatestSurveys});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const backgroundColors = ['#F0FFFF', '#FFE4E1', '#B0E0E6', '#FFF0F5', '#F0F8FF', '#FFDAB9'];
  const textColors = ['#2F4F4F', '#800000', '#4682B4', '#00008B', '#8B008B', '#006400'];

  return (
    <div className="p-4 mx-auto container mt-10 ">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">Latest Surveys</h2>
      <p className="mb-5 text-gray-600 text-center">Discover our latest surveys! Stay up-to-date with the newest additions to our platform, covering a range of topics from customer feedback to market trends.</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.slice(0, 6).map((survey, index) => (
          <li key={survey._id} className="border p-4 rounded-lg mb-4" style={{ backgroundColor: backgroundColors[index % backgroundColors.length], color: textColors[index % textColors.length] }}>
            <h3 className="text-xl font-semibold">{survey.title}</h3>
            <p className="text-gray-600">{survey.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestSurveys;
