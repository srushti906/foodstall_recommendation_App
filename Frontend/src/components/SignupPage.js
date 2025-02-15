// // src/components/SignupPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginSignup.css';

// const SignupPage = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();

//     // Example mock signup
//     if (username && email && password.length >= 6) {
//       alert("Signup Successful! You can now login.");
//       navigate('/login');
//     } else {
//       alert("Please fill all fields and ensure password is at least 6 characters.");
//     }
//   };

//   return (
//     <div className="login-signup-page">
//       <h2>Signup</h2>
//       <form onSubmit={handleSignup}>
//         <div className="input-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
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
//         <button type="submit" className="btn-custom">Sign Up</button>
//       </form>
//       <p>Already have an account? <a href="/login">Log in</a></p>
//     </div>
//   );
// };

// export default SignupPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState([]); // State to hold preferences
  const [preferenceInput, setPreferenceInput] = useState(''); // Temporary input for a single preference
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle adding a preference
  const handleAddPreference = () => {
    if (preferenceInput) {
      setPreferences([...preferences, preferenceInput]);
      setPreferenceInput(''); // Clear input after adding
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to backend
      const response = await axios.post('/api/users/', {
        username,
        email,
        password,
        preferences, // Send preferences array to the backend
      });

      // On success, navigate to login page
      alert('Signup Successful! You can now login.');
      navigate('/login');
    } catch (err) {
      // Handle errors
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-signup-page">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="input-group">
          <label>Preferences:</label>
          <input
            type="text"
            value={preferenceInput}
            onChange={(e) => setPreferenceInput(e.target.value)}
          />
          <button type="button" onClick={handleAddPreference}>Add Preference</button>
          <ul>
            {preferences.map((pref, index) => (
              <li key={index}>{pref}</li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn-custom">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default SignupPage;
