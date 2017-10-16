
d3.select('#render1')
    .on('click', function() {
dc.filterall();dc.redrawall();
$('input:checkbox').removeAttr('checked');
});
$(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
       $('.fix').addClass('fixed-header');
	$('.main-menu').css({top: '0px', position:'fixed'});
    }
    else {
       $('.fix').removeClass('fixed-header');
	$('.main-menu').css({top: '300px', position:'absolute'});
    }
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$('.info').click(function(ev) {
	ev.preventDefault();
	if($(this).hasClass('opened')){
		$(this).removeClass('opened');
		$(this).parents('.info_chart').find('p.desc').slideUp('fast')
	}else{
		closeAllInfos();
		$(this).addClass('opened');
		$(this).parents('.info_chart').find('p.desc').slideDown('fast')
	}
});

function closeAllInfos() {
	$('.info').removeClass('opened');
	$('p.desc').slideUp('fast');
}
var ndx;
var allDim;
var timeFormat1 = d3.time.format('%m/%d/%Y');
var timeFormat = d3.time.format('%Y-%m');
    var usChart = dc.geoChoroplethChart("#us-chart");
var yearRingChart1   = dc.pieChart("#chart-ring-year1"),
    spenderRowChart = dc.barChart("#chart-row-spenders");
var yearRingChart2 = dc.pieChart("#chart-ring-year2");
var yearRingChart3 = dc.pieChart("#chart-ring-year3");
var selectField = dc.selectMenu('#menuselect');
var selectField1 = dc.selectMenu('#menu3select');
var selectField2 = dc.selectMenu('#menu4select');
var arange = "";


var projection = d3.geo.mercator()
    .center([0, 50])
    .scale(100)
    .rotate([-12,0])
    .translate([340, 230]);
  
$(document).ready(function() {
$("#654").on("click", function(e){
  e.preventDefault();
  
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
  return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function(e) {
  var $clicked = $(e.target);
  if (!$clicked.parents().hasClass("dropdown")) { $(".dropdown dd ul").hide();$(".dropdown dd button").hide();}
});

$('#meniselect input[type="checkbox"]').on('click', function() {

  var title = $(this).closest('#meniselect').find('input[type="checkbox"]').val(),
    title = $(this).val() + ",";
arange = title;

  if ($(this).is(':checked')) {
    var html = '<span title="' + title + '">' + title + '</span>';
    $('.multiSel').append(html);
    $(".hida").hide();
  } else {
    $('span[title="' + title + '"]').remove();
    var ret = $(".hida");
    $('.dropdown dt a').append(ret);

  }
});


$(".dropdown1 dt a").on('click', function() {
  $(".dropdown1 dd ul").slideToggle('fast');
});

$(".dropdown1 dd select option a").on('click', function() {
  $(".dropdown1 dd ul").hide();
});

function getSelectedValue(id) {
  return $("#" + id).find(".dropdown1 dt a span.value").html();
}

$(document).bind('click', function(e) {
  var $clicked = $(e.target);
  if (!$clicked.parents().hasClass("dropdown1")) $(".dropdown1 dd ul").hide();
});

$(".dropdown2 dt a").on('click', function() {
  $(".dropdown2 dd ul").slideToggle('fast');
});

$(".dropdown2 dd select option a").on('click', function() {
  $(".dropdown2 dd ul").hide();
});

function getSelectedValue(id) {
  return $("#" + id).find(".dropdown2 dt a span.value").html();
}

$(document).bind('click', function(e) {
  var $clicked = $(e.target);
  if (!$clicked.parents().hasClass("dropdown2")) $(".dropdown2 dd ul").hide();
});
});
d3.csv("https://rawgit.com/ovik-chakraborty/Tutorial/master/global-overview_092017_1.csv", function(error, spendData) {
d3.json("https://rawgit.com/ovik-chakraborty/Tutorial/master/countries1.geo.json", function (error, c) {
spendData.forEach(function(d) {
    d.Report_Year_Month = timeFormat.parse(d.Report_Year_Month);
    d.Volume = +d.Volume;
    d.Open_Interest = +d.Open_Interest;
});
var filteredData = spendData.filter(function (d) {
    return d.Volume != 0;
});
var arrays = d3.map(filteredData, function(d){return d.Exchange_Name;}).keys();
arrays.sort();
arrays.unshift('All-Exchange');

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
 $("#All-Exchange").click(function () {
     $('#meniselect input:checkbox').not(this).prop('checked', this.checked);
 });

var arrays1 = d3.map(filteredData, function(d){return d.Group_Name;}).keys();
arrays1.sort();
arrays1.unshift('All-Group');

    var select = d3.select("#menu1select")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays1)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#All-Group").click(function () {
     $('#menu1select input:checkbox').not(this).prop('checked', this.checked);
 });

var arrays2 = d3.map(filteredData, function(d){return d.Country;}).keys();
arrays2.sort();
arrays2.unshift('All-Country');

    var select = d3.select("#menu2select")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays2)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#All-Country").click(function () {
     $('#menu2select input:checkbox').not(this).prop('checked', this.checked);
 });
