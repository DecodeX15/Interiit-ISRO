import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Play,
  Copy,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileJson,
  Image,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../Context/theme/Themecontext";
const ChatEvalModeee = () => {
  const [jsonInput, setJsonInput] = useState(`
 {
	"input_image": {
    "image_id": "sample2.png",
    "image_url": "https://bit.ly/4oYfvr0",
    "metadata": {
        "width": 512,
        "height": 512,
        "spatial_resolution_m": 1.57
}
    },
    "queries": {
        "caption_query": {
            "instruction": "Generate a detailed caption describing all visible elements in the satellite image, including object types, counts, relative locations, and overall scene context."
        },
        "grounding_query": {
            "instruction": "Locate and return oriented bounding boxes for the ground track field seen in the image."
        },
        "attribute_query": {
            "binary": {
                "instruction": "Is there any aeroplane in the scene?"
            },
            "numeric": {
                "instruction": "What is the area of the blue region in the larger swimming pool in meters square?"
            },
            "semantic": {
                "instruction": "What is the color of the building on the top right side of the larger swimming pool?"
            }
        }
    }
}
  `);
  const [copied, setCopied] = useState(false);
  const { darkMode } = useTheme();
  const [jsonOutput, setJsonOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // API call for processing
  const executeEvaluation = async () => {
    setIsProcessing(true);
    setStatus(null);
    const startTime = Date.now();

    try {
      // Parse input JSON
      const input = JSON.parse(jsonInput);
      console.log(input);
      const API = import.meta.env.VITE_BACKEND_ENDPOINT;

      setImageUrl(input.input_image.image_url);
      const response = await fetch(`${API}/api/evaluation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const outputJson = await response.json();
      console.log(outputJson);
      setJsonOutput(JSON.stringify(outputJson, null, 2));

      // Safely extract bounding boxes
      try {
        const groundingResponse =
          outputJson?.data?.queries?.grounding_query?.response;

        if (Array.isArray(groundingResponse) && groundingResponse.length > 0) {
          const boxes = groundingResponse.map((box, idx) => ({
            id: box["object-id"] || idx,
            coords: box.obbox, // Expecting 8-coordinate array [x1,y1,x2,y2,x3,y3,x4,y4]
            label: box.label || `Object ${idx + 1}`,
          }));

          console.log("📍 Bounding boxes:", boxes);
          setBoundingBoxes(boxes);
        } else {
          console.log("ℹ️ No grounding query response");
          setBoundingBoxes([]);
        }
      } catch (boxError) {
        console.warn("⚠️ Error parsing bounding boxes:", boxError);
        setBoundingBoxes([]);
      }

      const endTime = Date.now();
      setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(error);
      setJsonOutput(JSON.stringify({ error: error.message }, null, 2));
    } finally {
      setIsProcessing(false);
    }
  };

  // Draw bounding boxes on canvas
  useEffect(() => {
    if (
      imageUrl &&
      boundingBoxes.length > 0 &&
      canvasRef.current &&
      imageRef.current
    ) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      if (img.complete) {
        drawBoxes(canvas, ctx, img);
      }
    }
  }, [imageUrl, boundingBoxes]);

  const drawBoxes = (canvas, ctx, img) => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boundingBoxes.forEach((box, idx) => {
      const coords = box.coords;
      const x1 = coords[0] * canvas.width;
      const y1 = coords[1] * canvas.height;
      const x2 = coords[2] * canvas.width;
      const y2 = coords[3] * canvas.height;
      const x3 = coords[4] * canvas.width;
      const y3 = coords[5] * canvas.height;
      const x4 = coords[6] * canvas.width;
      const y4 = coords[7] * canvas.height;

      const color = "#f97316";

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.save();

      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    });
  };

  const handleImageLoad = () => {
    if (canvasRef.current && imageRef.current && boundingBoxes.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;
      drawBoxes(canvas, ctx, img);
    }
  };

  const loadJsonFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJsonInput(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(jsonOutput);
  };

  const exportReport = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `evaluation_report_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className={`flex-1 p-6 ${darkMode ? "bg-gray-900" : "bg-gray-200"}`}>
      <div className="max-w-[1800px] mx-auto h-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* LEFT PANEL - Input & Output JSON */}
          <div className="flex flex-col gap-6">
            {/* INPUT JSON Section */}
            <div
              className={`rounded-2xl border-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-200 border-gray-200"
              } shadow-xl overflow-visible flex-1`}
            >
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  darkMode
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-orange-600/20" : "bg-orange-100"
                    }`}
                  >
                    <FileJson
                      className={`w-5 h-5 ${
                        darkMode ? "text-orange-400" : "text-orange-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Input Request (JSON)
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Configure evaluation parameters
                    </p>
                  </div>
                </div>

                <label
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Load JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={loadJsonFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-4">
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className={`w-full h-[400px] px-4 py-3 rounded-xl font-mono text-sm resize-none ${
                    darkMode
                      ? "bg-gray-900 text-gray-100 border-2 border-gray-700"
                      : "bg-gray-50 text-gray-900 border-2 border-gray-200"
                  } focus:outline-none focus:border-orange-500`}
                  spellCheck="false"
                />
              </div>

              <div
                className={`px-6 py-4 border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <button
                  onClick={executeEvaluation}
                  disabled={isProcessing}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${
                    isProcessing
                      ? darkMode
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "px-4 py-2 bg-orange-600 text-white font-bold rounded shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-transform transition-colors"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Execute Evaluation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* OUTPUT JSON Section */}
            <div
              className={`rounded-2xl border-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-200 border-gray-200"
              } shadow-xl overflow-hidden flex-1`}
            >
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  darkMode
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-blue-600/20" : "bg-blue-100"
                    }`}
                  >
                    <FileJson
                      className={`w-5 h-5 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Output Response (JSON)
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      {status === "success" && (
                        <span className="flex items-center gap-1 text-sm text-green-500">
                          <CheckCircle className="w-4 h-4" />
                          Success
                        </span>
                      )}
                      {status === "error" && (
                        <span className="flex items-center gap-1 text-sm text-red-500">
                          <XCircle className="w-4 h-4" />
                          Error
                        </span>
                      )}
                      {executionTime && (
                        <span
                          className={`flex items-center gap-1 text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          {executionTime}s
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {jsonOutput && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {!copied ? (
                        <span className="text-sm font-medium">Copy</span>
                      ) : (
                        <span className="text-sm font-medium">Copied</span>
                      )}
                    </button>
                    <button
                      onClick={exportReport}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Export</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4">
                {jsonOutput ? (
                  <pre
                    className={`w-full h-[400px] px-4 py-3 rounded-xl font-mono text-sm overflow-auto ${
                      darkMode
                        ? "bg-gray-900 text-gray-100 border-2 border-gray-700"
                        : "bg-gray-50 text-gray-900 border-2 border-gray-200"
                    }`}
                  >
                    {jsonOutput}
                  </pre>
                ) : (
                  <div
                    className={`w-full h-[400px] flex items-center justify-center rounded-xl border-2 border-dashed ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <AlertCircle
                        className={`w-12 h-12 mx-auto mb-3 ${
                          darkMode ? "text-gray-600" : "text-gray-400"
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Output will appear here after execution
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Visual Output */}
          <div
            className={`rounded-2xl border-2 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-200 border-gray-200"
            } shadow-xl overflow-hidden flex flex-col`}
          >
            <div
              className={`px-6 py-4 border-b ${
                darkMode
                  ? "border-gray-700 bg-gray-800/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    darkMode ? "bg-blue-600/20" : "bg-blue-100"
                  }`}
                >
                  <Image
                    className={`w-5 h-5 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Visual Output
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Image with annotated bounding boxes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {imageUrl || boundingBoxes.length > 0 ? (
                <div
                  className={`relative rounded-xl overflow-hidden border-2 ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Satellite imagery"
                    className="w-full h-auto"
                    onLoad={handleImageLoad}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center rounded-xl border-2 border-dashed ${
                    darkMode
                      ? "border-gray-700 bg-gray-900/50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="text-center">
                    <Image
                      className={`w-16 h-16 mx-auto mb-4 ${
                        darkMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      No Image Loaded
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Execute evaluation to see annotated results
                    </p>
                  </div>
                </div>
              )}
            </div>

            {boundingBoxes.length > 0 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h4
                  className={`text-sm font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Detected Objects ({boundingBoxes.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {boundingBoxes.map((box, idx) => {
                    const colors = [
                      "#f97316",
                      "#3b82f6",
                      "#10b981",
                      "#ef4444",
                      "#8b5cf6",
                    ];
                    const color = colors[idx % colors.length];
                    return (
                      <span
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                          backgroundColor: `${color}20`,
                          border: `2px solid ${color}`,
                          color: darkMode ? "#fff" : "#000",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {/* {box.label} #{box.id} */}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatEvalModeee;
