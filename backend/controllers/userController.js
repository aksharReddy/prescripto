// api to register user
import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'; 
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';

const registerUser = async (req, res) => {
    try {
const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.json({ success: false, message: 'Please fill all fields' });
        }
        if(!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }
        if(password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long' });
        }
        //hasing pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name,
            email,
            password: hashedPassword
            
        }
        const newUser = new userModel(userData);
        await newUser.save();
        

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.json({ success: false, message: 'Please fill all fields' });
        }
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api to get user data
const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId).select('-password');
        if(!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//api to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name,phone,address,dob,gender  } = req.body;
        const imageFile = req.file;
        if(!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'Please fill all fields' });
        }
       
        await userModel.findByIdAndUpdate(userId,{name,phone,address,dob,gender});
        if(imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }
       res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
} 

//api to book appointment
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//api to get user appointments

const listAppointment = async(req,res)=> {
    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const cancelAppointment = async(req,res)=> {
    try {
        const {userId} = req.body
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData.userId.equals(userId)) {
            return res.json({success:false,message:'You are not authorized to cancel this appointment'})
        } 
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
        const {docId,slotDate,slotTime} = appointmentData
        const docData = await doctorModel.findById(docId)
        let slots_booked = docData.slots_booked
        slots_booked= slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success:true,message:'Appointment cancelled successfully'})
     }    
        catch(error) {
        console.log(error)
            return res.json({success:false,message:error.message})
        }
    }
    const razorpayInstance = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    const paymentrazorpay = async (req, res) => {
        try {
            const {appointmentId, amount} = req.body;a

            const appointmentData = await appointmentModel.findById(appointmentId);
            if (!appointmentData || appointmentData.cancelled) {
                return res.json({ success: false, message: 'Appointment not found or cancelled' });
            }
            const options = {
                amount: appointmentData.amount*100, // amount in smallest currency unit
                currency: process.env.CURRENCY,
                receipt: appointmentId,
            };
            // creation of an order
            const order = await razorpayInstance.orders.create(options);
            res.json({ success: true, order });

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }
    }

    const verifyRazorpay = async (req, res) => {
        try {
            const{razorpay_order_id} = req.body;
            const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);
            if(orderinfo.status === 'paid') {
               await appointmentModel.findByIdAndUpdate(orderinfo.receipt, {paymentStatus: 'paid'});
                res.json({ success: true, message: 'Payment successful' });
            }else{
                res.json({ success: false, message: 'Payment failed' });
            }
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }
    }





export { registerUser,loginUser,getUserData,updateUserProfile,bookAppointment,listAppointment,cancelAppointment,paymentrazorpay, verifyRazorpay };