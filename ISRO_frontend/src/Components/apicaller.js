import axios from "axios";
function detectQueryType(prompt) {
  const p = prompt.toLowerCase();

  if (
    p.includes("describe") ||
    p.includes("caption") ||
    p.includes("what is shown")
  )
    return "caption_query";

  if (p.includes("where") || p.includes("locate") || p.includes("bounding box"))
    return "grounding_query";

  if (
    p.includes("how many") ||
    p.includes("count") ||
    p.includes("is there") ||
    p.includes("what color")
  )
    return "attribute_query";

  return "caption_query";
}
const handlemodelresponse = async (prompt, imageURL, image_id) => {
  try {
    if (!prompt || !imageURL) return null;
    const queryType = detectQueryType(prompt);
    const body = {
      input_image: {
        image_id: image_id,
        image_url: imageURL,
      },
      queries: {
        caption_query:
          queryType === "caption_query" ? { instruction: prompt } : null,

        grounding_query:
          queryType === "grounding_query" ? { instruction: prompt } : null,

        attribute_query:
          queryType === "attribute_query"
            ? {
                binary: { instruction: prompt },
                numeric: { instruction: prompt },
                semantic: { instruction: prompt },
              }
            : null,
      },
    };
    console.log("🚀 Sending body → ", body);
    // const response = await axios.post("YOUR_BACKEND_URL", body, {
    //   headers: { "Content-Type": "application/json" },
    // });
    console.log("🔥 Model Response → ");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "Hello I am genniess ask me what you want to ask";
  } catch (error) {
    console.error("❌ Model API Error:", error);
    return error;
  }
};

export default handlemodelresponse;
