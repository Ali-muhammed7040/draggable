// import React, { useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Quill from "quill";
// import QuillImageDropAndPaste from "quill-image-drop-and-paste";
// import CustomImageResize from "./CustomImageResize";

// Quill.register("modules/customImageResize", CustomImageResize);
// Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

// const QuillWithDraggableImage = () => {
//   const editorRef = useRef(null);
//   function imageHandler(imageDataUrl, type, imageData) {
//     const blob = imageData.toBlob();
//     const file = imageData.toFile();

//     // generate a form data
//     const formData = new FormData();

//     // append blob data
//     formData.append("file", blob);

//     // or just append the file
//     formData.append("file", file);
//   }
//   useEffect(() => {
//     const quill = editorRef.current.getEditor();

//     const handleDrop = (event) => {
//       event.preventDefault();
//       event.stopPropagation();

//       const file = event.dataTransfer.files[0];
//       if (file && file.type.startsWith("image/")) {
//         const range = quill.getSelection();
//         const reader = new FileReader();
//         reader.onload = () => {
//           const dataURL = reader.result;
//           quill.clipboard.dangerouslyPasteHTML(
//             range.index,
//             `<img src="${dataURL}" />`
//           );
//           quill.setSelection(range.index + 1, "silent");
//         };
//         reader.readAsDataURL(file);
//       }
//     };

//     quill.root.addEventListener("drop", handleDrop);

//     return () => {
//       quill.root.removeEventListener("drop", handleDrop);
//     };
//   }, []);

//   return (
//     <div>
//       <ReactQuill
//         ref={editorRef}
//         theme='snow'
//         modules={{
//           toolbar: [
//             [{ header: [1, 2, false] }],
//             ["bold", "italic", "underline"],
//             ["image", "link"],
//             ["clean"],
//           ],
//           imageDropAndPaste: {
//             // add an custom image handler
//             handler: imageHandler,
//           },
//         }}
//         placeholder='Compose an epic...'
//         clipboard={{ matchVisual: false }}
//       />
//     </div>
//   );
// };

// export default QuillWithDraggableImage;
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

const ImageDropTarget = ({ onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      if (onDrop && monitor.getItem().files) {
        onDrop(monitor.getItem().files);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "100px",
        border: "2px dashed #ccc",
        textAlign: "center",
        lineHeight: "100px",
        backgroundColor: isOver && canDrop ? "#f0f0f0" : "transparent",
      }}
    >
      Drop image here
    </div>
  );
};

const ImageDropComponent = ({ editor }) => {
  const onDrop = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const range = editor.getSelection(true);
        const index = range.index + range.length;
        editor.insertEmbed(index, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return <ImageDropTarget onDrop={onDrop} />;
};

const QuillWithDraggableImage = () => {
  const [editorHtml, setEditorHtml] = useState("");

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
  };

  const formats = [
    "header",
    "font",
    "size",
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
    "video",
  ];

  return (
    <div>
      <ReactQuill
        theme='snow'
        modules={modules}
        formats={formats}
        value={editorHtml}
        onChange={setEditorHtml}
        placeholder='Write something amazing...'
        // Pass the ImageDropComponent as a custom module component
        // modules={{ ...modules, imageDropComponent: ImageDropComponent }}
      />
    </div>
  );
};

export default QuillWithDraggableImage;
