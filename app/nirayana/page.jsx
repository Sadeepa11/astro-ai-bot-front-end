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

  const API_BASE = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await fetch(`${API_BASE}/nirayana`);
    const data = await res.json();
    setNirayanas(data);
  };

  const fetchByUID = async () => {
    if (!searchUid) return;
    const res = await fetch(`${API_BASE}/nirayana/uid/${searchUid}`);
    if (res.ok) {
      const data = await res.json();
      setNirayanas([data]);
    }
  };

  const fetchByTime = async () => {
    if (!searchHours || !searchMinutes) return;
    const res = await fetch(
      `${API_BASE}/nirayana/time/${searchHours}/${searchMinutes}`
    );
    const data = await res.json();
    setNirayanas(data);
  };

  const addNirayana = async () => {
    const res = await fetch(`${API_BASE}/nirayana`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNirayana),
    });
    if (res.ok) {
      fetchAll();
      setNewNirayana({
        Hours: "",
        Minutes: "",
        Makara: "",
        Balance: "",
        Checked: "",
      });
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
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Nirayana Records
      </h1>

      {/* Search Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Search by UID */}
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

        {/* Search by Time */}
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