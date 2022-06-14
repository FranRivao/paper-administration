const sideAInput = $("#sideA");
const sideBInput = $("#sideB");
const grammageInput = $("#grammage");
const sheetsInput = $("#sheets");
const originInput = $("#origin");
const weightInput = $("#weight");
const kgPurchasePriceInput = $("#kgPurchasePrice");
const kgSellPriceInput = $("#kgSellPrice");
const purchasePriceInput = $("#purchasePrice");
const sellPriceInput = $("#sellPrice");


// Side A input
sideAInput.focusout(() => {
    weightInput.val(Math.round(sideAInput.val()*sideBInput.val()*grammageInput.val()/20000/500*sheetsInput.val()));
});

// Side B input
sideBInput.focusout(() => {
    weightInput.val(Math.round(sideAInput.val()*sideBInput.val()*grammageInput.val()/20000/500*sheetsInput.val()));
});

// Grammage input
grammageInput.focusout(() => {
    weightInput.val(Math.round(sideAInput.val()*sideBInput.val()*grammageInput.val()/20000/500*sheetsInput.val()));
});

// Sheets input
sheetsInput.focusout(() => {
    weightInput.val(Math.round(sideAInput.val()*sideBInput.val()*grammageInput.val()/20000/500*sheetsInput.val()));
});

// Origin input
originInput.focusout(() => {
    console.log(originInput.val() === (""));
    if (originInput.val() === "") {
        originInput.val("-")
    }
});

// Weight input
weightInput.focusout(() => {
    purchasePriceInput.val("€ " + Math.round(weightInput.val()*kgPurchasePriceInput.val().slice(1)));
});

// Kg purchase input
kgPurchasePriceInput.focusout(() => {
    verifyFirstChar(kgPurchasePriceInput, "€");

    purchasePriceInput.val("€ " + Math.round(weightInput.val()*kgPurchasePriceInput.val().slice(1)));

    sellPriceInput.val("€ " + Math.round(purchasePriceInput.val().slice(1)/kgPurchasePriceInput.val().slice(1)*kgSellPriceInput.val().slice(1)));
});

// Kg sell input
kgSellPriceInput.focusout(() => {
    verifyFirstChar(kgSellPriceInput, "€");

    sellPriceInput.val("€ " + Math.round(purchasePriceInput.val().slice(1)/kgPurchasePriceInput.val().slice(1)*kgSellPriceInput.val().slice(1)));
});

// Purchase price input
purchasePriceInput.focusout(() => {
    verifyFirstChar(purchasePriceInput, "€");

    sellPriceInput.val("€ " + Math.round(purchasePriceInput.val().slice(1)/kgPurchasePriceInput.val().slice(1)*kgSellPriceInput.val().slice(1)));
});

// Sell price input
sellPriceInput.change(() => {
    verifyFirstChar(sellPriceInput, "€");
});

// Functions
function verifyFirstChar(field, char) {
    if (field.val().charAt(0) != char) {
        field.val(char + " " + field.val())
    }
}


// Id buttons
const idInputM = $("#id-M");
const sideAInputM = $("#sideA-M");
const sideBInputM = $("#sideB-M");
const grammageInputM = $("#grammage-M");
const sheetsInputM = $("#sheets-M");
const originInputM = $("#origin-M");
const weightInputM = $("#weight-M");
const kgPurchasePriceInputM = $("#kgPurchasePrice-M");
const kgSellPriceInputM = $("#kgSellPrice-M");
const purchasePriceInputM = $("#purchasePrice-M");
const sellPriceInputM = $("#sellPrice-M");
const observationInputM = $("#observation-M");


$(".idBtn").click((e) => {
    idInputM.html(e.currentTarget.innerHTML);
});