const router = require('express').Router();

const accesoryManager = require('../managers/accessoryManager.js');

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    const {name, description, imageUrl } = req.body;

    await accesoryManager.create({name, description, imageUrl});
    
    res.redirect('/')
});

module.exports = router;