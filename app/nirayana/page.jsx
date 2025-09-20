"use client";

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function NirayanaPage() {
  const [nirayanas, setNirayanas] = useState([]);

  // Search / Add state
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

  // Load all records initially
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await fetch(`${API_BASE}/nirayana`);
      const data = await res.json();
      setNirayanas(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchByUID = async () => {
    if (!searchUid) return;
    try {
      const res = await fetch(`${API_BASE}/nirayana/uid/${searchUid}`);
      if (res.ok) {
        const data = await res.json();
        setNirayanas([data]);
      }
    } catch (err) {
      console.error("Error:", err);
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
      console.error("Error:", err);
    }
  };

  const addNirayana = async () => {
    try {
      const res = await fetch(`${API_BASE}/nirayana`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNirayana),
      });
      if (res.ok) {
        fetchAll(); // refresh table
        setNewNirayana({
          Hours: "",
          Minutes: "",
          Makara: "",
          Balance: "",
          Checked: "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Nirayana Records
      </h1>

      {/* Search Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Search by UID */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">
            Search by UID
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchUid}
              placeholder="Enter UID"
              onChange={(e) => setSearchUid(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
            />
            <button
              onClick={fetchByUID}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search by Time */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">
            Search by Time
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              value={searchHours}
              placeholder="Hours"
              onChange={(e) => setSearchHours(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-green-300 outline-none"
            />
            <input
              type="number"
              value={searchMinutes}
              placeholder="Minutes"
              onChange={(e) => setSearchMinutes(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-green-300 outline-none"
            />
            <button
              onClick={fetchByTime}
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Add Entry Form */}
      <div className="bg-gray-50 border rounded-lg p-6 shadow-sm mb-8">
        <h2 className="font-bold mb-4 text-lg text-gray-700">
          Add New Nirayana Entry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Hours"
            value={newNirayana.Hours}
            onChange={(e) =>
              setNewNirayana({ ...newNirayana, Hours: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="number"
            placeholder="Minutes"
            value={newNirayana.Minutes}
            onChange={(e) =>
              setNewNirayana({ ...newNirayana, Minutes: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="Makara"
            value={newNirayana.Makara}
            onChange={(e) =>
              setNewNirayana({ ...newNirayana, Makara: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="Balance"
            value={newNirayana.Balance}
            onChange={(e) =>
              setNewNirayana({ ...newNirayana, Balance: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="Checked"
            value={newNirayana.Checked}
            onChange={(e) =>
              setNewNirayana({ ...newNirayana, Checked: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
        </div>
        <button
          onClick={addNirayana}
          className="mt-4 w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Add Record
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <DataTable columns={columns} data={nirayanas} />
      </div>
    </div>
  );
}