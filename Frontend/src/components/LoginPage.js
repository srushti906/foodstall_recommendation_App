// // src/components/LoginPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginSignup.css';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Example mock login validation
//     if (email === "test@example.com" && password === "password123") {
//       alert("Login Successful!");
//       navigate('/');
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="login-signup-page">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="input-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn-custom">Login</button>
//       </form>
//       <p>Don't have an account? <a href="/signup">Sign up</a></p>
//     </div>
//   );
// };

// export default LoginPage;
// src/components/LoginPage.js
import React, { useState , useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './LoginSignup.css';
import { useUser } from './UserContext'; // Adjust path if necessary
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('/api/users/login', { email, password }); // Send login request
      const userData = response.data; // Get user data from response
      console.log(userData);
      alert(`Login Successful! Welcome ${userData.username}`); // Welcome message
      setUser(userData);
      localStorage.setItem('isLoggedIn', 'true');

      // Optionally, you can store user data in local storage or context
      localStorage.setItem('user', JSON.stringify(userData)); // Example of storing user data
      navigate('/'); // Navigate to home page
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid Credentials'); // Show error message
    }
  };

  return (
    <div className="login-signup-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-custom">Login</button>
      </form>
      <p>Don't have an account? <a href='/signup'><b>Signup</b></a>
     </p>
    </div>
  );
};

export default LoginPage;
