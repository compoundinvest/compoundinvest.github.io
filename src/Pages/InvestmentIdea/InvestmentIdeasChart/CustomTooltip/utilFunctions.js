export const getOrCreateTooltip = (chart, tooltip) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.style.background = "rgba(0, 0, 0, 1)";
        tooltipEl.style.borderRadius = "3px";
        tooltipEl.style.color = "white";
        tooltipEl.style.transform = "translate(-50%, 0)";
        tooltipEl.style.transition = "all .3s ease";
        tooltipEl.style.maxWidth = "400px";
        // tooltipEl.style.width = "400px";

        const position = chart.canvas.getBoundingClientRect();
        tooltipEl.style.left = position.left + window.pageXOffset + tooltip.caretX + "px";
        tooltipEl.style.top = position.top + window.pageYOffset + tooltip.caretY + "px";
        // tooltipEl.style.bottom = position.bottom + window.pageYOffset + tooltip.caretY + "px";
        // tooltipEl.style.right = position.right + window.pageXOffset + tooltip.caretX + "px";

        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.padding = "500px";
        tooltipEl.style.pointerEvents = "none";

        const table = document.createElement("table");
        // table.style.margin = "0px";

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

export function makeLittleLegendSquare(tooltip) {
    const colors = tooltip.labelColors[0];

    const span = document.createElement("span");
    span.style.background = colors.backgroundColor;
    span.style.borderColor = colors.borderColor;
    span.style.borderWidth = "2px";
    span.style.marginRight = "10px";
    span.style.height = "10px";
    span.style.width = "10px";
    span.style.display = "inline-block";

    return span;
}

//Generates the populated Table Row
export function makeTableRow(cellText) {
    const tr = generateTableRow();
    const td = makeTD(cellText);

    tr.appendChild(td);

    return tr;
}

export function makeUpsideRowFromText(cellText, tooltip) {
    const tr = generateTableRow();
    const td = makeTD(cellText, tooltip, true);

    tr.style.backgroundColor = "inherit";
    tr.style.borderWidth = String(0);
    td.style.borderWidth = String(0);

    tr.appendChild(td);

    return tr;
}

export function makeTD(cellText, tooltip, includeLegend) {
    const td = document.createElement("td");
    td.style.borderWidth = String(0);

    const text = document.createTextNode(cellText);

    if (includeLegend) {
        td.appendChild(makeLittleLegendSquare(tooltip));
    }
    td.appendChild(text);

    return td;
}

//Generates a sample Table Row
function generateTableRow() {
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "inherit";
    tr.style.borderWidth = String(0);

    return tr;
}
