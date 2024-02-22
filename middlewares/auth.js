const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        console.log('Headers:', req.header); 
        const authHeader = req.header('authorization');
        console.log('Authorization Header:', authHeader);

        if (!authHeader) {
            return res.status(401).send({ message: 'No authorization header' });
        }

        const token = authHeader.replace('Bearer ', '');
        console.log('Extracted Token:', token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next();
    } catch (error) {
        console.log('Auth middleware error:', error); 
        res.status(401).send({ message: 'Not authorized, token failed' });
    }
};


module.exports = auth;

