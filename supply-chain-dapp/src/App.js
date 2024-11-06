import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import WholesalerDashboard from "./pages/WholesalerDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/manufacturer" element={<ManufacturerDashboard />} />
              <Route path="/wholesaler" element={<WholesalerDashboard />} />
              <Route path="/distributor" element={<DistributorDashboard />} />
              <Route path="/pharmacy" element={<PharmacyDashboard />} />
              <Route path="/consumer" element={<ConsumerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
// import React from "react";
// import abi from "./utils/SupplyChain.json";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import ManufacturerDashboard from "./pages/ManufacturerDashboard";
// import WholesalerDashboard from "./pages/WholesalerDashboard";
// import DistributorDashboard from "./pages/DistributorDashboard";
// import PharmacyDashboard from "./pages/PharmacyDashboard";
// import ConsumerDashboard from "./pages/ConsumerDashboard";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/manufacturer" element={<ManufacturerDashboard />} />
//             <Route path="/wholesaler" element={<WholesalerDashboard />} />
//             <Route path="/distributor" element={<DistributorDashboard />} />
//             <Route path="/pharmacy" element={<PharmacyDashboard />} />
//             <Route path="/consumer" element={<ConsumerDashboard />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
