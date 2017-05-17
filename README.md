# Udacity Data Analyst NanoDegree Project 6
# Data Visualization of Oregon Population Growth 1850 - 2015


## Summary
Ever since Oregon was inducted as a state on February 14, 1859 is has seen a steady growth in its overall
population. Using a database of populations per county in Oregon, we can visualize the population growth per county
from 1850 until 2015.  The database consists of US census data for 1850 - 2010 in 10 year intervals, 2015 
population data is estimated based on demographic data reported on [wikipedia](https://www.wikipedia.org/).
With a basic understanding of Oregons geography, and the counties in which the largest cities reside, we can 
see that the counties with large cities have seen tremendous growth over the years, while more rural counties
have trended towards stagnate if not decreasing populations.

## Design Process
I had many starts and stops on this project before reaching the final state.  To start with, I could not find a 
comprehensive database online with the data that I desired, so I created a custom database with data derived from
[wikipedia](https://www.wikipedia.org/) and [www.census.gov](http://www.census.gov/population/www/censusdata/PopulationofStatesandCountiesoftheUnitedStates1790-1990.pdf)
(Warning! Previous link opens a very large .pdf file).  
I decided to pursue line, bar and bubble plots to best determine how to visualize the data. Since I was using a custom database that
I constructed myself this was an iterative process in making charts, cleaning my data and refining the format.
I decided to use a bar chart, as this is a categorized dataset which is well suited for a bar chart. In searching 
for methods of animating charts, I found a [resource](http://dimplejs.org/advanced_examples_viewer.html?id=advanced_storyboard_control) for using 
storyBoarding with Dimple. I relied heavily on this resource and its code in accomplishing my visualization.  
Once I had the code working with my data, I worked on the asthetics of my visualization.
After recieving feedback, and analyzing my own visualization, I found it necessary to add a chart of percent_change. The
population change chart did not fully capture the fact that many counties lost population at various times throughout the
time range of interest. In the percent_change chart, I decided to make a concession to leaving the y-axis as dynamic 
instead of having fixed values. This is due to there being such a large range over which the percent_change ranges. If I 
fixed the range to max values of % gain and loss, then the more common small changes would not be visually apparent.

## Example sketch image from exploration
![Example sketch image](https://github.com/bartleatham/DAND_P6/blob/master/Oregon_population_sketch_1.png "Example sketch image")

## Feedback
(1) Eric Leatham, brother and web designer.
  Having worked with D3 and animated plots, Eric appreciated the simplicity that Dimple provides for automated charts.
  In the data, Eric quickly noticed that some counties actually lost population over time. 
  
(2) Heather Stream, wife and astute observer.
  Heather wanted me to add features that while good ideas would have been very difficult using Dimple, such as the
  ability to highlite a bar on the chart and have it highlited while all other bars dimm, so you could more easily
  track a county throughout the observation. At the time of Heathers review, I did not have the percentage_change option
  on my chart. We discussed the merits of adding one and she agreed it was a necessary addition to the project.

(3) Daniel Delany, high school freshman, arguably the target audience for the plots I made.
  Daniel really liked the population plot, he immediately picked up on the magnitude of population in Multnomah
  County, realizing Portland is in that county. While he appreciated the data in the precentage_change chart, the 
  motion of it and changing Y-axis where bothersome to him. Overall he was impressed with the simplicity and asthetics, 
  he mentioned it was 'easy to look at'.

## References
https://www.pdx.edu/sites/www.pdx.edu.prc/files/media_assets/2010_PL94_counties_updated.pdf
http://www.census.gov/population/www/censusdata/PopulationofStatesandCountiesoftheUnitedStates1790-1990.pdf
http://dimplejs.org/advanced_examples_viewer.html?id=advanced_storyboard_control
https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard
https://discussions.udacity.com/
https://www.w3schools.com/html/html_basic.asp

For more information on the dataset used, see [Dataset_Readme.txt](https://github.com/bartleatham/DAND_P6/blob/master/Dataset_Readme.txt) in this repository.
