import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Access token required',
                error: true,
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
            error: true,
            success: false
        });
    }
};
