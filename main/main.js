const { ConsoleReporter } = require("jasmine");

module.exports = function printReceipt(list) {
    let uniqueList = unique(list);
    let repeatCount = new Array(uniqueList.length).fill(Number(0));
    // console.log(repeatCount);
    for (let i = 0; i < list.length; i++) {
        repeatCount[findIndex(uniqueList, list[i])]++;
    }
    var stringOutput = "";
    stringOutput += '***<store earning no money>Receipt ***';
    stringOutput += '\n';
    var subTotal = 0;
    for (let i = 0; i < uniqueList.length; i++) {
        stringOutput += `Name: ${uniqueList[i].Name}, `;
        stringOutput += `Quantity: ${repeatCount[i]}${treatUnit(repeatCount[i], uniqueList[i].Unit)}, `;
        stringOutput += `Unit price: ${uniqueList[i].Price.toFixed(2)} (yuan), `;
        let itemSubTotal = Number(uniqueList[i].Price * repeatCount[i]);
        stringOutput += `Subtotal: ${itemSubTotal.toFixed(2)} (yuan)\n`;
        subTotal += itemSubTotal;
    }
    stringOutput += '----------------------\n';
    stringOutput += `Total: ${subTotal.toFixed(2)} (yuan)\n`;
    stringOutput += '**********************\n';
    return stringOutput;
    // console.log(stringOutput);
};
function treatUnit(count, unit) {
    if (unit == 'a') {
        return '';
    }
    else {
        if (Number(count) > Number(0)) {
            unit += 's';
        }
    }
    return ' ' + unit;

}


function unique(arr) {
    let unique = {};
    arr.forEach(function (item) {
        unique[JSON.stringify(item)] = item;
    })
    arr = Object.keys(unique).map(function (u) {
        return JSON.parse(u);
    })
    return arr;
}
function findIndex(objectList, object) {
    for (let i = 0; i < objectList.length; i++) {
        if (objectList[Number(i)].Barcode == object.Barcode) {
            return i;
        }
    }
    return -1;
}
