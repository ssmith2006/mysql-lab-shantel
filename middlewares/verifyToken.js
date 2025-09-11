import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    const auth = req.headers.authorization
    const [prefix, token] =auth.split ("")

if(!prefix === 'Bear' || ! token ){
    return res.status(401).json ("Error: Missing or invalid Authorization Bear Token.")
}
try {
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    next ()
} catch {
    return res.status(401).json("Token is invalid or expired")
}
    
}