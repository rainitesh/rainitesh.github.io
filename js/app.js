/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */
// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width
(function() {
    "use strict";
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.querySelector("head").appendChild(msViewportStyle);
    }
})();

$(window).load(function() {

    $("#mapquadrant").toggleClass("loaded");
    $("#graph-one").toggleClass("loaded");
    $("#graph-two").toggleClass("loaded");

    //slider.call(brush.event);

    $(function() {
        $("[data-tooltip='tooltip']").tooltip({
            html: true,
            container: "body"
        });
    });

    $(".leaflet-control-layers-list [checked=checked]").parent().addClass("active");

    $(".leaflet-control-layers-list label").on("click", function() {
        if (!$(this).hasClass("active")) {
            $(".leaflet-control-layers-list label").each(function() {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
        }
    });

    $("i.fa.fa-toggle-on").on({
        click: function(e) {
            e.stopPropagation();
        }
    });

    $("i.fa.fa-toggle-off").on({
        click: function(e) {
            e.stopPropagation();
        }
    });

    $("i.fa.fa-toggle-on").on("click", function() {
        var listitems = $($(this).parent().parent().children()[1]).children();
        var activelayers = [];

        $.each(listitems, function() {
            if ($(this).hasClass("active")) {
                activelayers.push(this);
            }
        });

        $(this).hide();
        $($(this).parent()).find("i.fa-toggle-off").show();

        $.each(activelayers, function() {
            $(this).find("a").click();
        });
    });

    $("i.fa.fa-toggle-off").on("click", function() {
        var listitems = $($(this).parent().parent().children()[1]).children();

        $(this).hide();
        $($(this).parent()).find("i.fa-toggle-on").show();

        $.each(listitems, function() {
            $(this).find("a").click();
        });
    });


    $(".dropdown-menu").on({
        click: function(e) {
            e.stopPropagation();
        }
    });

    $("body").on("click", function(e) {
        if (!$(".dropdown-menu").is(e.target) && $(".dropdown-menu").has(e.target).length === 0 && $(".open").has(e.target).length === 0) {
            $(".dropdown").removeClass("open");
        }
    });

    $("ul.dropdown-menu.navmenu-nav").on("click", "li", function() {
        $(this).toggleClass("active");

    });

    var playInterval;

    $("#play>i").on("click", function() {
        if ($(this).hasClass("fa-play-circle")) {
            $(this).removeClass("fa-play-circle").removeClass("fa-4x").addClass("fa-pause").addClass("fa-3x");

            var remainingMonthsInSliderRange = new d3.time.months(brush.extent()[0], x.domain()[1]);
            var remainingMonthsInSliderRange_length = remainingMonthsInSliderRange.length;

            function play(t) {
                if ((x.domain()[1] - remainingMonthsInSliderRange[t]) < 1000000000) {
                    $(this).removeClass("fa-pause").removeClass("fa-3x").addClass("fa-play-circle").addClass("fa-4x");
                    clearInterval(playInterval);
                } else {
                    brush.extent([new Date(remainingMonthsInSliderRange[t]), new Date(remainingMonthsInSliderRange[t])]);
                    slider.call(brush.event);
                }
            }

            var t = 0;
            playInterval = setInterval(function() {
                play(t)
                t += 1;
            }, 100);

        } else if ($(this).hasClass('fa-pause')) {
            $(this).removeClass('fa-pause').removeClass('fa-3x').addClass('fa-play-circle').addClass('fa-4x');
            clearInterval(playInterval);
        }
    });

});

//D3 Graphs
function buildGraph(divID, graph, scenario) {
    //GRAPHS FOR DA, DD, IA, ID
    if ($.inArray(graph, ["P"]) !== -1) {
        var data = "data/" + scenario + "_" + graph + ".tsv";
        var margin = {
                top: 10,
                right: 25,
                bottom: 20,
                left: 40
            },
            width = 381 - margin.left - margin.right,
            height = 173 - margin.top - margin.bottom;
        var parseDate = d3.time.format("%Y").parse;
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().domain([0, 18000]).range([height, 0]);
        var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20, "s").tickFormat(d3.time.format("%Y"));
        var yAxis = d3.svg.axis().scale(y).orient("left");
        var line_provision = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.PROVISION);
            })
            .interpolate("cardinal")
            .tension(1);
        var line_demand = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.DEMAND);
            })
            .interpolate("cardinal")
            .tension(1);
        var svg = d3.select(divID).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("defs").append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("id", "clip-rect").attr("x", "0").attr("y", "0").attr("width", width).attr("height", height);
        d3.tsv(data, function(error, data) {
            data.forEach(function(d) {
                d.date = parseDate(d.date);
            });

            x.domain(d3.extent(data, function(d) {
                return d.date;
            }));



            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
            svg.append("g").attr("class", "y axis").call(yAxis);

            svg.append("path")
                .data(data)
                .attr("class", "line_provision")
                .attr("d", line_provision(data));

            svg.selectAll(".line_provision").style({
                stroke: "#FF6D00",
                fill: "none",
                "stroke-width": "2px"
            });

            svg.append("path")
                .data(data)
                .attr("class", "line_demand")
                .attr("d", line_demand(data));

            svg.selectAll(".line_demand").style({
                stroke: "#2962FF",
                fill: "none",
                "stroke-width": "2px"
            });

            svg.append("line")
                .attr("class", "line_time")
                .attr("x1", x(new Date(brush.extent()[0])))
                .attr("y1", 0)
                .attr("x2", x(new Date(brush.extent()[0])))
                .attr("y2", height)
                .style("stroke-width", 3)
                .style("stroke", "black")
                .style("fill", "none");

            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 3 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "10px")
                .style("text-transform", "uppercase")
                .text("Parking Demand vs Provision");

            svg.selectAll(".axis line, .axis path").style({
                stroke: "Black",
                fill: "none",
                "stroke-width": "1px"
            });

            svg.selectAll(".axis text").style({
                "font-size": "8px"
            });
        });
    } else if ($.inArray(graph, ["R"]) !== -1) {
        var prefix = d3.formatPrefix(1.21e9);
        var data = "data/" + scenario + "_" + graph + ".tsv";
        var margin = {
                top: 10,
                right: 25,
                bottom: 20,
                left: 40
            },
            width = 381 - margin.left - margin.right,
            height = 173 - margin.top - margin.bottom;
        var parseDate = d3.time.format("%Y").parse;
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().domain([0, 600000000]).range([height, 0]);
        var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20, "s").tickFormat(d3.time.format("%Y"));
        var yAxis = d3.svg.axis().scale(y).orient("left")
            .tickFormat(function(d) {
                var prefix = d3.formatPrefix(d);
                return prefix.scale(d) + prefix.symbol;
            });

        var line_target = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.TARGET);
            })
            .interpolate("cardinal")
            .tension(1);
        var line_pp1 = d3.svg.line()
            .defined(function(d) {
                return d.PP1 != "";
            })
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.PP1);
            });
        var line_pp2 = d3.svg.line()
            .defined(function(d) {
                return d.PP2 != "";
            })
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.PP2);
            });
        var line_pp3 = d3.svg.line()
            .defined(function(d) {
                return d.PP3 != "";
            })
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.PP3);
            });
        var tip_bar = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "Cashflow: " + accounting.formatMoney(d.CASHFLOW, "$", 0);
            });

        var svg = d3.select(divID).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("defs").append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("id", "clip-rect").attr("x", "0").attr("y", "0").attr("width", width).attr("height", height);
        svg.call(tip_bar);

        d3.tsv(data, function(error, data) {
            var tilled = false;
            if (data[0].TILL1) {
                tilled = true
                tip_bar.html(function(d) {
                    return "Till1: " + accounting.formatMoney(d.TILL1, "$", 0) + "    Till2: " + accounting.formatMoney(d.TILL2, "$", 0);
                })
            }


            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.TILL1 = parseInt(d.TILL1, 10)
                d.TILL2 = parseInt(d.TILL2, 10)
            });

            x.domain(d3.extent(data, function(d) {
                return d.date;
            }));

            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
            svg.append("g").attr("class", "y axis").call(yAxis);

            var sel = svg.selectAll(".bar")
                .data(data)
            var barsenter = sel
                .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) {
                    return "translate(" + x(d.date) + ",0)";
                })
                .on('mouseover', tip_bar.show)
                .on('mouseout', tip_bar.hide);

            barsenter.append('rect').classed('till1', true)
            barsenter.append('rect').classed('till2', true)

            sel.select('rect.till1')
                .attr("width", 9)
                .attr("y", function(d) {
                    return y(tilled ? d.TILL1 : d.CASHFLOW);
                })
                .attr("height", function(d) {
                    return height - y(tilled ? d.TILL1 : d.CASHFLOW);
                })
                .attr('fill', 'blue')

            sel.select('rect.till2')
                .attr("width", 9)
                .attr("y", function(d) {
                    return tilled ? y(d.TILL1 + d.TILL2) : 0;
                })
                .attr("height", function(d) {
                    return height - y(d.TILL2)
                })
                .attr('fill', 'red')


            svg.append("path")
                .data(data)
                .attr("class", "line_target")
                .attr("d", line_target(data));

            svg.selectAll(".line_target").style({
                stroke: "Black",
                fill: "none",
                "stroke-width": "2px",
                "stroke-dasharray": ("3, 2")
            });

            svg.append("path")
                .data(data)
                .attr("class", "line_pp1")
                .attr("d", line_pp1(data));

            svg.selectAll(".line_pp1").style({
                stroke: "#2962FF",
                fill: "none",
                "stroke-width": "4px"
            });
            svg.append("path")
                .data(data)
                .attr("class", "line_pp2")
                .attr("d", line_pp2(data));

            svg.selectAll(".line_pp2").style({
                stroke: "#FF6D00",
                fill: "none",
                "stroke-width": "4px"
            });
            svg.append("path")
                .data(data)
                .attr("class", "line_pp3")
                .attr("d", line_pp3(data));

            svg.selectAll(".line_pp3").style({
                stroke: "#FFD600",
                fill: "none",
                "stroke-width": "4px"
            });

            svg.append("line")
                .attr("class", "line_time")
                .attr("x1", x(new Date(brush.extent()[0])))
                .attr("y1", 0)
                .attr("x2", x(new Date(brush.extent()[0])))
                .attr("y2", height)
                .style("stroke-width", 3)
                .style("stroke", "black")
                .style("fill", "none");

            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 3 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "10px")
                .style("text-transform", "uppercase")
                .text("Annual Cashflow (Target: $150M)");

            svg.selectAll(".axis line, .axis path").style({
                stroke: "Black",
                fill: "none",
                "stroke-width": "1px"
            });

            svg.selectAll(".axis text").style({
                "font-size": "8px"
            });

        });
    } else if ($.inArray(graph, ["S"]) !== -1) {
        // console.log(scenario);
        var prefix = d3.formatPrefix(1.21e9);
        var data = "data/" + scenario + "_" + graph + ".tsv";
        var margin = {
                top: 10,
                right: 25,
                bottom: 20,
                left: 40
            },
            width = 381 - margin.left - margin.right,
            height = 173 - margin.top - margin.bottom;
        var parseDate = d3.time.format("%Y").parse;
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().domain([0, 100]).range([height, 0]);
        var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20, "s").tickFormat(d3.time.format("%Y"));
        var yAxis = d3.svg.axis().scale(y).orient("left")
            .tickFormat(function(d) {
                var prefix = d3.formatPrefix(d);
                return prefix.scale(d) + prefix.symbol;
            });

        var line_target = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.TARGET);
            })
            .interpolate("cardinal")
            .tension(1);

        var tip_bar = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "Cashflow: " + accounting.formatMoney(d.CASHFLOW, "$", 0);
            });

        var svg = d3.select(divID).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("defs").append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("id", "clip-rect").attr("x", "0").attr("y", "0").attr("width", width).attr("height", height);
        svg.call(tip_bar);

        d3.tsv(data, function(error, data) {
            var tilled = false;
            if (data[0].DOMESTIC) {
                tilled = true
                tip_bar.html(function(d) {
                    return "Domestic: " + d.DOMESTIC + "    International: " + d.INTERNATIONAL + "    Remote: " + d.REMOTE;
                })
            }


            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.DOMESTIC = parseInt(d.DOMESTIC, 10)
                d.INTERNATIONAL = parseInt(d.INTERNATIONAL, 10)
                d.REMOTE = parseInt(d.REMOTE, 10)
            });

            x.domain(d3.extent(data, function(d) {
                return d.date;
            }));

            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
            svg.append("g").attr("class", "y axis").call(yAxis);

            var sel = svg.selectAll(".bar")
                .data(data)
            var barsenter = sel
                .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) {
                    return "translate(" + x(d.date) + ",0)";
                })
                .on('mouseover', tip_bar.show)
                .on('mouseout', tip_bar.hide);

            barsenter.append('rect').classed('DOMESTIC', true)
            barsenter.append('rect').classed('INTERNATIONAL', true)
            barsenter.append('rect').classed('REMOTE', true)

            sel.select('rect.DOMESTIC')
                .attr("width", 9)
                .attr("y", function(d) {
                    return y(tilled ? d.DOMESTIC : d.CASHFLOW);
                })
                .attr("height", function(d) {
                    return height - y(tilled ? d.DOMESTIC : d.CASHFLOW);
                })
                .attr('fill', 'blue')

            sel.select('rect.INTERNATIONAL')
                .attr("width", 9)
                .attr("y", function(d) {
                    return tilled ? y(d.DOMESTIC + d.INTERNATIONAL) : 0;
                })
                .attr("height", function(d) {
                    return height - y(d.INTERNATIONAL)
                })
                .attr('fill', 'red')

            sel.select('rect.REMOTE')
                .attr("width", 9)
                .attr("y", function(d) {
                    return tilled ? y(d.DOMESTIC + d.INTERNATIONAL + d.REMOTE) : 0;
                })
                .attr("height", function(d) {
                    return height - y(d.REMOTE)
                })
                .attr('fill', 'green')


            svg.append("path")
                .data(data)
                .attr("class", "line_target")
                .attr("d", line_target(data));

            svg.selectAll(".line_target").style({
                stroke: "Black",
                fill: "none",
                "stroke-width": "2px",
                "stroke-dasharray": ("3, 2")
            });

            svg.append("line")
                .attr("class", "line_time")
                .attr("x1", x(new Date(brush.extent()[0])))
                .attr("y1", 0)
                .attr("x2", x(new Date(brush.extent()[0])))
                .attr("y2", height)
                .style("stroke-width", 3)
                .style("stroke", "black")
                .style("fill", "none");

            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 3 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "10px")
                .style("text-transform", "uppercase")
                .text("Masterplan Stand Demand");

            svg.selectAll(".axis line, .axis path").style({
                stroke: "Black",
                fill: "none",
                "stroke-width": "1px"
            });

            svg.selectAll(".axis text").style({
                "font-size": "8px"
            });

        });
    } else {
        if (scenario !== 'S5A'){
            if (graph === "D") {
                var graphTitle = "Domestic PHP LoS";
            } else if (graph === "IA") {
                var graphTitle = "International Arrival PHP LoS";
            } else if (graph === "ID") {
                var graphTitle = "International Departure PHP LoS"
            }

            var data = "data/" + scenario + "_" + graph + ".tsv";
            var margin = {
                    top: 10,
                    right: 25,
                    bottom: 20,
                    left: 40
                },
                width = 381 - margin.left - margin.right,
                height = 173 - margin.top - margin.bottom;
            var parseDate = d3.time.format("%Y").parse;
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().domain([0, 4500]).range([height, 0]);
            var color = d3.scale.ordinal().range(["#4CAF50", "#8BC34A", "#FFEE58", "#FFEB3B", "#F44336", "#B71C1C"].reverse());
            var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20, "s").tickFormat(d3.time.format("%Y"));
            var yAxis = d3.svg.axis().scale(y).orient("left");
            var line_capacity = d3.svg.line()
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.CAPACITY);
                })
                .interpolate("cardinal")
                .tension(1);
            var line_demand = d3.svg.line()
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.DEMAND);
                })
                .interpolate("cardinal")
                .tension(1);
            var area = d3.svg.area().x(function(d) {
                return x(d.date);
            }).y0(function(d) {
                return y(d.y0);
            }).y1(function(d) {
                return y(d.y0 + d.y);
            });
            var stack = d3.layout.stack().values(function(d) {
                return d.values;
            });
            var svg = d3.select(divID).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            svg.append("defs").append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("id", "clip-rect").attr("x", "0").attr("y", "0").attr("width", width).attr("height", height);
            d3.tsv(data, function(error, data) {
                color.domain(d3.keys(data[0]).filter(function(key) {
                    if ($.inArray(key, ["date", "CAPACITY", "DEMAND"]) === -1) {
                        return key;
                    }
                }));
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                });
                var fields = stack(color.domain().map(function(name) {
                    return {
                        name: name,
                        values: data.map(function(d) {
                            return {
                                date: d.date,
                                y: d[name] / 1
                            };
                        })
                    };
                }));
                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));

                var field = svg.selectAll(".field").data(fields).enter().append("g").attr("class", "field");
                field.append("path").attr("class", "area").attr("clip-path", "url(#clip)").attr("d", function(d) {
                    return area(d.values);
                }).style("fill", function(d) {
                    return color(d.name);
                });
                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
                svg.append("g").attr("class", "y axis").call(yAxis);
                svg.append("path")
                    .data(data)
                    .attr("class", "line_capacity")
                    .attr("d", line_capacity(data));

                svg.selectAll(".line_capacity").style({
                    stroke: "Black",
                    fill: "none",
                    "stroke-width": "2px"
                });
                svg.append("path")
                    .data(data)
                    .attr("class", "line_demand")
                    .attr("d", line_demand(data));

                svg.selectAll(".line_demand").style({
                    stroke: "Black",
                    fill: "none",
                    "stroke-width": "2px",
                    "stroke-dasharray": ("3, 2")
                });

                svg.append("line")
                    .attr("class", "line_time")
                    .attr("x1", x(new Date(brush.extent()[0])))
                    .attr("y1", 0)
                    .attr("x2", x(new Date(brush.extent()[0])))
                    .attr("y2", height)
                    .style("stroke-width", 3)
                    .style("stroke", "black")
                    .style("fill", "none");

                svg.append("text")
                    .attr("x", (width / 2))
                    .attr("y", 3 - (margin.top / 2))
                    .attr("text-anchor", "middle")
                    .style("text-transform", "uppercase")
                    .style("font-size", "10px")
                    .text(graphTitle);

                svg.selectAll(".axis line, .axis path").style({
                    stroke: "Black",
                    fill: "none",
                    "stroke-width": "1px"
                });
                svg.selectAll(".axis text").style({
                    "font-size": "8px"
                });
            });
        } else {
            var graphTitle;
            console.log('graph', graph)
            switch (graph){
                case 'Bag':
                    graphTitle = 'Baggage Capacity';
                    break;
                case 'CIC':
                    graphTitle = 'Check-in Capacity';
                    break;
                case 'D':
                    graphTitle = 'Domestic Capacity';
                    break;
                case 'Emi':
                    graphTitle = 'Emigration Capacity';
                    break;
                case 'IA':
                    graphTitle = 'International Arrival Capacity';
                    break;
                case 'ID':
                    graphTitle = 'International Departure Capacity';
                    break;
                case 'Immi':
                    graphTitle = 'Customs / MPI Capacity';
                    break;
                case 'Sec':
                    graphTitle = 'Security Capacity';
                    break;
                default:
                    graphTitle = ''
            }
            console.log(graphTitle)

            
            var data = "data/" + scenario + "_" + graph + ".tsv";
            var margin = {
                    top: 25,
                    right: 25,
                    bottom: 20,
                    left: 40
                },
                width = 381 - margin.left - margin.right,
                height = 173 - margin.top - margin.bottom;
            var parseDate = d3.time.format("%Y").parse;
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().domain([0, 4000]).range([height, 0]);
            var color = d3.scale.ordinal().range(["#FCC378", "#6FDEAD", "#F6967B"].reverse());
            var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20, "s").tickFormat(d3.time.format("%Y"));
            var yAxis = d3.svg.axis().scale(y).orient("left");

            /*
            Capacity    Demand  Over Design Optimum Sub-Optimum
            
            */

            var line_capacity = d3.svg.line()
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.Capacity);
                })
                .interpolate("cardinal")
                .tension(1);
            var line_demand = d3.svg.line()
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.Demand);
                })
                .interpolate("cardinal")
                .tension(1);
            var area = d3.svg.area().x(function(d) {
                return x(d.date);
            }).y0(function(d) {
                return y(0);
            }).y1(function(d) {
                return y(d.y);
            });
            var stack = d3.layout.stack().values(function(d) {
                return d.values;
            });


            var tip_bar = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              

            var svg = d3.select(divID).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            svg.append("defs").append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("id", "clip-rect").attr("x", "0").attr("y", "0").attr("width", width).attr("height", height);
            svg.call(tip_bar);
            var comma = d3.format(",")

            d3.tsv(data, function(error, data) {
                color.domain(d3.keys(data[0]).filter(function(key) {
                    if ($.inArray(key, ["date", "Capacity", "Demand"]) === -1) {
                        return key;
                    }
                }));
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                });
                var fmt = d3.time.format("%Y")
                tip_bar.html(function(d) {
                    var year = d3.time.year(x.invert(d3.mouse(this)[0]))
                    var item = data.filter(function(d){
                        return d3.time.year(d.date).getTime() == year.getTime()
                    })[0]
                    if (!item){
                        return
                    }

                    return "<div>" + 
                        "<div>" + fmt(year) + "</div>" +
                        "<div>Capacity: " + comma(item["Capacity"]) + "</div>" +
                        "<div>Demand: " + comma(item["Demand"]) + "</div>" +
                        '<div style="color:#F6967B;">Optimum: ' + comma(item["Optimum"]) + "</div>" +
                        '<div style="color:#6FDEAD;">Over Design: ' + comma(item["Over Design"]) + "</div>" +
                        '<div style="color:#FCC378;">Sub-Optimum: ' + comma(item["Sub-Optimum"]) + "</div>" +
                    "</div>";
                }).offset(function(d){
                    var year = d3.time.year(x.invert(d3.mouse(this)[0]))
                    return [-10, x(year) - width/2]
                })

                svg.on('mouseover', tip_bar.show)
                    .on('mousemove', tip_bar.show)
                    .on('mouseout', tip_bar.hide);
                
                var fields = color.domain().map(function(name) {
                    return {
                        name: name,
                        values: data.map(function(d) {
                            return {
                                name: name,
                                date: d.date,
                                y: d[name] / 1
                            };
                        })
                    };
                });
                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));

                var field = svg.selectAll(".field").data(fields).enter().append("g").attr("class", "field");
                field.append("path").attr("class", "area").attr("clip-path", "url(#clip)").attr("d", function(d) {
                    return area(d.values);
                }).style("fill", function(d) {
                    return color(d.name);
                }).attr('data-name', function(d){ return d.name })
                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
                svg.append("g").attr("class", "y axis").call(yAxis);
                svg.append("path")
                    .data(data)
                    .attr("class", "line_capacity")
                    .attr("d", line_capacity(data));

                svg.selectAll(".line_capacity").style({
                    stroke: "Black",
                    fill: "none",
                    "stroke-width": "2px"
                });
                svg.append("path")
                    .data(data)
                    .attr("class", "line_demand")
                    .attr("d", line_demand(data));

                svg.selectAll(".line_demand").style({
                    stroke: "Black",
                    fill: "none",
                    "stroke-width": "2px",
                    "stroke-dasharray": ("3, 2")
                });

                svg.append("line")
                    .attr("class", "line_time")
                    .attr("x1", x(new Date(brush.extent()[0])))
                    .attr("y1", 0)
                    .attr("x2", x(new Date(brush.extent()[0])))
                    .attr("y2", height)
                    .style("stroke-width", 3)
                    .style("stroke", "black")
                    .style("fill", "none");

                svg.append("text")
                    .attr("x", (width / 2))
                    .attr("y", 3 - (margin.top / 2))
                    .attr("text-anchor", "middle")
                    .style("text-transform", "uppercase")
                    .style("font-size", "10px")
                    .text(graphTitle);
                
                svg.on('mouseover', tip_bar.show)
                   .on('mouseout', tip_bar.hide);


                svg.selectAll(".axis line, .axis path").style({
                    stroke: "Black",
                    fill: "none",
                    "stroke-width": "1px"
                });
                svg.selectAll(".axis text").style({
                    "font-size": "8px"
                });
            });

        }
    }
}

