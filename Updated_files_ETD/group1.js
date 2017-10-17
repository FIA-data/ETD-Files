
var chart = dc.lineChart("#test");
var selectField = dc.selectMenu('#menuselect');
var numberformat1 = d3.format(",");
var ndx;
var allDim;
var timeFormat1 = d3.time.format('%m/%d/%Y');
var timeFormat = d3.time.format('%Y-%m');
$(document).ready(function() {
$("#654").on("click", function(e){

  
  if($(this).hasClass("change")) {
    $(this).removeClass("change");
    $(this).children("ul").slideUp("fast");
  } else {
    $(this).addClass("change");
    $(this).children("ul").slideDown("fast");
  }
});

$(".dropdown dt a").on('click', function() {
  $(".dropdown dd ul").slideToggle('fast');
  $(".dropdown dd button").slideToggle('fast');
});

$(".dropdown dd ul li a").on('click', function() {
  $(".dropdown dd ul").hide();
  $(".dropdown dd button").hide();
});

function getSelectedValue(id) {
  return $(id).find("dt a span.value").html();
}

$(document).bind('click', function(e) {
  var $clicked = $(e.target);
  if (!$clicked.parents().hasClass("dropdown")) { $(".dropdown dd ul").hide();$(".dropdown dd button").hide();}
});


});
d3.csv("https://rawgit.com/ovik-chakraborty/Tutorial/master/group_092017.csv", function(error, spendData) {
spendData.forEach(function(d) {
    d.Report_Month = +d.Report_Month;
    d.Report_Year = +d.Report_Year;
    d.Report_Year_Month = timeFormat.parse(d.Report_Year_Month);
    d.Volume = +d.Volume;
    d.Open_Interest = +d.Open_Interest;
});
d3.select('#render1')
    .on('click', function() {
dc.filterAll();dc.redrawAll();
$('input:checkbox').removeAttr('checked');
});
var ndx = crossfilter(spendData);

    var spendDim1 = ndx.dimension(function(d) {return d.Report_Year_Month;}),
       parentDim1 = ndx.dimension(function(d) {return d.Group_Name;}),
    spendPart1    = parentDim1.group().reduceSum(function(d) {return d.Volume;}),
    spendHist1    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Agriculture') {return d.Volume;}else{return 0;}}),
    spendHist3    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Currencies') {return d.Volume;}else{return 0;}}),
    spendHist5    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Energy') {return d.Volume;}else{return 0;}}),
    spendHist6    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Equity') {return d.Volume;}else{return 0;}}),
    spendHist8    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Interest Rates') {return d.Volume;}else{return 0;}}),
    spendHist9    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Metals') {return d.Volume;}else{return 0;}}),
    spendHist11    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Other') {return d.Volume;}else{return 0;}}),
   
    allDim = ndx.dimension(function(d) {return d.Volume;});

d3.select('#render')
    .on('click', function() {
var elect = d3.select("#meniselect");
elect.select('ul').remove();
dc.filterAll();dc.redrawAll();

if(d3.select('#download-type1 input:checked').node().value==='volume') {
var filteredData = spendData.filter(function (d) {
    return d.Volume != 0;
});
x(filteredData);

    var ndx = crossfilter(spendData);

    var spendDim1 = ndx.dimension(function(d) {return d.Report_Year_Month;}),
    parentDim1 = ndx.dimension(function(d) {return d.Group_Name;}),
    spendPart1    = parentDim1.group().reduceSum(function(d) {return d.Volume;}),
    spendHist1    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Agriculture') {return d.Volume;}else{return 0;}}),
    spendHist3    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Currencies') {return d.Volume;}else{return 0;}}),
    spendHist5    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Energy') {return d.Volume;}else{return 0;}}),
    spendHist6    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Equity') {return d.Volume;}else{return 0;}}),
    spendHist8    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Interest Rates') {return d.Volume;}else{return 0;}}),
    spendHist9    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Metals') {return d.Volume;}else{return 0;}}),
    spendHist11    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Other') {return d.Volume;}else{return 0;}}),
   
    allDim = ndx.dimension(function(d) {return d.Volume;});


selectField
      .dimension(parentDim1)
      .group(spendPart1)
      .multiple(true);
selectField.title(function (d){
    return d.key;
});

var colorScale = d3.scale.ordinal().range(["#A8DEF5","#F68928","#CCDB65","#D2232A", "#FFCD00", "#85C441","#00A4E7"]);
selectField.render();
                    chart
              .width(1150)
              .height(400)
              .x(d3.time.scale().domain([new Date(1999,11,31), new Date(2017,8,31)]))
              .round(d3.time.month.round)
              .xUnits(d3.time.months)
              .margins({left: 10, top: 20, right: 100, bottom: 30})
              .renderArea(true)
.colors(colorScale)
.useRightYAxis(true)
              .transitionDuration(1000)
              .clipPadding(10)
              .yAxisLabel("Volume")
              .dimension(spendDim1)
              .elasticY(true)
   
              .renderHorizontalGridLines(true)
              .title(function(d) { return d.value; })
.on("renderlet", function(chart){
    var svg = chart.selectAll("circle.dot").each(function(d, i) {
  if(d3.select(this).select("title").text() == "Volume: 0") {
d3.select(this).remove();
  }
});

})
 .brushOn(false)
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
        // legend.
        // The `.valueAccessor` will be used for the base layer
.legend(dc.legend().x(430).y(0).itemHeight(15).gap(5).horizontal(1).legendWidth(900).itemWidth(100))
        .group(spendHist1, "Agriculture")
        .stack(spendHist3, "Curriencies")
.stack(spendHist5, "Energy")
.stack(spendHist6, "Equity")
.stack(spendHist8, "Interest Rates")
.stack(spendHist9, "Metals")
.stack(spendHist11, "Others")
.title(function(d) { return "Volume: " + d.value; })
        .valueAccessor(function (d) {
            return d.value;
        });
chart.yAxis().ticks(8);
          chart.render();

      }
if(d3.select('#download-type1 input:checked').node().value==='open') {
var filteredData = spendData.filter(function (d) {
    return d.Open_Interest != 0;
});

x(filteredData);
    var ndx = crossfilter(spendData);

    var spendDim1 = ndx.dimension(function(d) {return d.Report_Year_Month;}),
       parentDim1 = ndx.dimension(function(d) {return d.Group_Name;}),
    spendPart1    = parentDim1.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendHist1    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Agriculture') {return d.Open_Interest;}else{return 0;}}),
    spendHist3    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Currencies') {return d.Open_Interest;}else{return 0;}}),
    spendHist5    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Energy') {return d.Open_Interest;}else{return 0;}}),
    spendHist6    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Equity') {return d.Open_Interest;}else{return 0;}}),
    spendHist8    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Interest Rates') {return d.Open_Interest;}else{return 0;}}),
    spendHist9    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Metals') {return d.Open_Interest;}else{return 0;}}),
    spendHist11    = spendDim1.group().reduceSum(function(d) {if (d.Group_Name=='Other') {return d.Open_Interest;}else{return 0;}}),
   
    allDim = ndx.dimension(function(d) {return d.Open_Interest;});


selectField
      .dimension(parentDim1)
      .group(spendPart1)
      .multiple(true);
selectField.title(function (d){
    return d.key;
});

var colorScale = d3.scale.ordinal().range(["#A8DEF5","#F68928","#CCDB65","#D2232A", "#FFCD00", "#85C441","#00A4E7"]);
selectField.render();
               chart
              .width(1150)
              .height(400)
              .x(d3.time.scale().domain([new Date(1999,11,31), new Date(2017,8,31)]))
              .round(d3.time.month.round)
              .xUnits(d3.time.months)
              .margins({left: 10, top: 20, right: 100, bottom: 30})
              .renderArea(true)
.colors(colorScale)
.useRightYAxis(true)
              .transitionDuration(1000)
              .clipPadding(10)
              .yAxisLabel("Open Interest")
              .dimension(spendDim1)
              .elasticY(true)
   
              .renderHorizontalGridLines(true)
              .title(function(d) { return d.value; })
.on("renderlet", function(chart){
    var svg = chart.selectAll("circle.dot").each(function(d, i) {
  if(d3.select(this).select("title").text() == "Open Interest: 0") {
d3.select(this).remove();
  }
});

})
 .brushOn(false)
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
        // legend.
        // The `.valueAccessor` will be used for the base layer
        .legend(dc.legend().x(430).y(0).itemHeight(15).gap(5).horizontal(1).legendWidth(900).itemWidth(100))
        .group(spendHist1, "Agriculture")
        .stack(spendHist3, "Curriencies")
.stack(spendHist5, "Energy")
.stack(spendHist6, "Equity")
.stack(spendHist8, "Interest Rates")
.stack(spendHist9, "Metals")
.stack(spendHist11, "Others")
.title(function(d) { return "Open Interest: " + d.value; })
      .valueAccessor(function (d) {
            return d.value;
        });
chart.yAxis().ticks(8);
          chart.render();
} });

var filteredData = spendData.filter(function (d) {
    return d.Volume != 0;
});
x(filteredData);
function x(filteredData) {
var elect = d3.select("#meniselect");
elect.select('ul').remove();
var arrays = d3.map(filteredData, function(d){return d.Group_Name;}).keys();
arrays.sort();
arrays.unshift('ALL');

    var select = d3.select("#meniselect")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#ALL").click(function () {
     $('#meniselect input:checkbox').not(this).prop('checked', this.checked);
 });    
}

