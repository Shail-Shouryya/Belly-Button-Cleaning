function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(metaData){
        console.log(metaData);
    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleMetadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadataPanel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(metaData).forEach((entry) => {
        const [key, value] = entry;
        sampleMetadataPanel
            .append("option")
            .text(`${key}: ${value}`)
            .property("value", key);
    });

    // BONUS: Build the Gauge Chart
    buildGauge(metaData.WFREQ); 
  });
}


function buildCharts(sample) {
  // Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then(function(sampleData){
    // Build a Bubble Chart using the sample data
    var bubbleChartLabels = sampleData["otu_ids"];

    var bubbleChartLayout = {
        autosize: true,
        margin: {l: 50, r: 30, t: 10, pad: 4}, // adds space in pixels to EDGES of plot
        hovermode: 'closest',
        xaxis: {title: 'OTU ID', automargin: true}
    };
    var bubbleChartData = [{
        x: sampleData["otu_ids"],
        y: sampleData["sample_values"],
        text: bubbleChartLabels,
        mode: 'markers',
        marker: {
            size: sampleData["sample_values"],
            color: sampleData["otu_ids"],
            colorscale: "Earth",
        }
    }];
    
    var bubble = document.getElementById('bubble');
    Plotly.newPlot(bubble, bubbleChartData, bubbleChartLayout);

    // Build a Pie Chart
    // ***use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).***
    var pieChartData = [{
        values: sampleData["sample_values"].slice(0, 10),
        labels: sampleData["otu_ids"].slice(0, 10),
        hovertext: bubbleChartLabels.slice(0, 10),
        hoverinfo: "hovertext",
        type: "pie"
    }];
    var pieChartLayout = {
        margin: {l: 50, r: 50, b: 10, t: 10, pad: 4}
    };
    var pie = document.getElementById('pie');
    Plotly.newPlot(pie, pieChartData, pieChartLayout);
  });    
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((samples) => {
    samples.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = samples[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

function buildGauge(wfreq) {
    
    // code adapted from https://plot.ly/javascript/gauge-charts/
    // Calculate gauge level
    var convertedGauge = (wfreq / 9) * 180; // since we want 9 sections, we use "9" here and henceforth 9 sections for all the formatting

    var degrees = 180 - convertedGauge,
       radius = .5;
    var radians = degrees * Math.PI / 180; // degrees to radians conversion
    var x = radius * Math.cos(radians); // cosine function formula
    var y = radius * Math.sin(radians); // sine function formula

    // Path for triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = 'Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var gaugeChartData = [{type: 'scatter',
        x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'washes',
        text: wfreq,
        hoverinfo: 'text+name'},
        {values: [90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90/9, 90],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(64, 107, 11, .5)', 'rgba(94, 137, 16, .5)', 
                          'rgba(110, 154, 22, .5)', 'rgba(150, 174, 32, .5)',
                           'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                           'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                           'rgba(255, 255, 255, 0)']},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var gaugeLayout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: 'Belly Button Washing Frequency <br> (1-9 Scrubs per Week)',
    autosize: true,
    margin: {l: 0, r: 0, b: -40, t: 70, pad: 4}, // adds space in pixels to EDGES of plot
    // height: 500,
    // width: 500,
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1], autosize: true},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]}
  };

  var Gauge = document.getElementById('gauge');
  Plotly.newPlot(Gauge, gaugeChartData, gaugeLayout);

}

// Initialize the dashboard
init();