function toggleScenario(el, scenario) {
    console.log(scenario)

    var design_layers = [],
        construction_layers = [],
        handover_layers = [],
        handoverbycategory_layers = [];

    $('#design_layers .dropdown-menu>li.active>a').each(function() {
        var design_layer = $(this).attr('maplayer').substring(0,$(this).attr('maplayer').lastIndexOf("_"));
        design_layers.push(design_layer);
    });
    $('#construction_layers .dropdown-menu>li.active>a').each(function() {
        var construction_layer = $(this).attr('maplayer').substring(0,$(this).attr('maplayer').lastIndexOf("_"));
        construction_layers.push(construction_layer);
    });
    $('#handover_layers .dropdown-menu>li.active>a').each(function() {
        var handover_layer = $(this).attr('maplayer').substring(0,$(this).attr('maplayer').lastIndexOf("_"));
        handover_layers.push(handover_layer);
    });
    $('#handoverbycategory_layers .dropdown-menu>li.active>a').each(function() {
        var handoverbycategory_layer = $(this).attr('maplayer').substring(0,$(this).attr('maplayer').lastIndexOf("_"));
        handoverbycategory_layers.push(handoverbycategory_layer);
    });

    $('#design_layers .dropdown-menu>li.active>a').click();
    $('#construction_layers .dropdown-menu>li.active>a').click();
    $('#handover_layers .dropdown-menu>li.active>a').click();
    $('#handoverbycategory_layers .dropdown-menu>li.active>a').click();

    $('#design_layers .dropdown-menu>li').remove();
    $('#construction_layers .dropdown-menu>li').remove();
    $('#handover_layers .dropdown-menu>li').remove();
    $('#handoverbycategory_layers .dropdown-menu>li').remove();

    $('#design_layers .dropdown-menu').append(
        '<li class=""><a href="#" onclick="toggleLayer(ITBC_Design_' + scenario + ');return false;" maplayer="ITBC_Design_' + scenario + '" style="border-left-color: #2196F3;">Intl Term Building Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(ITB_Design_' + scenario + ');return false;" maplayer="ITB_Design_' + scenario + '" style="border-left-color: #009688;">Intl Term Building</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(ITBCCS_Design_' + scenario + ');return false;" maplayer="ITBCCS_Design_' + scenario + '" style="border-left-color: #9C27B0;">Intl Term Building &ndash; Core Capacity Study</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(DTBC_Design_' + scenario + ');return false;" maplayer="DTBC_Design_' + scenario + '" style="border-left-color: #4CAF50;">Domestic Term Building Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(DTB_Design_' + scenario + ');return false;" maplayer="DTB_Design_' + scenario + '" style="border-left-color: #8BC34A;">Domestic Term Building</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RT_Design_' + scenario + ');return false;" maplayer="RT_Design_' + scenario + '" style="border-left-color: #CDDC39;">Runway Taxiway</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RC_Design_' + scenario + ');return false;" maplayer="RC_Design_' + scenario + '" style="border-left-color: #FFEB3B;">Roads Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RO_Design_' + scenario + ');return false;" maplayer="RO_Design_' + scenario + '" style="border-left-color: #FFC107;">Roads Other</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(CP_Design_' + scenario + ');return false;" maplayer="CP_Design_' + scenario + '" style="border-left-color: #FF9800;">Car Park</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(CC_Design_' + scenario + ');return false;" maplayer="CC_Design_' + scenario + '" style="border-left-color: #FF5722;">Commercial Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(C_Design_' + scenario + ');return false;" maplayer="C_Design_' + scenario + '" style="border-left-color: #F44336;">Commercial</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(M_Design_' + scenario + ');return false;" maplayer="M_Design_' + scenario + '" style="border-left-color: #B71C1C;">Miscellaneous</a></li>'
    );

    $('#construction_layers .dropdown-menu').append(
        '<li class=""><a href="#" onclick="toggleLayer(ITBC_Construction_' + scenario + ');return false;" maplayer="ITBC_Construction_' + scenario + '" style="border-left-color: #2196F3;">Intl Term Building Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(ITB_Construction_' + scenario + ');return false;" maplayer="ITB_Construction_' + scenario + '" style="border-left-color: #009688;">Intl Term Building</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(ITBCCS_Construction_' + scenario + ');return false;" maplayer="ITBCCS_Construction_' + scenario + '" style="border-left-color: #9C27B0;">Intl Term Building &ndash; Core Capacity Study</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(DTBC_Construction_' + scenario + ');return false;" maplayer="DTBC_Construction_' + scenario + '" style="border-left-color: #4CAF50;">Domestic Term Building Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(DTB_Construction_' + scenario + ');return false;" maplayer="DTB_Construction_' + scenario + '" style="border-left-color: #8BC34A;">Domestic Term Building</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RT_Construction_' + scenario + ');return false;" maplayer="RT_Construction_' + scenario + '" style="border-left-color: #CDDC39;">Runway Taxiway</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RC_Construction_' + scenario + ');return false;" maplayer="RC_Construction_' + scenario + '" style="border-left-color: #FFEB3B;">Roads Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RO_Construction_' + scenario + ');return false;" maplayer="RO_Construction_' + scenario + '" style="border-left-color: #FFC107;">Roads Other</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(CP_Construction_' + scenario + ');return false;" maplayer="CP_Construction_' + scenario + '" style="border-left-color: #FF9800;">Car Park</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(CC_Construction_' + scenario + ');return false;" maplayer="CC_Construction_' + scenario + '" style="border-left-color: #FF5722;">Commercial Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(C_Construction_' + scenario + ');return false;" maplayer="C_Construction_' + scenario + '" style="border-left-color: #F44336;">Commercial</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(M_Construction_' + scenario + ');return false;" maplayer="M_Construction_' + scenario + '" style="border-left-color: #B71C1C;">Miscellaneous</a></li>'
    );

    $('#handover_layers .dropdown-menu').append(
        '<li class=""><a href="#" onclick="toggleLayer(ITBC_HandOver_' + scenario + ');return false;" maplayer="ITBC_HandOver_' + scenario + '" style="border-left-color: #2196F3;">Intl Term Building Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(ITB_HandOver_' + scenario + ');return false;" maplayer="ITB_HandOver_' + scenario + '" style="border-left-color: #009688;">Intl Term Building</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(ITBCCS_HandOver_' + scenario + ');return false;" maplayer="ITBCCS_HandOver_' + scenario + '" style="border-left-color: #9C27B0;">Intl Term Building &ndash; Core Capacity Study</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(DTBC_HandOver_' + scenario + ');return false;" maplayer="DTBC_HandOver_' + scenario + '" style="border-left-color: #4CAF50;">Domestic Term Building Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(DTB_HandOver_' + scenario + ');return false;" maplayer="DTB_HandOver_' + scenario + '" style="border-left-color: #8BC34A;">Domestic Term Building</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RT_HandOver_' + scenario + ');return false;" maplayer="RT_HandOver_' + scenario + '" style="border-left-color: #CDDC39;">Runway Taxiway</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RC_HandOver_' + scenario + ');return false;" maplayer="RC_HandOver_' + scenario + '" style="border-left-color: #FFEB3B;">Roads Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(RO_HandOver_' + scenario + ');return false;" maplayer="RO_HandOver_' + scenario + '" style="border-left-color: #FFC107;">Roads Other</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(CP_HandOver_' + scenario + ');return false;" maplayer="CP_HandOver_' + scenario + '" style="border-left-color: #FF9800;">Car Park</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(CC_HandOver_' + scenario + ');return false;" maplayer="CC_HandOver_' + scenario + '" style="border-left-color: #FF5722;">Commercial Committed</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(C_HandOver_' + scenario + ');return false;" maplayer="C_HandOver_' + scenario + '" style="border-left-color: #F44336;">Commercial</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(M_HandOver_' + scenario + ');return false;" maplayer="M_HandOver_' + scenario + '" style="border-left-color: #B71C1C;">Miscellaneous</a></li>'
    );

    $('#handoverbycategory_layers .dropdown-menu').append(
        '<li class=""><a href="#" onclick="toggleLayer(A_' + scenario + ');return false;" maplayer="A_' + scenario + '" style="border-left-color: #424242;">Airfield</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(T_' + scenario + ');return false;" maplayer="T_' + scenario + '" style="border-left-color: #757575;">Terminal</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(TP_' + scenario + ');return false;" maplayer="TP_' + scenario + '" style="border-left-color: #757575;">Terminal Precinct</a></li>',
        '<li class=""><a href="#" onclick="toggleLayer(R_' + scenario + ');return false;" maplayer="R_' + scenario + '" style="border-left-color: #212121;">Roads</a></li>'
    );

    var design_layers_length = design_layers.length,
        construction_layers_length = construction_layers.length,
        handover_layers_length = handover_layers.length,
        handoverbycategory_layers_length = handoverbycategory_layers.length;

    for (var ii = 0; ii < design_layers_length; ii++) {
        $('#design_layers .dropdown-menu [maplayer="' + design_layers[ii] + '_' + scenario + '"]').click();
    }
    for (var jj = 0; jj < construction_layers_length; jj++) {
        $('#construction_layers .dropdown-menu [maplayer="' + construction_layers[jj] + '_' + scenario + '"]').click();
    }
    for (var kk = 0; kk < handover_layers_length; kk++) {
        $('#handover_layers .dropdown-menu [maplayer="' + handover_layers[kk] + '_' + scenario + '"]').click();
    }
    for (var ll = 0; ll < handoverbycategory_layers_length; ll++) {
        $('#handoverbycategory_layers .dropdown-menu [maplayer="' + handoverbycategory_layers[ll] + '_' + scenario + '"]').click();
    }

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

    var graph1 = "",
        graph2 = "";

    if ($('#graph-one-nav .dropdown-menu>li.active>a').length !== 0) {
        graph1 = $('#graph-one-nav .dropdown-menu>li.active>a').attr('graph');
        $('#graph-one>svg').remove();
        buildGraph('#graph-one', graph1, scenario);
    }

    if ($('#graph-two-nav .dropdown-menu>li.active>a').length !== 0) {
        graph2 = $('#graph-two-nav .dropdown-menu>li.active>a').attr('graph');
        $('#graph-two>svg').remove();
        buildGraph('#graph-two', graph2, scenario);
    }

    $('#graph-one-nav .dropdown-menu li').remove();
    $('#graph-two-nav .dropdown-menu li').remove();

    $('#graph-one-nav .dropdown-menu').append(
        '<li><a href="#" onclick="toggleGraph(this,\'R\',\'' + scenario + '\');return false;" graph="R" style="border-left-color: #4CAF50;">Annual Cashflow</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'D\',\'' + scenario + '\');return false;" graph="D" style="border-left-color: #2196F3;">Domestic PHP LoS</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'IA\',\'' + scenario + '\');return false;" graph="IA" style="border-left-color: #9C27B0;">International Arrival PHP LoS</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'ID\',\'' + scenario + '\');return false;" graph="ID" style="border-left-color: #8E24AA;">International Departure PHP LoS</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'P\',\'' + scenario + '\');return false;" graph="P" style="border-left-color: #795548;">Parking Demand vs Provision</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'S\',\'' + scenario + '\');return false;" graph="S" style="border-left-color: #FF9800;">Stands</a></li>'
    );

    $('#graph-two-nav .dropdown-menu').append(
        '<li><a href="#" onclick="toggleGraph(this,\'CIC\',\'' + scenario + '\');return false;" graph="CIC">Check-in Capacity</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'Sec\',\'' + scenario + '\');return false;" graph="Sec">Security Capacity</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'Emi\',\'' + scenario + '\');return false;" graph="Emi">Emigration Capacity</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'Immi\',\'' + scenario + '\');return false;" graph="Immi">Customs / MPI Capacity</a></li>',
        '<li><a href="#" onclick="toggleGraph(this,\'Bag\',\'' + scenario + '\');return false;" graph="Bag">Baggage Capacity</a></li>'
    );

    if (graph1.length !== 0) {
        $('#graph-one-nav .dropdown-menu>li [graph="' + graph1 + '"]').parent().addClass('active');
    }
    if (graph2.length !== 0) {
        $('#graph-two-nav .dropdown-menu>li [graph="' + graph2 + '"]').parent().addClass('active');
    }
    if (map.hasLayer(FY16)) {
        FY16.bringToFront()
    }
}

