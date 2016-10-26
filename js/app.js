var map = L.map('map').setView([-37.813611, 144.963055], 15);
            mapLink =
                    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
            L.tileLayer(
                    'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
                        attribution: '&copy; ' + mapLink + ' Contributors',
                        maxZoom: 18,
                    }).addTo(map);

            var svg = d3.select(map.getPanes().overlayPane).append("svg"),
                    g = svg.append("g").attr("class", "leaflet-zoom-hide");


            d3.json("data/existingLine.geojson", function (geoShape) {
                /* Add a LatLng object to each item in the dataset */

                var transform = d3.geo.transform({point: projectPoint}),
                        path = d3.geo.path().projection(transform);

                // create path elements for each of the features
                d3_features = g.selectAll("path")
                        .data(geoShape.features)
                        .enter().append("path");

                map.on("viewreset", reset);

                reset();

                // fit the SVG element to leaflet's map layer
                function reset() {

                    bounds = path.bounds(geoShape);
                    console.log(bounds[0]);

                    var topLeft = bounds[0],
                            bottomRight = bounds[1];

                    svg.attr("width", bottomRight[0] - topLeft[0])
                            .attr("height", bottomRight[1] - topLeft[1])
                            .style("left", topLeft[0] + "px")
                            .style("top", topLeft[1] + "px");

                    g.attr("transform", "translate(" + -topLeft[0] + ","
                            + -topLeft[1] + ")");

                    // initialize the path data 
                    d3_features.attr("d", path)
                            .style("stroke", "green")
                            .style("stroke-width", 3)
                            .style("fill-opacity", 0);
                }

                // Use Leaflet to implement a D3 geometric transformation.
                function projectPoint(x, y) {
                    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                    this.stream.point(point.x, point.y);
                }

            })

            d3.json("data/station.geojson", function (collection) {
                
                /* Add a LatLng object to each item in the dataset */
                collection.features.forEach(function (d) {
                    d.LatLng = new L.LatLng(d.geometry.coordinates[1],
                            d.geometry.coordinates[0])
                })

                //Set up tooltip
                var tip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([-10, 50])
                        .html(function (d) {
                            return  d.properties.STATION;
                        })
                svg.call(tip);

                var feature = g.selectAll("circle")
                        .data(collection.features)
                        .enter().append("circle")
                        .style("stroke", "white")
                        .style("stroke-width", 2)
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide)
                        .style("fill", "blue")
                        .attr("r", 12);

                map.on("viewreset", update);
                update();

                function update() {
                    feature.attr("transform",
                            function (d) {
                                return "translate(" +
                                        map.latLngToLayerPoint(d.LatLng).x + "," +
                                        map.latLngToLayerPoint(d.LatLng).y + ")";
                            }
                    )
                }
            })
