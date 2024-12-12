export const customErrorResponse = (error)=>{
    if(!error.explanation && !error.message){
        return internalErrorResponse(error)
    }
    return {
        success:false,
        err:error.explanation,
        data:{},
        message:error.message
    }
}

export const internalErrorResponse = (error)=>{
    return {
        success:false,
        err:error.explanation,
        data:{},
        message:"Internal server Error"
    }
}

export const successResponse = (data,message)=>{
    return {
        success:true,
        err:{},
        data,
        message

    }
}