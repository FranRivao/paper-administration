const pool = require('../database');
const helpers = {};

// Select functions
helpers.getItems = async (types, modes, observations) => {
    try {
        const items = await pool.query('SELECT * FROM items');

        items.forEach(i => {
            types.forEach(t => {
               if (i.type === t.id) {
                    i.type = t.type;
               }
            });

            modes.forEach(m => {
               if (i.mode === m.id) {
                    i.mode = m.mode;
               }
            });

            observations.forEach(o => {
                if (i.observation === o.id) {
                    i.observation = o.observation;
                }
            });
        });
        return items;
    } catch (e) {
        console.log(e);
    }
};

helpers.getItemsForStats = async () => {
    try {
        const package = await pool.query('SELECT COUNT(*) as count FROM items WHERE mode = 1');
        const pallet = await pool.query('SELECT COUNT(*) as count FROM items WHERE mode = 2');
        const openedPallet = await pool.query('SELECT COUNT(*) as count FROM items WHERE mode = 3');
        const modes = {
            package: package[0].count, 
            pallet: pallet[0].count, 
            openedPallet: openedPallet[0].count
        };

        const purchasePrices = await pool.query('SELECT purchasePrice FROM items');
        let purchasePrice = 0;
        purchasePrices.forEach(p => {
            purchasePrice += p.purchasePrice;
        });

        const sellPrices = await pool.query('SELECT sellPrice FROM items');
        let sellPrice = 0;
        sellPrices.forEach(s => {
            sellPrice += s.sellPrice;
        });

        const benefit = sellPrice - purchasePrice;

        return {modes, purchasePrice, sellPrice, benefit};
    } catch (e) {
        console.log(e);
    }
};

helpers.getItemByProp = async (prop, search) => {
    let data = {};
    data[prop] = search;
    try {
        return await pool.query('SELECT * FROM items WHERE ?', [data]);
    } catch (e) {
        console.log(e);
    }
};

helpers.getItemTypes = async () => {
    try {
        return await pool.query('SELECT * FROM types')
    } catch (e) {
        console.log(e);
    }
};

helpers.getItemModes = async () => {
    try {
        return await pool.query('SELECT * FROM modes');
    } catch (e) {
        console.log(e);
    }
};

helpers.getItemsObservations = async () => {
    try {
        return await pool.query('SELECT * FROM observations');
    } catch (e) {
        console.log(e);
    }
};

helpers.getObservationByProp = async (prop, search) => {
    let data = {};
    data[prop] = search;
    try {
        return await pool.query('SELECT * FROM observations WHERE ?', [data]);
    } catch (e) {
        console.log(e);
    }
};

// Insert functions
helpers.addItem = async (data) => {
    try {
        await pool.query('INSERT INTO items SET ?', [data])
    } catch (e) {
        console.log(e)
    }
};

helpers.addObservation = async (observation, userId) => {
    try {
        await pool.query('INSERT INTO observations SET ?', {observation, userId})
    } catch (e) {
        console.log(e);
    }
};


// Update functions
helpers.modifyItem = async (id, fieldToModify, modification) => {
    let data = {};
    data[fieldToModify] = modification;
    try {
        if (fieldToModify == "observation") {
            const item = await helpers.getItemByProp("id", id);
            await pool.query('UPDATE observations SET ? WHERE id = ?', [data, item[0].observation]);
        } else {
            await pool.query('UPDATE items SET ? WHERE id = ?', [data, id]);
        }
    } catch (e) {
        console.log(e);
    }
}

// Delete functions
helpers.deleteItem = async (id) => {
    try {
        await pool.query('DELETE FROM items WHERE ?', {id});
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;