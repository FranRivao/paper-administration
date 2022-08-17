const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { getItemByProp } = require('../lib/item');
const item = require('../lib/item');

router.post('/addItem', isLoggedIn, async (req, res) => {
    req.body.kgPurchasePrice = req.body.kgPurchasePrice.slice(2);
    req.body.kgSellPrice = req.body.kgSellPrice.slice(2);
    req.body.purchasePrice = req.body.purchasePrice.slice(2);
    req.body.sellPrice = req.body.sellPrice.slice(2);

    const exists = await item.itemExists(req.body);
    if (exists == null) {
        await item.addItem(req.body);
    } else {
        await item.updateItem(exists, req.body);
    }

    res.redirect('/');
});

router.post('/movements', isLoggedIn, async (req, res) => {
    const data = {
        itemId: req.body.id,
        amount: req.body.modification,
        observation: req.body.observation
    };

    const i = await getItemByProp("id", data.itemId);

    if (req.body.movement == "outlet") {
        await item.addOutlet(data);
        await item.updateItemField(data.itemId, "sheets", Number(i[0].sheets) - Number(data.amount));
    } else {
        await item.addEntrance(data);
        await item.updateItemField(data.itemId, "sheets", Number(i[0].sheets) + Number(data.amount));
    }

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