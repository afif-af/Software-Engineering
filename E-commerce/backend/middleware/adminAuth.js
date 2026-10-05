import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        console.log("TOKEN:", token);

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized Login First"
            });
        }

        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED TOKEN:", token_decode);

        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: "Not Authorized Login First"
            });
        }

        next();

    } catch (e) {
        console.error(e);

        return res.json({
            success: false,
            message: e.message
        });
    }
};

export default adminAuth;