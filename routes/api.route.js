
const { Router } = require( "express" );
const { check } = require( "express-validator" );

const {  getUserInfoController} = require("../controllers/user.controller");
const {  createUserController, loginUserController, renewToken,} = require("../controllers/auth.controller");

const {validateJWT} = require("../midlewares/validate-jwt");
const {validateFields} = require("../midlewares/validate-fields");




const router = Router();

// creacion de usuario
router.post('/register',[
    check( 'name', 'The name is required' ).not().isEmpty(),
    check( 'email', 'The name is required' ).isEmail(),
    check( 'password', 'The password is required' ).isLength({min:6}),
    validateFields
] , createUserController)



// registro de ususario
router.post('/login',[
    check( 'email', 'The email is required' ).not().isEmpty(),
    check( 'password', 'The password is required' ).not().isEmpty(),
    validateFields
], loginUserController)



//Validar y re-validar token
router.post( '/renew', validateJWT , renewToken )

router.get('/profile',[
    // check( 'email', 'The email is required' ).not().isEmpty(),
    // validateFields,
    validateJWT
], getUserInfoController)


module.exports = router