d3.select('#render1')
    .on('click', function() {
dc.filterAll();dc.redrawAll();
$('input:checkbox').removeAttr('checked');
});
d3.select('#render')
    .on('click', function() {
var elect = d3.select("#meniselect");
elect.select('ul').remove();
var elect1 = d3.select("#menu1select");
elect1.select('ul').remove();
var elect2 = d3.select("#menu2select");
elect2.select('ul').remove();
usChart.filterAll();dc.redrawAll();
yearRingChart1.filterAll();dc.redrawAll();
yearRingChart2.filterAll();dc.redrawAll();
spenderRowChart.filterAll();dc.redrawAll();
yearRingChart3.filterAll();dc.redrawAll();
selectField.filterAll();dc.redrawAll();
selectField1.filterAll();dc.redrawAll();
selectField2.filterAll();dc.redrawAll();
if(d3.select('#download-type1 input:checked').node().value==='volume') {

var filteredData = spendData.filter(function (d) {
    return d.Volume != 0;
});
var arrays = d3.map(filteredData, function(d){return d.Exchange_Name;}).keys();
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

var arrays1 = d3.map(filteredData, function(d){return d.Group_Name;}).keys();
arrays1.sort();
arrays1.unshift('Select-All');

    var select = d3.select("#menu1select")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays1)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#Select-All").click(function () {
     $('#menu1select input:checkbox').not(this).prop('checked', this.checked);
 });
var arrays2 = d3.map(filteredData, function(d){return d.Country;}).keys();
arrays2.sort();
arrays2.unshift('SelectAll');

    var select = d3.select("#menu2select")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays2)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#SelectAll").click(function () {
     $('#menu2select input:checkbox').not(this).prop('checked', this.checked);
 });
    var element = document.getElementById("header");
	element.innerHTML = "Volume";
    var element = document.getElementById("header1");
	element.innerHTML = "Volume";

    var element = document.getElementById("header3");
	element.innerHTML = "Volume by Region";
    var element = document.getElementById("header4");
	element.innerHTML = "Volume by Country";
    var element = document.getElementById("header5");
	element.innerHTML = "Volume by Exchange";
    var element = document.getElementById("header6");
	element.innerHTML = "Volume by Contract Type";
    var element = document.getElementById("header7");
	element.innerHTML = "Volume by Group";
    document.getElementById("p1").innerHTML = "2.23B";

    ndx = crossfilter(spendData);
