import { useState } from 'react';


export default function RegisterPage() {
    const [authorname, setAuthorname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        ev.preventDefault();

        // const response = await fetch("http://localhost:4000/register", {
        const response = await fetch("https://api-asm-blog.vercel.app/register", {
            method: 'POST',
            body: JSON.stringify({ authorname, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        // if (response.ok) {
            //     alert('Registration Successful.');
            // } else {
                //     const errorDetails = await response.json();
                //     alert(`Registration Failed: ${errorDetails.error}`);
                //     console.error('Error details:', errorDetails.details); // Log error details
                // }
                
            if (response.ok) {
            alert('Registration Successful.');
            // const data = await response.json();
            // alert(data.message);
            // history.push('/login'); // Redirect to login page
          } else {
            const errorDetails = await response.json();
            alert(`Registration Failed: ${errorDetails.error}`);
            console.error('Error details:', errorDetails.details); // Log error details
          }
    }

    // return (
    //     <form className="register" onSubmit={register}>
    //         <h1>Register</h1>
    //         <input 
    //             type="text" 
    //             placeholder="username" 
    //             value={username} 
    //             onChange={ev => setUsername(ev.target.value)} 
    //         />
    //         <input 
    //             type="password" 
    //             placeholder="password" 
    //             value={password} 
    //             onChange={ev => setPassword(ev.target.value)} 
    //         />
    //         <button>Register</button>
    //     </form>
    // );

    return (
        <form className="register" onSubmit={register}>
          <h1>Register</h1>
    
          <div className="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <input
              type="text"
              placeholder="authorname"
              value={authorname}
              onChange={(ev) => setAuthorname(ev.target.value)}
            />
          </div>
    
          <div className="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className='icon'
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
    
          <div className="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
    
          <button>Register</button>
        </form>
      );
}
