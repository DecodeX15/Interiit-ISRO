const Evaluation_response_handler = async (req, res) => {
  try {
    // console.log("hi",req.body)
    const input = req.body;
    // Validate input exists
    if (!input) {
      return res.status(400).json({
        success: false,
        error: "Missing 'input' in request body",
      });
    }

    // Validate ML_MODEL_ENDPOINT is configured
    const MODEL_URL = process.env.ML_MODEL_ENDPOINT;
    if (!MODEL_URL) {
      console.error("ML_MODEL_ENDPOINT not configured");
      return res.status(500).json({
        success: false,
        error: "ML model endpoint not configured",
      });
    }

    console.log("Sending request to ML model:", MODEL_URL);
    // console.log("Input payload:", JSON.stringify(input, null, 2));


    // Make API call with timeout
    const response = await fetch(`${MODEL_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    
    
    
    // Check response status
    if (!response.ok) {
        console.error(`ML Model returned status ${response.status}`);
        return res.status(response.status).json({
            success: false,
            error: `ML Model returned status ${response.status}`,
        });
    }
    
    console.log("reached here");
    // Parse JSON response
    let outputJson;
    try {
      outputJson = await response.json();
    } catch (parseError) {
      console.error("Failed to parse ML model response:", parseError.message);
      return res.status(502).json({
        success: false,
        error: "Invalid JSON response from ML model",
      });
    }

    console.log("ML Model response received:", JSON.stringify(outputJson, null, 2));

    // Validate output has required fields
    if (!outputJson || typeof outputJson !== "object") {
      return res.status(502).json({
        success: false,
        error: "ML model returned invalid response format",
      });
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      data: outputJson,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    // Handle different error types
    if (error.name === "AbortError") {
      console.error("⏱️ Request timeout: ML model took too long to respond");
      return res.status(504).json({
        success: false,
        error: "Request timeout: ML model response took too long",
      });
    }

    console.error(" Evaluation handler error:", error.message, error.stack);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

export { Evaluation_response_handler };