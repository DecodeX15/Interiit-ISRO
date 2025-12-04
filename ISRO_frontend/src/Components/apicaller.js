import axios from "axios";

//  API CALLER FUNCTION

const handlemodelresponse = async (queryType,prompt, input_image, image_url) => {
  try {
    if (!prompt || !input_image) return "Missing prompt or image.";
    
    const inputPayload = {
      image_id: input_image,
      image_url: image_url,
      metadata: {
        width: 512,
        height: 512,
        spatial_resolution_m: 1.57,
      },
    };

    const binaryObj = { instruction: null };
    const numericObj = { instruction: null };
    const semanticObj = { instruction: null };

   

      if (queryType === "Binary") binaryObj.instruction = prompt;
      if (queryType === "Numeric") numericObj.instruction = prompt;
      if (queryType === "Semantic") semanticObj.instruction = prompt;
    

    const body = {
      input_image: inputPayload,
      queries: {
        caption_query: {
          instruction: queryType === "Captioning" ? prompt : null,
        },
        grounding_query: {
          instruction: queryType === "Grounding" ? prompt : null,
        },
        attribute_query: {
          binary: binaryObj,
          numeric: numericObj,
          semantic: semanticObj,
        },
      },
    };
    console.log(body,queryType)
    console.log("Final Payload: ", JSON.stringify(body, null, 2));

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/interactive_analysis`,
      body
    );
    console.log(response);
    if (response?.data?.success) {
      const modelQueries = response.data.model_response.queries;
      const q = body.queries;
      
      // CAPTION
      if (q.caption_query.instruction) {
        console.log("reached caption")
        return ({
          boxesArray:null,
          answer:
          modelQueries.caption_query?.response || "⚠️ Empty caption response."
        }
        );
      }

      // GROUNDING
      if (q.grounding_query.instruction) {
        console.log("reached grounding")
        
        const number=modelQueries.grounding_query?.response.length;
        console.log(number)
        const boxesArray=modelQueries.grounding_query?.response;
        console.log(boxesArray)
        let answer= "";
        if(number==0){
          answer= "There is no object matching the description in this image."
        }
        else if(number==1){
          answer= "There is only 1 in this image, I have marked it with a bounding box."
        }
        else
        {

          answer= `There are ${number} in this image, I have marked them with bounding boxes.`
        }
        console.log("reached end of ground func")
        return ({boxesArray,answer});
      }

      // ATTRIBUTE
      if (q.attribute_query) {
        console.log("reached attribute")
        let boxesArray= null;
        let answer=""
        if (q.attribute_query.binary.instruction) {
          answer=
            modelQueries.attribute_query?.binary.response || "⚠️ Empty binary response."
          
        }
        if (q.attribute_query.numeric.instruction) {
          answer=
            modelQueries.attribute_query?.numeric.response ||
            "⚠️ Empty numeric response."
      
        }
        if (q.attribute_query.semantic.instruction) {
          answer=
            modelQueries.attribute_query?.semantic.response ||
            "⚠️ Empty semantic response."
          
        }
        return ({boxesArray,answer})
      }
    }
    return "⚠️ No valid model response.";
  } catch (err) {
    console.error("❌ Model error:", err?.response?.data?.error);
    return err?.response?.data?.error;
  }
};

export default handlemodelresponse;
