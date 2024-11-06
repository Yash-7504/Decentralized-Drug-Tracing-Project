import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    "Manufacturer",
    "Wholesaler",
    "Distributor",
    "Pharmacy",
    "Consumer",
  ];

  return (
    <div className="home">
      <h1>Welcome to the Supply Chain DApp</h1>

      {!selectedRole ? (
        <>
          <p>Select your role:</p>
          <ul>
            {roles.map((role) => (
              <li key={role}>
                <button onClick={() => setSelectedRole(role.toLowerCase())}>
                  {role}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="selected-role">
          <p>You selected: {selectedRole}</p>
          <p>Please register or login to continue:</p>
          <div className="selected-role-actions">
            <Link to={`/register?role=${selectedRole}`}>Register</Link>
            <Link to={`/login?role=${selectedRole}`}>Login</Link>
            <button
              className="change-role-btn"
              onClick={() => setSelectedRole(null)}
            >
              Change Role
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../index.css";

// const Home = () => {
//   const [selectedRole, setSelectedRole] = useState(null);

//   const roles = [
//     "Manufacturer",
//     "Wholesaler",
//     "Distributor",
//     "Pharmacy",
//     "Consumer",
//   ];

//   return (
//     <div className="home">
//       <h1>Welcome to the Supply Chain DApp</h1>

//       {!selectedRole ? (
//         <>
//           <p>Select your role:</p>
//           <ul>
//             {roles.map((role) => (
//               <li key={role}>
//                 <button onClick={() => setSelectedRole(role.toLowerCase())}>
//                   {role}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <div className="selected-role">
//           <p>You selected: {selectedRole}</p>
//           <p>Please register or login to continue:</p>
//           <div>
//             <Link to={`/register?role=${selectedRole}`}>
//               <button>Register</button>
//             </Link>
//             <Link to={`/login?role=${selectedRole}`}>
//               <button>Login</button>
//             </Link>
//           </div>
//           <button
//             className="change-role-btn"
//             onClick={() => setSelectedRole(null)}
//           >
//             Change Role
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../index.css";

// const Home = () => {
//   return (
//     <div className="home">
//       <h1>Welcome to the Supply Chain DApp</h1>
//       <p>Select your role:</p>
//       <ul>
//         <li>
//           <Link to="/manufacturer">Manufacturer</Link>
//         </li>
//         <li>
//           <Link to="/wholesaler">Wholesaler</Link>
//         </li>
//         <li>
//           <Link to="/distributor">Distributor</Link>
//         </li>
//         <li>
//           <Link to="/pharmacy">Pharmacy</Link>
//         </li>
//         <li>
//           <Link to="/consumer">Consumer</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Home;
