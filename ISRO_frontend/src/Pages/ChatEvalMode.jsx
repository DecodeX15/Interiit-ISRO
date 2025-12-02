import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Copy, Download, CheckCircle, XCircle, Clock, FileJson, Image, AlertCircle } from 'lucide-react';
import { useTheme } from "../Context/theme/Themecontext";
const ChatEvalMode = () => {
  const [jsonInput, setJsonInput] = useState(`
  {
  "input_image": {
    "image_id": "sat_img_001",
    "image_url": "local/satellite_img.png",
    "metadata": {
      "width": 1024,
      "height": 1024,
      "spatial_resolution_m": 1.57
    }
  },
  "queries": {
    "caption_query": {
      "instruction": "Generate a detailed caption"
    },
    "grounding_query": {
      "instruction": "Locate all aircraft in the image"
    },
    "attribute_query": {
      "binary": {
        "instruction": "[Insert Yes/No question here]"
      },
      "numeric": {
        "instruction": "How many buildings are visible?"
      },
      "semantic": {
        "instruction": "[Insert feature/color related question here]"
      }
    }
  }
}
  `);
    const [copied, setCopied] = useState(false);
  const {darkMode, toggleTheme} = useTheme();
  const [jsonOutput, setJsonOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Mock API call to simulate processing
  const executeEvaluation = async () => {
    setIsProcessing(true);
    setStatus(null);
    const startTime = Date.now();

    try {
      // Parse input JSON
      const input = JSON.parse(jsonInput);
      setImageUrl(input.input_image.image_url);

      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockResponse = {
        
  "input_image": {
    "image_id": "sat_img_001",
    "image_url": "local/satellite_img.png",
    "metadata": {
      "width": 1024,
      "height": 1024,
      "spatial_resolution_m": 1.57
    }
  },
  "queries": {
    "caption_query": {
      "instruction": "Generate a detailed caption",
      "response": "The satellite image displays a commercial airport facility, featuring a main runway and taxiways. Two parked aircraft are visible on the tarmac. Infrastructure, including two large storage tanks and several small utility buildings, is located on the left side of the scene."
    },
    "grounding_query": {
      "instruction": "Locate all aircraft in the image",
      "response": {
        "0": {
          "object-id": "aircraft_1",
          "obbox": [
            0.5,
            0.17,
            0.08,
            0.08,
            -37.18
          ]
        },
        "1": {
          "object-id": "aircraft_2",
          "obbox": [
            0.4,
            0.1,
            0.09,
            0.09,
            0.0
          ]
        }
      }
    },
    "attribute_query": {
      "binary": {
        "instruction": "Is there any digit present in the bottom right corner of the scene?",
        "response": "Yes"
      },
      "numeric": {
        "instruction": "How many buildings are visible?",
        "response": 4.0
      },
      "semantic": {
        "instruction": "What is the color of the digit painted on the landing strip?",
        "response": "White"
      }
    }
}
      };
      console.log(mockResponse);
      setJsonOutput(JSON.stringify(mockResponse, null, 2));
      console.log(jsonOutput)
      // Extract bounding boxes
      const boxes = Object.values(mockResponse.queries.grounding_query.response).map(box => ({
        id: box["object-id"],
        label: box.label,
        coords: box.obbox
      }));
      setBoundingBoxes(boxes);

      const endTime = Date.now();
      setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(error)
      setJsonOutput(JSON.stringify({ error: error.message }, null, 2));
    } finally {
      setIsProcessing(false);
    }
  };

  // Draw bounding boxes on canvas
  useEffect(() => {
    if (imageUrl && boundingBoxes.length > 0 && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
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
    
    const colors = ['#f97316', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];
    
    boundingBoxes.forEach((box, idx) => {
      const [cx, cy, w, h, angle] = box.coords;
      const x = cx * canvas.width;
      const y = cy * canvas.height;
      const width = w * canvas.width;
      const height = h * canvas.height;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      
      const color = colors[idx % colors.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(-width / 2, -height / 2, width, height);
      
      // Label background
      ctx.fillStyle = color;
      ctx.fillRect(-width / 2, -height / 2 - 25, 80, 25);
      
      // Label text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`${box.label} #${box.id}`, -width / 2 + 5, -height / 2 - 8);
      
      ctx.restore();
    });
  };

  const handleImageLoad = () => {
    if (canvasRef.current && imageRef.current && boundingBoxes.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
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
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation_report_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className={`flex-1 p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="max-w-[1800px] mx-auto h-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          
          {/* LEFT PANEL - Input & Output JSON */}
          <div className="flex flex-col gap-6">
            
            {/* INPUT JSON Section */}
            <div className={`rounded-2xl border-2 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-200'
            } shadow-xl overflow-visible flex-1`}>
              <div className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-orange-600/20' : 'bg-orange-100'
                  }`}>
                    <FileJson className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Input Request (JSON)
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Configure evaluation parameters
                    </p>
                  </div>
                </div>

                <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
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
                      ? 'bg-gray-900 text-gray-100 border-2 border-gray-700' 
                      : 'bg-gray-50 text-gray-900 border-2 border-gray-200'
                  } focus:outline-none focus:border-orange-500`}
                  spellCheck="false"
                />
              </div>

              <div className={`px-6 py-4 border-t ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <button
                  onClick={executeEvaluation}
                  disabled={isProcessing}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${
                    isProcessing
                      ? darkMode 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'px-4 py-2 bg-orange-600 text-white font-bold rounded shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-transform transition-colors'
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
            <div className={`rounded-2xl border-2 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-200'
            } shadow-xl overflow-hidden flex-1`}>
              <div className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                  }`}>
                    <FileJson className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Output Response (JSON)
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      {status === 'success' && (
                        <span className="flex items-center gap-1 text-sm text-green-500">
                          <CheckCircle className="w-4 h-4" />
                          Success
                        </span>
                      )}
                      {status === 'error' && (
                        <span className="flex items-center gap-1 text-sm text-red-500">
                          <XCircle className="w-4 h-4" />
                          Error
                        </span>
                      )}
                      {executionTime && (
                        <span className={`flex items-center gap-1 text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
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
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {!copied?(

                          <span className="text-sm font-medium">Copy</span>
                      ):
                      (

                          <span className="text-sm font-medium">Copied</span>
                      )
                    }
                    </button>
                    <button
                      onClick={exportReport}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
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
                  <pre className={`w-full h-[400px] px-4 py-3 rounded-xl font-mono text-sm overflow-auto ${
                    darkMode 
                      ? 'bg-gray-900 text-gray-100 border-2 border-gray-700' 
                      : 'bg-gray-50 text-gray-900 border-2 border-gray-200'
                  }`}>
                    {jsonOutput}
                  </pre>
                ) : (
                  <div className={`w-full h-[400px] flex items-center justify-center rounded-xl border-2 border-dashed ${
                    darkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}>
                    <div className="text-center">
                      <AlertCircle className={`w-12 h-12 mx-auto mb-3 ${
                        darkMode ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Output will appear here after execution
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Visual Output */}
          <div className={`rounded-2xl border-2 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-200'
          } shadow-xl overflow-hidden flex flex-col`}>
            <div className={`px-6 py-4 border-b ${
              darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <Image className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Visual Output
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Image with annotated bounding boxes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {imageUrl || boundingBoxes.length > 0 ? (
                <div className={`relative rounded-xl overflow-hidden border-2 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <img
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800"
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
                <div className={`w-full h-full flex items-center justify-center rounded-xl border-2 border-dashed ${
                  darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="text-center">
                    <Image className={`w-16 h-16 mx-auto mb-4 ${
                      darkMode ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No Image Loaded
                    </p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Execute evaluation to see annotated results
                    </p>
                  </div>
                </div>
              )}
            </div>

            {boundingBoxes.length > 0 && (
              <div className={`px-6 py-4 border-t ${
                darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
              }`}>
                <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Detected Objects ({boundingBoxes.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {boundingBoxes.map((box, idx) => {
                    const colors = ['#f97316', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];
                    const color = colors[idx % colors.length];
                    return (
                      <span
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `${color}20`,
                          border: `2px solid ${color}`,
                          color: darkMode ? '#fff' : '#000'
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {box.label} #{box.id}
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

export default ChatEvalMode;