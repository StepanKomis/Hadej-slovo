let footer = document.getElementById("date");

function getDateString() {
    const date = new Date();
    let str = "Dnes je: "
    str += date.getDate() + ". ";
    str += (date.getMonth() + 1) + ". ";
    str += date.getFullYear() + ", &nbsp";
    return str;
}

function elementText(el, str) {
    el.innerHTML = str;
    return el;
}

footer = elementText(footer, getDateString());