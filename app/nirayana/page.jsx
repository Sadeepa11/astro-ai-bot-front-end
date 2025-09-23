"use client";

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function NirayanaPage() {
  const [nirayanas, setNirayanas] = useState([]);

  const [searchUid, setSearchUid] = useState("");
  const [searchHours, setSearchHours] = useState("");
  const [searchMinutes, setSearchMinutes] = useState("");
  const [newNirayana, setNewNirayana] = useState({
    Hours: "",
    Minutes: "",
    Makara: "",
    Balance: "",
    Checked: "",
  });

  // Change 127.0.0.1 to your PC's LAN IP if accessing from another device
const API_BASE = "https://135.181.210.47:5000";

  // Fetch all records
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
  try {
    const res = await fetch(`${API_BASE}/nirayana`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    setNirayanas(data);
  } catch (err) {
    console.error("Failed to fetch Nirayana data:", err);
  }
};

  const fetchByUID = async () => {
    if (!searchUid) return;
    try {
      const res = await fetch(`${API_BASE}/nirayana/uid/${searchUid}`);
      if (res.ok) {
        const data = await res.json();
        setNirayanas([data]);
      } else {
        console.error("No record found with UID");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchByTime = async () => {
    if (!searchHours || !searchMinutes) return;
    try {
      const res = await fetch(
        `${API_BASE}/nirayana/time/${searchHours}/${searchMinutes}`
      );
      const data = await res.json();
      setNirayanas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNirayana = async () => {
    if (!newNirayana.Hours || !newNirayana.Minutes) {
      alert("Hours and Minutes are required");
      return;
    }

    const body = {
      ...newNirayana,
      Hours: Number(newNirayana.Hours),
      Minutes: Number(newNirayana.Minutes),
    };

    try {
      const res = await fetch(`${API_BASE}/nirayana`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchAll();
        setNewNirayana({ Hours: "", Minutes: "", Makara: "", Balance: "", Checked: "" });
      } else {
        const err = await res.json();
        console.error("Error adding Nirayana:", err);
      }
    } catch (err) {
      console.error("Failed to add Nirayana record:", err);
    }
  };

  const columns = [
    { key: "Hours", label: "Hours" },
    { key: "Minutes", label: "Minutes" },
    { key: "Makara", label: "Makara" },
    { key: "Balance", label: "Balance" },
    { key: "Checked", label: "Checked" },
    { key: "UniqueUID", label: "UID" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center text-blue-600">Nirayana Records</h1>

      {/* Search Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Search by UID</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              value={searchUid}
              placeholder="Enter UID"
              onChange={(e) => setSearchUid(e.target.value)}
              className="flex-1 min-w-0 w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={fetchByUID}
              className="w-full sm:w-auto whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Search by Time</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="number"
              value={searchHours}
              placeholder="Hours"
              onChange={(e) => setSearchHours(e.target.value)}
              className="flex-1 min-w-0 rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="number"
              value={searchMinutes}
              placeholder="Minutes"
              onChange={(e) => setSearchMinutes(e.target.value)}
              className="flex-1 min-w-0 rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <button
              onClick={fetchByTime}
              className="w-full sm:w-auto whitespace-nowrap bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Add Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-bold mb-5 text-indigo-700">Add Nirayana Entry</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {["Hours", "Minutes", "Makara", "Balance", "Checked"].map((field) => (
            <input
              key={field}
              type={["Hours", "Minutes"].includes(field) ? "number" : "text"}
              placeholder={field}
              value={newNirayana[field]}
              onChange={(e) =>
                setNewNirayana({ ...newNirayana, [field]: e.target.value })
              }
              className="w-full min-w-0 rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          ))}
        </div>
        <button
          onClick={addNirayana}
          className="mt-6 w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Record
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full bg-white rounded-xl shadow border p-4">
        <DataTable columns={columns} data={nirayanas} />
      </div>
    </div>
  );
}
