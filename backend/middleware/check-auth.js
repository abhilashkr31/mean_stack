const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_message_needs_to_be_long");
    } catch (error) {
        res.status(401).json({ message: "Auth Failed"});
    }
};