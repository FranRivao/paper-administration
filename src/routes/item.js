const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const item = require('../lib/item');

router.post('/addItem', isLoggedIn, async (req, res) => {
    const { observation } = req.body;
    req.body.kgPurchasePrice = req.body.kgPurchasePrice.slice(2);
    req.body.kgSellPrice = req.body.kgSellPrice.slice(2);
    req.body.purchasePrice = req.body.purchasePrice.slice(2);
    req.body.sellPrice = req.body.sellPrice.slice(2);

    await item.addObservation(observation, req.user.id);
    const obs = await item.getItemObservation(observation);
    const { id } = obs[0];
    req.body.observation = id;

    item.addItem(req.body);

    res.redirect('/');
});

router.post('/deleteItem', isLoggedIn, async (req, res) => {
    await item.deleteItem(req.body.id);
    res.redirect("/");
});

module.exports = router;