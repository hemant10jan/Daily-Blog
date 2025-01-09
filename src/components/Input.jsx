import React, { forwardRef, useId } from "react";

const Input=forwardRef(

    function Input({
        type="text",
        label="",
        className="", 
        ...props
    },ref){
        const id=useId()
        return(
            <div className="w-full">
                {label && (
                    <label className="inline-block mb-1 pl-1" htmlFor={id}>
                        {label}
                    </label>
                )}
                <input className={`
                px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 w-full border border-gray-200
                    ${className}`} {...props} ref={ref} id={id} type={type}/>
            </div>
        )
    }
)

export default Input;