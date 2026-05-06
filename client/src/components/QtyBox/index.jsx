import React from 'react';
import {Button} from "@mui/material";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";

const QtyBox = () => {
    const [qty, setQty] = React.useState(1);

    const plusQty =()=>{
        setQty(qty + 1);
    }
    const minusQty =()=>{
        if (qty === 1){
            setQty(1);
        }
        else
        {
            setQty(qty - 1);
        }


    }

    return (
        <div className="qtyBox">
            <input type="number"
                   className="w-full h-[45px] p-2 text-[15px]
                   focus:outline-none
                   border border-[rgba(0,0,0,0.2)] rounded-md "
                  value={qty} />

         <div className="flex items-center justify-between h-[40px] absolute top-0 right-0 z-50">
             <Button className="!min-w-[25px] !w-[25px] !h-[10px] !text-[#000] !rounded-none"
             onClick={plusQty}>
                <FaAngleUp className="text-[12px] opacity-55 "/>
             </Button>

             <Button className="!min-w-[25px] !w-[25px] !h-[10px] !text-[#000] !rounded-none"
             onClick={minusQty}>
                 <FaAngleDown className="text-[12px] opacity-55  "/>
             </Button>
         </div>


        </div>
    );
};

export default QtyBox;