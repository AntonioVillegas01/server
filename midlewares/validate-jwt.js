const { response } = require( 'express' )
const jwt = require( 'jsonwebtoken' )

const validateJWT = (req, res = response, next) => {

    const token = req.header('Authorization');

    console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        })
    }
    try{

        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.body.uid = uid;
        req.body.email = name;


        next();
    }catch( e ) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        })
    }



}

module.exports = {
    validateJWT
}
