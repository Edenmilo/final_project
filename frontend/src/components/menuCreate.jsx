import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {
  const [editorHtml, setEditorHtml] = useState(`
    <h2>Breakfast:</h2>
    <br/>
    <br/>
    <br/>
    <h2>Lunch:</h2>
    <br/>
    <br/>
    <br/>
    <h2>Dinner:</h2>

  `);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
          ],
        }}
        formats={[
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image', 'video'
        ]}
      />
    </div>
  );
};

export default MyEditor;
