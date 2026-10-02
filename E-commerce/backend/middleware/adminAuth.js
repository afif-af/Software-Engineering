import jwt from 'jsonwebtoken';

const adminAuth =async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({
                success: false,
                message: "Not Authorized Login First"
            })
        }
        const token_decode =jwt.verify(token, process.env.JWT_SECRET);
        if(token_decode !== proceess.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "Not Authorized Login First"
            })
        }
        next();
    }
    catch(e){
        console.error(e);
        return res.json({
            success: false,
            message: e.message
        })
    }
}

export default adminAuth;