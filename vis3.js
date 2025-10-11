async function render() {
  // Load data
  const data = await d3.csv("./dataset/videogames_wide.csv");
  
  // Convert numerical columns
  data.forEach(d => {
    d.Global_Sales = +d.Global_Sales;
    d.NA_Sales = +d.NA_Sales;
    d.EU_Sales = +d.EU_Sales;
    d.JP_Sales = +d.JP_Sales;
    d.Other_Sales = +d.Other_Sales;
    d.Year = d.Year ? +d.Year : null;
  });

  // Calculate statistics
  calculateStatistics(data);
  
  // Create visualization
  const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum")
    )
    .width("container")
    .height(400)
    .toSpec();

  const view = await vegaEmbed("#view", vlSpec).view;
  view.run();
}
//Reference: https://observablehq.com/@d3/d3-mean-d3-median-and-friends 
function calculateStatistics(data) {
  // Name Stats
  document.getElementById('name-count').textContent = data.length;
  document.getElementById('name-unique').textContent = new Set(data.map(d => d.Name)).size;

  // Platform Stats
  const platforms = data.map(d => d.Platform);
  document.getElementById('platform-mode').textContent = getMode(platforms);
  document.getElementById('platform-count').textContent = new Set(platforms).size;

  // Year Stats
  const years = data.map(d => d.Year).filter(d => d && !isNaN(d));
  document.getElementById('year-mean').textContent = d3.mean(years).toFixed(1);
  document.getElementById('year-median').textContent = d3.median(years).toFixed(1);
  document.getElementById('year-mode').textContent = getMode(years);
  document.getElementById('year-range').textContent = (d3.max(years) - d3.min(years));
  document.getElementById('year-std').textContent = d3.deviation(years).toFixed(1);

  // Genre Stats
  const genres = data.map(d => d.Genre);
  document.getElementById('genre-mode').textContent = getMode(genres);
  document.getElementById('genre-count').textContent = new Set(genres).size;

  // Publisher Stats
  const publishers = data.map(d => d.Publisher);
  document.getElementById('publisher-mode').textContent = getMode(publishers);
  document.getElementById('publisher-count').textContent = new Set(publishers).size;

  // NA_Sales Stats
  const naSales = data.map(d => d.NA_Sales).filter(d => !isNaN(d));
  document.getElementById('na-total').textContent = d3.sum(naSales).toFixed(1);
  document.getElementById('na-mean').textContent = d3.mean(naSales).toFixed(3);
  document.getElementById('na-median').textContent = d3.median(naSales).toFixed(3);
  document.getElementById('na-range').textContent = (d3.max(naSales) - d3.min(naSales)).toFixed(3);
  document.getElementById('na-std').textContent = d3.deviation(naSales).toFixed(3);

  // EU_Sales Stats
  const euSales = data.map(d => d.EU_Sales).filter(d => !isNaN(d));
  document.getElementById('eu-total').textContent = d3.sum(euSales).toFixed(1);
  document.getElementById('eu-mean').textContent = d3.mean(euSales).toFixed(3);
  document.getElementById('eu-median').textContent = d3.median(euSales).toFixed(3);
  document.getElementById('eu-range').textContent = (d3.max(euSales) - d3.min(euSales)).toFixed(3);
  document.getElementById('eu-std').textContent = d3.deviation(euSales).toFixed(3);

  // JP_Sales Stats
  const jpSales = data.map(d => d.JP_Sales).filter(d => !isNaN(d));
  document.getElementById('jp-total').textContent = d3.sum(jpSales).toFixed(1);
  document.getElementById('jp-mean').textContent = d3.mean(jpSales).toFixed(3);
  document.getElementById('jp-median').textContent = d3.median(jpSales).toFixed(3);
  document.getElementById('jp-range').textContent = (d3.max(jpSales) - d3.min(jpSales)).toFixed(3);
  document.getElementById('jp-std').textContent = d3.deviation(jpSales).toFixed(3);

  // Other_Sales Stats
  const otherSales = data.map(d => d.Other_Sales).filter(d => !isNaN(d));
  document.getElementById('other-total').textContent = d3.sum(otherSales).toFixed(1);
  document.getElementById('other-mean').textContent = d3.mean(otherSales).toFixed(3);
  document.getElementById('other-median').textContent = d3.median(otherSales).toFixed(3);
  document.getElementById('other-range').textContent = (d3.max(otherSales) - d3.min(otherSales)).toFixed(3);
  document.getElementById('other-std').textContent = d3.deviation(otherSales).toFixed(3);

  // Global_Sales Stats
  const globalSales = data.map(d => d.Global_Sales).filter(d => !isNaN(d));
  document.getElementById('global-total').textContent = d3.sum(globalSales).toFixed(1);
  document.getElementById('global-mean').textContent = d3.mean(globalSales).toFixed(3);
  document.getElementById('global-median').textContent = d3.median(globalSales).toFixed(3);
  document.getElementById('global-range').textContent = (d3.max(globalSales) - d3.min(globalSales)).toFixed(3);
  document.getElementById('global-std').textContent = d3.deviation(globalSales).toFixed(3);
}

//Reference: https://www.geeksforgeeks.org/dsa/mode/ 
function getMode(array) {
  const frequency = {};
  let maxCount = 0;
  let mode = array[0];
  
  array.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxCount) {
      maxCount = frequency[value];
      mode = value;
    }
  });
  
  return mode;
}

render();