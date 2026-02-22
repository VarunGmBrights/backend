import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
       let {token } = req.headers;
       
       // Handle Bearer token format
       if (token && token.startsWith('Bearer ')) {
         token = token.slice(7, token.length);
       }
       
       if (!token) {
        return res.json({success:false,message:"Not Authorised , login again!"})
       }

       try {
                const token_decode = jwt.verify(token,process.env.JWT_SECRET)
                if (!req.body) {
                     req.body = {};
                 }
                req.body.userId = token_decode.id;
                next();
       } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
       }
}


export default authMiddleware;
