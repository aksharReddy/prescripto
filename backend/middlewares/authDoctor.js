import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const { dToken } = req.headers;

        if (!dToken) {
            return res.status(401).json({ success: false, message: 'Not authorized, login again' });
        }

        const token_decoded = jwt.verify(dToken, process.env.JWT_SECRET);

        // ✅ Ensure req.body exists
        if (!req.body) req.body = {};

        req.body.docId = token_decoded.id;

        next(); // ✅ Don't forget to move to next middleware/route
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authDoctor;
