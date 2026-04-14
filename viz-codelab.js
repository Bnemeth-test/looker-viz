const dscc = window.dscc;

function drawViz(data) {
  const container = document.body;
  container.innerHTML = "";

  const style = data.style || {};
  const fillColor = style.fillColor?.value || "#4285F4";

  const tables = dscc.getTableData(data);
  const rows = tables.tables.DEFAULT.map(row => ({
    dimension: row.dimension[0],
    metric: Number(row.metric[0])
  }));

  const maxMetric = Math.max(...rows.map(r => r.metric), 1);

  rows.forEach(item => {
    const rowEl = document.createElement("div");

    const label = document.createElement("div");
    label.textContent = item.dimension;

    const bar = document.createElement("div");
    bar.style.width = `${(item.metric / maxMetric) * 100}%`;
    bar.style.background = fillColor;
    bar.style.color = "white";
    bar.style.padding = "5px";
    bar.textContent = item.metric;

    rowEl.appendChild(label);
    rowEl.appendChild(bar);
    container.appendChild(rowEl);
  });
}

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
