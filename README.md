# Belly Button Biodiversity

## https://belly--button--biodiversity.herokuapp.com
![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)

In this project, we will build an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

## Step 1 - Plotly.js

Use Plotly.js to build interactive charts for our dashboard.

* Create a PIE chart that uses data from our samples route (`/samples/<sample>`) to display the top 10 samples.

  * Use `sample_values` as the values for the PIE chart

  * Use `otu_ids` as the labels for the pie chart

  * Use `otu_labels` as the hovertext for the chart

  ![PIE Chart](Images/pie_chart.png)

* Create a Bubble Chart that uses data from our samples route (`/samples/<sample>`) to display each sample.

  * Use `otu_ids` for the x values

  * Use `sample_values` for the y values

  * Use `sample_values` for the marker size

  * Use `otu_ids` for the marker colors

  * Use `otu_labels` for the text values

  ![Bubble Chart](Images/bubble_chart.png)

* Display the sample metadata from the route `/metadata/<sample>`

  * Display each key/value pair from the metadata JSON object somewhere on the page

* Update all of the plots any time that a new sample is selected.

* Create any layout you would like for your dashboard. An example dashboard page might look something like the following.

![Example Dashboard Page](Images/dashboard_part1.png)
![Example Dashboard Page](Images/dashboard_part2.png)

## Step 2 - Heroku

Deploy our Flask app to Heroku.

* We can use the provided sqlite file for the database.

- - -

## Extra Practice

The following task is very advanced.

* Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the Weekly Washing Frequency obtained from the route `/wfreq/<sample>`

* We will need to modify the example gauge code to account for values ranging from 0 - 9.

* Update the chart whenever a new sample is selected

![Weekly Washing Frequency Gauge](Images/gauge.png)

- - -

## Flask API

Use Flask API starter code to serve the data needed for our plots.

* Test the routes by visiting each one in the browser.

- - -

## Hints

* Don't forget to `pip install -r requirements.txt` before you start your server.

* Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

* Refer to the [Plotly.js Documentation](https://plot.ly/javascript/) when building the plots.

- - -

### Copyright

Data Boot Camp © 2018. All Rights Reserved.
