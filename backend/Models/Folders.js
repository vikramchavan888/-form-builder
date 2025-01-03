const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FolderSchema = new Schema({
  name: { type: String, required: true },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  }, 
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }], 
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Folder", FolderSchema);
