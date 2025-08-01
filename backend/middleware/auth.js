const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'some-secret-key';

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Authorization required' });
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(token, jwtSecret);
    }
    catch (err) {
        return res.status(401).send({ message: 'Invalid token' });
    }

    req.user = payload;
    next();
}