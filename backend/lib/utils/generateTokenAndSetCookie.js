import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    res.cookie("jwt", token, {
        maxAge:15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true,//prevent XSS attack cross-site scripting attacks 
        sameSite: "strict",//prevent cross-site request forgery
        secure: process.env.NODE_ENV === "development"
    })

};