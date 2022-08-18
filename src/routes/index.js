const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const helpers = require('../lib/item');
const item = require('../lib/item');

router.get('/:page?', isLoggedIn, async (req, res) => {
    const perPage = 5;
    const page = req.params.page || 0;

    const types = await item.getItemTypes();
    const modes = await item.getItemModes();
    const items = await item.getItemsLimited(types, modes, perPage, page);
    
    res.render('index', {types, modes, items, nextPage: page+1, previousPage: page-1});
});

router.get('/stats', isLoggedIn, async (req, res) => {
    const info = await item.getItemsForStats();
    res.render('stats', {info});
});

router.post('/search', isLoggedIn, async (req, res) => {
    let result = [];
    
    if (Array.isArray(req.body.prop)) {
        for (let i = 0; i < req.body.prop.length; i++) {
            const element = req.body.prop[i];
            result.push(await item.searchItem(element));
        }
    } else {
        console.log(/^["0-9"]$/g.test(req.body.prop));
        result.push(await item.searchItem(req.body.prop));
    }
    
    const results = await helpers.itemsFormat(result.pop());


    res.render('search', {results});
});

router.post('/searchMovement', isLoggedIn, async (req, res) => {
    const { id } = req.body;
    const outlets = await item.getItemOutlets(id);
    const entrances = await item.getItemEntrances(id);
    res.render('outlets', {outlets, entrances});
});

module.exports = router;