import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, login again' });
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Ensure req.body exists
        if (!req.body) req.body = {};

        req.body.userId = token_decoded.id;

        next(); // ✅ Don't forget to move to next middleware/route
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;
