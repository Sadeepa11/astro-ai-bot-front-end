"use client";

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [uidSearch, setUidSearch] = useState("");
  const [coordEast, setCoordEast] = useState("");
  const [coordNorth, setCoordNorth] = useState("");
  const [newCity, setNewCity] = useState({
    CityName: "",
    East_Longitude: "",
    North_Latitude: "",
    Stan_time: "",
    Checked: "",
  });

  // Load all cities initially
  useEffect(() => {
    fetchCities();
  }, []);

  const API_BASE = "http://127.0.0.1:5000";

  const fetchCities = async () => {
    try {
      const res = await fetch(`${API_BASE}/cities`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const fetchCityByName = async () => {
    if (!filterName) return;
    try {
      const res = await fetch(`${API_BASE}/cities/name/${filterName}`);
      const data = await res.json();
      setCities([data]);
    } catch (err) {
      console.error("Error fetching by name:", err);
    }
  };

  const fetchCityByUID = async () => {
    if (!uidSearch) return;
    try {
      const res = await fetch(`${API_BASE}/cities/uid/${uidSearch}`);
      const data = await res.json();
      setCities([data]);
    } catch (err) {
      console.error("Error fetching by uid:", err);
    }
  };

  const fetchCityByCoords = async () => {
    if (!coordEast || !coordNorth) return;
    try {
      const res = await fetch(`${API_BASE}/cities/coords/${coordEast}/${coordNorth}`);
      const data = await res.json();
      setCities([data]);
    } catch (err) {
      console.error("Error fetching by coordinates:", err);
    }
  };

  const addCity = async () => {
    try {
      const res = await fetch(`${API_BASE}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      if (res.ok) {
        fetchCities();
        setNewCity({
          CityName: "",
          East_Longitude: "",
          North_Latitude: "",
          Stan_time: "",
          Checked: "",
        });
      }
    } catch (err) {
      console.error("Error adding city:", err);
    }
  };

  const columns = [
    { key: "CityName", label: "City Name" },
    { key: "East_Longitude", label: "East" },
    { key: "North_Latitude", label: "North" },
    { key: "Stan_time", label: "Standard Time" },
    { key: "Checked", label: "Checked" },
    { key: "UniqueUID", label: "UID" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Cities</h1>

      {/* Search Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* By Name */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">Search by Name</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={filterName}
              placeholder="City name"
              onChange={(e) => setFilterName(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
            />
            <button
              onClick={fetchCityByName}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* By UID */}
        <div className="bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">Search by UID</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={uidSearch}
              placeholder="UID"
              onChange={(e) => setUidSearch(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-green-300 outline-none"
            />
            <button
              onClick={fetchCityByUID}
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* By Coordinates */}
        <div className="md:col-span-2 bg-white shadow-sm rounded-lg p-5 border">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">Search by Coordinates</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={coordEast}
              placeholder="East Longitude"
              onChange={(e) => setCoordEast(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-purple-300 outline-none"
            />
            <input
              type="text"
              value={coordNorth}
              placeholder="North Latitude"
              onChange={(e) => setCoordNorth(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-purple-300 outline-none"
            />
            <button
              onClick={fetchCityByCoords}
              className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Add City Form */}
      <div className="bg-gray-50 border rounded-lg p-6 shadow-sm mb-8">
        <h2 className="font-bold mb-4 text-lg text-gray-700">Add New City</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City Name"
            value={newCity.CityName}
            onChange={(e) => setNewCity({ ...newCity, CityName: e.target.value })}
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="East Longitude"
            value={newCity.East_Longitude}
            onChange={(e) => setNewCity({ ...newCity, East_Longitude: e.target.value })}
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="North Latitude"
            value={newCity.North_Latitude}
            onChange={(e) => setNewCity({ ...newCity, North_Latitude: e.target.value })}
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="Standard Time"
            value={newCity.Stan_time}
            onChange={(e) => setNewCity({ ...newCity, Stan_time: e.target.value })}
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
          <input
            type="text"
            placeholder="Checked"
            value={newCity.Checked}
            onChange={(e) => setNewCity({ ...newCity, Checked: e.target.value })}
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
          />
        </div>
        <button
          onClick={addCity}
          className="mt-4 w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Add City
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <DataTable columns={columns} data={cities} />
      </div>
    </div>
  );
}