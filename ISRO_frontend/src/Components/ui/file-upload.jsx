// src/components/Chatmiddle.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";

export default function Chatmiddle() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const bg = isDark ? "bg-[#0d0d0f]" : "bg-[#f9f9f9]";
  const text = isDark ? "text-gray-200" : "text-gray-900";
  const border = isDark ? "border-gray-700" : "border-gray-300";

  const [tempPreview, setTempPreview] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const fileRef = useRef(null);

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;

    // Allow only ONE image.
    if (finalImage) {
      alert("Only one image allowed. Remove the current image first.");
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);

    // If temp exists, revoke it
    if (tempPreview) URL.revokeObjectURL(tempPreview);

    fileRef.current = file;
    setTempPreview(url);
  };

  const confirm = () => {
    if (finalImage) URL.revokeObjectURL(finalImage);
    setFinalImage(tempPreview);
    setTempPreview(null);
  };

  const cancel = () => {
    URL.revokeObjectURL(tempPreview);
    setTempPreview(null);
    fileRef.current = null;
  };

  const removeImage = () => {
    if (finalImage) URL.revokeObjectURL(finalImage);
    setFinalImage(null);
    fileRef.current = null;
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  useEffect(() => {
    return () => {
      if (tempPreview) URL.revokeObjectURL(tempPreview);
      if (finalImage) URL.revokeObjectURL(finalImage);
    };
  }, []);

  return (
    <div
      className={`relative h-full w-full flex items-center justify-center ${bg} ${text} overflow-hidden`}
    >

      {/* FINAL IMAGE */}
      {finalImage && !tempPreview && (
        <img
          src={finalImage}
          alt="Uploaded"
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      )}

      {/* IF NO IMAGE */}
      {!finalImage && !tempPreview && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={drop}
            className={`${border} ${dragActive ? "shadow-[0_0_20px_rgba(0,150,255,0.4)] border-blue-500" : ""} 
              border-2 border-dashed rounded-xl w-[400px] max-w-[85%] h-[220px] flex 
              flex-col items-center justify-center gap-3 cursor-pointer transition`}
            onClick={() => fileInputRef.current.click()}
          >
            <p className="text-lg font-medium opacity-80">
              Drag & drop an image
            </p>
            <p className="text-sm opacity-60">or click to browse</p>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          <p className="text-xs mt-4 opacity-50">
            Only one image is allowed per session
          </p>
        </div>
      )}

      {/* TEMP PREVIEW MODE */}
      {tempPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">
          <div className={`rounded-xl p-6 shadow-2xl ${isDark ? "bg-[#141416]" : "bg-white"} w-[320px]`}>
            <p className="text-sm opacity-70 mb-3">Preview selected image</p>

            <img
              src={tempPreview}
              alt="Preview"
              className="w-full h-48 object-contain rounded-md border border-gray-600 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={confirm}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                Continue
              </button>
              <button
                onClick={cancel}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOLBAR (when final image exists) */}
      {finalImage && (
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-3 py-1 bg-gray-800/60 hover:bg-gray-800 text-white rounded-md text-sm"
          >
            Replace
          </button>

          <button
            onClick={removeImage}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
          >
            Remove
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  );
}
