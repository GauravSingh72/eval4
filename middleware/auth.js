const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.autorization;
        if (token) {
            jwt.verify(token, "fullstack", async (err, decoded) => {
                if (decoded) {
                    req.body.userId = decoded.userId;
                    next();
                } else {
                    res.send({ "mssg": err.message });
                }
            })
        } else {
            res.send({ "mssg": "Please login first!" });
        }
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = { authenticate };