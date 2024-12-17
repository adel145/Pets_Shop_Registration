
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
// const User = mongoose.model('mitzinet_adel', userSchema);


// const saltRounds = 10;

// mongoose.connect("mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024")
//     .then(() => {
//         console.log("connected to mongodb")
//     }).catch((err) => {
//         console.log("error with conecting with the DB")
//     });

// //altRounds




// const app = express();
// const port = 3000;

// const users = []

// app.use(express.json());

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



// //// register : 
// app.post('/register', async (req, res) => {

//     try {

//         const { name, phone, email, password  } = req.body;

//         // Check if the user already exists in the database
//         const existingUser = await User.findOne({ email: email });
//         if (existingUser) {
//             return res.status(400).json({ message: "המשתמש כבר קיים" });
//         }
//         console.log("משתמש לא קייב");


//         //Hashing Password:
//         const hashedPassword = await bcrypt.hash(password, saltRounds)
//         console.log(hashedPassword);
//         //users.push({name,phone,email,password:hashedPassword})

//         const newUser = new User({
//             name,
//             phone,
//             email,
//             password: hashedPassword
//         })
//         await newUser.save();
//         console.log("successully registered");

//         res.json({ message: "נרשמת לניוזלטר בהצלחה" })


//     } catch (error) {
//         console.log("Errrroooorrr");
//         res.status(500).json({ message: error.message })
//     }

// });

// app.delete('/Unsubscribe', async(req,res)=>{
//     try {
//         const{email,password}=req.body
//         //find user
//         // const findUser=users.find((data)=>data.email===req.body.email)
//         // if(!findUser){
//         //     return res.status(400).send({message:"המשתמש כבר קיים"})
//         // }
//         console.log(email,password)

//         const existingUser = await User.findOne({ email: email });
//         if (!existingUser) {
//             return res.status(400).json({ message: "המשתמש כבר לא קיים" });
//         }
//         console.log("משתמש קיים");

//         //check password

//         const passwordMatch=await bcrypt.compare(password,existingUser.password)
//         console.log(passwordMatch);
//         if(passwordMatch){
//            await User.deleteOne({email:email})
//             res.status(200).send({message:"נמחקת מרשימת ניזלטר בהצלחה "})
//         }else{
//             res.status(400).send({message:"הסיסמה לא נכונה "})
//         }        
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// });

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('mitzinet_adel', userSchema);

const saltRounds = 10;

mongoose.connect("mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024")
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error with connecting to the DB", err);
    });

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Register route
app.post('/register', async (req, res) => {
    try {
        const { name, phone, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "הסיסמאות אינן תואמות" });
        }

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "המשתמש כבר קיים" });
        }

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json({ message: "נרשמת לניוזלטר בהצלחה" });
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
});

// Unsubscribe route
app.delete('/Unsubscribe', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "המשתמש כבר לא קיים" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch) {
            await User.deleteOne({ email: email });
            res.status(200).json({ message: "נמחקת מרשימת ניזלטר בהצלחה" });
        } else {
            res.status(400).json({ message: "הסיסמה לא נכונה" });
        }
    } catch (error) {
        console.log("Error during unsubscription:", error);
        res.status(500).json({ message: "Error during unsubscription" });
    }
});
