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
const updateModeForm = $("#updateMode");
const deleteModeForm = $("#deleteMode");
const modeButton = $("#modeButton");
deleteModeForm.hide();

modeButton.click(() => {
    deleteModeForm.toggle(1000);  
    updateModeForm.toggle(1000);  
});

const updateTypeForm = $("#updateType");
const deleteTypeForm = $("#deleteType");
const typeButton = $("#typeButton");
deleteTypeForm.hide();

typeButton.click(() => {
    deleteTypeForm.toggle(1000);  
    updateTypeForm.toggle(1000);  
});

// #######################
// Search form
const searchButton = $("#plusBtn");
const inputsDiv = $("#searchInputs");

searchButton.click(e => {
    inputsDiv.append(`
    <div class="form-group mb-2">
        <input type="text" class="form-control" name="prop" placeholder="Propiedad de la busqueda:">
    </div>
    `)
});

// #######################
// Print function
$("#print").click(function(){
    $("#modeModal").empty();
    $("#typeModal").empty();
    $("#addItemTr").empty();
    let printContent = document.getElementById('data-table');
    let WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
});

// #######################
// Sweat alert
const confirmDeleteWarning = Swal.mixin({
    title: '<strong>Quieres eliminarlo?</strong>',
    text: 'Esta accion es irreversible',
    icon: 'warning',
    showCancelButton: true,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEnterKey: false,
    confirmButtonText:
        '<i class="fa fa-trash"></i> Eliminar',
    confirmButtonColor: '#009759',
    cancelButtonText:
    '<i class="fa fa-ban"></i> Cancelar',
    cancelButtonColor: '#C22D00'
});

$(".deleteTmButton").click(event => {
    event.preventDefault();
    confirmDeleteWarning.fire().then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Eliminado correctamente',
                showConfirmButton: false,
                position: 'bottom-right',
                timer: 2000,
                timerProgressBar: true,
            });
            deleteTypeForm.submit();
            deleteModeForm.submit();
        }
    });
});