import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function IndexPage() {

    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //   fetch('http://localhost:4000/post').then(response => {
    //     response.json().then(posts =>{
    //         // console.log(posts);
    //         setPosts(posts);
    //     });
    //   });
    // }, []);

    useEffect(() => {
        fetch('http://localhost:4000/post')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => setPosts(data))
          .catch(error => console.error('There was a problem with the fetch operation:', error));
      }, []);

      
    return(
        <>
        {/* <Post/> */}

        {posts.length > 0 && posts.map(posts =>(
            <Post {...posts} />
        ))}
        </>
    )
}