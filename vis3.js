// Visualization 1 Global sales by genre and platform (Stacked Bar Chart)
async function renderGenrePlatformChart() {
  // Load data
  const data = await d3.csv("./dataset/videogames_wide.csv");
  
  // Convert numerical columns
  data.forEach(d => {
    d.Global_Sales = +d.Global_Sales;
  });

  // Create stacked bar chart
  var vlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Global Sales by Genre and Platform",
    data: { values: data },
    mark: "bar",
    encoding: {
      x: {
        field: "Genre",
        type: "nominal",
        title: "Game Genre",
        axis: { labelAngle: 0 },
      },
      y: {
        field: "Global_Sales",
        type: "quantitative",
        aggregate: "sum",
        // Reference: https://vega.github.io/vega-lite/docs/axis.html 
        axis: {
          title: "Global Sales (millions of units)",
          labels: false,  
          ticks: false,   
          domain: false   
        }
      },
      color: {
        field: "Platform",
        type: "nominal",
        title: "Platform",
        // Reference: https://vega.github.io/vega/docs/schemes/ 
        scale: { scheme: "spectral" },
        // Reference: https://vega.github.io/vega-lite/docs/sort.html 
        sort: { field: "Global_Sales", op: "sum", order: "ascending" },
        legend: {
          columns: 2,
          symbolLimit: 0
        }
      },
      order: {
        field: "Global_Sales",
        aggregate: "sum",
        sort: "ascending"
      },
      tooltip: [
        { field: "Genre", type: "nominal", title: "Genre" },
        { field: "Platform", type: "nominal", title: "Platform" },
        { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Total Sales (millions)", format: ".3f" }
      ]
    },
    width: 1000,
    height: 800
  };

  await vegaEmbed("#genre-platform-sales", vlSpec, options);
}

// Visualization 2 Combined Sales Trends by Platform and Genre (Faceted Line Charts)
async function renderSalesTrendsCombined() {
  // Load data
  const data = await d3.csv("./dataset/videogames_wide.csv");
  
  // Convert numerical columns and filter years
  const filteredData = data.filter(d => d.Year && d.Year !== 'N/A' && !isNaN(+d.Year)).map(d => {
    return {
      Year: +d.Year,
      Platform: d.Platform,
      Global_Sales: +d.Global_Sales,
      Genre: d.Genre
    };
  });

  // Create faceted line charts for platform and genre sales over time
  var vlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Global Sales Trends by Platform and Genre",
    data: { values: filteredData },
    vconcat: [
      // Top chart（Platform）
      {
        title: "Sales Trends by Platform Over Time",
        mark: {
          type: "line",
          point: true
        },
        encoding: {
          x: {
            field: "Year",
            type: "ordinal",
            title: "Release Year",
            axis: { 
              labelAngle: -45,
              // Reference: https://d3js.org/d3-format 
              format: "d"
            }
          },
          y: {
            field: "Global_Sales",
            type: "quantitative",
            aggregate: "sum",
            title: "Total Global Sales (millions)"
          },
          color: {
            field: "Platform",
            type: "nominal",
            title: "Platform",
            scale: { scheme: "spectral" },
            legend: {
              columns: 2,
              symbolLimit: 0
            }
          },
          tooltip: [
            { field: "Year", type: "ordinal", title: "Year" },
            { field: "Platform", type: "nominal", title: "Platform" },
            { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Total Sales (millions)", format: ".3f" }
          ]
        },
        width: 1000,
        height: 300
      },
      // Bottom chart（Genre）
      {
        title: "Sales Trends by Genre Over Time",
        mark: {
          type: "line",
          point: true
        },
        encoding: {
          x: {
            field: "Year",
            type: "ordinal",
            title: "Release Year",
            axis: { 
              labelAngle: -45,
              format: "d"
            }
          },
          y: {
            field: "Global_Sales",
            type: "quantitative",
            aggregate: "sum",
            title: "Total Global Sales (millions)"
          },
          color: {
            field: "Genre",
            type: "nominal",
            title: "Game Genre",
            scale: { scheme: "redyellowgreen" }
          },
          tooltip: [
            { field: "Year", type: "ordinal", title: "Year" },
            { field: "Genre", type: "nominal", title: "Genre" },
            { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Total Sales (millions)", format: ".3f" }
          ]
        },
        width: 1000,
        height: 350
      }
    ]
  };

  await vegaEmbed("#sales-trends-combined", vlSpec, options);
}

// Visualization 3 Regional Sales by Platform (Stacked Bar Charts)
async function renderRegionalSalesComparison() {
  // Load data
  const data = await d3.csv("./dataset/videogames_wide.csv");
  
  // Convert numerical columns
  let regionalData = [];
  // Reference: https://jonathansoma.com/tutorials/d3/wide-vs-long-data/ 
  data.forEach(d => {
    regionalData.push({ Platform: d.Platform, Region: "North America", Sales: +d.NA_Sales });
    regionalData.push({ Platform: d.Platform, Region: "Europe", Sales: +d.EU_Sales });
    regionalData.push({ Platform: d.Platform, Region: "Japan", Sales: +d.JP_Sales });
    regionalData.push({ Platform: d.Platform, Region: "Other Regions", Sales: +d.Other_Sales });
  });

  // Create stacked bar chart with platform as color
  var vlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Regional Sales by Platform",
    data: { values: regionalData },
    mark: "bar",
    encoding: {
      x: {
        field: "Region",
        type: "nominal",
        title: "Region",
        axis: { labelAngle: 0 }
      },
      y: {
        field: "Sales",
        type: "quantitative",
        aggregate: "sum",
        axis: {
          title: "Sales (millions of units)",
          labels: false,  
          ticks: false,   
          domain: false   
        }
      },
      color: {
        field: "Platform",
        type: "nominal",
        title: "Platform",
        scale: { scheme: "spectral" },
        sort: { field: "Sales", op: "sum", order: "ascending" },
        legend: {
          columns: 2,
          symbolLimit: 0
        }
      },
      order: {
        field: "Sales",
        aggregate: "sum",
        sort: "ascending"
      },
      tooltip: [
        { field: "Region", type: "nominal", title: "Region" },
        { field: "Platform", type: "nominal", title: "Platform" },
        { field: "Sales", aggregate: "sum", type: "quantitative", title: "Total Sales (millions)", format: ".3f" }
      ]
    },
    width: 800,
    height: 500
  };

  await vegaEmbed("#regional-sales-comparison", vlSpec, options);
}

