import express from 'express';
import { checkSchema } from 'express-validator';
import { createCamValidationSchema } from '../middlewares/createCamValidationSchema';
import { createCam, getAllCam, getCamById, deleteCamById, updateCam, updateCamUsed } from '../controllers/camController';
import { updateCamValidationSchema } from '../middlewares/updateCamValidationSchema';

// Crée une instance du routeur Express
const router = express.Router();

// Route pour créer un camera
router.post('/createcam', checkSchema(createCamValidationSchema), createCam);

// Route pour obtenir tous les camera
router.get("/getallcam", getAllCam);


// get cam by id
router.get("/getcam/:id", getCamById);

//delete cam by id
router.delete("/deletecam/:id", deleteCamById);

router.patch("/updatecamUsed/:id", updateCamUsed);

// update cam
router.patch("/updatecamName/:id", checkSchema(updateCamValidationSchema), updateCam);


export default router;