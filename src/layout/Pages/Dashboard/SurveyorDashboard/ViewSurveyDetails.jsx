import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Chart from 'chart.js/auto'; // Import Chart.js directly

const ViewSurveyDetails = () => {
    const { id } = useParams();
    const AxiosSecure = UseAxiosSecure();
    const [surveyDetail, setSurveyDetail] = useState([]);
    const [viewChart, setViewChart] = useState(false);
    const chartRef = useRef(null);

    const fetchSurveyDetails = async () => {
        const response = await AxiosSecure.get(`/responses/${id}`);
        return response.data;
    };

    const { data: surveyDetails = {}, isLoading, isError } = useQuery({
        queryKey: ['surveyDetails', id],
        queryFn: fetchSurveyDetails
    });

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await AxiosSecure.get('/responses');
                setSurveyDetail(res.data);
            } catch (error) {
                console.error("Error fetching responses:", error);
            }
        };
        fetchResponses();
    }, [AxiosSecure, id]);

    const userResponses = Array.isArray(surveyDetail) ? surveyDetail.filter(item => item.surveyId === surveyDetails.surveyId) : [];

    const renderChart = () => {
        let yesCount = 0;
        let noCount = 0;

        userResponses.forEach(response => {
            if (response.voteCounts && response.voteCounts.yes) {
                yesCount += response.voteCounts.yes;
            }
            if (response.voteCounts && response.voteCounts.no) {
                noCount += response.voteCounts.no;
            }
        });

        const data = {
            labels: ['Yes', 'No'], 
            datasets: [
                {
                    label: 'Votes',
                    backgroundColor: ['#3cba9f', '#c45850'],
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 2,
                    data: [yesCount, noCount],
                },
            ],
        };

        if (chartRef.current) {
            new Chart(chartRef.current, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1, // Set step size to 1
                            title: {
                                display: true,
                                text: 'Number of Votes',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Vote',
                            },
                        },
                    },
                },
            });
        }
    };

    useEffect(() => {
        renderChart();
    }, [userResponses]);

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-600">Error fetching survey details</p>;
    }

    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Survey Details</h2>
            <div className="container mx-auto w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
                <div className="flex justify-end mb-4">
                    <button
                        className="btn bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
                        onClick={() => setViewChart(!viewChart)}
                    >
                        {viewChart ? 'View Table' : 'View Chart'}
                    </button>
                </div>
                {viewChart ? (
                    <canvas ref={chartRef}></canvas>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-[#074B5C] text-white">
                                <tr>
                                    <th className="p-4 text-left">Serial No</th>
                                    <th className="p-4 text-left">User Email</th>
                                    <th className="p-4 text-left">User Name</th>
                                    <th className="p-4 text-left">Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userResponses.map((response, index) => (
                                    <tr key={index} className="border-b last:border-0 hover:bg-gray-100">
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4">{response.email}</td>
                                        <td className="p-4">{response.name}</td>
                                        <td className="p-4">Yes : {response.voteCounts.yes} No : {response.voteCounts.no}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewSurveyDetails;
