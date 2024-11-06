import React, { useState } from "react";
import { addParticipant, receiveDrug } from "../utils/contractInteraction";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const DistributorDashboard = () => {
  const [distributorId, setDistributorId] = useState("");
  const [distributorCompany, setDistributorCompany] = useState("");
  const [distributorLocation, setDistributorLocation] = useState("");
  const [drugId, setDrugId] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAddDistributor = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to add distributor...");
      console.log("Distributor ID:", distributorId);
      console.log("Distributor Company:", distributorCompany);
      console.log("Distributor Location:", distributorLocation);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);

      await addParticipant("Distributor", distributorId, {
        distributorId,
        distributorCompany,
        distributorLocation,
        distributorEthAddress: accounts[0],
      });
      console.log("Distributor added successfully!");
      alert("Distributor added successfully!");
    } catch (error) {
      console.error("Detailed error in handleAddDistributor:", error);
      alert(`Failed to add distributor: ${error.message}`);
    }
  };

  const handleReceiveDrug = async (e) => {
    e.preventDefault();
    try {
      await receiveDrug(drugId);
      alert("Drug received successfully!");
    } catch (error) {
      console.error("Error receiving drug:", error);
      alert("Failed to receive drug");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Distributor Dashboard</h2>
      <form onSubmit={handleAddDistributor}>
        <input
          type="number"
          placeholder="Distributor ID"
          value={distributorId}
          onChange={(e) => setDistributorId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={distributorCompany}
          onChange={(e) => setDistributorCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={distributorLocation}
          onChange={(e) => setDistributorLocation(e.target.value)}
          required
        />
        <button type="submit">Add Distributor</button>
      </form>
      <form onSubmit={handleReceiveDrug}>
        <input
          type="number"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          required
        />
        <button type="submit">Receive Drug</button>
      </form>
      <button onClick={handleLogout} className="dashboard-button">
        Logout
      </button>
    </div>
  );
};

export default DistributorDashboard;
// import React, { useState } from "react";
// import { addParticipant, receiveDrug } from "../utils/contractInteraction";
// import "../index.css";

// const DistributorDashboard = () => {
//   const [distributorId, setDistributorId] = useState("");
//   const [distributorCompany, setDistributorCompany] = useState("");
//   const [distributorLocation, setDistributorLocation] = useState("");
//   const [drugId, setDrugId] = useState("");

//   const handleAddDistributor = async (e) => {
//     e.preventDefault();
//     try {
//       await addParticipant("Distributor", distributorId, {
//         distributorId,
//         distributorCompany,
//         distributorLocation,
//         distributorEthAddress: await window.ethereum
//           .request({ method: "eth_requestAccounts" })
//           .then((accounts) => accounts[0]),
//       });
//       alert("Distributor added successfully!");
//     } catch (error) {
//       console.error("Error adding distributor:", error);
//       alert("Failed to add distributor");
//     }
//   };

//   const handleReceiveDrug = async (e) => {
//     e.preventDefault();
//     try {
//       await receiveDrug(drugId);
//       alert("Drug received successfully!");
//     } catch (error) {
//       console.error("Error receiving drug:", error);
//       alert("Failed to receive drug");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2>Distributor Dashboard</h2>
//       <form onSubmit={handleAddDistributor}>
//         <input
//           type="number"
//           placeholder="Distributor ID"
//           value={distributorId}
//           onChange={(e) => setDistributorId(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={distributorCompany}
//           onChange={(e) => setDistributorCompany(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={distributorLocation}
//           onChange={(e) => setDistributorLocation(e.target.value)}
//           required
//         />
//         <button type="submit">Add Distributor</button>
//       </form>
//       <form onSubmit={handleReceiveDrug}>
//         <input
//           type="number"
//           placeholder="Drug ID"
//           value={drugId}
//           onChange={(e) => setDrugId(e.target.value)}
//           required
//         />
//         <button type="submit">Receive Drug</button>
//       </form>
//     </div>
//   );
// };

// export default DistributorDashboard;
