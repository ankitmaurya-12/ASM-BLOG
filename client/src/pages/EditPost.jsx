import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

function EditPost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(''); // Use null for initial state of files
  const [redirect, setRedirect] = useState(false);

  const { postId } = useParams(); // Assuming you're using useParams to get postId from URL

  if(redirect){
    return <Navigate to={'/post/'+ postId}/>
  }
  
  useEffect(()=>{
    fetch('http://localhost:4000/post/'+ postId)
    .then(response=>{
      response.json().then(postInfo =>{
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        // setFiles(postInfo.files);
      });
    })
  },[]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files?.[0]);

    if(files?.[0]){
      data.set('file', files?.[0]);
    }

    await fetch('http://localhost:4000/post',{
      method: 'PUT',
      body :data,
    });
    setRedirect(true);
  }

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
        <button style={{ marginTop: '10px' }}>Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
