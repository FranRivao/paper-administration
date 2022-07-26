const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const item = require('../lib/item');

router.get('/', isLoggedIn, async (req, res) => {
    const types = await item.getItemTypes();
    const modes = await item.getItemModes();
    const items = await item.getItems(types, modes);
    res.render('index', {types, modes, items});
});

router.get('/stats', isLoggedIn, async (req, res) => {
    const info = await item.getItemsForStats();
    res.render('stats', {info});
});

module.exports = router;