function parseVector(vectorString) {
  return vectorString.split(",").map(Number);
}

function createPlotData(vec, origin, name) {
  return {
    x: [origin[0], origin[0] + vec[0]],
    y: [origin[1], origin[1] + vec[1]],
    z: [origin[2], origin[2] + vec[2]],
    mode: "lines",
    type: "scatter3d",
    name,
  };
}

function plotVectors() {
  const vecU = parseVector(document.getElementById("vectorU").value);
  const vecV = parseVector(document.getElementById("vectorV").value);
  const vecW = parseVector(document.getElementById("vectorW").value);

  const orgU = parseVector(document.getElementById("originU").value);
  const orgV = parseVector(document.getElementById("originV").value);
  const orgW = parseVector(document.getElementById("originW").value);

  // 3D Plot
  const data3D = [
    createPlotData(vecU, orgU, "u"),
    createPlotData(vecV, orgV, "v"),
    createPlotData(vecW, orgW, "w"),
  ];
  const layout = {
    plot_bgcolor: "#333",    // Dark background for the plotting area
    paper_bgcolor: "#333",   // Dark background for the whole paper
    font: {
        color: "#fff"        // White text for better contrast on dark background
    },
    xaxis: {
        gridcolor: "#444",   // Slightly lighter grid color for contrast
        linecolor: "#666",   // Axis line color
        color: "#fff"        // Text color
    },
    yaxis: {
        gridcolor: "#444",   // Slightly lighter grid color for contrast
        linecolor: "#666",   // Axis line color
        color: "#fff"        // Text color
    },
    // Include zaxis configuration if it's a 3D plot
    zaxis: {
        gridcolor: "#444",   // Slightly lighter grid color for contrast
        linecolor: "#666",   // Axis line color
        color: "#fff"        // Text color
    },
    margin: {
        l: 25,               // Left margin
        r: 20,               // Right margin
        b: 25,               // Bottom margin
        t: 20,               // Top margin
        pad: 4               // Padding between the plot and the margin
    },
    annotations: [
        {
            arrowhead: 2, // style of the arrowhead, number between 1 and 8
            arrowsize: 1, // size of the arrowhead
            arrowwidth: 2, // width of the arrow line
            arrowcolor: '#636efa'
        }],
};

  Plotly.newPlot("plot3D", data3D, layout);

  // 2D Plots
  const common2DProperties = { mode: "lines", type: "scatter" };
  const plotXY = data3D.map((data) => ({
    x: data.x,
    y: data.y,
    name: data.name,
    ...common2DProperties,
  }));
  const plotYZ = data3D.map((data) => ({
    x: data.y,
    y: data.z,
    name: data.name,
    ...common2DProperties,
  }));
  const plotZX = data3D.map((data) => ({
    x: data.z,
    y: data.x,
    name: data.name,
    ...common2DProperties,
  }));

  Plotly.newPlot("plotXY", plotXY, layout);
  Plotly.newPlot("plotYZ", plotYZ, layout);
  Plotly.newPlot("plotZX", plotZX, layout);
}

// Event listeners for vector and origin inputs
document.getElementById("vectorU").addEventListener("input", plotVectors);
document.getElementById("vectorV").addEventListener("input", plotVectors);
document.getElementById("vectorW").addEventListener("input", plotVectors);
document.getElementById("originU").addEventListener("input", plotVectors);
document.getElementById("originV").addEventListener("input", plotVectors);
document.getElementById("originW").addEventListener("input", plotVectors);

// Initial plot
plotVectors();
