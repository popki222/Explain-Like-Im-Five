import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/displayTable');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-4">Data from MongoDB</h2>
      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-4 border-b bg-gray-100">Name</th>
              <th className="p-4 border-b bg-gray-100">Question</th>
              <th className="p-4 border-b bg-gray-100">Response</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{item.name}</td>
                  <td className="p-4 border-b">{item.question}</td>
                  <td className="p-4 border-b">{item.response}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataDisplay;
