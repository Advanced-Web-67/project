const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'MY_KEY'; // ใช้ค่า JWT Secret จาก environment variable

const authorization = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (token === undefined) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    } else {
        jwt.verify(token, key, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: 'Unauthorized'
                });
            } else {
                req.user = decode; // เก็บข้อมูลผู้ใช้ใน request
                next();
            }
        });
    }
};

module.exports = authorization;
