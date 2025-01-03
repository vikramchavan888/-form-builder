const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sharedWorkspaces: [
    {
      workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
      sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      accessLevel: { type: String, enum: ["Edit", "View"], required: true },
    },
  ],
  
});

module.exports = mongoose.model("User", UserSchema);
