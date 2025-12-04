// src/components/Chatmiddle.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle, X } from "lucide-react";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";
import { useTheme } from "../Context/theme/Themecontext.jsx";

export default function Chatmiddle({boundingBoxes=[],onImageChange}) {
  const { darkMode } = useTheme();
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);

  const [tempPreview, setTempPreview] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const fileRef = useRef(null);
 const canvasRef = useRef(null);
  const imageRef = useRef(null);
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
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
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

    // Clear temp
    if (finalImage) URL.revokeObjectURL(finalImage);
    setFinalImage(tempPreview);
    setTempPreview(null);
    fileRef.current = null;

    const updated = sessions.map((s) => {
      if (s.sessionId === activeSessionId.sessionId) {
        return {
          ...s,
          publicImageURL: cloudURL,
        };
      }
      return s;
    });

    setSessions(updated);
    localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updated));

    setActiveSessionId({
      ...activeSessionId,
      publicImageURL: cloudURL,
    });
  };

  const cancel = () => {
    if (tempPreview) URL.revokeObjectURL(tempPreview);
    setTempPreview(null);
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
  }, [tempPreview, finalImage]);

 useEffect(() => {
    if (activeSessionId?.publicImageURL && boundingBoxes.length > 0 && imageRef.current) {
      drawBoundingBoxes();
    }
    
    
  }, [boundingBoxes,activeSessionId?.publicImageURL]);
    useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    onImageChange?.();
  }, [activeSessionId?.publicImageURL]);
const drawBoundingBoxes = () => {
  console.log("Drawing bounding boxes:", boundingBoxes);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
      const img = imageRef.current;

    if (!img || !img.complete) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
const colors = ['#f97316', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];
    // Draw image
    // ctx.drawImage(img, 0, 0);
 ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw boxes
    boundingBoxes.forEach((box, idx) => {
      console.log(box.obbox);
      const [cx, cy, w, h, angle] = box.obbox;
      const x = cx * canvas.width;
      const y = cy * canvas.height;
      const width = w * canvas.width;
      const height = h * canvas.height;
      
     ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      
      const color = colors[idx % colors.length];
      ctx.strokeStyle =color;
      ctx.lineWidth = 3;
      ctx.strokeRect(-width / 2, -height / 2, width, height);
      ctx.restore();
    });
  };

   const handleImageLoad = () => {
    if (canvasRef.current && imageRef.current && boundingBoxes.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;
      drawBoundingBoxes();
    }
  };


  // No active session state
  if (!activeSessionId) {
    return (
      <div className={`h-full w-full flex flex-col items-center justify-center p-8 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-200'
        }`}>
          <ImageIcon className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
        </div>
        <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          No Active Session
        </p>
        <p className={`text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Select a session or create a new one to begin analyzing satellite imagery
        </p>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full flex items-center justify-center overflow-hidden ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {activeSessionId.publicImageURL ? (
        // Image Display with Bounding Boxes
      <div className="relative w-full h-full flex items-center justify-center p-8">
          {boundingBoxes.length > 0 ? (
            <div className="relative">
              <img
                ref={imageRef}
                src={activeSessionId.publicImageURL}
                alt="Satellite imagery"
                onLoad={handleImageLoad}
                className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-2 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              />
              <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 max-w-full max-h-full object-contain rounded-2xl`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
          ) : (
            <img
              src={activeSessionId.publicImageURL}
              alt="Satellite imagery"
              className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-2 ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            />
          )}
        </div>
      ) : (
        // Upload Area
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div
              onDragOver={dragOver}
              onDragLeave={dragLeave}
              onDrop={drop}
              onClick={() => fileInputRef.current.click()}
              className={`
                relative w-full max-w-2xl h-96 rounded-2xl border-2 border-dashed
                flex flex-col items-center justify-center gap-6 cursor-pointer
                transition-all duration-300 group
                ${dragActive
                  ? darkMode
                    ? 'border-orange-500 bg-orange-600/10 shadow-lg shadow-orange-500/20'
                    : 'border-orange-400 bg-orange-50 shadow-lg shadow-orange-400/20'
                  : darkMode
                  ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                }
              `}
            >
              {/* Upload Icon */}
              <div className={`
                w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
                ${dragActive
                  ? darkMode ? 'bg-orange-600/20' : 'bg-orange-200'
                  : darkMode ? 'bg-gray-800 group-hover:bg-gray-700' : 'bg-gray-200 group-hover:bg-gray-300'
                }
              `}>
                <Upload className={`w-10 h-10 transition-transform group-hover:scale-110 ${
                  dragActive
                    ? darkMode ? 'text-orange-400' : 'text-orange-600'
                    : darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
              </div>

              {/* Text */}
              <div className="text-center px-6">
                <p className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dragActive ? 'Drop your image here' : 'Upload Satellite Image'}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drag and drop an image file, or click to browse
                </p>
                <p className={`text-xs mt-3 ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                  Supports: JPG, PNG, TIFF • Max resolution: 2048x2048
                </p>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </div>

          {/* Preview Modal */}
          {tempPreview && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md p-8 z-50">
  <div className={`
    relative
    rounded-2xl shadow-2xl w-full max-w-lg
    flex flex-col
    max-h-[90vh]
    ${darkMode ? 'bg-gray-900/95 border-2 border-gray-700' : 'bg-white/95 border-2 border-gray-300'}
  `}>
    {/* Header */}
    <div className={`px-6 py-4 border-b shrink-0 flex items-center justify-between ${
      darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          darkMode ? 'bg-orange-600/20' : 'bg-orange-100'
        }`}>
          <ImageIcon className={`w-5 h-5 ${
            darkMode ? 'text-orange-400' : 'text-orange-600'
          }`} />
        </div>
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Preview Image
        </h3>
      </div>
      <button
        onClick={cancel}
        disabled={uploading}
        className={`p-2 rounded-lg transition-colors ${
          darkMode
            ? 'hover:bg-gray-700 text-gray-400'
            : 'hover:bg-gray-200 text-gray-600'
        }`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Image Preview - Scrollable */}
    <div className="p-6 flex-1 overflow-y-auto min-h-0">
      <div className={`relative rounded-xl overflow-hidden border-2 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <img
          src={tempPreview}
          alt="Preview"
          className="w-full h-auto max-h-[30vh] object-contain"
        />
      </div>

      <p className={`text-sm mt-4 text-center ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Ready to upload and analyze this image?
      </p>
    </div>

    {/* Actions */}
    <div className={`px-6 py-4 border-t shrink-0 flex gap-3 ${
      darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
    }`}>
      <button
        onClick={cancel}
        disabled={uploading}
        className={`
          flex-1 px-5 py-3 rounded-xl font-semibold transition-all border-2
          ${darkMode
            ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
            : 'border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        Cancel
      </button>
      <button
        onClick={confirm}
        disabled={uploading}
        className='
          flex-1 px-5 py-3 rounded-xl font-semibold text-white transition-all
          shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border-orange-700 border-2
          transform hover:scale-105 active:scale-95
          bg-orange-600/40 hover:bg-orange-600/80'
           
      >
        {uploading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Uploading...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Confirm & Upload
          </span>
        )}
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