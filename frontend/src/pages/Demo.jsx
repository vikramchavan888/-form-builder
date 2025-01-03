import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const CreateForm = () => {
  const [chatHistory, setChatHistory] = useState(null); // State to store fetched data
  const [formData, setFormData] = useState(null); // State to store form data
  const [loading, setLoading] = useState(true); // State to show loading status
  const [error, setError] = useState(null); // State to handle errors
  const sessionRefs = useRef([]);

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/chat-history/67762859969377bb9987f6fe`
        );
        console.log("Chat History:", response.data.chatHistory); // Debugging line
        setChatHistory(response.data.chatHistory);
      } catch (err) {
        console.error("Error fetching chat history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  // Fetch form data
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/forms/67762859969377bb9987f6fe`
        );
        console.log("Form Data:", response.data.formdata); // Debugging line
        setFormData(response.data.formdata);
      } catch (err) {
        console.error("Error fetching form data:", err);
        setError(err.message);
      }
    };

    fetchFormData();
  }, []);

  // Adjust heights after chat history is loaded
  useEffect(() => {
    if (chatHistory) {
      const { history } = chatHistory;
      history.forEach((session, sessionIndex) => {
        const spans =
          sessionRefs.current[sessionIndex]?.querySelectorAll("span");
        if (spans && spans.length) {
          let maxHeight = 0;
          spans.forEach((span) => {
            span.style.height = "auto"; // Reset height to auto to measure accurately
            maxHeight = Math.max(maxHeight, span.offsetHeight);
          });
          spans.forEach((span) => {
            span.style.height = `${maxHeight}px`;
          });
        }
      });
    }
  }, [chatHistory]);

  // Filter Responses from form data
 const filteredFormData = formData
   ? formData.filter(
       (item) => item.identifier === "Responses" && item.type !== "button"
     )
   : [];

  console.log("Filtered Form Data:", filteredFormData); // Debugging line

  return (
    <div>
      {chatHistory ? (
        <div className="form-response">
          {/* Render chat history */}
          {chatHistory.history.map((session, sessionIndex) => (
            <div
              key={sessionIndex}
              ref={(el) => (sessionRefs.current[sessionIndex] = el)}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {session
                  .filter((entry) => entry.type === "response")
                  .map((entry, responseIndex) => (
                    <span
                      key={responseIndex}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        backgroundColor: "#18181B",
                        width: "6rem",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                        overflowWrap: "break-word", // Handle word wrapping
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {entry.response}
                    </span>
                  ))}
              </div>
            </div>
          ))}

          {/* Render form data */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {filteredFormData.length > 0 ? (
                filteredFormData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f0f0f0",
                      margin: "5px",
                      width: "6rem",
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {item.type} {/* Display the Responses content */}
                  </div>
                ))
              ) : (
                <div>No Responses Found</div> // Message if no responses are found
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          No chat history available. Please try again later or check your
          network connection.
        </div>
      )}
    </div>
  );
};

export default CreateForm;