selectField
      .dimension(parentDim1)
      .group(spendPart1)
      .multiple(true);
selectField.title(function (d){
    return d.key;
});

var colorScale = d3.scale.ordinal().range(["#A8DEF5","#F68928","#CCDB65","#D2232A", "#FFCD00", "#85C441","#00A4E7"]);
selectField.render();
               chart
              .width(1150)
              .height(400)
              .x(d3.time.scale().domain([new Date(1999,11,31), new Date(2017,8,31)]))
              .round(d3.time.month.round)
              .xUnits(d3.time.months)
              .margins({left: 10, top: 20, right: 100, bottom: 30})
              .renderArea(true)
.colors(colorScale)
.useRightYAxis(true)
              .transitionDuration(1000)
              .clipPadding(10)
              .yAxisLabel("Volume")
              .dimension(spendDim1)
              .elasticY(true)
   
              .renderHorizontalGridLines(true)
             .title(function(d) { return d.value; })
.on("renderlet", function(chart){
    var svg = chart.selectAll("circle.dot").each(function(d, i) {
  if(d3.select(this).select("title").text() == "Volume: 0") {
d3.select(this).remove();
  }
});

})
 .brushOn(false)
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
        // legend.
        // The `.valueAccessor` will be used for the base layer
        .legend(dc.legend().x(430).y(0).itemHeight(15).gap(5).horizontal(1).legendWidth(900).itemWidth(100))
        .group(spendHist1, "Agriculture")
        .stack(spendHist3, "Curriencies")
