const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: "No Token Provided" });
        }
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};
module.exports = authMiddleware;