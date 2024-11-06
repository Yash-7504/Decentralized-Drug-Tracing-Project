import React, { useState } from "react";
import {
  addParticipant,
  purchaseDrug,
  shipDrug,
} from "../utils/contractInteraction";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const WholesalerDashboard = () => {
  const [wholeSellerId, setWholeSellerId] = useState("");
  const [wholeSellerCompany, setWholeSellerCompany] = useState("");
  const [wholeSellerLocation, setWholeSellerLocation] = useState("");
  const [drugId, setDrugId] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAddWholesaler = async (e) => {
    e.preventDefault();
    try {
      await addParticipant("WholeSeller", wholeSellerId, {
        wholeSellerId,
        wholeSellerCompany,
        wholeSellerLocation,
        wholeSellerEthAddress: await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => accounts[0]),
      });
      alert("Wholesaler added successfully!");
    } catch (error) {
      console.error("Error adding wholesaler:", error);
      alert("Failed to add wholesaler");
    }
  };

  const handlePurchaseDrug = async (e) => {
    e.preventDefault();
    try {
      await purchaseDrug(drugId);
      alert("Drug purchased successfully!");
    } catch (error) {
      console.error("Error purchasing drug:", error);
      alert("Failed to purchase drug");
    }
  };

  const handleShipDrug = async (e) => {
    e.preventDefault();
    try {
      await shipDrug(drugId);
      alert("Drug shipped successfully!");
    } catch (error) {
      console.error("Error shipping drug:", error);
      alert("Failed to ship drug");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Wholesaler Dashboard</h2>
      <form onSubmit={handleAddWholesaler}>
        <input
          type="number"
          placeholder="Wholesaler ID"
          value={wholeSellerId}
          onChange={(e) => setWholeSellerId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={wholeSellerCompany}
          onChange={(e) => setWholeSellerCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={wholeSellerLocation}
          onChange={(e) => setWholeSellerLocation(e.target.value)}
          required
        />
        <button type="submit">Add Wholesaler</button>
      </form>
      <form onSubmit={handlePurchaseDrug}>
        <input
          type="number"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          required
        />
        <button type="submit">Purchase Drug</button>
      </form>
      <form onSubmit={handleShipDrug}>
        <input
          type="number"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          required
        />
        <button type="submit">Ship Drug</button>
      </form>
      <button onClick={handleLogout} className="dashboard-button">
        Logout
      </button>
    </div>
  );
};

export default WholesalerDashboard;
// import React, { useState } from "react";
// import "../index.css";

// import {
//   addParticipant,
//   purchaseDrug,
//   shipDrug,
// } from "../utils/contractInteraction";

// const WholesalerDashboard = () => {
//   const [wholeSellerId, setWholeSellerId] = useState("");
//   const [wholeSellerCompany, setWholeSellerCompany] = useState("");
//   const [wholeSellerLocation, setWholeSellerLocation] = useState("");
//   const [drugId, setDrugId] = useState("");

//   const handleAddWholesaler = async (e) => {
//     e.preventDefault();
//     try {
//       await addParticipant("WholeSeller", wholeSellerId, {
//         wholeSellerId,
//         wholeSellerCompany,
//         wholeSellerLocation,
//         wholeSellerEthAddress: await window.ethereum
//           .request({ method: "eth_requestAccounts" })
//           .then((accounts) => accounts[0]),
//       });
//       alert("Wholesaler added successfully!");
//     } catch (error) {
//       console.error("Error adding wholesaler:", error);
//       alert("Failed to add wholesaler");
//     }
//   };

//   const handlePurchaseDrug = async (e) => {
//     e.preventDefault();
//     try {
//       await purchaseDrug(drugId);
//       alert("Drug purchased successfully!");
//     } catch (error) {
//       console.error("Error purchasing drug:", error);
//       alert("Failed to purchase drug");
//     }
//   };

//   const handleShipDrug = async (e) => {
//     e.preventDefault();
//     try {
//       await shipDrug(drugId);
//       alert("Drug shipped successfully!");
//     } catch (error) {
//       console.error("Error shipping drug:", error);
//       alert("Failed to ship drug");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2>Wholesaler Dashboard</h2>
//       <form onSubmit={handleAddWholesaler}>
//         <input
//           type="number"
//           placeholder="Wholesaler ID"
//           value={wholeSellerId}
//           onChange={(e) => setWholeSellerId(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={wholeSellerCompany}
//           onChange={(e) => setWholeSellerCompany(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={wholeSellerLocation}
//           onChange={(e) => setWholeSellerLocation(e.target.value)}
//           required
//         />
//         <button type="submit">Add Wholesaler</button>
//       </form>
//       <form onSubmit={handlePurchaseDrug}>
//         <input
//           type="number"
//           placeholder="Drug ID"
//           value={drugId}
//           onChange={(e) => setDrugId(e.target.value)}
//           required
//         />
//         <button type="submit">Purchase Drug</button>
//       </form>
//       <form onSubmit={handleShipDrug}>
//         <input
//           type="number"
//           placeholder="Drug ID"
//           value={drugId}
//           onChange={(e) => setDrugId(e.target.value)}
//           required
//         />
//         <button type="submit">Ship Drug</button>
//       </form>
//     </div>
//   );
// };

// export default WholesalerDashboard;
