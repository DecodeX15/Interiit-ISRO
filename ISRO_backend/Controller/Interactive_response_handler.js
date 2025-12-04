import axios from "axios";

const Interactive_response_handler = async (req, res) => {
  try {
    const { input_image, queries } = req.body;
    if (!input_image || !queries) {
      return res.status(400).json({
        error: "input_image and queries are required",
      });
    }

    if (!input_image.image_id || !input_image.metadata) {
      return res.status(400).json({
        error: "input_image must contain image_id and metadata",
      });
    }

    // Validate at least 1 query exists
    if (
      !queries.caption_query &&
      !queries.grounding_query &&
      !queries.attribute_query
    ) {
      return res.status(400).json({
        error: "At least one query (caption_query, grounding_query, attribute_query) must be provided",
      });
    }

    // If attribute query exists then validate subqueries
    if (queries.attribute_query) {
      const attr = queries.attribute_query;
      if (!attr.binary && !attr.numeric && !attr.semantic) {
        return res.status(400).json({
          error:
            "attribute_query must contain at least one of: binary, numeric, semantic",
        });
      }
    }
    const MODEL_URL = process.env.ML_MODEL_ENDPOINT;
    if (!MODEL_URL) {
      return res.status(500).json({
        error: "ML_MODEL_ENDPOINT missing in environment",
      });
    }

    const payload = {
      input_image,
      queries,
    };

    console.log("Sending to ML model:", JSON.stringify(payload, null, 2));

    //  SEND TO MODEL 
    const response = await axios.post(MODEL_URL, payload, {
      timeout: 180000, // 3 minutes
      headers: { "Content-Type": "application/json" },
    });

    //  SUCCESS 
    return res.status(200).json({
      success: true,
      model_response: response.data,
    });
  } catch (error) {
    console.error("INTERACTIVE_HANDLER_ERROR:", error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(500).json({
        error: "ML model timed out after 180 seconds",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
      details: error.response?.data || error.message,
    });
  }
};

export { Interactive_response_handler };
