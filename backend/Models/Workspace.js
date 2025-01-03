const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkspaceSchema = new Schema({
  name: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  outforms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outsideform" }],
  sharedWith: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      accessLevel: { type: String, enum: ["view", "edit"], default: "view" },
    },
  ],
  metadata: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to auto-update `updatedAt`
WorkspaceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexing
WorkspaceSchema.index({ ownerId: 1 });

module.exports = mongoose.model("Workspace", WorkspaceSchema);
