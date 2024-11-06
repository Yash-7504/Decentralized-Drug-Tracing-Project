import React, { useState } from "react";
import { addParticipant } from "../utils/contractInteraction";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const PharmacyDashboard = () => {
  const [pharmacyId, setPharmacyId] = useState("");
  const [pharmacyCompany, setPharmacyCompany] = useState("");
  const [pharmacyLocation, setPharmacyLocation] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAddPharmacy = async (e) => {
    e.preventDefault();
    try {
      await addParticipant("Pharmacy", pharmacyId, {
        pharmacyId,
        pharmacyCompany,
        pharmacyLocation,
        pharmacyEthAddress: await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => accounts[0]),
      });
      alert("Pharmacy added successfully!");
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      alert("Failed to add pharmacy");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Pharmacy Dashboard</h2>
      <form onSubmit={handleAddPharmacy}>
        <input
          type="number"
          placeholder="Pharmacy ID"
          value={pharmacyId}
          onChange={(e) => setPharmacyId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={pharmacyCompany}
          onChange={(e) => setPharmacyCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={pharmacyLocation}
          onChange={(e) => setPharmacyLocation(e.target.value)}
          required
        />
        <button type="submit">Add Pharmacy</button>
      </form>
      <button onClick={handleLogout} className="dashboard-button">
        Logout
      </button>
    </div>
  );
};

export default PharmacyDashboard;
// import React, { useState } from "react";
// import { addParticipant } from "../utils/contractInteraction";
// import "../index.css";

// const PharmacyDashboard = () => {
//   const [pharmacyId, setPharmacyId] = useState("");
//   const [pharmacyCompany, setPharmacyCompany] = useState("");
//   const [pharmacyLocation, setPharmacyLocation] = useState("");
//   const handleAddPharmacy = async (e) => {
//     e.preventDefault();
//     try {
//       await addParticipant("Pharmacy", pharmacyId, {
//         pharmacyId,
//         pharmacyCompany,
//         pharmacyLocation,
//         pharmacyEthAddress: await window.ethereum
//           .request({ method: "eth_requestAccounts" })
//           .then((accounts) => accounts[0]),
//       });
//       alert("Pharmacy added successfully!");
//     } catch (error) {
//       console.error("Error adding pharmacy:", error);
//       alert("Failed to add pharmacy");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2>Pharmacy Dashboard</h2>
//       <form onSubmit={handleAddPharmacy}>
//         <input
//           type="number"
//           placeholder="Pharmacy ID"
//           value={pharmacyId}
//           onChange={(e) => setPharmacyId(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={pharmacyCompany}
//           onChange={(e) => setPharmacyCompany(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={pharmacyLocation}
//           onChange={(e) => setPharmacyLocation(e.target.value)}
//           required
//         />
//         <button type="submit">Add Pharmacy</button>
//       </form>
//     </div>
//   );
// };

// export default PharmacyDashboard;
