var formatDate_fromGEOJSON = d3.time.format("%Y%m%d");
var formatDate_pretty = d3.time.format("%B %Y");
var formatDate = d3.time.format("%b %y");
var formatDate_short = d3.time.format("%Y");
var margin = {
        top: 0,
        right: 25,
        bottom: 0,
        left: 25
    },
    width = 652 - margin.left - margin.right,
    height = 50 - margin.bottom - margin.top;

// scale function
var x = d3.time.scale()
    .domain([new Date('2014-12-31'), new Date('2044-01-01')])
    .range([0, width])
    .clamp(true);

// initial value
var startValue = x(new Date('2015-01-01'));
var startingValue = new Date('2015-01-01');

//////////

// defines brush
var brush = d3.svg.brush()
    .x(x)
    .extent([startingValue, startingValue])
    .on("brush", brushed);

var svg = d3.select("#slider-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height / 2.25 + ")")
    .call(d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function(d) {
            return formatDate_short(d);
        })
        .tickSize(0)
        .ticks(20)
        .tickPadding(14))
    .select(".domain")
    .select(function() {
        return this.parentNode.appendChild(this.cloneNode(true));
    })
    .attr("class", "halo");

var slider = svg.append("g")
    .attr("class", "slider")
    .call(brush);

slider.selectAll(".extent,.resize")
    .remove();

slider.select(".background")
    .attr("height", height);

var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0," + height / 2.25 + ")")
    .attr("r", 9);

svg.selectAll(".axis text").style({
    "font-size": "8px"
});

function brushed() {
    var value = brush.extent()[0];

    if (d3.event.sourceEvent) { // not a programmatic event
        value = x.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
    } else {
        brush.extent([value, value]);
    }

    var x_p = d3.time.scale().range([0, 316])
        .domain([new Date('2015-01-01'), new Date('2044-01-01')]);


    d3.selectAll('.line_time')
        .attr("x1", x_p(new Date(brush.extent()[0])))
        .attr("x2", x_p(new Date(brush.extent()[0])));

    $('#design_layers .dropdown-menu>li.active>a').each(function() {
        var maplayer1 = $(this).attr('maplayer');
        var filter1 = window[maplayer1].getFilter();
        window[maplayer1].setFilter(filter1);
        window[maplayer1].eachLayer(function(layer) {
            var content = '<b>Title: </b>' + layer.feature.properties.Project_Title +
                '<br><b>Category: </b>' + layer.feature.properties.Project_Categoy +
                '<br><b>Description: </b>' + layer.feature.properties.Description +
                '<br><b>Package: </b>' + layer.feature.properties.Package +
                '<br><b>Project ID: </b>' + layer.feature.properties.Project_ID +
                '<br><b>Till 1: </b>' + accounting.formatMoney(layer.feature.properties.Till_1, "$", 0) +
                '<br><b>Till 2: </b>' + accounting.formatMoney(layer.feature.properties.Till_2, "$", 0) +
                '<br><b>Total: </b>' + accounting.formatMoney(layer.feature.properties.Total, "$", 0);
            layer.bindPopup(content);
        });
    });
    $('#construction_layers .dropdown-menu>li.active>a').each(function() {
        var maplayer2 = $(this).attr('maplayer');
        var filter2 = window[maplayer2].getFilter();
        window[maplayer2].setFilter(filter2);
        window[maplayer2].eachLayer(function(layer) {
            var content = '<b>Title: </b>' + layer.feature.properties.Project_Title +
                '<br><b>Category: </b>' + layer.feature.properties.Project_Categoy +
                '<br><b>Description: </b>' + layer.feature.properties.Description +
                '<br><b>Package: </b>' + layer.feature.properties.Package +
                '<br><b>Project ID: </b>' + layer.feature.properties.Project_ID +
                '<br><b>Till 1: </b>' + accounting.formatMoney(layer.feature.properties.Till_1, "$", 0) +
                '<br><b>Till 2: </b>' + accounting.formatMoney(layer.feature.properties.Till_2, "$", 0) +
                '<br><b>Total: </b>' + accounting.formatMoney(layer.feature.properties.Total, "$", 0);
            layer.bindPopup(content);
        });
    });
    $('#handover_layers .dropdown-menu>li.active>a').each(function() {
        var maplayer3 = $(this).attr('maplayer');
        var filter3 = window[maplayer3].getFilter();
        window[maplayer3].setFilter(filter3);
        window[maplayer3].eachLayer(function(layer) {
            var content = '<b>Title: </b>' + layer.feature.properties.Project_Title +
                '<br><b>Category: </b>' + layer.feature.properties.Project_Categoy +
                '<br><b>Description: </b>' + layer.feature.properties.Description +
                '<br><b>Package: </b>' + layer.feature.properties.Package +
                '<br><b>Project ID: </b>' + layer.feature.properties.Project_ID +
                '<br><b>Till 1: </b>' + accounting.formatMoney(layer.feature.properties.Till_1, "$", 0) +
                '<br><b>Till 2: </b>' + accounting.formatMoney(layer.feature.properties.Till_2, "$", 0) +
                '<br><b>Total: </b>' + accounting.formatMoney(layer.feature.properties.Total, "$", 0);
            layer.bindPopup(content);
        });
    });
    $('#handoverbycategory_layers .dropdown-menu>li.active>a').each(function() {
        var maplayer4 = $(this).attr('maplayer');
        var filter4 = window[maplayer4].getFilter();
        window[maplayer4].setFilter(filter4);
        window[maplayer4].eachLayer(function(layer) {
            var content = '<b>Title: </b>' + layer.feature.properties.Project_Title +
                '<br><b>Category: </b>' + layer.feature.properties.Project_Categoy +
                '<br><b>Description: </b>' + layer.feature.properties.Description +
                '<br><b>Package: </b>' + layer.feature.properties.Package +
                '<br><b>Project ID: </b>' + layer.feature.properties.Project_ID +
                '<br><b>Till 1: </b>' + accounting.formatMoney(layer.feature.properties.Till_1, "$", 0) +
                '<br><b>Till 2: </b>' + accounting.formatMoney(layer.feature.properties.Till_2, "$", 0) +
                '<br><b>Total: </b>' + accounting.formatMoney(layer.feature.properties.Total, "$", 0);
            layer.bindPopup(content);
        });
    });


    handle.attr("cx", x(value));
    $('#slider-date h2').text(formatDate_pretty(value));

    if (map.hasLayer(FY16)) {
        FY16.bringToFront()
    }
}