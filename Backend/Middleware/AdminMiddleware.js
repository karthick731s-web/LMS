const adminMiddleware = (req, res, next) => {
    try {
        if (req.userRole !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error in admin verification." });
    }
};

module.exports = adminMiddleware;