.stack(spendHist5, "Energy")
.stack(spendHist6, "Equity")
.stack(spendHist8, "Interest Rates")
.stack(spendHist9, "Metals")
.stack(spendHist11, "Others")
.title(function(d) { return "Volume: " + d.value; })
.valueAccessor(function (d) {
            return d.value;
        });
chart.yAxis().ticks(8);
          chart.render();
      
d3.select('#perform1')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#meniselect input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField.filter(['Null']);
}
        selectField.filter([checkedValues]);
selectField.redrawGroup();

dc.redrawAll();

});
});
    });

d3.csv("https://rawgit.com/ovik-chakraborty/Tutorial/master/group_stats.csv", function(error, spendData) {
var ndx = crossfilter(spendData);
allDim = ndx.dimension(function(d) {return d.Volume;});
var dataTableOptions = {
                "lengthMenu": [[10], [10]],
                "retrieve": true,
		"paging": false,
		"searching": false,
        	"info":     false,
                columnDefs: [
                    {
                        "orderable": true,
                        targets: 0,
                        data: function (d) { return d.Group_Name; }
                    },
                    {
                        "orderable": true,
                        targets: 1,
                        "createdCell": function(cell)
                        {
                             $(cell).addClass('right1');
                        },
                       "width": "15%",
                        data: function (d) { return numberformat1(d.Volume); }
                    } ,
                    {
                        "orderable": true,
                        targets: 2,
                        "createdCell": function(cell)
                        {
                             $(cell).addClass('right1');
                        },
                       "width": "15%",
                        data: function (d) { return d.Volume_M_Change; }
                    },
                    {
                        "orderable": true,
                         targets: 3,
                        "createdCell": function(cell)
                        {
                             $(cell).addClass('right1');
                        },
                       "width": "15%",
                        data: function (d) { return d.Volume_Y_Change; }
                    },
                    {
                        "orderable": true,
                        targets: 4,
                        "createdCell": function(cell)
                        {
                             $(cell).addClass('right1');
                        },
                       "width": "15%",
                        data: function (d) { return numberformat1(d.Open_Interest); }
                    },
					{
                        "orderable": true,
                        targets: 5,
                        "createdCell": function(cell)
                        {
                             $(cell).addClass('right1');
                        },
                       "width": "15%",
                        data: function (d) { return d.Open_Interest_M_Change; }
                    },
		{
                        "orderable": true,
                        targets: 6,
                        "createdCell": function(cell)
                        {
                             $(cell).addClass('right1');
                        },
                       "width": "15%",
                        data: function (d) { return d.Open_Interest_Y_Change; }
                    }		
                ]
            };

var data = $('#table').dataTable(dataTableOptions);
            function RefreshTable() {
                dc.events.trigger(function () {
                     data.api()
                      .clear()
                      .rows.add(allDim.top(10))
                      .draw();
                });
            }

            for (var i = 0; i < dc.chartRegistry.list().length; i++) {
                var chartI = dc.chartRegistry.list()[i];
                chartI.on("filtered", RefreshTable);
            }
RefreshTable();
});
    