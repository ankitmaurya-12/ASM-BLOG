import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Header() {
    // const [username, setUsername] = useState(null);  //remove after adiing usercontext
    const{userInfo, setUserInfo} = useContext(UserContext);

    useEffect(() => {
        // fetch('http://localhost:4000/profile', {
        fetch('https://api-asm-blog.vercel.app/profile', {
            credentials: "include",
        }).then(response => {
            response.json().then(userInfo => {
                // setUsername(userInfo.username);  //remove after adding usercontext
                setUserInfo(userInfo);

            });
        });
    }, [setUserInfo]);



    const handleLogout = () => {
        // Add logout logic here
        // For example, make a POST request to logout endpoint
        // fetch('http://localhost:4000/logout', {
        fetch('https://api-asm-blog.vercel.app/logout', {
            method: 'POST',
            credentials: "include",
        }).then(() => {
            // After successful logout, you might want to redirect or update state
            setUserInfo(null);
        }).catch(error => {
            console.error('Logout failed:', error);
        });
    };

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">ASM-blog</Link>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Create</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
