const { response } = require( 'express' )
const User = require( '../models/User' )
const bcrypt = require( 'bcryptjs' )
const {generarJWT} = require("../helpers/jwt");


const createUserController =async (req, res = response )=> {

    const { email, name, password } = req.body
    try {
        // Verificar email que no exista
        const usuario = await User.findOne( { email } )

        if( usuario ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'The User Already exists'
            } )
        }
        // Crear usuario con el modelo
        const dbUser = new User( req.body );

        // HAshear la contraseña
        const salt = bcrypt.genSaltSync( 1 )
        dbUser.password = bcrypt.hashSync( password, salt )

        // Generar el JWT
        const token = await generarJWT( dbUser.id, email )

        // Crear usuario de Base de datos
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status( 201 ).json( {
            ok: true,
            uid: dbUser.id,
            name,
            email,
            access_token:token,
            refresh_token:token
        } );


    } catch( e ) {
        console.error(e)
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Something went wrong'
        } )
    }


}


const loginUserController = async (req, res = response )=> {
    const { email, password } = req.body
    try {

        const dbUser = await User.findOne( { email } )

        if( !dbUser ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'El correo no existe'
            } )
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password )

        if( !validPassword ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'El password no es valido'
            } )
        }

        //Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.email )

        // retorno del servicio
        return res.json( {
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            access_token:token,
            refresh_token:token

        } )


    } catch( e ) {
        console.log( e )
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Por favor hable con el administrador'
        } )

    }

}


const renewToken = async (req, res) => {
    const { uid } = req

    //leer la base de datos para obtener el email
    const dbUser = await User.findById(uid);


    const token = await generarJWT( uid, dbUser.email)

    return res.json( {
        ok: true,
        msg: 'Token renewed',
        uid,
        name: dbUser.name,
        email: dbUser.email,
        access_token:token,
        refresh_token:token
    } )
}

module.exports ={
    createUserController,
    loginUserController,
    renewToken
}
