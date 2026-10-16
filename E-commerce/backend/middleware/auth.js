import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} =req.headers;
    if(!token){
        return res.json({success: false, message: "Not Authorized Login First" })
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        req.body = req.body || {};
        req.body.userId = token_decode.id;
        next();
    }
    catch(e){
        console.error(e);
        return res.json({success: false, message: e.message })
    }
}

export default authUser
