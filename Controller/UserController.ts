import express from 'express';
import User from '../Model/UserModel';
import UserTime from '../Model/UserTimeModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'LMS';

const register = async (req: any, res: any) => {
    try {
        const { username, email, password, role, mobile, school, userClass } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role, userClass, mobile, school });
        await user.save();
        return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate("school", { schoolname: 1 });
        if (!user) {
            return res.status(404).json({ message: 'Incorrect Email' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Password Incorrect' });
        }
        const newLoginRecord = await UserTime.create({ userid: user._id, logintime: Date.now() });
        const token = jwt.sign({
            username: user.username,
            role: user.role,
            mobile: user.mobile,
            email: user.email,
            school: user.school,
            userClass: user?.userClass,
            lhId: newLoginRecord._id,
            _id: user._id,
        }, SECRET_KEY);
        return res.status(200).json({
            message: 'User Login Successfully',
            token,
            user: {
                username: user.username,
                role: user.role,
                userClass: user?.userClass,
                mobile: user.mobile,
                email: user.email,
                school: user.school,
                lhId: newLoginRecord._id,
                id: user._id,
            }
        });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
};

const logout = async (req: any, res: any) => {
    try {
        const { id } = req.body;
        const existingRecord = await UserTime.findOne({ userid: id });
        if (existingRecord) {
            existingRecord.logouttime = new Date(Date.now());
            await UserTime.create({
                userid: id,
                logouttime: existingRecord.logouttime,
            });
            res.status(200).json({ message: 'User Logout Successfully' });
        } else {
            res.status(200).json({ message: 'User not found in UserTime records' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const seenuser = async (req: any, res: any) => {
    try {
        const userRole = req.query.role;
        const _id = req.query.studentuserid;
        
         if (_id) {
            const filter = _id ;
            const Alluser = await User.find({_id:filter})
                .populate("school", { schoolname: 1 })

                ;
            res.status(200).json({ user: Alluser });
        }
        else {
            const filter = userRole ? { role: userRole } : {};
            const Alluser = await User.find(filter)
                .populate("school", { schoolname: 1 })

                ;
            res.status(200).json({ user: Alluser });
        }


    } catch (error) {
        res.status(500).json({ MYerror: error });
    }
};

export default { register, login, logout, seenuser }