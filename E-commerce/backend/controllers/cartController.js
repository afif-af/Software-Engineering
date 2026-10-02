import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size} =req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userModel.findById(userId);
        if(cartData[itemId]){
            if(cartData[itemId][size] === size){
                cartData[itemId][size] +=1;
            }
            else{
                cartData[itemId][size] =1;
            }
        }
        else{
            cartData[itemId] ={};
            cartData[itemId][size] =1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({
            success:true, message:"Product added to cart successfully"
        });


    }
    catch (error) {
        console.log(error)
        res.json(
            {
                success:false,
                message:error.message
            }
        )
    }
}

const updateCart =async(req, res) =>{
    try{
        const {userId, itemId, size, qunatity}=req.body
        const userDat =await userModel.findById(userId)
        let cartData =await userData.cartData

        cartData[itemId][size]=qunatity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({
            success:true,
            message:"Cart updated successfully"
        })
    }
    catch(e){
        console.log(e)
        res.json({
            success:false,
            message:e.message
        })
    }
}

const getUserCart=async(req, res)=>{
    try{
        const {userId}=req.body;
        const userData =await userModel.findById(userId);
        let cartData  =await userDat.cartData;
        res.json({
            success:true,
            message:cartData
        })
    }
    catch(e){
        console.log(e)
        res.json({
            success:false,
            message:e.message
        })

    }
}


export {addToCart, updateCart, getUserCart}