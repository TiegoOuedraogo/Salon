const User = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register = async (req, res)=>{
    console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
    try{
        const {name,email,phone,password} = req.body;
        const hashPassword = await bcrypt.hash(password,12);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashPassword,
        });

        await newUser.save();
res.status(201).json({
    message: "User successfully registered",
    user: { name: newUser.name, email: newUser.email, phone: newUser.phone }
    // Optionally include token here as well
});

    } catch (error) {
        console.log("Error creating a user", error);
        res.status(500).json({ message: "Error registering a new user", error });
    }
};

exports.login = async(req, res)=>{
    try{
        //find user by email
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json({message: `Invalid email or password`})
        }

        //check the password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(401).json({message: `Invalid email or password`})
        }

        //if user and password matches
        const payload ={
            user:{
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
        //ligin token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'24h'},
            (err,token)=>{
                if(err) throw err;
                res.json({token,user: payload.user});
            }
            )

    }catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};

