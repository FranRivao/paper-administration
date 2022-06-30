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

// #######################
// Side A input
sideAInput.focusout(() => {
    weightInput.val();
});

// Side B input
sideBInput.focusout(() => {
    weightInput.val(calculateWeight(sideAInput, sideBInput, grammageInput, sheetsInput));
});

// Grammage input
grammageInput.focusout(() => {
    weightInput.val(calculateWeight(sideAInput, sideBInput, grammageInput, sheetsInput));
});

// Sheets input
sheetsInput.focusout(() => {
    weightInput.val(calculateWeight(sideAInput, sideBInput, grammageInput, sheetsInput));
});

// Origin input
originInput.focusout(() => {
    originInput.val() === "" ? originInput.val("-") : null;
});

// Weight input
weightInput.focusout(() => {
    purchasePriceInput.val("€ " + calculatePurchasePrice(weightInput, kgPurchasePriceInput));
});

// Kg purchase input
kgPurchasePriceInput.focusout(() => {
    verifyFirstChar(kgPurchasePriceInput, "€");

    purchasePriceInput.val("€ " + calculatePurchasePrice(weightInput, kgPurchasePriceInput));

    sellPriceInput.val("€ " + calculateSellPrice(purchasePriceInput, kgPurchasePriceInput, kgSellPriceInput));
});

// Kg sell input
kgSellPriceInput.focusout(() => {
    verifyFirstChar(kgSellPriceInput, "€");

    sellPriceInput.val("€ " + calculateSellPrice(purchasePriceInput, kgPurchasePriceInput, kgSellPriceInput));
});

// Purchase price input
purchasePriceInput.focusout(() => {
    verifyFirstChar(purchasePriceInput, "€");

    sellPriceInput.val("€ " + calculateSellPrice(purchasePriceInput, kgPurchasePriceInput, kgSellPriceInput));
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

function calculateWeight(sideA, sideB, grammage, sheets) {
    return Math.round(sideA.val()*sideB.val()*grammage.val()/20000/500*sheets.val());
}

function calculatePurchasePrice(weight, kgPurchasePrice) {
    return Math.round(weight.val()*kgPurchasePrice.val().slice(1));
}

function calculateSellPrice(purchasePrice, kgPurchasePrice, kgSellPrice) {
    return Math.round(purchasePrice.val().slice(1)/kgPurchasePrice.val().slice(1)*kgSellPrice.val().slice(1));
}


// #######################
// Id automatic selection
const idInput = $("#moditem-id");

$(".idBtn").click((e) => {
    idInput.val(e.currentTarget.innerHTML);
});

// #######################
// Modify item select html || select/input hide/show system
let body = "";
let amount = 0;
const select = $("#modselect");
const tableValues = ["", "type", "sideA", "sideB", "grammage", "sheets", "mode", "origin", "kgPurchasePrice", "kgSellPrice", "observation"];
const tableCols = ["", "Tipo", "Lado A", "Lado B", "Gramaje", "Hojas", "Modo", "Procedencia/Destino", "CosteKg", "VentaKg", "Observacion"];

tableCols.forEach(o => {
    body += `<option value="${tableValues[amount]}">${o}</option>`
    amount++;
}); select.html(body);

const textarea = $("#modtextarea");
const typeSelect = $("#modtype");
const modeSelect = $("#modmode");
const input = $("#modinput");

textarea.hide();
typeSelect.hide();
modeSelect.hide();

select.change(e => {
    if (e.currentTarget.value == "type") {
        typeSelect.show();
        textarea.hide();
        modeSelect.hide();
        input.hide();
    } else if (e.currentTarget.value == "mode") {
        modeSelect.show();
        textarea.hide();
        typeSelect.hide();
        input.hide();
    } else if (e.currentTarget.value == "observation") {
        textarea.show();
        typeSelect.hide();
        modeSelect.hide();
        input.hide();
    } else {
        input.show();
        textarea.hide();
        typeSelect.hide();
        modeSelect.hide();
    }
});

// #######################
// Mode and type forms
const updateMode = $("#updateMode");
const deleteMode = $("#deleteMode");
const modeButton = $("#modeButton");
deleteMode.hide();

modeButton.click(e => {
    deleteMode.toggle(1000);  
    updateMode.toggle(1000  );  
});

const updateType = $("#updateType");
const deleteType = $("#deleteType");
const typeButton = $("#typeButton");
deleteType.hide();

typeButton.click(e => {
    deleteType.toggle(1000);  
    updateType.toggle(1000  );  
});

// $(document).ready(function(){
//     let printContent = document.getElementById('data-table');
//     let WinPrint = window.open('', '', 'width=900,height=650');
//     WinPrint.document.write(printContent.innerHTML);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     WinPrint.close();
// });