var yearDim  = ndx.dimension(function(d) {return d.Region;}),
    countries  = ndx.dimension(function(d) {return d.Country;}),
    countries1  = ndx.dimension(function(d) {return d.Country;}),
    nameDim  = ndx.dimension(function(d) {return d.Contract_Type;}),
    parentDim  = ndx.dimension(function(d) {return d.Exchange_Name;}),
    parentDim1  = ndx.dimension(function(d) {return d.Exchange_Name;}),
    parentDim2  = ndx.dimension(function(d) {return d.Abbreviated_Name;}),
    exchangeDim  = ndx.dimension(function(d) {return d.Group_Name;}),
    exchangeDim1  = ndx.dimension(function(d) {return d.Group_Name;}),
    countries1  = ndx.dimension(function(d) {return d.Country;}),
    stateRaisedSum1 = countries1.group().reduceSum(function(d) {return d.Volume;}),
    stateRaisedSum = countries.group().reduceSum(function(d) {return d.Volume;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return d.Volume;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return d.Volume;}),
    spendPart    = parentDim.group().reduceSum(function(d) {return d.Volume;}),
    spendPart1    = parentDim1.group().reduceSum(function(d) {return d.Volume;}),
    spendPart2    = parentDim2.group().reduceSum(function(d) {return d.Volume;}),
    spendExch1    = exchangeDim1.group().reduceSum(function(d) {return d.Volume;}),
    spendExch    = exchangeDim.group().reduceSum(function(d) {return d.Volume;}),
    allDim1 = ndx.dimension(function(d) {return d.Volume;}),
    eventGroup = allDim1.group().reduceSum(function(d) {return d.Volume;}),
    allDim = ndx.dimension(function(d) {return d.Volume;});
            var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d.data.key + "</span> : "  + d.data.value; });

            var tip1 = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d3.select(this).select("title").text() + "</span>"});

            // tooltips for pie chart
            var pieTip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d.data.key + "</span> : "  + d.value; });

            usChart.width(850)
                    .height(500)
                    .dimension(countries)
                    .group(stateRaisedSum)
                    .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
                    .colorDomain([0, 100000000])
                    .colorCalculator(function (d) { return d ? usChart.colors()(d) : '#ccc'; })
		    .projection(projection)
                    .overlayGeoJson(c.features, "state", function (d) {
                        return d.properties.name;
                    })
                    .title(function (d) {
                        return d.key + ": " + d.value;
                    });

  selectField
      .dimension(parentDim1)
      .group(spendPart1)
      .multiple(true);
selectField.title(function (d){
    return d.key;
})
var activities=0;
var count =  dc.dataCount(".dc-data-count")
    .dimension(eventGroup)
    .group({value: function() { activities=0; 
    return eventGroup.all().filter(function(kv) { if (kv.value>0) {				  
				  activities += +kv.value;
				} return kv.value>0; }).length;
} })
.on("renderlet.all", function(c) {
			$(".nbaccredited").html(numberWithCommas(activities));
});
  selectField1
      .dimension(exchangeDim1)
      .group(spendExch1)
      .multiple(true);
selectField1.title(function (d){
    return d.key;
})

  selectField2
      .dimension(countries1)
      .group(stateRaisedSum1)
      .multiple(true);
selectField2.title(function (d){
    return d.key;
})

var colorScale2 = d3.scale.ordinal().range(["#3BB34A", "#7750A0", "#E0C195", "#5970B5", "#CCDB65", "#4B7837"]);
  yearRingChart1
    .width(350)
    .height(350)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(40)
.colors(colorScale2)
.minAngleForLabel(.8)
.externalRadiusPadding(80)
          .externalLabels(40)
          .drawPaths(false)

    .controlsUseVisibility(true);


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

d3.select('#perform10')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#menu1select input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField1.filter(['Null']);
}
        selectField1.filter([checkedValues]);
selectField1.redrawGroup();

dc.redrawAll();

});
    });

d3.select('#perform12')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#menu2select input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField2.filter(['Null']);
}
        selectField2.filter([checkedValues]);
selectField2.redrawGroup();

dc.redrawAll();

});
    });

var colorScale1 = d3.scale.ordinal().range(["#44C8F5"]);
spenderRowChart
    .width(300)
    .height(400)
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
.elasticY(true)
.x(d3.scale.ordinal())
          .xUnits(dc.units.ordinal)
    .gap(10)
.margins({left: 80, top: 30, right: 30, bottom: 20})
    .controlsUseVisibility(true)
    .renderTitle(true)
.colors(colorScale1)
          .barPadding(0.3)
          .outerPadding(0.3);
     spenderRowChart.yAxis().ticks(7);

var allDollars = ndx.groupAll().reduceSum(function(d) { return d.Volume; });


  yearRingChart2
    .width(350)
    .height(350)
    .dimension(parentDim2)
.minAngleForLabel(.25)
.externalRadiusPadding(80)
          .externalLabels(40)
    .group(spendPart2)
    .innerRadius(40)
    .drawPaths(false)
    .controlsUseVisibility(true);


var colorScale = d3.scale.ordinal().range(["#D2232A", "#FFCD00", "#F68928", "#85C441", "#CCDB65", "#A8DEF5", "#00A4E7","#75787B","#4B4F54"]);
  yearRingChart3
    .width(350)
    .height(350)
    .dimension(exchangeDim)
    .group(spendExch)
    .innerRadius(40)
.colors(colorScale)
.minAngleForLabel(.35)
.externalRadiusPadding(80)
          .externalLabels(40)
    .drawPaths(false)
    .controlsUseVisibility(true);




       
  

