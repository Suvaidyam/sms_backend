import express from 'express'
import User from '../Model/UserModel'
import UserTime from '../Model/UserTimeModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRET_KEY = 'LMS'  
const register = async (req: any, res: any) => {

    try {
        const { username, email, password, role ,mobile ,school} = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword, role , mobile , school})
        await user.save();

        return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Incorrect Email' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Password Incorrect' });
        }

        const existingRecord = await UserTime.findOne({ userid: user._id });

        if (existingRecord) {
            existingRecord.logintime = new Date(Date.now());
            await UserTime.create({
                userid: user._id,
                logintime: existingRecord.logintime,
            });
        } else {
            const newLoginRecord = await UserTime.create({ userid: user._id as number, logintime: Date.now() });
            res.status(200).json({ message: 'User LogOut Successfully', newLoginRecord });
        }
       
        const token = jwt.sign({
            username: user.username,
            role: user.role,
            mobile: user.mobile,
            email: user.email,
            school : user.school,
            id: user._id,
        }, SECRET_KEY);

        res.status(200).json({
            message: 'User Login Successfully',
            token,
            user: {
                username: user.username,
                role: user.role,
                mobile: user.mobile,
                email: user.email,
                school: user.school,
                id: user._id,
                
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

const logout = async (req: any, res: any) => {
    try {
        const { id } = req.body;
        console.log(id)
        console.log(req.body)// 
        const existingRecord = await UserTime.findOne({ userid: id });

        if (existingRecord) {
            existingRecord.logouttime = new Date(Date.now());
            await UserTime.create({
                userid:id,
                logouttime: existingRecord.logouttime,
            });
            res.status(200).json({ message: 'User Logout Successfully' });
        } else {
            res.status(200).json({ message: 'User not found in UserTime records' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const seenuser = async (req:any ,res:any)=>{
    try {
        const Alluser = User.find({});
        res.status(200).json({user:Alluser});
    } catch (error) {
        res.status(500).json({MYerror:error})
    }
}

export default { register, login ,logout ,seenuser}