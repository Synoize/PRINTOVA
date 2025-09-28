import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET_KEY);

        req.userId = decoded.id;

        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authUser;
