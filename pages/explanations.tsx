"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Link from 'next/link';

export default function Explanations() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/displayTable");
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

  const sortData = (order: "asc" | "desc") => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (order === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setData(sortedData);
    setSortOrder(order);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <h1 className="text-6xl font-bold text-center mb-8 w-full">Explanations</h1>
        
        <div className="flex justify-between items-center w-full max-w-5xl mb-4 w-[50%] sm:w-[80%] ">
          <input style={{ backgroundColor: "black" }}
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-1/4 mr-4"
            
          />
          <div className="flex gap-2 text-white">
            <button 
              onClick={() => sortData("asc")} 
              className={`px-4 py-2 border rounded hover:bg-gray-100 hover:text-black ${sortOrder === "asc" ? "bg-gray-200 text-black" : ""}` }
            >
              A-Z
            </button>
            <button 
              onClick={() => sortData("desc")}
              className={`px-4 py-2 border rounded hover:bg-gray-100 hover:text-black ${sortOrder === "desc" ? "bg-gray-200 text-black"  : ""}`}
            >
              Z-A
            </button>
            <Link href="/">
                <button className="px-4 py-2 border rounded hover:bg-gray-200 hover:text-black">
                    Ask another question
                </button>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-5xl overflow-auto w-[50%] sm:w-[80%] " style={{ maxHeight: "800px" }}>
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b bg-black-100 text-center w-1/6">Name</th>
                <th className="p-4 border-b bg-black-100 text-center w-2/6">Question</th>
                <th className="p-4 border-b bg-black-100 text-center w-3/6">Response</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id}>
                    <td className="p-4 border-b text-center">{item.name}</td>
                    <td className="p-4 border-b text-center">{item.question}</td>
                    <td className="p-4 border-b text-center">{item.response}</td>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
