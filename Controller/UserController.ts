import express from 'express'
import User from '../Model/UserModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRET_KEY = 'LMS'
const register = async (req: any, res: any) => {

    try {
        const { username, email, password, role } = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword, role })
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
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
            }, SECRET_KEY
        );
        res.status(200).json({ message: 'User Login Successfully', token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

export default { register, login }