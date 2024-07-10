import { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  // YT VERSION
  // const [redirect, setRedirect] = useState(false);
  // GPT VERSION
  const navigate = useNavigate();

  async function createNewPost(ev) {
    
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();

    // console.log(files);

    // YT VERSION  ->>>>>
    //   const response = await fetch('http://localhost:4000/post',{
    //     method:'POST',
    //     body: data,
    //   })
    //   // console.log(await response.json());
    //   if (response.ok) {
    //     setRedirect(true)
    //   }
    // }

    // if (redirect) {
    //   return <Navigate to={'/'}/>
    // }

    // GPT VERSION  ->>>>>
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        // value={files}
        onChange={(ev) => setFiles(ev.target.files)}
      />
      {/* <textarea name="description" cols={114} rows={20}></textarea> */}
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button style={{ marginTop: "10px" }}>Create Post</button>
    </form>
  );
}

export default CreatePost;
