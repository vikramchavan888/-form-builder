const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const Folder = require("../Models/Folders");
const Form = require("../Models/Forms");
const Outsideform = require("../Models/Outsideform");
const Workspace = require("../Models/Workspace");
const ChatHistory = require("../Models/ChatHistory");
require("dotenv").config();





const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    await form.save();
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getoutsideFormById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the form by ID and populate folderId if necessary
    const form = await Outsideform.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  const updatecreatedform = async (req, res) => {
    const { id } = req.params; // Get formId from the URL parameter
    const { name, formdata } = req.body; // Get form name and formdata from the request body

    try {
      // Find the form by ID and update it
      const form = await Form.findById(id).populate("folderId");

      if (!form) {
        return res.status(404).json({ message: "Form not found" });
      }

      // Update the form name and formdata
      form.name = name;
      form.formdata = formdata;

      // Save the updated form to the database
      await form.save();

      return res
        .status(200)
        .json({ message: "Form updated successfully!", form });
    } catch (err) {
      console.error("Error updating form:", err);
      return res
        .status(500)
        .json({ message: "Error updating form", error: err.message });
    }
  };

// Controller to update the 'started' field
  const trackformstarted = async (req, res) => {
    const { formId } = req.params;
    const { started } = req.body;
    try {
      if (typeof started !== "number") {
        return res
          .status(400)
          .json({ message: "Invalid value for 'started'." });
      }
      const form = await Form.findById(formId);
      if (!form) {
        return res.status(404).json({ message: "Form not found." });
      }
      form.started += started;
      const updatedForm = await form.save();
      res.status(200).json({
        message: "Form 'started' field updated successfully.",
        form: updatedForm,
      });
    } catch (error) {
      console.error("Error updating form 'started' field:", error);
      res.status(500).json({ message: "Server error.", error });
    }
  };
