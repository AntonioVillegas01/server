const mongoose = require( "mongoose" );


const dbConnection = async  ()=> {

    try{
        await mongoose.connect( process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB ONLINE")
    }catch (e) {
        console.error(e)
        throw new Error('ERROR WHILE CONNECTING TO DB')
    }


}

module.exports= {
    dbConnection
}
