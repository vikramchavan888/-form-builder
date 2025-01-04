import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Responseformone.css";

const Chatbot = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://form-builder-vikram3.vercel.app/auth/forms/${formId}`
        );
        setFormData(response.data.formdata || []);
        setLoading(false);
        try {
          await axios.put(
            `https://form-builder-vikram3.vercel.app/auth/forms/${formId}/view`,
            {
              view: 1,
            }
          );
        } catch (putError) {
          console.error("Error updating start status:", putError);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);
  useEffect(() => {
    if (currentIndex < formData.length) {
      const currentItem = formData[currentIndex];
      if (
        currentItem.identifier.includes("Bubble") &&
        !displayedItems.includes(currentItem._id)
      ) {
        setChatHistory((prevHistory) => [...prevHistory, currentItem]);
        setDisplayedItems((prevItems) => [...prevItems, currentItem._id]);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 1000);
      }
    }
  }, [currentIndex, formData, displayedItems]);

  const handleInputChange = (e, item) => {
    const { value } = e.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [item.identifier]: value,
    }));
  };

  const handleSend = async () => {
    if (currentIndex < formData.length) {
      const currentItem = formData[currentIndex];

      // Update chat history with the current response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "response",
          identifier: currentItem.identifier,
          response: responses[currentItem.identifier],
        },
      ]);

      setDisplayedItems((prevItems) => [...prevItems, currentItem._id]);
      setCurrentIndex((prevIndex) => prevIndex + 1);

      // Clear the response for the current item
      setResponses((prevResponses) => {
        const newResponses = { ...prevResponses };
        delete newResponses[currentItem.identifier];
        return newResponses;
      });

      // Save chat history to the database after handling send
      try {
        const chatData = {
          formId: formId,
          history: [
            ...chatHistory,
            {
              type: "response",
              identifier: currentItem.identifier,
              response: responses[currentItem.identifier],
            },
          ],
        };

        await axios.post(
          `https://form-builder-vikram3.vercel.app/auth/saveChatHistory`,
          chatData
        );
        console.log("Chat history saved successfully");

        // Optionally, you can update the status of the form or any other action
        await axios.put(
          `https://form-builder-vikram3.vercel.app/auth/forms/${formId}/start`,
          {
            started: 1,
          }
        );
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    }
  };

  const submitchat = async () => {
    try {
      await axios.put(
        `https://form-builder-vikram3.vercel.app/auth/forms/${formId}/completed`,
        {
          completed: 1,
        }
      );
      setSubmissionMessage("Thank you for submitting the form!");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const renderContent = (item) => {
    if (item.identifier === "Responses") {
      switch (item.type) {
        case "text":
          return (
            <div className="renderContent-user">
              <div className="user-message-text">
                <input
                  type="text"
                  value={responses[item.identifier] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder={`Enter your ${item.type}`}
                />
              </div>
              <div
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
              </div>
            </div>
          );
        case "number":
          return (
            <div className="renderContent-user">
              <div className="user-message-text">
                <input
                  type="number"
                  value={responses[item.identifier] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder={`Enter your ${item.type}`}
                />
              </div>
              <div
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
              </div>
            </div>
          );
        case "phone":
          return (
            <div className="renderContent-user">
              <div className="user-message-text">
                <input
                  type="phone"
                  value={responses[item.identifier] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder={`Enter your ${item.type}`}
                />
              </div>
              <div
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
              </div>
            </div>
          );
        case "email":
          return (
            <div className="renderContent-user">
              <div className="user-message-text">
                <input
                  type="email"
                  value={responses[item.identifier] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder={`Enter your ${item.type}`}
                />
              </div>
              <div
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
              </div>
            </div>
          );
        case "date":
          return (
            <div className="renderContent-user">
              <div className="user-message-text">
                <input
                  type="date"
                  value={responses[item.identifier] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder={`Enter your ${item.type}`}
                />
              </div>
              <div
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
              </div>
            </div>
          );
        case "rating":
          return (
            <div className="renderContent-user">
              <div className="user-message-text-rate">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <input
                    key={rating}
                    type="button"
                    value={rating}
                    onClick={(e) => {
                      handleInputChange(e, item);
                      setSelectedRating(rating);
                    }}
                    className="rate-number"
                    style={{
                      backgroundColor:
                        selectedRating === rating ? "#FF8E21" : "#1A5FFF",
                    }}
                  />
                ))}
              </div>
              <div
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
              </div>
            </div>
          );
        case "button":
          return (
            <button className="submit-button" onClick={submitchat}>
              Submit
            </button>
          );
        default:
          return null;
      }
    }

    switch (item.type) {
      case "text":
        return (
          <div className="bot-message-text">
            <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735880963/cropped_image_g1jrng.png" />
            <p>{item.content}</p>
          </div>
        );
      case "image":
        return (
          <div className="bot-message-img">
            <img src={item.content} alt="IMG content" />
          </div>
        );
      case "gif":
        return (
          <div className="bot-message-img">
            <img src={item.content} alt="IMG content" />
          </div>
        );
      case "video":
        return (
          <div className="bot-message-img">
            <video className="bot-message-img-vedio" controls>
              <source src={item.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return null;
    }
  };

  const renderChatHistory = () => {
    return chatHistory.map((item, index) => {
      if (item.type === "response") {
        return (
          <div className="renderChatHistory-user ">
            <div className="user-responses">{item.response}</div>
            <div className="sent-button">
              <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735885936/send_k6j6kl.png" />
            </div>
          </div>
        );
      }

      return <div>{renderContent(item)}</div>;
    });
  };

  const renderCurrentItem = () => {
    if (currentIndex >= formData.length) return null;

    const currentItem = formData[currentIndex];

    if (currentItem.identifier.includes("Responses")) {
      return (
        <>
          <div className="renderCurrentItem-Responses">
            {renderContent(currentItem)}
          </div>
        </>
      );
    }

    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-chathistory-div">
      <div>{renderChatHistory()}</div>
      {renderCurrentItem()}
      {submissionMessage && (
        <div
          onClick={() => window.location.reload()}
          className="submission-message-overlay"
        >
          <div className="submission-message">{submissionMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