// Visualization 4 Game Release Year vs Global Sales by Genre (Scatter Plot)
async function renderYearSalesScatter() {
  // Load data
  const data = await d3.csv("./dataset/videogames_wide.csv");
  
  // Convert numerical columns and filter years
  const filteredData = data.filter(d => 
    d.Year && d.Year !== 'N/A' && !isNaN(+d.Year) && +d.Global_Sales > 0
  ).map(d => {
    return {
      Year: +d.Year, 
      Global_Sales: +d.Global_Sales,
      Genre: d.Genre,
      Platform: d.Platform,
      Name: d.Name,
      Publisher: d.Publisher
    };
  });

  // Create scatter plot for visualization 4
  var vlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Game Release Year vs Global Sales by Genre",
    data: { values: filteredData },
    mark: {
      type: "point",
      filled: true,
      opacity: 0.7,
      size: 100
    },
    encoding: {
      x: {
        field: "Year",
        type: "ordinal",  
        title: "Release Year",
        axis: { 
          format: "d", 
          labelAngle: -45
        }
      },
      y: {
        field: "Global_Sales",
        type: "quantitative",
        title: "Global Sales (millions of units)",
        // Reference: https://vega.github.io/vega-lite/docs/scale.html#log 
        scale: { type: "log" }
      },
      color: {
        field: "Genre",
        type: "nominal",
        title: "Game Genre",
        scale: { scheme: "category20" },
        legend: {
          columns: 2,
          symbolLimit: 0
        }
      },
      size: {
        field: "Global_Sales",
        type: "quantitative",
        title: "Sales (millions)",
        legend: null
      },
      tooltip: [
        { field: "Name", type: "nominal", title: "Game Title" },
        { field: "Year", type: "ordinal", title: "Release Year" },
        { field: "Genre", type: "nominal", title: "Genre" },
        { field: "Platform", type: "nominal", title: "Platform" },
        { field: "Publisher", type: "nominal", title: "Publisher" },
        { field: "Global_Sales", type: "quantitative", title: "Global Sales (millions)", format: ".3f" }
      ]
    },
    width: 1000,
    height: 700,
    // Reference: https://vega.github.io/vega-lite/docs/selection.html
    selection: {
      genre_select: {
        type: "multi",
        fields: ["Genre"],
        bind: "legend"
      }
    },
    transform: [
      { filter: { selection: "genre_select" } }
    ]
  };

  await vegaEmbed("#year-sales-scatter", vlSpec, options);
}

// Main render function that calls all visualizations
async function render() {
  // Load data for statistics
  const data = await d3.csv("./dataset/videogames_wide.csv");
  
  // Convert numerical columns for statistics
  // Reference: http://learnjsdata.com/read_data.html 
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
  
  // Create the first visualization
  await renderGenrePlatformChart();
  
  // Create the second visualization
  await renderSalesTrendsCombined();
  
  // Create the third visualization
  await renderRegionalSalesComparison();
  
  // Create the fourth visualization
  await renderYearSalesScatter();
}

// Reference: https://observablehq.com/@d3/d3-mean-d3-median-and-friends 
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

// Reference: https://www.geeksforgeeks.org/dsa/mode/ 
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