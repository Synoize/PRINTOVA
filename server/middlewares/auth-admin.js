import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);

        // Check if payload has role or admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Access denied: Not an admin" });
        }

        // If valid, continue
        next();
    } catch (error) {
        console.error("Admin Auth error:", error.message);
        res.status(401).json({ success: false, message: "Invalid or expired admin token" });
    }
};

export default authAdmin;
