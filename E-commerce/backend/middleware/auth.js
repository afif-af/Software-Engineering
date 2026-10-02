import jwt from "jsonwebtoken";

const authUser =async (req, resizeBy, next) => {
    const {token} =req.headers;
    if(!token){
        return resizeBy.json({success: false, message: "Not Authorized Login First" })
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }
    catch(e){
        console.error(e);
        return resizeBy.json({success: false, message: e.message })
    }
}