import React, { useState } from "react";
import axios from "axios";

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState([
    { BRnumber: "001", name: "Millennium Information Technologies", email: "", contact: "" },
    { BRnumber: "002", name: "KBSL Information Technologies Ltd", email: "", contact: "" },
    { BRnumber: "003", name: "VSIS", email: "", contact: "" },
    { BRnumber: "004", name: "Yenasys(PVT)Limited", email: "", contact: "" },
    { BRnumber: "005", name: "Mitter international (pvt) ltd", email: "", contact: "" },
    { BRnumber: "006", name: "Tyax (Pvt) Ltd", email: "", contact: "" },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    BRnumber: "",
    name: "",
    email: "",
    contact: ""
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
    setNewSupplier({ BRnumber: "", name: "", email: "", contact: "" });

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
    <div className="p-8 bg-slate-200">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th className="py-2 px-4 border-b">BR number</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index} className={`bg-${index % 2 === 0 ? "blue-50" : "white"}`}>
              <td className="py-2 px-4 border-b">{supplier.BRnumber}</td>
              <td className="py-2 px-4 border-b">{supplier.name}</td>
              <td className="py-2 px-4 border-b">{supplier.email}</td>
              <td className="py-2 px-4 border-b">{supplier.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleAddSupplier} className="mt-4">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="BRnumber"
            value={newSupplier.BRnumber}
            onChange={handleInputChange}
            placeholder="BR number"
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
            type="email"
            name="email"
            value={newSupplier.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="contact"
            value={newSupplier.contact}
            onChange={handleInputChange}
            placeholder="Contact number"
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