d3.select('#CSV')
    .on('click', function() {
        var data = nameDim.top(Infinity);
        
        var blob = new Blob([d3.csv.format(data)], {type: "text/csv;charset=utf-8"});
        saveAs(blob, 'data.csv');
    });

dc.renderAll();
$(document).ready(function() {
                d3.selectAll(".bar").call(tip);
                d3.selectAll(".bar").on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
d3.selectAll(".state").call(tip1);
                d3.selectAll(".state").on('mouseover', tip1.show)
                    .on('mouseout', tip1.hide);

                d3.selectAll(".pie-slice").call(pieTip);
                d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
                    .on('mouseout', pieTip.hide);
var changed;
$('select').change(function(e) {
    var select = $(this);
    var list = select.data('prevstate');
    var val = select.val();
    if (list == null) {
        list = val;
    } else if (val.length == 1) {
        val = val.pop();
        var pos = list.indexOf(val);
        if (pos == -1)
            list.push(val);
        else
            list.splice(pos, 1);
    } else {
        list = val;
    }
    select.val(list);
    select.data('prevstate', list);
    changed = true;
}).find('option').click(function() {
    if (!changed){
        $(this).parent().change();
    }
    changed = false;
});
});

}
if(d3.select('#download-type1 input:checked').node().value==='open') {
var elect = d3.select("#meniselect");
elect.select('ul').remove();
var filteredData = spendData.filter(function (d) {
    return d.Open_Interest != 0;
});
var arrays = d3.map(filteredData, function(d){return d.Exchange_Name;}).keys();
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

var arrays1 = d3.map(filteredData, function(d){return d.Group_Name;}).keys();
arrays1.sort();
arrays1.unshift('Select-All');

    var select = d3.select("#menu1select")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays1)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#Select-All").click(function () {
     $('#menu1select input:checkbox').not(this).prop('checked', this.checked);
 });
var arrays2 = d3.map(filteredData, function(d){return d.Country;}).keys();
arrays2.sort();
arrays2.unshift('SelectAll');

    var select = d3.select("#menu2select")
      .append("ul")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
        
      });

    var inp = select.selectAll("li")
      .data(arrays2)
      .enter()
        .append("li");
        

    inp.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d) { return d; })
	.attr("value", function (d) { return d; });

    inp.append("b")
	.text(function (d) { return d; });
 $("#SelectAll").click(function () {
     $('#menu2select input:checkbox').not(this).prop('checked', this.checked);
 });
    var element = document.getElementById("header");
	element.innerHTML = "Open Interest";
    var element = document.getElementById("header1");
	element.innerHTML = "Open Interest";
    var element = document.getElementById("header3");
	element.innerHTML = "OI by Region";
    var element = document.getElementById("header4");
	element.innerHTML = "Open Interest by Country";
    var element = document.getElementById("header5");
	element.innerHTML = "OI by Exchange/CCP";
    var element = document.getElementById("header6");
	element.innerHTML = "OI by Contract Type";
    var element = document.getElementById("header7");
	element.innerHTML = "OI by Group";
    document.getElementById("p1").innerHTML = "898.2M";

    ndx = crossfilter(spendData);
var yearDim  = ndx.dimension(function(d) {return d.Region;}),
    countries  = ndx.dimension(function(d) {return d.Country;}),
    nameDim  = ndx.dimension(function(d) {return d.Contract_Type;}),
    parentDim  = ndx.dimension(function(d) {return d.Exchange_Name;}),
    parentDim1  = ndx.dimension(function(d) {return d.Exchange_Name;}),
    parentDim2  = ndx.dimension(function(d) {return d.Abbreviated_Name;}),
    exchangeDim  = ndx.dimension(function(d) {return d.Group_Name;}),
    exchangeDim1  = ndx.dimension(function(d) {return d.Group_Name;}),
    countries1  = ndx.dimension(function(d) {return d.Country;}),
    stateRaisedSum1 = countries1.group().reduceSum(function(d) {return d.Open_Interest;}),
    stateRaisedSum = countries.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendPart    = parentDim.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendPart1    = parentDim1.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendPart2    = parentDim2.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendExch    = exchangeDim.group().reduceSum(function(d) {return d.Open_Interest;}),
    spendExch1    = exchangeDim1.group().reduceSum(function(d) {return d.Open_Interest;}),
    allDim1 = ndx.dimension(function(d) {return d.Open_Interest;}),
    eventGroup = allDim1.group().reduceSum(function(d) {return d.Open_Interest;}),
    allDim = ndx.dimension(function(d) {return d.Open_Interest;});