// Controller to update the 'complete' field
const trackFormCompleted = async (req, res) => {
  const { formId } = req.params; // Get formId from request parameters
  const { completed } = req.body; // Get the value for 'completed' from request body

  try {
    if (typeof completed !== "number") {
      return res
        .status(400)
        .json({ message: "Invalid value for 'completed'." });
    }
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    form.completed += completed;
    const updatedForm = await form.save();
    res.status(200).json({
      message: "Form 'completed' field updated successfully.",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form 'completed' field:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};
// Controller to update the 'view' field
const trackFormview = async (req, res) => {
  const { formId } = req.params; // Get formId from request parameters
  const { view } = req.body; // Get the value for 'completed' from request body

  try {
    if (typeof view !== "number") {
      return res
        .status(400)
        .json({ message: "Invalid value for 'completed'." });
    }
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    form.view += view ;
    const updatedForm = await form.save();
    res.status(200).json({
      message: "Form 'completed' field updated successfully.",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form 'completed' field:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

const trackoutFormview = async (req, res) => {
  const { formId } = req.params; // Get formId from request parameters
  const { view } = req.body; // Get the value for 'completed' from request body

  try {
    if (typeof view !== "number") {
      return res
        .status(400)
        .json({ message: "Invalid value for 'completed'." });
    }
    const form = await Outsideform.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    form.view += view;
    const updatedForm = await form.save();
    res.status(200).json({
      message: "Form 'completed' field updated successfully.",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form 'completed' field:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

const trackoutFormCompleted = async (req, res) => {
  const { formId } = req.params; // Get formId from request parameters
  const { completed } = req.body; // Get the value for 'completed' from request body

  try {
    if (typeof completed !== "number") {
      return res
        .status(400)
        .json({ message: "Invalid value for 'completed'." });
    }
    const form = await Outsideform.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    form.completed += completed;
    const updatedForm = await form.save();
    res.status(200).json({
      message: "Form 'completed' field updated successfully.",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form 'completed' field:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

const updateoutFormStarted = async (req, res) => {
  const { formId } = req.params;
  const { started } = req.body;
  try {
    if (typeof started !== "number") {
      return res.status(400).json({ message: "Invalid value for 'started'." });
    }
    const form = await Outsideform.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }
    form.started += started;
    const updatedForm = await form.save();
    res.status(200).json({
      message: "Form 'started' field updated successfully.",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form 'started' field:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};


const updatecreatedoutsideform = async (req, res) => {
  const { id } = req.params; // Get formId from the URL parameter
  const { name, formdata } = req.body; // Get form name and formdata from the request body

  try {
    // Find the form by ID and update it
    const form = await Outsideform.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Update the form name and formdata
    form.name = name;
    form.formdata = formdata;

    // Save the updated form to the database
    await form.save();

    return res
      .status(200)
      .json({ message: "Form updated successfully!", form });
  } catch (err) {
    console.error("Error updating form:", err);
    return res
      .status(500)
      .json({ message: "Error updating form", error: err.message });
  }
};


const storeformResponse = async (req, res) => {
  const { formId, history } = req.body;

  try {
    // Fetch the existing chat history for the formId, or create a new one
    let chatHistory = await ChatHistory.findOne({ formId });

    if (!chatHistory) {
      // If no chat history exists for the formId, create a new document
      chatHistory = new ChatHistory({
        formId,
        history: [],
      
      });
    }

    // Add 'createdAt' as a separate item at the start of the history array
    const historyWithTimestamp = [
      { createdAt: new Date().toISOString() }, // Add createdAt timestamp as the first item
      ...history, // Spread the rest of the incoming history items
    ];

    // Push the new chat history (with createdAt as the first item) into the existing or new history
    chatHistory.history.push(historyWithTimestamp);

    // Save the updated chat history to the database
    await chatHistory.save();

    res.status(200).json({ message: "Chat history saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save chat history" });
  }
};


const getChatHistory = async (req, res) => {
  const { formId } = req.params;

  try {
    const chatHistory = await ChatHistory.findOne({ formId });

    if (!chatHistory) {
      return res
        .status(404)
        .json({ message: "No chat history found for this formId" });
    }

    res.status(200).json({ chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Register successfully",
      success: true,
    });
  } catch (err) {
    if (
      err.message.includes("network error") ||
      err.message.includes("ENOTFOUND")
    ) {
      return res.status(503).json({
        message: "Network error. Please check your internet connection.",
        success: false,
      });
    }
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Email or password is wrong";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Check if the user already has a workspace
    let workspace = await Workspace.findOne({ ownerId: user._id });

    // If no workspace exists, create one
    if (!workspace) {
      workspace = new Workspace({
        name: `${user.name}'s Workspace`,
        ownerId: user._id,
      });

      await workspace.save();

      // Update the user's workspaceId after creating a new workspace
      user.workspaceId = workspace._id;
      await user.save();
    }

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
      workspaceId: workspace._id,
      id: user._id,
      workspace,
      name: user.name,
    });
  } catch (err) {
    if (
      err.message.includes("network error") ||
      err.message.includes("ENOTFOUND")
    ) {
      return res.status(503).json({
        message: "Network error. Please check your internet connection.",
        success: false,
      });
    }

    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { name, email, oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

const createFolder = async (req, res) => {
  const { name } = req.body;
  const { workspaceId } = req.params; // Assume the workspace ID is passed
  if (!name || !workspaceId) {
    return res
      .status(400)
      .json({ message: "Folder name and Workspace ID are required" });
  }
  try {
    const newFolder = new Folder({
      name,
      workspaceId,
    });
    const savedFolder = await newFolder.save();
    const workspace = await Workspace.findById(workspaceId);
    workspace.folders.push(savedFolder._id);
    await workspace.save();
    res
      .status(201)
      .json({ message: "Folder added successfully", folder: savedFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createOutsideform = async (req, res) => {
  const { name} = req.body;
  const { workspaceId } = req.params; // Assume the workspace ID is passed

  if (!name || !workspaceId) {
    return res
      .status(400)
      .json({ message: "Form name and Workspace ID are required" });
  }

  try {
    // Create a new Outsideform document
    const newOutform = new Outsideform({
      name,
      workspaceId,
    });

    // Save the new form
    const savedOutform = await newOutform.save();

    // Add the form to the workspace's `outforms` array
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    workspace.outforms.push(savedOutform._id);
    await workspace.save();

    res.status(201).json({
      message: "Outside form added successfully",
      outform: savedOutform,
    });
  } catch (error) {
    console.error("Error creating outform:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createForm = async (req, res) => {
  const { name, fields } = req.body;
  const { folderId } = req.params; // Assume the folder ID is passed
  if (!name || !folderId) {
    return res
      .status(400)
      .json({ message: "Form name and Folder ID are required" });
  }
  try {
    // Create a new form instance
    const newForm = new Form({
      name,
      folderId,
    });

    // Save the form to the database
    const savedForm = await newForm.save();

    // Add the form to the folder's `forms` array
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    folder.forms.push(savedForm._id);
    await folder.save();

    // Respond with the created form
    res
      .status(201)
      .json({ message: "Form created successfully", form: savedForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFolderForms = async (req, res) => {
  const { folderId } = req.params; // Folder ID passed in the URL

  try {
    const folder = await Folder.findById(folderId).populate("forms"); // Populate forms in the folder
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json({ forms: folder.forms }); // Return the list of forms
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteFolderById = async (req, res) => {
  const { folderId } = req.params;
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    await Folder.findByIdAndDelete(folderId);
    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteFormById = async (req, res) => {
  const { formId } = req.params;
  try {
    const folder = await Form.findById(formId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    await Form.findByIdAndDelete(formId);
    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteoutsideFormById = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Outsideform.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Folder not found" });
    }
    await Outsideform.findByIdAndDelete(formId);
    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const shareworkspace = async (req, res) => {
  const { workspaceId, receiverEmail, accessLevel } = req.body;
  const senderId = req.params.userId; // Assuming logged-in user's ID is available in req.user

  try {
    // Find the workspace and receiver
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace)
      return res.status(404).json({ error: "Workspace not found" });

    const receiver = await UserModel.findOne({ email: receiverEmail });
    if (!receiver) return res.status(404).json({ error: "User not found" });

    // Add shared workspace to receiver's sharedWorkspaces
    receiver.sharedWorkspaces.push({
      workspaceId,
      sharedBy: senderId,
      accessLevel,
    });
    await receiver.save();

    res.status(200).json({ message: "Workspace shared successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to share workspace" });
  }
};

const generatesharelink = async (req, res) => {
  try {
    const { workspaceId, accessLevel, sharedBy } = req.body;
    if (!workspaceId) {
      return res.status(400).json({ error: "workspaceId required " });
    }
    if (!accessLevel) {
      return res.status(400).json({ error: "accessLevel required " });
    }
    if (!sharedBy) {
      return res.status(400).json({ error: "sharedBy required " });
    }

    const shareableLink = `${process.env.FRONTEND_URL}/share/${workspaceId}?accessLevel=${accessLevel}&sharedBy=${sharedBy}`;
    res.status(200).json({ link: shareableLink });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate shareable link" });
  }
};

const getWorkspaceOutsideForms = async (req, res) => {
  const { workspaceId } = req.params; // The workspace ID passed as a parameter

  if (!workspaceId) {
    return res.status(400).json({ message: "Workspace ID is required" });
  }

  try {
    // Find the workspace by ID and populate the outforms
    const workspace = await Workspace.findById(workspaceId).populate(
      "outforms"
    );

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Return the outforms of the workspace
    res.status(200).json({
      outforms: workspace.outforms,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching forms" });
  }
};

const getWorkspaceFolders = async (req, res) => {
  const { workspaceId } = req.params; // Workspace ID passed in the URL

  try {
    const workspace = await Workspace.findById(workspaceId).populate("folders");
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.status(200).json({ folders: workspace.folders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error fetching folders" });
  }
};

const getUserWorkspaces = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId).populate(
      "sharedWorkspaces.workspaceId"
    );
    const ownedWorkspace = await Workspace.findOne({ ownerId: userId });

    const workspaces = [
      { _id: ownedWorkspace._id, name: ownedWorkspace.name, type: "Owned" },
      ...user.sharedWorkspaces.map((workspace) => ({
        _id: workspace.workspaceId._id,
        name: workspace.workspaceId.name,
        type: "Shared",
        accessLevel: workspace.accessLevel,
      })),
    ];

    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve workspaces" });
  }
};



  const addSharedWorkspace = async (req, res) => {
    const { workspaceId } = req.params;
    const { accessLevel, sharedBy, receiverEmail } = req.query;

    console.log("Receiver Email:", receiverEmail); // Log the email

    try {
      // Validate workspace existence
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }

      // Validate the sharer existence
      const sharer = await UserModel.findById(sharedBy);
      if (!sharer) {
        return res.status(404).json({ error: "Sharer not found" });
      }

      // Validate receiver existence
      const receiver = await UserModel.findOne({ email: receiverEmail });
      if (!receiver) {
        return res.status(404).json({ error: "Receiver not found" });
      }

      // Check if workspace is already shared
      const isAlreadyShared = receiver.sharedWorkspaces.some(
        (workspace) => workspace.workspaceId.toString() === workspaceId
      );
      if (isAlreadyShared) {
        return res.status(400).json({ error: "Workspace already added" });
      }

      // Add shared workspace to receiver
      receiver.sharedWorkspaces.push({
        workspaceId,
        sharedBy,
        accessLevel,
      });
      await receiver.save();

      res.status(200).json({ message: "Workspace added successfully!" });
    } catch (error) {
      console.error("Error adding shared workspace:", error);
      res.status(500).json({ error: "Failed to process shared workspace" });
    }
  };



module.exports = {
  signup,
  login,
  createFolder,
  updateUser,
  getWorkspaceFolders,
  deleteFolderById,
  deleteoutsideFormById,
  deleteFormById,
  shareworkspace,
  generatesharelink,
  getWorkspaceFolders,
  getWorkspaceOutsideForms,
  getUserWorkspaces,
  createOutsideform,
  createForm,
  getFolderForms,
  getFormById,
  updatecreatedform,
  getoutsideFormById,
  updatecreatedoutsideform,
  storeformResponse,
  getChatHistory,
  trackformstarted,
  trackFormCompleted,
  trackoutFormCompleted,
  updateoutFormStarted,
  trackFormview,
  trackoutFormview,
  addSharedWorkspace,
};
