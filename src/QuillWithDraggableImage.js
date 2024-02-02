// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import Draggable from "react-draggable";
// import "react-quill/dist/quill.snow.css";

// const DragImage = ({ src, position, setPosition }) => {
//   const handleDrag = (e, ui) => {
//     setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
//   };

//   return (
//     <Draggable position={position} onDrag={handleDrag}>
//       <img src={src} alt='Draggable Image' />
//     </Draggable>
//   );
// };

// const QuillWithDraggableImage = () => {
//   const [editorHtml, setEditorHtml] = useState("");
//   const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
//   const quillRef = useRef(null);

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: "1" }, { header: "2" }, { font: [] }],
//         [{ size: [] }],
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [
//           { list: "ordered" },
//           { list: "bullet" },
//           { indent: "-1" },
//           { indent: "+1" },
//         ],
//         ["link", "image", "video"],
//         ["clean"],
//       ],
//     },
//     clipboard: {
//       matchVisual: false,
//     },
//   };

//   return (
//     <div>
//       <ReactQuill
//         value={editorHtml}
//         onChange={setEditorHtml}
//         modules={modules}
//         ref={quillRef} // Assign quillRef to the ReactQuill component
//       />
//       {editorHtml.includes("<img") && (
//         <DragImage
//           src={editorHtml.match(/src="([^"]+)"/)[1]}
//           position={imagePosition}
//           setPosition={setImagePosition}
//         />
//       )}
//     </div>
//   );
// };

// export default QuillWithDraggableImage;

import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import Draggable from "react-draggable";
import "react-quill/dist/quill.snow.css";

const DraggableContent = ({ content, position, setPosition }) => {
  const handleDrag = (e, ui) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  return (
    <Draggable position={position} onDrag={handleDrag}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Draggable>
  );
};

const QuillWithDraggableContent = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [contentPosition, setContentPosition] = useState({ x: 0, y: 0 });
  const quillRef = useRef(null);

  useEffect(() => {
    // Initialize Quill modules, formats, etc.
  }, []);

  const handleContentDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const html = `<img src="${reader.result}" alt="Inserted Image" />`;
          setEditorHtml(html);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div onDrop={handleContentDrop} onDragOver={(e) => e.preventDefault()}>
      <ReactQuill
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
        ref={quillRef}
      />
      {editorHtml && (
        <DraggableContent
          content={editorHtml}
          position={contentPosition}
          setPosition={setContentPosition}
        />
      )}
    </div>
  );
};

export default QuillWithDraggableContent;
