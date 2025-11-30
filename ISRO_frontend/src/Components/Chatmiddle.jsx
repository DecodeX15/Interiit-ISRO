// src/components/Chatmiddle.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";

export default function Chatmiddle() {
  const { theme } = useContext(ThemeContext);
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);
  const isDark = theme === "dark";
  const bg = isDark ? "bg-[#0d0d0f]" : "bg-[#F8F2E9]";
  const text = isDark ? "text-gray-200" : "text-gray-900";
  const border = isDark ? "border-gray-700" : "border-gray-300";

  const [tempPreview, setTempPreview] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const fileRef = useRef(null);

  // CLOUDINARY UPLOAD
  const uploadToCloudinary = async () => {
    if (!fileRef.current) {
      alert("No image selected!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", fileRef.current);
    formData.append("upload_preset", "unsigned_uploads");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyvolu8tc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Cloudinary Response:", data);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Upload failed!");
      return null;
    }
  };

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    if (finalImage) {
      alert("Only one image allowed. Remove current image first.");
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);

    if (tempPreview) URL.revokeObjectURL(tempPreview);

    fileRef.current = file;
    setTempPreview(url);
  };

  const confirm = async () => {
    setUploading(true);
    const cloudURL = await uploadToCloudinary();
    setUploading(false);
    if (!cloudURL) return;
    if (finalImage) URL.revokeObjectURL(finalImage);
    setFinalImage(tempPreview);
    setTempPreview(null);
    console.log("CLOUD URL:", cloudURL);
    sessions.forEach((item) => {
      if (item.sessionId === activeSessionId.sessionId) {
        console.log(item);
        console.log("match");
        item.publicImageURL = cloudURL;
      } else {
        console.log("no");
        console.log(item.sessionId);
        console.log(activeSessionId);
      }
    });
    if (sessions.length > 0) {
      localStorage.setItem("GeoNLI_Sessions", JSON.stringify(sessions));
      setFinalImage(null);
      setTempPreview(null);
      fileRef.current = null;
    }
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
    setDragActive(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const drop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  useEffect(() => {
    return () => {
      if (tempPreview) URL.revokeObjectURL(tempPreview);
      if (finalImage) URL.revokeObjectURL(finalImage);
    };
  }, []);

  if (!activeSessionId) {
    return (
      <div
        className={`h-full w-full flex items-center justify-center ${bg} ${text} overflow-hidden`}
      >
        <p className="opacity-60">
          No current chat. Please create or select a chat.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full flex items-center justify-center ${bg} ${text} overflow-hidden p-2`}
    >
      {activeSessionId.publicImageURL ? (
        <>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={activeSessionId.publicImageURL}
              alt="Uploaded"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={removeImage}
              className="absolute top-5 right-5 px-3 py-1 bg-red-600 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div
              onDragOver={dragOver}
              onDragLeave={dragLeave}
              onDrop={drop}
              className={`${border} ${
                dragActive
                  ? "shadow-[0_0_20px_rgba(0,150,255,0.4)] border-blue-500"
                  : ""
              }
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
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
            <p className="text-xs mt-4 opacity-50">
              Only one image allowed per session
            </p>
          </div>

          {tempPreview && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">
              <div
                className={`rounded-xl p-6 shadow-2xl ${
                  isDark ? "bg-[#141416]" : "bg-white"
                } w-[320px]`}
              >
                <p className="text-sm opacity-70 mb-3">
                  Preview selected image
                </p>

                <img
                  src={tempPreview}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-md border border-gray-600 mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={confirm}
                    disabled={uploading}
                    className={`flex-1 px-4 py-2 rounded-lg text-white 
                  ${
                    uploading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  >
                    {uploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </button>

                  <button
                    onClick={cancel}
                    disabled={uploading}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
