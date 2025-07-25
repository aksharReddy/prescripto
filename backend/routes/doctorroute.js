import express from 'express';
import {  doctorlist,logindoctor,appointmentDoctor } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
  

const doctorRouter = express.Router();
doctorRouter.get('/list', doctorlist);
doctorRouter.post('/login', logindoctor);
doctorRouter.get('/appointments',authDoctor, appointmentDoctor);

export default doctorRouter;