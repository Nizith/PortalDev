import React, { useState, useEffect } from "react";
import axios from "axios";

function Sectionregistration() {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({
    SalesCategory: "",
    SolutionCategory: "",
    AccountManager: "",
    Manager: "",
    SalesEngineer: "",
    SolutionEngineer: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/readsection");
        setSections(response.data);
      } catch (error) {
        setError("Failed to fetch sections");
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prevSection) => ({
      ...prevSection,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:4500/portaldev/createSection", newSection);
      setSections((prevSections) => [...prevSections, response.data]);
      setNewSection({
        SalesCategory: "",
        SolutionCategory: "",
        AccountManager: "",
        Manager: "",
        SalesEngineer: "",
        SolutionEngineer: "",
      });
    } catch (error) {
      setError("Failed to add section");
      console.error("Error adding section:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-3/4 p-8 rounded-lg shadow-lg">
        <h1 className="flex justify-center text-2xl font-bold mb-6">Section Registration</h1>
        <table className="min-w-full bg-white border border-gray-200 mb-6">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border">SalesCategory</th>
              <th className="py-2 px-4 border">SolutionCategory</th>
              <th className="py-2 px-4 border">AccountManager</th>
              <th className="py-2 px-4 border">Manager</th>
              <th className="py-2 px-4 border">SalesEngineer</th>
              <th className="py-2 px-4 border">SolutionEngineer</th>
            </tr>
          </thead>
          <tbody>
            {sections && sections.length > 0 ? (
              sections.map((section, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}>
                  <td className="py-2 px-4 border">{section.SalesCategory}</td>
                  <td className="py-2 px-4 border">{section.SolutionCategory}</td>
                  <td className="py-2 px-4 border">{section.AccountManager}</td>
                  <td className="py-2 px-4 border">{section.Manager}</td>
                  <td className="py-2 px-4 border">{section.SalesEngineer}</td>
                  <td className="py-2 px-4 border">{section.SolutionEngineer}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No sections available</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mb-6">
          <input
            className="border py-2 px-4 rounded-md w-1/6"
            type="text"
            name="SalesCategory"
            placeholder="Sales Category"
            value={newSection.SalesCategory}
            onChange={handleChange}
          />
          <input
            className="border py-2 px-4 rounded-md w-1/6"
            type="text"
            name="SolutionCategory"
            placeholder="Solution Category"
            value={newSection.SolutionCategory}
            onChange={handleChange}
          />
          <input
            className="border py-2 px-4 rounded-md w-1/6"
            type="text"
            name="AccountManager"
            placeholder="Account Manager"
            value={newSection.AccountManager}
            onChange={handleChange}
          />
          <input
            className="border py-2 px-4 rounded-md w-1/6"
            type="text"
            name="Manager"
            placeholder="Manager"
            value={newSection.Manager}
            onChange={handleChange}
          />
          <input
            className="border py-2 px-4 rounded-md w-1/6"
            type="text"
            name="SalesEngineer"
            placeholder="Sales Engineer"
            value={newSection.SalesEngineer}
            onChange={handleChange}
          />
          <input
            className="border py-2 px-4 rounded-md w-1/6"
            type="text"
            name="SolutionEngineer"
            placeholder="Solution Engineer"
            value={newSection.SolutionEngineer}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600"
            onClick={handleAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sectionregistration;
