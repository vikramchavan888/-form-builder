const roles = {
  Owner: {
    permissions: [
      "create_folder",
      "delete_folder",
      "create_form",
      "delete_form",
      "share_workspace",
      "view_workspace",
      "edit_form",
      "view_form",
      "view_folder",
    ],
  },
  Editor: {
    permissions: [
      "create_folder",
      "delete_folder",
      "create_form",
      "delete_form",
      "view_workspace",
      "edit_form",
      "view_form",
      "view_folder",
    ],
  },
  Viewer: {
    permissions: ["view_workspace", "view_form", "view_folder"],
  },
};

module.exports = roles;