selectField
      .dimension(parentDim1)
      .group(spendPart1)
      .multiple(true);
selectField.title(function (d){
    return d.key;
})
var activities=0;
var count =  dc.dataCount(".dc-data-count")
    .dimension(eventGroup)
    .group({value: function() { activities=0; 
    return eventGroup.all().filter(function(kv) { if (kv.value>0) {				  
				  activities += +kv.value;
				} return kv.value>0; }).length;
} })
.on("renderlet.all", function(c) {
			$(".nbaccredited").html(numberWithCommas(activities));
});
  selectField1
      .dimension(exchangeDim1)
      .group(spendExch1)
      .multiple(true);
selectField1.title(function (d){
    return d.key;
})

  selectField2
      .dimension(countries1)
      .group(stateRaisedSum1)
      .multiple(true);
selectField2.title(function (d){
    return d.key;
})
            var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d.data.key + "</span> : "  + d.data.value; });

            var tip1 = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d3.select(this).select("title").text() + "</span>"});

            // tooltips for pie chart
            var pieTip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d.data.key + "</span> : "  + d.value; });

            usChart.width(850)
                    .height(500)
                    .dimension(countries)
                    .group(stateRaisedSum)
                    .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
                    .colorDomain([0, 50000000])
                    .colorCalculator(function (d) { return d ? usChart.colors()(d) : '#ccc'; })
		    .projection(projection)
                    .overlayGeoJson(c.features, "state", function (d) {
                        return d.properties.name;
                    })
                    .title(function (d) {
                        return d.key + ": " + d.value;
                    });
var colorScale2 = d3.scale.ordinal().range(["#3BB34A", "#7750A0", "#E0C195", "#5970B5", "#CCDB65", "#4B7837"]);
  yearRingChart1
    .width(350)
    .height(350)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(40)
.colors(colorScale2)
.minAngleForLabel(.4)
.externalRadiusPadding(80)
          .externalLabels(40)
          .drawPaths(false)

    .controlsUseVisibility(true);


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

d3.select('#perform10')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#menu1select input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField1.filter(['Null']);
}
        selectField1.filter([checkedValues]);
selectField1.redrawGroup();

dc.redrawAll();

});
    });
d3.select('#perform12')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#menu2select input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField2.filter(['Null']);
}
        selectField2.filter([checkedValues]);
selectField2.redrawGroup();

dc.redrawAll();

});
    });
var colorScale1 = d3.scale.ordinal().range(["#44C8F5"]);
spenderRowChart
    .width(300)
    .height(400)
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
.elasticY(true)
.x(d3.scale.ordinal())
          .xUnits(dc.units.ordinal)
    .gap(10)
.margins({left: 80, top: 30, right: 30, bottom: 20})
    .controlsUseVisibility(true)
    .renderTitle(true)
.colors(colorScale1)
          .barPadding(0.3)
          .outerPadding(0.3);
     spenderRowChart.yAxis().ticks(7);


var allDollars = ndx.groupAll().reduceSum(function(d) { return d.Open_Interest; });


  yearRingChart2
    .width(350)
    .height(350)
    .dimension(parentDim2)
.minAngleForLabel(.2)
.externalRadiusPadding(80)
          .externalLabels(40)
    .group(spendPart2)
    .innerRadius(40)
    .drawPaths(false)
    .controlsUseVisibility(true);



var colorScale = d3.scale.ordinal().range(["#D2232A", "#FFCD00", "#F68928", "#85C441", "#CCDB65", "#A8DEF5", "#00A4E7","#75787B","#4B4F54"]);
  yearRingChart3
    .width(350)
    .height(350)
    .dimension(exchangeDim)
    .group(spendExch)
    .innerRadius(40)
.colors(colorScale)
.minAngleForLabel(.2)
.externalRadiusPadding(80)
          .externalLabels(40)
    .drawPaths(false)
    .controlsUseVisibility(true);




       

  

d3.select('#CSV')
    .on('click', function() {
        var data = nameDim.top(Infinity);
        
        var blob = new Blob([d3.csv.format(data)], {type: "text/csv;charset=utf-8"});
        saveAs(blob, 'data.csv');
    });

