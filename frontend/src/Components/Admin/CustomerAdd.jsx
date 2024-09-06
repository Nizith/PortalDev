import React, { useState } from "react";
import axios from "axios";

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState([
    { srNumber: "001", name: "Millennium Information Technologies", category: "", mobile: "", description: "" },
    { srNumber: "002", name: "KBSL Information Technologies Ltd", category: "", mobile: "", description: "" },
    { srNumber: "003", name: "VSIS", category: "", mobile: "", description: "" },
    { srNumber: "004", name: "Yenasys(PVT)Limited", category: "", mobile: "", description: "" },
    { srNumber: "005", name: "Mitter international (pvt) ltd", category: "", mobile: "", description: "" },
    { srNumber: "006", name: "Tyax (Pvt) Ltd", category: "", mobile: "", description: "" },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    srNumber: "",
    name: "",
    category: "",
    mobile: "",
    description: ""
  });

  const handleInputChange = (e) => {
    setNewSupplier({
      ...newSupplier,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    setSuppliers([...suppliers, newSupplier]);
    setNewSupplier({ srNumber: "", name: "", category: "", mobile: "", description: "" });

    axios
      .post("http://localhost:4500/portaldev/createsupplier", newSupplier)
      .then(() => {
        alert("Supplier added successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add supplier");
      });
  };

  return (
    <div className="p-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th className="py-2 px-4 border-b">SR number</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index} className={`bg-${index % 2 === 0 ? "blue-50" : "white"}`}>
              <td className="py-2 px-4 border-b">{supplier.srNumber}</td>
              <td className="py-2 px-4 border-b">{supplier.name}</td>
              <td className="py-2 px-4 border-b">{supplier.category}</td>
              <td className="py-2 px-4 border-b">{supplier.mobile}</td>
              <td className="py-2 px-4 border-b">{supplier.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleAddSupplier} className="mt-4">
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            name="srNumber"
            value={newSupplier.srNumber}
            onChange={handleInputChange}
            placeholder="SR number"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="name"
            value={newSupplier.name}
            onChange={handleInputChange}
            placeholder="Supplier name"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="category"
            value={newSupplier.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="mobile"
            value={newSupplier.mobile}
            onChange={handleInputChange}
            placeholder="Contact number"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="description"
            value={newSupplier.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
