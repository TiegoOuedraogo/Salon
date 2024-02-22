// const User = require('../models/UsersModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

// exports.register = async (req, res)=>{
//     console.log('Content-Type:', req.headers['content-type']);
//   console.log('Body:', req.body);
//     try{
//         const {name,email,phone,password} = req.body;
//         const hashPassword = await bcrypt.hash(password,12);

//         const newUser = new User({
//             name,
//             email,
//             phone,
//             password: hashPassword,
//         });

//         await newUser.save();
// res.status(201).json({
//     message: "User successfully registered",
//     user: { name: newUser.name, email: newUser.email, phone: newUser.phone }
//     // Optionally include token here as well
// });

//     } catch (error) {
//         console.log("Error creating a user", error);
//         res.status(500).json({ message: "Error registering a new user", error });
//     }
// };

// exports.login = async(req, res)=>{
//     try{
//         //find user by email
//         const user = await User.findOne({email: req.body.email});
//         if(!user){
//             return res.status(401).json({message: `Invalid email or password`})
//         }

//         //check the password
//         const isMatch = await bcrypt.compare(req.body.password, user.password);
//         if(!isMatch){
//             return res.status(401).json({message: `Invalid email or password`})
//         }

//         //if user and password matches
//         const payload ={
//             user:{
//                 id: user.id,
//                 email: user.email,
//                 role: user.role
//             }
//         };
//         //ligin token
//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             {expiresIn:'24h'},
//             (err,token)=>{
//                 if(err) throw err;
//                 res.json({token,user: payload.user});
//             }
//             )

//     }catch (error) {
//         console.log("Error logging in", error);
//         res.status(500).json({ message: "Error logging in", error });
//     }
// };

// exports.getAllUser = async(req,res)=>{
//     try{
//         const users = await User.find({});
//         res.json(users);
//     }catch(error){
//         res.status(500).send(error);

//     }
// }

// exports.getUserById = async(req,res)=>{
//     try{
//         const user = await User.findBuId(req.params.id);
//         if(!user){
//             return res.status(404).send({message: 'User not found'})
//         }
//         res.json(user);

//     }catch(error){
//         console.log('error get the user with id:',error)

//     }
// };

// exports.updateUserById = async(req,res)=>{
//     try{
//         const updateUser = await User.findByIdAndUpdate(req.params.is, req.body,{new:true});
//         if(updateUser){
//             return res.status(404).send({mesage: 'User not found'});
//         }
//         res.send(updateUser);

//     }catch(error){
//         res.status(400).send(error)

//     }
// };

// exports.deleteUserById = async(req, res)=>{

//     try{
//         const deleteUser = await User.findByIdAndDelete(reeq.params.id);
//         if(!deleteUser){
//             return res.status(404).send({mesage:'User not found'})
//         }
//         res.send({mesage: 'user deleted successfully'})

//     }catch(error){
//         res.status(500).send(error)
//     }
// }


const User = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Utility for generating JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists with the given email." });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, phone, password: hashPassword });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User successfully registered",
      user: { name: newUser.name, email: newUser.email, phone: newUser.phone },
      token
    });
  } catch (error) {
    console.error("Error creating a user", error);
    res.status(500).json({ message: "Error registering a new user", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching all users", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching the user by ID", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updateUser);
  } catch (error) {
    console.error("Error updating user", error);
    res.status(400).json({ message: "Error updating user", error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};

