import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AuthorProfile() {
    const { authorId } = useParams();
    const [authorInfo, setAuthorInfo] = useState(null);

    useEffect(() => {
        // fetch(`http://localhost:4000/author/${authorId}`)
        fetch(`https://api-asm-blog.vercel.app/author/${authorId}`)
            .then(response => response.json())
            .then(authorInfo => {
                setAuthorInfo(authorInfo);
            });
    }, [authorId]);

    if (!authorInfo) return null; // Render nothing until authorInfo is fetched

    return (
        <div className='author-profile'>
            <h1>Author Profile</h1>
            <h2>{authorInfo.username}</h2>
            {/* Display additional author information */}
        </div>
    );
}

export default AuthorProfile;
