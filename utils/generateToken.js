import jwt from 'jsonwebtoken'; // Default import

const generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
export default generateToken;