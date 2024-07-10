// version 1:

// import { useState } from "react";
// import { Navigate, redirect } from "react-router-dom";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   async function login(ev) {
//     ev.preventDefault();
//     // try {
//       const response = await fetch('http://localhost:4000/login', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//         credentials:'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('Login successful!');
//         console.log('Login data:', data);
//         setRedirect(true);
//       } else {
//         alert('Login failed!');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('Check your username and password and retry again.');
//     }
//   }

//   if(redirect){
//     return <Navigate to={'/'}/>
//   }

//   return (
//     <form className="login" onSubmit={login}>
//       <h1>Login</h1>
//       <input
//         type="text"
//         placeholder="username"
//         value={username}
//         onChange={ev => setUsername(ev.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="password"
//         value={password}
//         onChange={ev => setPassword(ev.target.value)}
//       />
//       <button>Login</button>
//     </form>
//   );
// }


// version 2:

// import { useState } from "react";
// import { Navigate } from "react-router-dom";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   async function login(ev) {
//     ev.preventDefault();
//     try {
//       const response = await fetch('http://localhost:4000/login', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('Login successful!');
//         console.log('Login data:', data);
//         setRedirect(true);
//       } else {
//         alert('Login failed!');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('Check your username and password and retry again.');
//     }
//   }

//   if (redirect) {
//     return <Navigate to='/' />;
//   }

//   return (
//     <form className="login" onSubmit={login}>
//       <h1>Login</h1>
//       <input
//         type="text"
//         placeholder="username"
//         value={username}
//         onChange={ev => setUsername(ev.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="password"
//         value={password}
//         onChange={ev => setPassword(ev.target.value)}
//       />
//       <button>Login</button>
//     </form>
//   );
// }

// Version 3:
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    try {
      // Check if username and password are provided
      if (!username || !password) {
        setError("Username and password are required.");
        return;
      }

      // const response = await fetch('http://localhost:4000/login', {
      const response = await fetch('https://api-asm-blog.vercel.app/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
          setRedirect(true);
          alert('Login successful!');
        });
      } else if (response.status === 404) {
        const data = await response.json();
        if (data.error === "User not found") {
          setError("No user found. Kindly register first.");
        } else {
          setError("Login failed. Please try again later.");
        }
      } else if (response.status === 401) {
        setError("Wrong password. Please try again.");
      } else {
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("An error occurred. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

//   
return (
  <form className="login" onSubmit={login}>
    <h1>Login</h1>
    {error && <p className="error">{error}</p>}

    <div className="input-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
    </div>

    <div className="input-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
    </div>

    <button>Login</button>

    
  </form>
);

}
