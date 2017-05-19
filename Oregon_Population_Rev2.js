  //Javascript for Oregon_Population_Rev2.html

  var WIDTH = "960";
  var HEIGHT = "500";
  var MARGIN = "60";
  var BUTTON_X = WIDTH/8;
  var BUTTON_Y = HEIGHT/4;

function draw_chart(data, category) {

  var svg = dimple.newSvg("#chartContainer", WIDTH, HEIGHT);
  // animation time for storyboard
  var DURATION = 2500;
  // triggers storyboard animation
  var firstTick = true;

  // filter data based on census year, Percent Change does not use 1850, as it is first year so no % change
  if (category == "Percent Change") {
    data = dimple.filterData(data, "year", [
        "1860", "1870", "1880", "1890", "1900", "1910",
        "1920", "1930", "1940", "1950", "1960", "1970",
        "1980", "1990", "2000", "2010", "2015",
    ]);
  } else {
    data = dimple.filterData(data, "year", [
        "1850", "1860", "1870", "1880", "1890", "1900",
        "1910", "1920", "1930", "1940", "1950", "1960",
        "1970", "1980", "1990", "2000", "2010", "2015",        
      ])};

    data_growth = dimple.filterData(data, "growth", "neg");

      var un = 'Urban, population is decreasing';
      var rn = 'Rural, population is decreasing';
      var up = 'Urban, population is increasing';
      var rp = 'Rural, population is increasing';

      data.forEach( function( d ) {
      if (d.growth == "neg" & d.demographic == "urban") {
        d.growth = un;
      } else if (d.growth == "neg" & d.demographic == "rural") {
        d.growth = rn;
      } else if (d.growth == "pos" & d.demographic == "urban") {
        d.growth = up;        
      } else {
        d.growth = rp;       
      }
    });


    // Create button chart to choose years 
    var buttons = new dimple.chart(svg, data);
    buttons.setBounds(WIDTH - BUTTON_X - MARGIN/2 +20, MARGIN, BUTTON_X, HEIGHT - MARGIN*3 -10);
    var defaultColor = new dimple.color("#AAAAAA");
    var indicatorColor = new dimple.color("#555555");

    var y = buttons.addCategoryAxis("y", "year");
    y.addOrderRule("year", "Desc");
    
    // x-axis of button chart is category passed to draw_chart function
    var x = buttons.addMeasureAxis("x", category);
    x.hidden = true;

    var s = buttons.addSeries(null, dimple.plot.bar);
    s.addEventHandler("click", onClick);

    buttons.draw();

    // Remove the title from the y axis, must happen after chart is drawn
    y.titleShape.remove();

    // cleanup y axis formatting for button chart
    y.shapes.selectAll("line,path").remove();

    y.shapes.selectAll("text")
            .style("text-anchor", "center")
            .style("font-size", "12px");

    // Add legend title
    svg.selectAll("title_text")
            .data(["Click year bar to pause",
                "animation, click again",
                "to resume"])
            .enter()
            .append("text")
            .attr("x", WIDTH - BUTTON_X - MARGIN + 10)
            .attr("y", function (d, i) { return 10 + i * 12; })
            .style("font-family", "sans-serif")
            .style("font-size", "12px")
            .style("color", "Black")
            .text(function (d) { return d; });

    // Draw the main bar plot
    var myChart = new dimple.chart(svg, data);
      myChart.setBounds(MARGIN, MARGIN , WIDTH - BUTTON_X - 2 * MARGIN, HEIGHT - 3 * MARGIN)
      var x = myChart.addCategoryAxis("x", "County");
      var y = myChart.addLogAxis("y", category);
      var series = myChart.addSeries(["growth"], dimple.plot.bar);
      myChart.assignColor(rp, "#AD1625");
      myChart.assignColor(rn, "#FF7D87");
      myChart.assignColor(un, "#7CC7FF");
      myChart.assignColor(up, "#4178BE");
      
      x.fontSize = "11px";
      y.fontSize = "11px";
      y.title = category + " (log10)";
      var legend = myChart.addLegend( WIDTH * .05 , MARGIN * .5 , 400 , 40 , series);
      legend.fontSize = "11px";

    //Order the legend
    legend._getEntries = function () {
      var orderedValues = [rp, up, rn, un];
      var entries = [];
      orderedValues.forEach(function (v) {
          entries.push(
          {
                  key: v,
                  fill: myChart.getColor(v).fill,
                  stroke: myChart.getColor(v).stroke,
                  opacity: myChart.getColor(v).opacity,
                  series: s,
                  aggField: [v]
              }
          );
      }, this);
    return entries;
  };

      //set y-axis scale for the 2 different chart scenarios
      if (category == "Population") {
        y.overrideMax = 1000000;
      } else {
        y.overrideMax = 1000;
      };

    // Define orderRule so that oder of counties is consistent between charts
    x.addOrderRule(["Multnomah", "Washington", "Lane", "Clackamas", "Marion", "Jackson",
        "Deschutes", "Yamhill", "Benton", "Polk", "Columbia", "Douglas", "Linn", 
        "Umatilla", "Coos", "Klamath", "Josephine", "Clatsop", "Lincoln", "Union", "Malheur", "Wasco",
        "Baker", "Tillamook", "Hood River", "Curry", "Crook", "Jefferson",  "Wallowa", 
        "Morrow", "Lake", "Harney", "Grant", "Gilliam", "Sherman", "Wheeler"]);

    // Add the storyboard
    var story = myChart.setStoryboard("year", onTick);
    story.frameDuration = DURATION;

    myChart.draw();
    story.storyLabel.remove();

    //function to pause/restart animation
    function onClick(e) {
        story.pauseAnimation();
        if (e.yValue === story.getFrameValue()) {
            story.startAnimation();
        } else {
            story.goToFrame(e.yValue);
            story.pauseAnimation();
        } 
      };
    var click = false;

    // Handle coloring of year bars, pause animation if it has reached 2015
    function onTick(e) {
        if (!firstTick) {
            // Color all shapes the same
            s.shapes
              .transition()
              .style("fill", function (d) { return (d.y === e ? indicatorColor.fill : defaultColor.fill) })
              .style("stroke", function (d) { return (d.y === e ? indicatorColor.stroke : defaultColor.stroke) });
        } else {
            s.shapes
              .style("fill", function (d) { return (d.y === e ? indicatorColor.fill : defaultColor.fill) })
              .style("stroke", function (d) { return (d.y === e ? indicatorColor.stroke : defaultColor.stroke) });
        };
        firstTick = false;
        if (e === "2015") {
          story.pauseAnimation();
        };
    };
 
 //Restart animation at beginning if button is clicked
    d3.select("#btn3").on("click", function() {
        story.stopAnimation();
        story.startAnimation();
      });

//Chart if Population Button Hit
  d3.select("#btn").on("click", function() {
      d3.select("#chartcontainer").selectAll("*").remove();
      d3.tsv("Oregon_data.tsv", function (data) {
          draw_chart(data, "Population");  
        });
     });

//Chart if Percent Change Button Hit
  d3.select("#btn2").on("click", function() {
      d3.select("#chartcontainer").selectAll("*").remove();
      d3.tsv("Oregon_data.tsv", function (data) {
          draw_chart(data, "Percent Change");  
        });
     }); 
};

//Call draw_chart, pass data and default chart to plot
  d3.tsv("Oregon_data.tsv", function (data) {
      draw_chart(data, "Population");  
  });