function toggleGraph(el, graph, scenario) {
    var currentGraphNav = "#".concat($(el).parent().parent().parent().parent().attr("id"));
    var currentGraph = "#".concat($(el).parent().parent().parent().parent().attr("id").split("-nav")[0]);
    var currentGraphName = $(el).parent().parent().parent().parent().attr("title");
    var currentGraphTitle = $(el).text();
    if ($(el).parent().hasClass("active")) {
        $(currentGraph + ">svg").remove();
        $(currentGraph + "-placeholder").show();
        $($(el).parent().parent().parent().children()[0]).html(currentGraphName + ' <i class="fa fa-caret-down" style="float:right; margin-top:2px"></i>');
    } else if ($(currentGraphNav + " .dropdown-menu>li.active").length !== 0) {
        $(currentGraph + "-placeholder").hide();
        $(currentGraphNav + " .dropdown-menu>li.active").each(function() {
            $(this).removeClass("active");
        });
        $(currentGraph + ">svg").remove();
        $($(el).parent().parent().parent().children()[0]).html(currentGraphTitle + ' <i class="fa fa-caret-down" style="float:right; margin-top:2px"></i>');
        buildGraph(currentGraph, graph, scenario);
    } else {
        $(currentGraph + "-placeholder").hide();
        $($(el).parent().parent().parent().children()[0]).html(currentGraphTitle + ' <i class="fa fa-caret-down" style="float:right; margin-top:2px"></i>');
        buildGraph(currentGraph, graph, scenario);
    }
}