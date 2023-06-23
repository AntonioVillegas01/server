const {response} = require("express");
const User = require("../models/User");


const getUserInfoController =async (req, res = response  ) => {

    const { email } = req.body

    console.log("email");
    console.log(email);

    try{

        const dbUser = await User.findOne( { email } )


        if(!dbUser){
            return res.status( 404 ).json( {
                ok: false,
                msg: 'User not Found'
            } )
        }

        return res.json( {
            name: dbUser.name,
            email: dbUser.email,
        } )



    }catch (e) {
        console.log( e )
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Something went wrong'
        } )
    }

}


module.exports={
    getUserInfoController
}
