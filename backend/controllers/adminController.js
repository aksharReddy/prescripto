import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


//api for adding doctor
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api for login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({ success: true, message: 'Login Successful', token })
        }
        else{
            return res.json({ success: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const AllDoctors = async(req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//appointments list for adminroute
const appointmentsList = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const Appointmentcancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      const { docId, slotDate, slotTime } = appointmentData;
      const docData = await doctorModel.findById(docId);
      let slots_booked = docData.slots_booked;
  
      // ✅ SAFELY check before filtering
      const updatedSlotArray = (slots_booked[slotDate] || []).filter(e => e !== slotTime);
  
      // ✅ Replace only that day's array
      slots_booked[slotDate] = updatedSlotArray;
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.json({ success: true, message: 'Appointment cancelled successfully' });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  }

  //api to get dashboad data
  const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashdata = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5) // Get last 5 appointments
        }
        res.json({ success: true, dashdata });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
  
export {addDoctor,loginAdmin ,AllDoctors, appointmentsList,Appointmentcancel,adminDashboard}