dc.renderAll();
$(document).ready(function() {
                d3.selectAll(".bar").call(tip);
                d3.selectAll(".bar").on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
d3.selectAll(".state").call(tip1);
                d3.selectAll(".state").on('mouseover', tip1.show)
                    .on('mouseout', tip1.hide);

                d3.selectAll(".pie-slice").call(pieTip);
                d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
                    .on('mouseout', pieTip.hide);
var changed;
$('select').change(function(e) {
    var select = $(this);
    var list = select.data('prevstate');
    var val = select.val();
    if (list == null) {
        list = val;
    } else if (val.length == 1) {
        val = val.pop();
        var pos = list.indexOf(val);
        if (pos == -1)
            list.push(val);
        else
            list.splice(pos, 1);
    } else {
        list = val;
    }
    select.val(list);
    select.data('prevstate', list);
    changed = true;
}).find('option').click(function() {
    if (!changed){
        $(this).parent().change();
    }
    changed = false;
});
});

}
});
    ndx = crossfilter(spendData);
var yearDim  = ndx.dimension(function(d) {return d.Region;}),
    countries  = ndx.dimension(function(d) {return d.Country;}),
    nameDim  = ndx.dimension(function(d) {return d.Contract_Type;}),
    parentDim  = ndx.dimension(function(d) {return d.Exchange_Name;}),
    parentDim1  = ndx.dimension(function(d) {return d.Exchange_Name;}),
    parentDim2  = ndx.dimension(function(d) {return d.Abbreviated_Name;}),
    exchangeDim  = ndx.dimension(function(d) {return d.Group_Name;}),
    exchangeDim1  = ndx.dimension(function(d) {return d.Group_Name;}),
    countries1  = ndx.dimension(function(d) {return d.Country;}),
    stateRaisedSum1 = countries1.group().reduceSum(function(d) {return d.Volume;}),
    stateRaisedSum = countries.group().reduceSum(function(d) {return d.Volume;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return d.Volume;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return d.Volume;}),
    spendPart    = parentDim.group().reduceSum(function(d) {return d.Volume;}),
    spendPart1    = parentDim1.group().reduceSum(function(d) {return d.Volume;}),
    spendPart2    = parentDim2.group().reduceSum(function(d) {return d.Volume;}),
    spendExch    = exchangeDim.group().reduceSum(function(d) {return d.Volume;}),
    spendExch1    = exchangeDim1.group().reduceSum(function(d) {return d.Volume;}),
    allDim1 = ndx.dimension(function(d) {return d.Volume;}),
    eventGroup = allDim1.group().reduceSum(function(d) {return d.Volume;}),
    allDim = ndx.dimension(function(d) {return d.Volume;});

selectField
      .dimension(parentDim1)
      .group(spendPart1)
      .multiple(true);	
selectField.title(function (d){
    return d.key;
})
var activities=0;
var count =  dc.dataCount(".dc-data-count")
    .dimension(eventGroup)
    .group({value: function() { activities=0; 
    return eventGroup.all().filter(function(kv) { if (kv.value>0) {				  
				  activities += +kv.value;
				} return kv.value>0; }).length;
} })
.on("renderlet.all", function(c) {
			$(".nbaccredited").html(numberWithCommas(activities));
});
  selectField1
      .dimension(exchangeDim1)
      .group(spendExch1)
      .multiple(true);
selectField1.title(function (d){
    return d.key;
})
  selectField2
      .dimension(countries1)
      .group(stateRaisedSum1)
      .multiple(true);
selectField2.title(function (d){
    return d.key;
})
      
            var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d.data.key + "</span> : "  + d.data.value; });

            var tip1 = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d3.select(this).select("title").text() + "</span>"});

            // tooltips for pie chart
            var pieTip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function (d) { return "<span style='color: #fff'>" +  d.data.key + "</span> : "  + d.value; });

            usChart.width(850)
                    .height(500)
                    .dimension(countries)
                    .group(stateRaisedSum)
                    .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
                    .colorDomain([0, 100000000])
                    .colorCalculator(function (d) { return d ? usChart.colors()(d) : '#ccc'; })
		    .projection(projection)

                    .overlayGeoJson(c.features, "state", function (d) {
                        return d.properties.name;
                    })
		    .title(function (d) {
                        return d.key + ": " + d.value;
                    });



