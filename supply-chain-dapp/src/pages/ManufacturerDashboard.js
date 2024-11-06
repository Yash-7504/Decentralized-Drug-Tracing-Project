import React, { useState } from "react";
import { addParticipant, addDrug } from "../utils/contractInteraction";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ManufacturerDashboard = () => {
  const [manufacturerId, setManufacturerId] = useState("");
  const [manufacturerCompany, setManufacturerCompany] = useState("");
  const [manufacturerLocation, setManufacturerLocation] = useState("");
  const [drugId, setDrugId] = useState("");
  const [drugName, setDrugName] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAddManufacturer = async (e) => {
    e.preventDefault();
    try {
      await addParticipant("Manufacturer", manufacturerId, {
        manufacturerId,
        manufacturerCompany,
        manufacturerLocation,
        manufacturerEthAddress: await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => accounts[0]),
      });
      alert("Manufacturer added successfully!");
    } catch (error) {
      console.error("Error adding manufacturer:", error);
      alert("Failed to add manufacturer");
    }
  };

  const handleAddDrug = async (e) => {
    e.preventDefault();
    try {
      await addDrug(drugId, drugName);
      alert("Drug added successfully!");
    } catch (error) {
      console.error("Error adding drug:", error);
      alert("Failed to add drug");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Manufacturer Dashboard</h2>
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Add Manufacturer</h3>
        <form onSubmit={handleAddManufacturer} className="dashboard-form">
          <input
            type="number"
            placeholder="Manufacturer ID"
            value={manufacturerId}
            onChange={(e) => setManufacturerId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company Name"
            value={manufacturerCompany}
            onChange={(e) => setManufacturerCompany(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={manufacturerLocation}
            onChange={(e) => setManufacturerLocation(e.target.value)}
            required
          />
          <button type="submit" className="dashboard-button">
            Add Manufacturer
          </button>
        </form>
      </div>

      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Add Drug</h3>
        <form onSubmit={handleAddDrug} className="dashboard-form">
          <input
            type="number"
            placeholder="Drug ID"
            value={drugId}
            onChange={(e) => setDrugId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Drug Name"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
          <button type="submit" className="dashboard-button">
            Add Drug
          </button>
        </form>
      </div>
      <button onClick={handleLogout} className="dashboard-button">
        Logout
      </button>
    </div>
  );
};

export default ManufacturerDashboard;
// import React, { useState } from "react";
// import { addParticipant, addDrug } from "../utils/contractInteraction";
// import "../index.css";

// const ManufacturerDashboard = () => {
//   const [manufacturerId, setManufacturerId] = useState("");
//   const [manufacturerCompany, setManufacturerCompany] = useState("");
//   const [manufacturerLocation, setManufacturerLocation] = useState("");
//   const [drugId, setDrugId] = useState("");
//   const [drugName, setDrugName] = useState("");

//   const handleAddManufacturer = async (e) => {
//     e.preventDefault();
//     try {
//       await addParticipant("Manufacturer", manufacturerId, {
//         manufacturerId,
//         manufacturerCompany,
//         manufacturerLocation,
//         manufacturerEthAddress: await window.ethereum
//           .request({ method: "eth_requestAccounts" })
//           .then((accounts) => accounts[0]),
//       });
//       alert("Manufacturer added successfully!");
//     } catch (error) {
//       console.error("Error adding manufacturer:", error);
//       alert("Failed to add manufacturer");
//     }
//   };

//   const handleAddDrug = async (e) => {
//     e.preventDefault();
//     try {
//       await addDrug(drugId, drugName);
//       alert("Drug added successfully!");
//     } catch (error) {
//       console.error("Error adding drug:", error);
//       alert("Failed to add drug");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2 className="dashboard-title">Manufacturer Dashboard</h2>
//       <div className="dashboard-section">
//         <h3 className="dashboard-section-title">Add Manufacturer</h3>
//         <form onSubmit={handleAddManufacturer} className="dashboard-form">
//           <input
//             type="number"
//             placeholder="Manufacturer ID"
//             value={manufacturerId}
//             onChange={(e) => setManufacturerId(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Company Name"
//             value={manufacturerCompany}
//             onChange={(e) => setManufacturerCompany(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={manufacturerLocation}
//             onChange={(e) => setManufacturerLocation(e.target.value)}
//             required
//           />
//           <button type="submit" className="dashboard-button">
//             Add Manufacturer
//           </button>
//         </form>
//       </div>

//       <div className="dashboard-section">
//         <h3 className="dashboard-section-title">Add Drug</h3>
//         <form onSubmit={handleAddDrug} className="dashboard-form">
//           <input
//             type="number"
//             placeholder="Drug ID"
//             value={drugId}
//             onChange={(e) => setDrugId(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Drug Name"
//             value={drugName}
//             onChange={(e) => setDrugName(e.target.value)}
//             required
//           />
//           <button type="submit" className="dashboard-button">
//             Add Drug
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ManufacturerDashboard;
