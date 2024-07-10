// import { response } from 'express';
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    // console.log(id);
    // fetch(`http://localhost:4000/post/${id}`).then((response) => {
    fetch(`https://api-asm-blog.vercel.app/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  // v1
  // Format date in dd-mm-yyyy hh:mm:ss format
  //    const formattedDate = new Date(postInfo.createdAt).toLocaleString('en-GB', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit'
  // });

  //     return (
  //     <div className='post-page'>
  //       <h1>{postInfo.title}</h1>
  //       <time>{formattedDate}</time>
  //       {/* <time>{formatISO9075(new Date(postInfo.createdAt))}</time> */}
  //       <div className='author'>By @{postInfo.author.username}</div>
  //       <div className='image'>
  //       <img src={`http://localhost:4000/${postInfo.cover}`} alt=''/>
  //       </div>
  //       <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
  //     </div>
  //   )
  // }

  // v2
  const formattedDate = new Date(postInfo.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">
        by{" "}
        <Link
          to={
            `/author/${postInfo.author._id}` &&
            `/author/${postInfo.author.username}`
          }
        >
          {postInfo.author.username}
        </Link>{" "}
        - {formattedDate}
        {/* By {postInfo.author.username} - {formattedDate} */}
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit Post
          </Link>
        </div>
      )}
      <div className="image">
        {/* <img src={`http://localhost:4000/${postInfo.cover}`} alt="" /> */}
        <img src={`https://api-asm-blog.vercel.app/${postInfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}

export default PostPage;
