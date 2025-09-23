"use client";

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNid, setSearchNid] = useState("");
  const [searchUid, setSearchUid] = useState("");
  const [searchDob, setSearchDob] = useState("");
  const [newClient, setNewClient] = useState({
    Name: "",
    NationalID: "",
    DateOfBirth: "",
    Email: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

const API_BASE = "https://135.181.210.47:5000";
  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_BASE}/clients`);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchByName = async () => {
    if (!searchName) return;
    const res = await fetch(`${API_BASE}/clients/name/${searchName}`);
    const data = await res.json();
    setClients(data);
  };

  const fetchByNationalID = async () => {
    if (!searchNid) return;
    const res = await fetch(`${API_BASE}/clients/national/${searchNid}`);
    const data = await res.json();
    setClients([data]);
  };

  const fetchByUID = async () => {
    if (!searchUid) return;
    const res = await fetch(`${API_BASE}/clients/uid/${searchUid}`);
    const data = await res.json();
    setClients([data]);
  };

  const fetchByDOB = async () => {
    if (!searchDob) return;
    const res = await fetch(`${API_BASE}/clients/dob/${searchDob}`);
    const data = await res.json();
    setClients(data);
  };

  const addClient = async () => {
    const res = await fetch(`${API_BASE}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    });
    if (res.ok) {
      fetchClients();
      setNewClient({ Name: "", NationalID: "", DateOfBirth: "", Email: "" });
    }
  };

  const columns = [
    { key: "Name", label: "Name" },
    { key: "NationalID", label: "National ID" },
    { key: "DateOfBirth", label: "DOB" },
    { key: "Email", label: "Email" },
    { key: "UniqueUID", label: "UID" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Clients
      </h1>

      {/* Search Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Search by Name */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">
            Search by Name
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchName}
              placeholder="Enter name"
              onChange={(e) => setSearchName(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
            />
            <button
              onClick={fetchByName}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search by National ID */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">
            Search by National ID
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchNid}
              placeholder="Enter National ID"
              onChange={(e) => setSearchNid(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-green-300 outline-none"
            />
            <button
              onClick={fetchByNationalID}
              className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>
        </div>

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
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-purple-300 outline-none"
            />
            <button
              onClick={fetchByUID}
              className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search by DOB */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">
            Search by DOB
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={searchDob}
              onChange={(e) => setSearchDob(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-orange-300 outline-none"
            />
            <button
              onClick={fetchByDOB}
              className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Add Client Form */}
      <div className="bg-gray-50 border rounded-lg p-6 shadow-sm mb-8">
        <h2 className="font-bold mb-4 text-lg text-gray-700">
          Add New Client
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newClient.Name}
            onChange={(e) =>
              setNewClient({ ...newClient, Name: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="National ID"
            value={newClient.NationalID}
            onChange={(e) =>
              setNewClient({ ...newClient, NationalID: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={newClient.DateOfBirth}
            onChange={(e) =>
              setNewClient({ ...newClient, DateOfBirth: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={newClient.Email}
            onChange={(e) =>
              setNewClient({ ...newClient, Email: e.target.value })
            }
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
        </div>
        <button
          onClick={addClient}
          className="mt-4 w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Add Client
        </button>
      </div>

      {/* Client Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <DataTable columns={columns} data={clients} />
      </div>
    </div>
  );
}