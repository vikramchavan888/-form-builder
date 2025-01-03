import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Select from "react-select";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const workspaceId = localStorage.getItem("workspaceId");
  const userId = localStorage.getItem("userId");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [folders, setFolders] = useState([]);
  const [outsideforms, setOutsideForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareshowPopup, setshareShowPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showoutsideformPopup, setshowoutsideformPopup] = useState(false);
  const popupRef = useRef(null);

  const [folderName, setFolderName] = useState("");
  const [outsideformName, setoutsideformName] = useState("");

  const [showDeleteformPopup, setshowDeleteformPopup] = useState(false);
  const [showDeletefolderPopup, setshowDeletefolderPopup] = useState(false);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [email, setEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("Edit");
  const [shareableLink, setShareableLink] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");

  const [authority, setAuthority] = useState(null);
   const [dark, setdark] = useState(true); // Default to dark mode

   const toggleDarkMode = () => {
     setdark((prevDark) => !prevDark); // Toggle between dark and light mode
   };






  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("workspaceId");
    localStorage.removeItem("selectedForm");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleWorkspaceChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    if (selectedValue === "settings") {
      navigate("/setting");
    } else if (selectedValue === "logout") {
      handleLogout();
    } else {
      setSelectedWorkspaceId(selectedValue);
    }
  };

  const selectfolder = (folderId) => {
    setSelectedFolder(folderId);
  };

  const selectform = (formId,) => {
    setSelectedForm(formId);

  };

  useEffect(() => {

    localStorage.setItem("selectedForm", selectedForm);
  }, [selectedForm]);

  useEffect(() => {
    const handleClickOutside = (event, popupRef, setShowPopup) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    const handleEvents = () => {
      if (showPopup) {
        document.addEventListener("mousedown", (event) =>
          handleClickOutside(event, popupRef, setShowPopup)
        );
      }
      if (shareshowPopup) {
        document.addEventListener("mousedown", (event) =>
          handleClickOutside(event, popupRef, setshareShowPopup)
        );
      }
      if (showoutsideformPopup) {
        document.addEventListener("mousedown", (event) =>
          handleClickOutside(event, popupRef, setshowoutsideformPopup)
        );
      }
      if (showDeletefolderPopup) {
        document.addEventListener("mousedown", (event) =>
          handleClickOutside(event, popupRef, setshowDeletefolderPopup)
        );
      }
    };

    handleEvents();

    return () => {
      document.removeEventListener("mousedown", handleEvents);
    };
  }, [showPopup, shareshowPopup, showoutsideformPopup, showDeletefolderPopup]);

  const fetchWorkspaces = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://form-builder-vikram3.vercel.app/auth/workspaces/${userId}`
      );
      setWorkspaces(response.data);
      if (response.data.length > 0) {
        setSelectedWorkspaceId(response.data[0]._id); // Assuming the first workspace is owned by the user
      } else {
        setSelectedWorkspaceId(null); // If no workspaces, clear selectedWorkspaceId
      }
    } catch (error) {
      setError("Failed to fetch workspaces");
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setLoading(true); // Set loading to true when fetching starts
      fetchWorkspaces();
    }
  }, [userId, fetchWorkspaces]);

  // function to detect the accessLevel
  useEffect(() => {
    setTimeout(() => {
      const selectedWorkspace = workspaces.find(
        (workspace) => workspace._id === selectedWorkspaceId
      );
      const authority = selectedWorkspace
        ? selectedWorkspace.accessLevel
        : null;
      setAuthority(authority); // Update the authority state
    }, 100);
  }, [selectedWorkspaceId]);

  // Handle folder name
  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };


  
  // Handle form name
  const handleoutsideFormNameChange = (e) => {
    setoutsideformName(e.target.value);
  };



  const fetchWorkspaceFolders = async () => {
    try {
      const response = await fetch(
        ` https://form-builder-vikram3.vercel.app/auth/workspace/${selectedWorkspaceId}/folders`
      );
      const data = await response.json();
      if (response.ok) {
        setFolders(data.folders);
        const validFolderIds = data.folders.map((folder) => folder._id);
        setOutsideForms((prevForms) =>
          prevForms.filter((form) => validFolderIds.includes(form.folderId))
        );
      } else {
        handleError(data.message || "Failed to fetch folders");
      }
    } catch (error) {
      handleError("Error fetching folders");
    }
  };
  // Function to fetch all folders in the workspace if changes happened
  useEffect(() => {
    if (selectedWorkspaceId) {
      const fetchWorkspaceFolders = async () => {
        try {
          const response = await axios.get(
            `https://form-builder-vikram3.vercel.app/auth/workspace/${selectedWorkspaceId}/folders`
          );

          setFolders(response.data.folders);
        } catch (error) {
          console.error("Error fetching folders", error);
        }
      };

      fetchWorkspaceFolders();
    }
  }, [selectedWorkspaceId]);

  // Function to fetch all outsideform in the workspace
  const fetchWorkspaceOutsideForms = async () => {
    try {
      const response = await fetch(
        `https://form-builder-vikram3.vercel.app/auth/workspace/${workspaceId}/forms`
      );
      const data = await response.json();

      if (response.ok) {
        setOutsideForms(data.outforms);
      } else {
        handleError(data.message || "Failed to fetch outside forms");
      }
    } catch (error) {
      console.error("Error fetching outside forms:", error);
      handleError("Error fetching outside forms");
    }
  };

  useEffect(() => {
    if (selectedWorkspaceId) {
      const fetchWorkspaceOutsideForms = async () => {
        try {
          const response = await axios.get(
            `https://form-builder-vikram3.vercel.app/auth/workspace/${selectedWorkspaceId}/forms`
          );

          setOutsideForms(response.data.outforms);
        } catch (error) {
          console.error("Error fetching folders", error);
        }
      };

      fetchWorkspaceOutsideForms();
    }
  }, [selectedWorkspaceId]);

  // Function to fetch all outsideform in the workspace
  const fetchFolderForms = async () => {
    if (!selectedFolder) return;

    try {
      const response = await fetch(
        `https://form-builder-vikram3.vercel.app/auth/folders/${selectedFolder}/forms`
      );
      const data = await response.json();

      if (response.ok) {
        setOutsideForms(data.forms);
      } else {
        handleError(data.message || "Failed to fetch forms");
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      handleError("Error fetching forms");
    }
  };

  // Function to fetch all outsideform in the workspace if changes happened
  useEffect(() => {
    if (selectedFolder) {
      const fetchFolderForms = async () => {
        try {
          const response = await axios.get(
            `https://form-builder-vikram3.vercel.app/auth/folders/${selectedFolder}/forms`
          );
          setOutsideForms(response.data.forms);
        } catch (error) {
          console.error("Error fetching forms", error);
        }
      };

      fetchFolderForms();
    }
  }, [selectedFolder]);








  // Function to create folder
  const addFoldertoworkspace = async () => {
    if (!folderName) {
      handleError("Folder name cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `https://form-builder-vikram3.vercel.app/auth/workspace/${selectedWorkspaceId}/folder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: folderName }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        handleSuccess("Folder added in successfully");
       await fetchWorkspaceFolders();
       await fetchWorkspaceOutsideForms();
        
      } else {
        handleError(data.message || "Failed to add folder");
      }
    } catch (error) {
      handleError("Failed to add folder");
    }
  };


  const addformoutsidefolder = async () => {
    if (!outsideformName) {
      handleError("Form name cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `https://form-builder-vikram3.vercel.app/auth/workspace/${workspaceId}/forms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: outsideformName }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        handleSuccess("Form added in workspace");
        await fetchWorkspaceFolders();
        await fetchWorkspaceOutsideForms();
       
       
       
      } else {
        handleError(data.message || "Failed to add folder");
      }
    } catch (error) {
      handleError("Failed to add folder");
    }
  };
  

  // Function to create form
  const addformtoworkspace = async () => {
    if (!outsideformName) {
      handleError("Form name cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `https://form-builder-vikram3.vercel.app/auth/folders/${selectedFolder}/forms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: outsideformName }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        handleSuccess("Form added in folder");
           await fetchFolderForms();
         
      } else {
        handleError(data.message || "Failed to add folder");
      }
    } catch (error) {
      handleError("Failed to add folder");
    }
  };

  // Function to delete  folders from the workspace
  const handleDeleteFolder = async (folderId) => {
   
    try {
      const response = await fetch(
        `https://form-builder-vikram3.vercel.app/auth/workspace/folder/${folderId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        handleSuccess("Folder deleted successfully");
        await fetchWorkspaceFolders();
        await fetchWorkspaceOutsideForms();    
      } else {
        handleError(data.message || "Failed to delete folder");
      }
    } catch (error) {
      handleError("Error deleting folder");
    }
  };



const handledeleteoutsideForm = async (formId) => {
  try {
    const response = await fetch(
      `https://form-builder-vikram3.vercel.app/auth/workspace/outform/${formId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (response.ok) {
      handleSuccess("Form deleted successfully");
      fetchWorkspaceOutsideForms();
      fetchFolderForms();
    } else {
      handleError(data.message || "Failed to delete form");
    }
  } catch (error) {
    handleError("Error deleting folder");
  }
};



const handledeleteForm = async (formId) => {
  try {
    const response = await fetch(
      `https://form-builder-vikram3.vercel.app/auth/workspace/form/${formId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (response.ok) {
      handleSuccess("Form deleted successfully");
      fetchFolderForms();
    } else {
      handleError(data.message || "Failed to delete form");
    }
  } catch (error) {
    handleError("Error deleting folder");
  }
};





  // Function to fetch all folders in the workspace
  
  // Function to  Share workspace
 
  const handleShare = async () => {
    try {
      const response = await axios.post(
        `https://form-builder-vikram3.vercel.app/auth/shareworkspace`,
        {
          workspaceId,
          receiverEmail: email,
          accessLevel,
        }
      );
      handleSuccess(response.data.message);
      setshareShowPopup(false); // Close the popup
    } catch (error) {
      handleError(error.response?.data?.error || "Failed to share workspace");
    }
  };
 
  // Function to generateShareLink workspace
  useEffect(() => {
    const generateShareLink = async () => {
    
      try {
        const response = await axios.post(
          `https://form-builder-vikram3.vercel.app/auth/generate-share-link`,
          {
            workspaceId,
            accessLevel,
            sharedBy: userId,
          }
        );
        setShareableLink(response.data.link);
      } catch (error) {
        handleError("Failed to generate shareable link ");
      }
    };

    generateShareLink();
  }, [workspaceId, accessLevel]);
  // Function to copyToClipboard Link of workspace
  
  const copyToClipboard = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink).then(() => {
        handleSuccess("Link copied to clipboard!");
      });
    } else {
      handleError("No link to copy. Please try again.");
    }
  };
  const options = [
    ...workspaces.map((workspace) => ({
      value: workspace._id,
      label: workspace.name,
    })),
    { value: "settings", label: "Settings" },
    { value: "logout", label: "Logout" },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#1F1F23",
      color: "#ffffff",
      borderWidth: "1px",
      borderColor: "#47474A",
      borderRadius: "5px",
      padding: "1px",
      height: "2rem",
      cursor: "pointer",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4c4c4c",
      },
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1F1F23",
      fontWeight: "500",
      borderRadius: " 0 0 .5rem .5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      border: "1px solid #333333",
      marginTop: 0,
    }),
    option: (provided, state) => {
      const isLastOption = state.data === options[options.length - 1];
      return {
        ...provided,
        color: "#ffffffd3",
        backgroundColor: "#1F1F23",
        padding: "10px 15px",
        cursor: "pointer",
        ...(isLastOption && {
          borderRadius: " 0 0 .5rem .5rem",
          backgroundColor: "#1F1F23",
          color: "#FFA54C",
        }),
        "&:hover": {
          backgroundColor: "#333333",
        },
      };
    },
    placeholder: (provided) => ({
      ...provided,
      color: "#aaaaaa",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "500",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#ffffff",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      "&:hover": {
        color: "#ffffff",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const lightStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      borderWidth: "1px",
      borderColor: "#47474A",
      borderRadius: "5px",
      padding: "1px",
      height: "2rem",
      cursor: "pointer",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4c4c4c",
      },
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      fontWeight: "500",
      borderRadius: " 0 0 .5rem .5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      border: "1px solid #333333",
      marginTop: 0,
    }),
    option: (provided, state) => {
      const isLastOption = state.data === options[options.length - 1];
      return {
        ...provided,
        color: "black",
        backgroundColor: "white",
        padding: "10px 15px",
        cursor: "pointer",
        ...(isLastOption && {
          borderRadius: " 0 0 .5rem .5rem",
          backgroundColor: "white",
          color: "#FFA54C",
        }),
        "&:hover": {
          backgroundColor: "#3333336c",
        },
      };
    },
    placeholder: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "14px",
      fontWeight: "500",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      "&:hover": {
        color: "black",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };


  return (
    <>
      <div className={dark ? "home-container" : "home-container-light"}>
        <div className={dark ? "home-header" : "home-header-light"}>
          <div className="workspace-dropdown">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Select
                options={options}
                styles={dark ? customStyles : lightStyles}
                defaultValue={options[0]}
                onChange={handleWorkspaceChange}
              />
            )}
          </div>
          ;
          <button
            className="share"
            onClick={() => {
              if (authority !== "View") {
                setshareShowPopup(true);
              }
            }}
            style={{ cursor: authority === "View" ? "not-allowed" : "pointer" }} // Change cursor on disabled
          >
            Share
          </button>
          <div className="darklight-mode">
            <h5 className={dark ? "togglelable" : "togglelable-light"}>
              Light
            </h5>
            <input
              onClick={toggleDarkMode}
              type="checkbox"
              className="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox" className="checkbox-label">
              <span className="ball"></span>
            </label>
            <h5 className={dark ? "togglelable" : "togglelable-light"}>Dark</h5>
          </div>
        </div>
        <div className="home-folder">
          <div
            className={dark ? "Add-New-folder" : "Add-New-folder-light"}
            onClick={() => {
              if (authority !== "View") {
                setShowPopup(true);
              }
            }}
            style={{ cursor: authority === "View" ? "not-allowed" : "pointer" }} // Change cursor on disabled
          >
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6668 12.6667C14.6668 13.0203 14.5264 13.3594 14.2763 13.6095C14.0263 13.8595 13.6871 14 13.3335 14H2.66683C2.31321 14 1.97407 13.8595 1.72402 13.6095C1.47397 13.3594 1.3335 13.0203 1.3335 12.6667V3.33333C1.3335 2.97971 1.47397 2.64057 1.72402 2.39052C1.97407 2.14048 2.31321 2 2.66683 2H6.00016L7.3335 4H13.3335C13.6871 4 14.0263 4.14048 14.2763 4.39052C14.5264 4.64057 14.6668 4.97971 14.6668 5.33333V12.6667Z"
                stroke="white"
                strokeOpacity="0.92"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7.33301V11.333"
                stroke="white"
                strokeOpacity="0.92"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 9.33301H10"
                stroke="white"
                strokeOpacity="0.92"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Create a folder </span>
          </div>
          {folders.map((folder) => (
            <div
              key={folder._id}
              className={`${
                dark ? "home-folder-item" : "home-folder-item-light"
              } ${selectedFolder === folder._id ? "selected" : ""}`}
              onClick={() => selectfolder(folder._id)}
            >
              <p>{folder.name}</p>
              <div
                onClick={() => {
                  if (authority !== "View") {
                    setSelectedFolder(folder._id);
                    setshowDeletefolderPopup(true);
                  }
                }}
                style={{
                  cursor: authority === "View" ? "not-allowed" : "pointer",
                }}
                className={dark ? "delete-folder" : "delete-folder-light"}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734972398/delete_qwsqie.png" />
              </div>
            </div>
          ))}
        </div>

        <div className="home-form">
          <div
            className="Add-New-form"
            onClick={() => {
              if (authority !== "View") {
                setshowoutsideformPopup(true);
              }
            }}
            style={{ cursor: authority === "View" ? "not-allowed" : "pointer" }} // Change cursor on disabled
          >
            <span className="add-svg">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5049 8.32812V31.6615"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.83838 19.9951H32.1717"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="Create-a-typebot">Create a typebot </span>
          </div>
          {outsideforms.map((forms) => (
            <div
              key={forms._id}
              className={dark ? "home-form-item" : "home-form-item-light"}
              onClick={() => {
                selectform(forms._id);

                // Conditionally navigate based on `selectedFolder`
                const targetPath = selectedFolder
                  ? `/createForm/${forms._id}`
                  : `/createoutsideForm/${forms._id}`;

                navigate(targetPath, {
                  state: { formName: forms.name, formid: forms._id },
                });
              }}
            >
              <p>{forms.name}</p>

              <div
                onClick={(event) => {
                  event.stopPropagation(); // Prevents the parent onClick from firing
                  if (authority !== "View") {
                    setSelectedForm(forms._id);
                    setshowDeleteformPopup(true);
                  }
                }}
                style={{
                  cursor: authority === "View" ? "not-allowed" : "pointer",
                }}
                className={dark ? "delete-form" : "delete-form-light"}
              >
                <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734972398/delete_qwsqie.png" />
              </div>
            </div>
          ))}

          {showDeleteformPopup && (
            <div
              className={
                dark ? "popup-content-delete" : "popup-content-delete-light"
              }
              ref={popupRef}
            >
              <h1>Are you sure you want to delete this form?</h1>
              <div className="popup-delete-buttons">
                {selectedFolder ? (
                  <>
                    <button
                      className="done-add-form"
                      onClick={() => {
                        handledeleteForm(selectedForm);
                        setshowDeleteformPopup(false);
                        setSelectedForm(null);
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="done-add-form"
                      onClick={() => {
                        handledeleteoutsideForm(selectedForm);
                        setshowDeleteformPopup(false);
                        setSelectedForm(null);
                      }}
                    >
                      Done
                    </button>
                  </>
                )}

                <button
                  className={dark ? "cancle-add-form" : "cancle-add-form-light"}
                  onClick={() => {
                    setshowDeleteformPopup(false);
                    setSelectedForm(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {shareshowPopup && (
            <div className="popup-content-share" ref={popupRef}>
              <span>
                <h5>Invite by Email</h5>
                <select
                  className="popup-content-select"
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                >
                  <option value="Edit">Edit</option>
                  <option value="View">View</option>
                </select>
              </span>

              <input
                className="popup-content-share-input"
                type="email"
                placeholder="Enter user's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="popup-content-share-invite"
                onClick={handleShare}
              >
                Invite
              </button>
              <h5>Invite by link</h5>
              <button
                className="popup-content-share-copy"
                onClick={copyToClipboard}
              >
                Copy Link
              </button>
            </div>
          )}

          {showDeletefolderPopup && (
            <div className="popup-content-delete" ref={popupRef}>
              <h1>Are you sure you want to delete this folder?</h1>
              <div className="popup-delete-buttons">
                <button
                  className="done-add-form"
                  onClick={() => {
                    handleDeleteFolder(selectedFolder);
                    setshowDeletefolderPopup(false);
                    setSelectedFolder(null);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="cancle-add-form"
                  onClick={() => {
                    setshowDeletefolderPopup(false);
                    setSelectedFolder(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showPopup && (
         
            <div className={dark ? "popup-content" : "popup-content-light"} ref={popupRef}>
              <h1>Create New Folder</h1>
              <input
                type="text"
                value={folderName}
                onChange={handleFolderNameChange}
                placeholder="Enter folder name"
              />
              <div className="popup-buttons">
                <button
                  className="done-add-form"
                  onClick={() => {
                    addFoldertoworkspace();
                    setShowPopup(false);
                  }}
                >
                  Done
                </button>
                <button
                  className="cancle-add-form"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showoutsideformPopup && (
            <div className="popup-content" ref={popupRef}>
              <h1>Create New Form</h1>
              <input
                type="text"
                value={outsideformName}
                onChange={handleoutsideFormNameChange}
                placeholder="Enter form name"
              />
              <div className="popup-buttons">
                {selectedFolder ? (
                  <>
                    <button
                      className="done-add-form"
                      onClick={() => {
                        addformtoworkspace();
                        setshowoutsideformPopup(false);
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="done-add-form"
                      onClick={() => {
                        addformoutsidefolder();
                        setshowoutsideformPopup(false);
                      }}
                    >
                      Done
                    </button>
                  </>
                )}

                <button
                  className="cancle-add-form"
                  onClick={() => setshowoutsideformPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
