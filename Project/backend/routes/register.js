const expressFunction = require('express');
const router = expressFunction.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

// สร้าง Schema สำหรับผู้ใช้
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    collection: 'users'
});

// ตรวจสอบว่ามีการสร้างโมเดล users แล้วหรือยัง
let User;
try {
    User = mongoose.model('users');
} catch (error) {
    User = mongoose.model('users', userSchema);
}

// ฟังก์ชันสำหรับการสร้าง Hash รหัสผ่าน
const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
};

// ฟังก์ชันสำหรับบันทึกผู้ใช้ลงในฐานข้อมูล
const insertUser = async (dataUser) => {
    try {
        var new_user = new User({
            username: dataUser.username,
            email: dataUser.email,
            password: dataUser.password
        });

        // บันทึกผู้ใช้ลงในฐานข้อมูล
        await new_user.save();
        return { message: 'Sign up successfully' };
    } catch (err) {
        throw new Error('Cannot insert user to DB!');
    }
};


// POST /register สำหรับการสมัครผู้ใช้ใหม่
router.route('/register')
    .post(async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }

        try {
            // ตรวจสอบว่าผู้ใช้หรืออีเมลมีอยู่ในระบบแล้วหรือไม่
            const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (existingUser) {
                if (existingUser.username === username) {
                    return res.status(400).json({ message: 'ชื่อผู้ใช้ถูกใช้แล้ว' });
                } else if (existingUser.email === email) {
                    return res.status(400).json({ message: 'อีเมลนี้ถูกใช้แล้ว' });
                }
            }

            // หากชื่อผู้ใช้และอีเมลไม่ซ้ำ ให้ทำการ Hash รหัสผ่าน
            const hashText = await makeHash(password);

            const payload = {
                username: username,
                email: email,
                password: hashText
            };

            // บันทึกผู้ใช้ใหม่
            await insertUser(payload);
            res.status(200).json({ message: 'Sign up successfully' });

        } catch (err) {
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' });
            console.log(err);
        }
    });


module.exports = router;
