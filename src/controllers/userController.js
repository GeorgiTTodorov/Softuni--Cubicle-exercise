const router = require('express').Router();
const userManager = require('../managers/userManager.js');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;
    console.log(password, repeatPassword);

    if (password !== repeatPassword) {

        // TODO: Change with displaying error message

        return res.redirect('/register');
    } else {
        await userManager.createUser({username, password});
    }
    
    res.redirect('/login');

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const token = await userManager.login(username, password);

    res.cookie('token', token, {httpOnly: true});

    res.redirect('/');

});

router.get('/logout', (req, res) => {


    res.redirect('/');
});

module.exports = router;