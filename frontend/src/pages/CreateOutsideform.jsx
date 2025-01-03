import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import DoughnutChart from "./DoughnutChart";
import "./Createform.css";

const DynamicFormEditor = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const location = useLocation();
  const { formName: initialFormName } = location.state || {};
  const [formName, setFormName] = useState(initialFormName || "");
  const [addedItems, setAddedItems] = useState([]);
  const [showDiv, setShowDiv] = useState("form");
  const [chatHistory, setChatHistory] = useState(null); // State to store fetched data
  const [formData, setFormData] = useState(null); // State to store form data
  const [loading, setLoading] = useState(true); // State to show loading status
  const [error, setError] = useState(null); // State to handle errors
  const sessionRefs = useRef([]);
  const [Started, setStarted] = useState();
  const [View, setView] = useState();
  const [Completed, setCompleted] = useState();
  const [dark, setdark] = useState(true); // Default to dark mode

  const toggleDarkMode = () => {
    setdark((prevDark) => !prevDark); // Toggle between dark and light mode
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `https://form-builder-vikram3.vercel.app/auth/outsideforms/${formId}`
        );
        const { name, formdata, started, view, completed } = response.data;
        setFormName(name);
        setAddedItems(formdata || []);
        setStarted(started);
        setView(view);
        setCompleted(completed);
      } catch (err) {
        handleError(" this form is empty");
      }
    };

    fetchFormData();
  }, [formId]);

  const copyToClipboard = async () => {
    const formLink = `https://form-builder-app-delta.vercel.app/formreesponse/${formId}`;
    try {
      await navigator.clipboard.writeText(formLink);
      handleSuccess("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy the link: ", error);
      handleError("Failed to copy the link. Please try again.");
    }
  };

  const handleAddItem = (identifier, type) => {
    setAddedItems((prevItems) => [
      ...prevItems,
      { identifier, type, content: "" },
    ]);
  };

  const handleBubbleContentChange = (index, content) => {
    setAddedItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, content } : item
      )
    );
  };

  const handleDeleteItem = (index) => {
    setAddedItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
  };

  const handleSaveForm = async () => {
    try {
      await axios.put(
        `https://form-builder-vikram3.vercel.app/auth/outsideforms/${formId}`,
        {
          name: formName,
          formdata: addedItems,
        }
      );
      handleSuccess("Form updated successfully!");
    } catch (err) {
      console.error("Error updating form:", err);
      handleError("Could not update the form.");
    }
  };

  const imagebubbleSrcMap = {
    text: "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735363256/Vector_2_ga51fe.png",
    image:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735363966/SVG_2_nmgwgg.png",
    gif: "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735363966/gif_azdsuv.png",
    video:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735363966/Group_14_yzh26b.png",
  };

  const imageinputSrcMap = {
    number:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735372825/SVG_4_rbxm5c.png",
    phone:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735372824/SVG_5_amouhs.png",
    date: "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735372823/SVG_7_vu2w8b.png",
    rating:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735372823/SVG_6_vnieg6.png",
    text: "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735372826/SVG_3_qfmvlx.png",
    email:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735372823/SVG_9_bewzeg.png",
    button:
      "https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735628499/SVG_10_tijuhk.png",
  };
  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `https://form-builder-vikram3.vercel.app/auth/chat-history/${formId}`
        );
        console.log("Chat History:", response.data.chatHistory); // Debugging line
        setChatHistory(response.data.chatHistory);
      } catch (err) {
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
          `https://form-builder-vikram3.vercel.app/auth/outsideforms/${formId}`
        );
        console.log("Form Data:", response.data.formdata); // Debugging line
        setFormData(response.data.formdata);
      } catch (err) {
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
  const filteredFormDataLength = filteredFormData.length;
  console.log(filteredFormDataLength);

  const modifyColumnNames = (filteredFormData) => {
    const countMap = {};
    return filteredFormData.map((item) => {
      const type = item.type;
      if (countMap[type]) {
        countMap[type] += 1;
      } else {
        countMap[type] = 1;
      }
      const modifiedType = `${type}  ${
        countMap[type] > 1 ? countMap[type] : 1
      }`;
      return {
        ...item,
        type: modifiedType,
      };
    });
  };

  const modifiedFilteredFormData = modifyColumnNames(filteredFormData);
  const value2 = Started;
  const value1 = Completed;
  const Completionrate = Math.floor((Completed / Started) * 100);

  return (
    <div
      className={dark ? "createform-container" : "createform-container-light"}
    >
      <div className={dark ? "createform-header" : "createform-header-light"}>
        {showDiv === "form" && (
          <input
            className={dark ? "form-name" : " form-name-light"}
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter form name"
          />
        )}
        <div className="darklight-mode-form">
          <h5 className={dark ? "togglelable" : "togglelable-light"}>Dark</h5>
          <input
            onClick={toggleDarkMode}
            type="checkbox"
            className="checkbox"
            id="checkbox"
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <span className="ball"></span>
          </label>
          <h5 className={dark ? "togglelable" : "togglelable-light"}>Light</h5>
        </div>

        <img
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          className="goback"
          src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735549649/close_wgout4.png"
        />

        <button className="save-form" onClick={handleSaveForm}>
          Save
        </button>

        <button className="share-form" onClick={copyToClipboard}>
          Share
        </button>

        <div
          className={`${
            showDiv === "form"
              ? "form-div-selected"
              : dark
              ? "form-div"
              : "form-div-dark"
          }`}
          onClick={() => setShowDiv("form")}
        >
          Flow
        </div>
        <div
          className={`${
            showDiv === "response"
              ? "response-div-selected"
              : dark
              ? "response-div"
              : "response-div-dark"
          }`}
          onClick={async () => {
            setShowDiv("response");
          }}
        >
          Response
        </div>
      </div>
      {showDiv === "form" && (
        <div className="form-workspace">
          <div className="creating-form">
            <div
              className={dark ? "bubble-and-input" : "bubble-and-input-light"}
            >
              <h2
                className={
                  dark ? "heading-input-bubble" : "heading-input-bubble-light"
                }
              >
                Bubbles
              </h2>
              <div className="Bubbles">
                {["text", "image", "gif", "video"].map((type) => (
                  <div
                    id="Bubble "
                    className={`${type}-button${dark ? "" : "-light"}`}
                    key={type}
                    onClick={() => handleAddItem("Bubble ", type)}
                  >
                    <img src={imagebubbleSrcMap[type]} alt={type} />
                    <span>
                      {type === "gif"
                        ? type.toUpperCase()
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </div>
                ))}
              </div>

              <h2
                className={
                  dark ? "heading-input-bubble" : "heading-input-bubble-light"
                }
              >
                Inputs
              </h2>
              <div className="Bubbles">
                {[
                  "text",
                  "number",
                  "phone",
                  "email",
                  "date",
                  "rating",
                  "button",
                ].map((type) => (
                  <div
                    id="Responses"
                    className={`${type}-button${dark ? "" : "-light"}`}
                    key={type}
                    onClick={() => handleAddItem("Responses", type)}
                  >
                    <img src={imageinputSrcMap[type]} alt={type} />
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-preview">
              <div className="start-flag">
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1735392255/Vector_3_kxcuz0.png" />
                <span>start</span>
              </div>
              <div>
                {addedItems.map((item, index) => (
                  <div
                    key={index}
                    className={
                      dark ? "form-added-item" : "form-added-item-light"
                    }
                  >
                    <div
                      className={
                        dark ? "delete-added-item" : "delete-added-item-light"
                      }
                      onClick={() => handleDeleteItem(index)}
                    >
                      <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734972398/delete_qwsqie.png" />
                    </div>

                    <label
                      className={
                        dark ? "added-item-name" : "added-item-name-light"
                      }
                    >
                      {item.identifier === "Responses"
                        ? `Input ${item.type}`
                        : item.type}
                    </label>
                    {item.identifier === "Responses" ? (
                      item.type === "button" ? (
                        <div
                          className={
                            dark ? "bubble-input" : "bubble-input-light"
                          }
                        ></div>
                      ) : (
                        <p
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            margin: "10px 0",
                            color: "#5b5353",
                          }}
                        >
                          User will enter it on his form
                        </p>
                      )
                    ) : (
                      <div
                        className={
                          dark
                            ? "bubble-input-outer"
                            : "bubble-input-outer-light"
                        }
                      >
                        <img src={imagebubbleSrcMap[item.type]} />
                        <input
                          className={
                            dark ? "bubble-input" : "bubble-input-light"
                          }
                          type="text"
                          required
                          value={item.content}
                          onChange={(e) =>
                            handleBubbleContentChange(index, e.target.value)
                          }
                          placeholder={`Enter ${item.type} content`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showDiv === "response" &&
        (chatHistory ? (
          <div className="form-workspace">
            <div className="Chat-hiatory">
              <div className="form-workspace-statistics">
                <div>
                  <span className="form-workspace-statistics-view-start">
                    Views
                  </span>
                  <h4>{View}</h4>
                </div>
                <div>
                  <span className="form-workspace-statistics-view-start">
                    Start
                  </span>
                  <h4>{Started}</h4>
                </div>
              </div>
              <div className="form-response-container">
                <div className="form-response">
                  <table>
                    <tr style={{ display: "flex" }}>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          backgroundColor: "#18181B",
                          width: "2rem",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "5px",
                          overflowWrap: "break-word",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      ></th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          backgroundColor: "#18181B",
                          width: "10rem",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "5px",
                          overflowWrap: "break-word",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        Submitted at
                      </th>
                      {modifiedFilteredFormData.map((item, index) => (
                        <th
                          key={index}
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                            backgroundColor: "#18181B",
                            width: "10rem",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "5px",
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                        >
                          {item.type}
                        </th>
                      ))}
                    </tr>
                    {chatHistory?.history && chatHistory.history.length > 0 ? (
                      chatHistory.history.map((session, sessionIndex) => {
                        const sessionLength = filteredFormDataLength;

                        const responses = session
                          .filter((entry) => entry.type === "response")
                          .map((entry) => entry.response || "");
                        const paddedResponses = [
                          ...responses,
                          ...Array(
                            Math.max(0, sessionLength - responses.length)
                          ).fill(""),
                        ];

                        return (
                          <tr
                            style={{ display: "flex", flexWrap: "wrap" }}
                            key={sessionIndex}
                            ref={(el) =>
                              (sessionRefs.current[sessionIndex] = el)
                            }
                          >
                            {/* Table rows and cells rendering responses */}
                            <th
                              style={{
                                padding: "10px",
                                border: "1px solid #ddd",
                                backgroundColor: "#18181B",
                                width: "2rem",
                                minHeight: "4rem",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px",
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                wordBreak: "break-word",
                              }}
                            >
                              {sessionIndex + 1}{" "}
                            </th>
                            <th
                              className="submissiondate"
                              style={{
                                padding: "10px",
                                border: "1px solid #ddd",
                                backgroundColor: "#18181B",
                                width: "10rem",
                                minHeight: "4rem",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px",
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                wordBreak: "break-word",
                              }}
                            >
                              {new Date(session[0].createdAt).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </th>
                            {paddedResponses.map((response, responseIndex) => (
                              <th
                                key={responseIndex}
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  backgroundColor: "#18181B",
                                  width: "10rem",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "5px",
                                  overflowWrap: "break-word",
                                  wordWrap: "break-word",
                                  wordBreak: "break-word",
                                }}
                              >
                                {response}
                              </th>
                            ))}
                          </tr>
                        );
                      })
                    ) : (
                      <div className="no-chat-history">
                        <h1>Loading</h1>
                      </div>
                    )}
                  </table>
                </div>
              </div>
              <div className="pieChart">
                <DoughnutChart value1={value1} value2={value2} />
                <div className="complete-rate-container">
                  <span className="complete-rate">Completion rate</span>
                  <h4>{Completionrate}%</h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-chat-history">
            <h1>No Response yet collected</h1>
          </div>
        ))}
      <ToastContainer />
    </div>
  );
};

export default DynamicFormEditor;
