const {
  signup,
  login,
  updateUser,
  createFolder,
  getWorkspaceFolders,
  getWorkspaceOutsideForms,
  deleteFolderById,
  shareworkspace,
  generatesharelink,
  getUserWorkspaces,
  createOutsideform,
  createForm,
  getFolderForms,
  getFormById,
  updatecreatedform,
  deleteoutsideFormById,
  deleteFormById,
  getoutsideFormById,
  updatecreatedoutsideform,
  storeformResponse,
  getChatHistory,
  trackformstarted,
  trackFormCompleted,
  updateoutFormStarted,
  trackoutFormCompleted,
  trackFormview,
  trackoutFormview,
  addSharedWorkspace,
} = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post("/workspace/:workspaceId/folder", createFolder);
router.post("/workspace/:workspaceId/forms", createOutsideform);
router.post("/folders/:folderId/forms", createForm);
router.post("/shareworkspace", shareworkspace);
router.post("/generate-share-link", generatesharelink);
router.post("/saveChatHistory", storeformResponse);

router.delete('/workspace/folder/:folderId', deleteFolderById);
router.delete("/workspace/outform/:formId", deleteoutsideFormById);
router.delete("/workspace/form/:formId", deleteFormById);
;

router.get("/workspace/:workspaceId/folders", getWorkspaceFolders);
router.get("/workspace/:workspaceId/forms", getWorkspaceOutsideForms);
router.get("/workspaces/:userId",getUserWorkspaces);
router.get("/folders/:folderId/forms", getFolderForms);
router.get("/forms/:id", getFormById);
router.get("/outsideforms/:id", getoutsideFormById);
router.get("/chat-history/:formId", getChatHistory);
router.get("/share/:workspaceId", addSharedWorkspace);
router.put("/forms/:id", updatecreatedform);
router.put("/forms/:formId/start", trackformstarted);
router.put("/forms/:formId/completed", trackFormCompleted);
router.put("/forms/:formId/view", trackFormview);

router.put("/outforms/:formId/view", trackoutFormview);
router.put("/outforms/:formId/completed", trackoutFormCompleted);
router.put("/outforms/:formId/start", updateoutFormStarted);
router.put("/outsideforms/:id", updatecreatedoutsideform);

router.put("/:userId", updateUser);






module.exports = router;