var colorScale2 = d3.scale.ordinal().range(["#3BB34A", "#7750A0", "#E0C195", "#5970B5", "#CCDB65", "#4B7837"]);
  yearRingChart1
    .width(350)
    .height(350)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(40)
.colors(colorScale2)
.minAngleForLabel(.8)
.externalRadiusPadding(80)
          .externalLabels(40)
          .drawPaths(false)

    .controlsUseVisibility(true);


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

d3.select('#perform10')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#menu1select input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField1.filter(['Null']);
}
        selectField1.filter([checkedValues]);
selectField1.redrawGroup();

dc.redrawAll();

});
    });
d3.select('#perform12')
    .on('click', function() {
$(document).ready(function() {
dc.filterAll();
var checkedValues = $('#menu2select input:checkbox:checked').map(function() {
    return this.value;
}).get();

if (checkedValues === undefined || checkedValues.length == 0) {
    selectField2.filter(['Null']);
}
        selectField2.filter([checkedValues]);
selectField2.redrawGroup();

dc.redrawAll();

});
    });
var colorScale1 = d3.scale.ordinal().range(["#44C8F5"]);
spenderRowChart
    .width(300)
    .height(400)
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
.elasticY(true)
.x(d3.scale.ordinal())
          .xUnits(dc.units.ordinal)
    .gap(10)
.margins({left: 80, top: 30, right: 30, bottom: 20})
    .controlsUseVisibility(true)
    .renderTitle(true)
.colors(colorScale1)
          .barPadding(0.3)
          .outerPadding(0.3);
     spenderRowChart.yAxis().ticks(7);
var allDollars = ndx.groupAll().reduceSum(function(d) { return d.Volume; });



  yearRingChart2
    .width(350)
    .height(350)
    .dimension(parentDim2)
.minAngleForLabel(.25)
.externalRadiusPadding(80)
          .externalLabels(40)
    .group(spendPart2)
    .innerRadius(40)
    .drawPaths(false)
    .controlsUseVisibility(true);


var colorScale = d3.scale.ordinal().range(["#D2232A", "#FFCD00", "#F68928", "#85C441", "#CCDB65", "#A8DEF5", "#00A4E7","#75787B","#4B4F54"]);
  yearRingChart3
    .width(350)
    .height(350)
    .dimension(exchangeDim)
    .group(spendExch)
    .innerRadius(40)
.colors(colorScale)
.minAngleForLabel(.35)
.externalRadiusPadding(80)
          .externalLabels(40)
    .drawPaths(false)
    .controlsUseVisibility(true);
   


                 

  

d3.select('#CSV')
    .on('click', function() {
        var data = nameDim.top(Infinity);
        
            
        
        var blob = new Blob([d3.csv.format(data)], {type: "text/csv;charset=utf-8"});
        saveAs(blob, 'data.csv');
    });



d3.select("#countryreset")
    .on('click', function() {
       usChart.filterAll();dc.redrawAll();

    });
d3.select("#instrumentreset")
    .on('click', function() {
       spenderRowChart.filterAll();dc.redrawAll();

    });
d3.select("#regionreset")
    .on('click', function() {
       yearRingChart1.filterAll();dc.redrawAll();

    });
d3.select("#exchangereset")
    .on('click', function() {
       yearRingChart2.filterAll();dc.redrawAll();

    });
d3.select("#groupreset")
    .on('click', function() {
       yearRingChart3.filterAll();dc.redrawAll();
    });
	

dc.renderAll();


$(document).ready(function() {
                d3.selectAll(".bar").call(tip);
                d3.selectAll(".bar").on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
d3.selectAll(".state").call(tip1);
                d3.selectAll(".state").on('mouseover', tip1.show)
                    .on('mouseout', tip1.hide);

                d3.selectAll(".pie-slice").call(pieTip);
                d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
                    .on('mouseout', pieTip.hide);		
var changed;
$('select').change(function(e) {
    var select = $(this);
    var list = select.data('prevstate');
    var val = select.val();
    if (list == null) {
        list = val;
    } else if (val.length == 1) {
        val = val.pop();
        var pos = list.indexOf(val);
        if (pos == -1)
            list.push(val);
        else
            list.splice(pos, 1);
    } else {
        list = val;
    }
    select.val(list);
    select.data('prevstate', list);
    changed = true;
}).find('option').click(function() {
    if (!changed){
        $(this).parent().change();
    }
    changed = false;
});
});
});
 });

