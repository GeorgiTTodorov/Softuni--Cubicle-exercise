const { SECRET } = require('../config/config.js');
const jwt = require('../lib/jwt.js');

exports.authenticate = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {

        const user = await jwt.verify(token, SECRET);

        req.user = user;

        next();
        } catch(err) {
            
            res.clearCookie('token');

            res.redirect('/login');
        }
    } else {

        next();

    }


}