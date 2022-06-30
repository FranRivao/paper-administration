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
    const obs = await item.getObservationByProp("observation", observation);
    const { id } = obs[0];
    req.body.observation = id;

    item.addItem(req.body);

    res.redirect('/');
});

router.post('/updateItem', isLoggedIn, async (req, res) => {
    const { id } = req.body;
    const { field } = req.body;
    const { modification } = req.body;
    let finalModification = [];

    // Find modification
    modification.forEach(m => m != '' ? finalModification.push(m) : null);

    await item.updateItemField(id, field, finalModification);
    res.redirect('/');
});

router.post('/updateType', isLoggedIn, async (req, res) => {
    const { field } = req.body;
    const { modification } = req.body;

    await item.updateType(field, modification);
    res.redirect('/');
});

router.post('/updateMode', isLoggedIn, async (req, res) => {
    const { field } = req.body;
    const { modification } = req.body;

    await item.updateMode(field, modification);
    res.redirect('/');
});

router.post('/deleteItem', isLoggedIn, async (req, res) => {
    await item.deleteItem(req.body.id);
    res.redirect("/");
});

router.post('/deleteMode', isLoggedIn, async (req, res) => {
    await item.deleteMode(req.body.id);
    res.redirect("/");
});

router.post('/deleteType', isLoggedIn, async (req, res) => {
    await item.deleteType(req.body.id);
    res.redirect("/");
});

module.exports = router;