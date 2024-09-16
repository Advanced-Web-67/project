const expressFunction = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = expressFunction.Router();

const key = 'MY_KEY'; // ควรใช้ค่า secret ที่เก็บใน environment variables

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    collection: 'users'
});

let User;
try {
    User = mongoose.model('users');
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const compareHash = async (plainText, hashText) => {
    try {
        const isMatch = await bcrypt.compare(plainText, hashText);
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing hash');
    }
};

const findUser = async (username) => {
    try {
        const user = await User.findOne({ username: username }).exec();
        if (!user) {
            throw new Error('Cannot find username');
        }
        return { id: user._id, username: user.username, password: user.password };
    } catch (err) {
        throw new Error('Cannot find username');
    }
};

router.route('/signin')
    .post(async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await findUser(username);
            const isPasswordValid = await compareHash(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: user.id, username: user.username }, key, { expiresIn: '5m' });
                res.status(200).json({ result: user, token, status: true });
            } else {
                res.status(400).json({ status: false, message: 'Invalid password' });
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });

module.exports = router;
