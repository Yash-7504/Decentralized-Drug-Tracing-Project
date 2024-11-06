import React, { useState } from "react";
import {
  addParticipant,
  getDrugDetails,
  traceDrug,
} from "../utils/contractInteraction";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ConsumerDashboard = () => {
  const [consumerId, setConsumerId] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [drugId, setDrugId] = useState("");
  const [drugDetails, setDrugDetails] = useState(null);
  const [drugTrace, setDrugTrace] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAddConsumer = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to add consumer...");
      console.log("Consumer ID:", consumerId);
      console.log("Consumer Name:", consumerName);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);

      await addParticipant("Consumer", consumerId, {
        consumerId,
        consumerName,
        consumerEthAddress: accounts[0],
      });
      console.log("Consumer added successfully!");
      alert("Consumer added successfully!");
    } catch (error) {
      console.error("Detailed error in handleAddConsumer:", error);
      alert(`Failed to add consumer: ${error.message}`);
    }
  };

  const handleGetDrugDetails = async (e) => {
    e.preventDefault();
    try {
      console.log("Getting details for Drug ID:", drugId);
      const details = await getDrugDetails(drugId);
      console.log("Drug details received:", details);
      setDrugDetails(details);
    } catch (error) {
      console.error("Error getting drug details:", error);
      alert(`Failed to get drug details: ${error.message}`);
    }
  };

  const handleTraceDrug = async (e) => {
    e.preventDefault();
    try {
      console.log("Tracing Drug ID:", drugId);
      const trace = await traceDrug(drugId);
      console.log("Drug trace received:", trace);
      setDrugTrace(trace);
    } catch (error) {
      console.error("Error tracing drug:", error);
      alert(`Failed to trace drug: ${error.message}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Consumer Dashboard</h2>
      <form onSubmit={handleAddConsumer}>
        <input
          type="number"
          placeholder="Consumer ID"
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Consumer Name"
          value={consumerName}
          onChange={(e) => setConsumerName(e.target.value)}
          required
        />
        <button type="submit">Add Consumer</button>
      </form>
      <form onSubmit={handleGetDrugDetails}>
        <input
          type="number"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          required
        />
        <button type="submit">Get Drug Details</button>
      </form>
      <form onSubmit={handleTraceDrug}>
        <input
          type="number"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          required
        />
        <button type="submit">Trace Drug</button>
      </form>
      {drugDetails && (
        <div className="drug-details">
          <h3>Drug Details:</h3>
          <p>ID: {drugDetails[0].toString()}</p>
          <p>Name: {drugDetails[1]}</p>
          <p>Stage: {drugDetails[2].toString()}</p>
          <p>Owner: {drugDetails[3]}</p>
          <p>
            Timestamp:{" "}
            {new Date(drugDetails[4].toNumber() * 1000).toLocaleString()}
          </p>
        </div>
      )}
      {drugTrace && (
        <div className="drug-trace">
          <h3>Drug Trace:</h3>
          {drugTrace.map((transfer, index) => (
            <div key={index}>
              <p>From: {transfer.from}</p>
              <p>To: {transfer.to}</p>
              <p>Stage: {transfer.stage.toString()}</p>
              <p>
                Timestamp:{" "}
                {new Date(
                  transfer.timestamp.toNumber() * 1000
                ).toLocaleString()}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
      <button onClick={handleLogout} className="dashboard-button">
        Logout
      </button>
    </div>
  );
};

export default ConsumerDashboard;
// import React, { useState } from "react";
// import {
//   addParticipant,
//   getDrugDetails,
//   traceDrug,
// } from "../utils/contractInteraction";
// import "../index.css";

// const ConsumerDashboard = () => {
//   const [consumerId, setConsumerId] = useState("");
//   const [consumerName, setConsumerName] = useState("");
//   const [drugId, setDrugId] = useState("");
//   const [drugDetails, setDrugDetails] = useState(null);
//   const [drugTrace, setDrugTrace] = useState(null);

//   const handleAddConsumer = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Attempting to add consumer...");
//       console.log("Consumer ID:", consumerId);
//       console.log("Consumer Name:", consumerName);

//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       console.log("Connected account:", accounts[0]);

//       await addParticipant("Consumer", consumerId, {
//         consumerId,
//         consumerName,
//         consumerEthAddress: accounts[0],
//       });
//       console.log("Consumer added successfully!");
//       alert("Consumer added successfully!");
//     } catch (error) {
//       console.error("Detailed error in handleAddConsumer:", error);
//       alert(`Failed to add consumer: ${error.message}`);
//     }
//   };

//   const handleGetDrugDetails = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Getting details for Drug ID:", drugId);
//       const details = await getDrugDetails(drugId);
//       console.log("Drug details received:", details);
//       setDrugDetails(details);
//     } catch (error) {
//       console.error("Error getting drug details:", error);
//       alert(`Failed to get drug details: ${error.message}`);
//     }
//   };

//   const handleTraceDrug = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Tracing Drug ID:", drugId);
//       const trace = await traceDrug(drugId);
//       console.log("Drug trace received:", trace);
//       setDrugTrace(trace);
//     } catch (error) {
//       console.error("Error tracing drug:", error);
//       alert(`Failed to trace drug: ${error.message}`);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2>Consumer Dashboard</h2>
//       <form onSubmit={handleAddConsumer}>
//         <input
//           type="number"
//           placeholder="Consumer ID"
//           value={consumerId}
//           onChange={(e) => setConsumerId(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Consumer Name"
//           value={consumerName}
//           onChange={(e) => setConsumerName(e.target.value)}
//           required
//         />
//         <button type="submit">Add Consumer</button>
//       </form>
//       <form onSubmit={handleGetDrugDetails}>
//         <input
//           type="number"
//           placeholder="Drug ID"
//           value={drugId}
//           onChange={(e) => setDrugId(e.target.value)}
//           required
//         />
//         <button type="submit">Get Drug Details</button>
//       </form>
//       <form onSubmit={handleTraceDrug}>
//         <input
//           type="number"
//           placeholder="Drug ID"
//           value={drugId}
//           onChange={(e) => setDrugId(e.target.value)}
//           required
//         />
//         <button type="submit">Trace Drug</button>
//       </form>
//       {drugDetails && (
//         <div className="drug-details">
//           <h3>Drug Details:</h3>
//           <p>ID: {drugDetails[0].toString()}</p>
//           <p>Name: {drugDetails[1]}</p>
//           <p>Stage: {drugDetails[2].toString()}</p>
//           <p>Owner: {drugDetails[3]}</p>
//           <p>
//             Timestamp:{" "}
//             {new Date(drugDetails[4].toNumber() * 1000).toLocaleString()}
//           </p>
//         </div>
//       )}
//       {drugTrace && (
//         <div className="drug-trace">
//           <h3>Drug Trace:</h3>
//           {drugTrace.map((transfer, index) => (
//             <div key={index}>
//               <p>From: {transfer.from}</p>
//               <p>To: {transfer.to}</p>
//               <p>Stage: {transfer.stage.toString()}</p>
//               <p>
//                 Timestamp:{" "}
//                 {new Date(
//                   transfer.timestamp.toNumber() * 1000
//                 ).toLocaleString()}
//               </p>
//               <hr />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConsumerDashboard;
