import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const ShareWorkspaceHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSharedWorkspace = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const workspaceId = window.location.pathname.split("/").pop();
      const accessLevel = urlParams.get("accessLevel");
      const sharedBy = urlParams.get("sharedBy");
      const receiverEmail = localStorage.getItem("loggedInUser")?.trim();

      if (!workspaceId || !accessLevel || !sharedBy || !receiverEmail) {
        alert("Invalid link or missing parameters.");
        return;
      }

      console.log("Receiver Email:", receiverEmail); // Check email

      try {
        const response = await axios.get(
          `https://form-builder-vikram3.vercel.app/auth/share/${workspaceId}?accessLevel=${accessLevel}&sharedBy=${sharedBy}&receiverEmail=${receiverEmail}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authentication
            },
          }
        );
        alert(response.data.message);
        navigate("/home");
        handleSuccess("workspace added"); // Redirect to user's workspace
      } catch (error) {
        alert(
          error.response?.data?.error || "Failed to process shared workspace."
        );
        navigate("/home"); // Redirect to home on failure
      }
    };

    handleSharedWorkspace();
  }, [navigate]);

  return <div>Processing shared workspace...
     <ToastContainer />
  </div>;
};

export default ShareWorkspaceHandler;
