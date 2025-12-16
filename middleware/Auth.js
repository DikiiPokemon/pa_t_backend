const jwt = require("jsonwebtoken")


module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authtorization.split(" ")[1]
        if(!token){
            return res.status(401).json({message: "Войдите в систему"})
        }

        const decoded = jwt.verify(token, process.env.SECRETE_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Войдите в систему"})
    }
}