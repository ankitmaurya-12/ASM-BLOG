import TimeAgo from 'react-time-ago';
import './timeAgoSetup'; // Import the locale setup file
import { Link } from 'react-router-dom';

export default function Post({_id, title, summary, content, cover, createdAt, author}) {
    return (
        //before getting data from backend 
        // <div className="post">
        //     <div className="image">
        //         <img src="https://techcrunch.com/wp-content/uploads/2024/06/X-rays-hohlraum.jpg?resize=768,489" alt="" />
        //     </div>
        //     <div className="texts">
        //         <h2>Star Wars lasers and waterfalls of molten salt: How Xcimer plans to make fusion power happen</h2>
        //         <p className="info">
        //             <a href='/author' className="author">Ankit Maurya</a>
        //             <time>2024-4-6 22:10</time>
        //         </p>
        //         <p className="summary">Conner Galloway and Alexander Valys have followed developments in nuclear fusion research since they were roommates at MIT.</p>
        //     </div>
        // </div>

        //after getting data from backend 
        // v2
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                <img src={`http://localhost:4000/${cover.replace(/\\/g, '/')}`} alt="Not Found" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a href='/author' className="author">{author.username}</a>
                    <time><TimeAgo date={new Date(createdAt)} /></time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>

        // v3
    //     <div>
    //   <h1>Posts</h1>
    //   {posts.map(post => (
    //     <div key={post._id}>
    //       <h2>{post.title}</h2>
    //       <p>{post.summary}</p>
    //       <p>By: {post.author.username}</p>
    //     </div>
    //   ))}
    // </div>
    );
}
