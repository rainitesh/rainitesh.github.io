function toggleLayer(layer) {
    if (map.hasLayer(layer)) {
        map.removeLayer(layer);

    } else {
        layer.addTo(map);

        if (typeof layer.getFilter != 'undefined') {
            var filter = layer.getFilter();
            layer.setFilter(filter);
        }
    }

    if (map.hasLayer(FY16)) {
        FY16.bringToFront()
    }
}

function resetMap() {
    var southWest = new L.LatLng(-37.016629, 174.773543),
        northEast = new L.LatLng(-36.986574, 174.792359),
        bounds = new L.LatLngBounds(southWest, northEast);
    map.fitBounds(bounds).setZoom(14);
}

// MAPBOX MAP
L.mapbox.accessToken = "pk.eyJ1IjoiYXJ1cCIsImEiOiJmRXNPU2VnIn0.TpJZHpX28uzX-r1jZmn8Vw";

var map = L.mapbox.map("map", null, {
    zoomControl: false,
    attributionControl: false,
    minZoom: 12,
    maxzoom: 19
});

var base_layers = {
    CartoMap: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      	subdomains: 'abcd',
      	maxZoom: 19
    }),
    OpenStreetMap: L.tileLayer("http://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        zIndex: 1,
        maxNativeZoom: 19
    })
};

base_layers.CartoMap.addTo(map);

new L.Control.Zoom({
    position: "topright"
}).addTo(map);

L.control.layers(base_layers).addTo(map);

resetMap();

// ============================
// EXISTING MAP LAYERS + STYLES
// ============================
var EA_Style = {weight:0.0,opacity:0.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var ET_Style = {weight:0.0,opacity:0.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var ER_Style = {weight:0.0,opacity:0.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};
var FY16_Style = {weight:0.0,opacity:0.0,color:'red',fillOpacity:1.0,fillColor:'red'};

var ExistingAirfield_GEOJSON,EA;
$.ajax({
	url: "data/ExistingAirfield.geojson",
	async: false,
	dataType: 'json',
	success: function( data ) {
		ExistingAirfield_GEOJSON = data
		EA = L.geoJson(data, {style:EA_Style,smoothFactor:0}).addTo(map);
	}
});

var ExistingTerminal_GEOJSON,ET;
$.ajax({
	url: "data/ExistingTerminal.geojson",
	async: false,
	dataType: 'json',
	success: function( data ) {
		ExistingTerminal_GEOJSON = data;
		ET = L.geoJson(data, {style:ET_Style,smoothFactor:0}).addTo(map);
	}
});

var ExistingRoads_GEOJSON,ER;
$.ajax({
	url: "data/ExistingRoads.geojson",
	async: false,
	dataType: 'json',
	success: function( data ) {
		ExistingRoads_GEOJSON = data;
		ER = L.geoJson(data, {style:ER_Style,smoothFactor:0}).addTo(map);
	}
});

var FY16_GEOJSON,FY16;
$.ajax({
    url: "data/Scenario5a_20150930_FY16Only.json",
    async: false,
    dataType: 'json',
    success: function( data ) {
        console.log(data)
        FY16_GEOJSON = data;
        FY16 = L.geoJson(data, {style:FY16_Style,smoothFactor:0}).addTo(map);
    }
});


// =======================
// SCENARIO 1 LAYER STYLES
// =======================
var ITBC_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S1 = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S1 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S1 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S1 = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S1 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S1 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S1 = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =======================
// SCENARIO 2 LAYER STYLES
// =======================
var ITBC_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S2 = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S2 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S2 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S2 = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S2 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S2 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S2 = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =======================
// SCENARIO 3 LAYER STYLES
// =======================
var ITBC_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S3 = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S3 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S3 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S3 = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S3 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S3 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S3 = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =======================
// SCENARIO 4 LAYER STYLES
// =======================
var ITBC_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S4 = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S4 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S4 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S4 = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S4 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S4 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S4 = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =======================
// SCENARIO 5 LAYER STYLES
// =======================
var ITBC_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S5 = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S5 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S5 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S5 = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S5 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S5 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S5 = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =======================
// SCENARIO 5A LAYER STYLES
// =======================
var ITBC_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S5A = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S5A = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S5A = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S5A = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S5A = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S5A = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S5A = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =======================
// SCENARIO 6 LAYER STYLES
// =======================
var ITBC_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#2962FF',fillOpacity:0.0,fillColor:'#2962FF'};
var ITB_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.0,fillColor:'#00BFA5'};
var ITBCCS_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.0,fillColor:'#AA00FF'};
var DTBC_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#00C853',fillOpacity:0.0,fillColor:'#00C853'};
var DTB_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#64DD17',fillOpacity:0.0,fillColor:'#64DD17'};
var RT_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.0,fillColor:'#AEEA00'};
var RC_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#FFD600',fillOpacity:0.0,fillColor:'#FFD600'};
var RO_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.0,fillColor:'#FFAB00'};
var CP_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.0,fillColor:'#FF6D00'};
var CC_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.0,fillColor:'#DD2C00'};
var C_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#D50000',fillOpacity:0.0,fillColor:'#D50000'};
var M_Design_Style_S6 = {weight:1.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.0,fillColor:'#B71C1C'};

var ITBC_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:1.0,fillColor:'#2962FF'};
var ITB_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:1.0,fillColor:'#00BFA5'};
var ITBCCS_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:1.0,fillColor:'#AA00FF'};
var DTBC_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:1.0,fillColor:'#00C853'};
var DTB_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:1.0,fillColor:'#64DD17'};
var RT_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:1.0,fillColor:'#AEEA00'};
var RC_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:1.0,fillColor:'#FFD600'};
var RO_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:1.0,fillColor:'#FFAB00'};
var CP_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:1.0,fillColor:'#FF6D00'};
var CC_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:1.0,fillColor:'#DD2C00'};
var C_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:1.0,fillColor:'#D50000'};
var M_HandOver_Style_S6 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:1.0,fillColor:'#B71C1C'};

var ITBC_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#2962FF',fillOpacity:0.5,fillColor:'#2962FF'};
var ITB_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#00BFA5',fillOpacity:0.5,fillColor:'#00BFA5'};
var ITBCCS_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#AA00FF',fillOpacity:0.5,fillColor:'#AA00FF'};
var DTBC_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#00C853',fillOpacity:0.5,fillColor:'#00C853'};
var DTB_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#64DD17',fillOpacity:0.5,fillColor:'#64DD17'};
var RT_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#AEEA00',fillOpacity:0.5,fillColor:'#AEEA00'};
var RC_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#FFD600',fillOpacity:0.5,fillColor:'#FFD600'};
var RO_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#FFAB00',fillOpacity:0.5,fillColor:'#FFAB00'};
var CP_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#FF6D00',fillOpacity:0.5,fillColor:'#FF6D00'};
var CC_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#DD2C00',fillOpacity:0.5,fillColor:'#DD2C00'};
var C_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#D50000',fillOpacity:0.5,fillColor:'#D50000'};
var M_Construction_Style_S6 = {weight:0.0,opacity:1.0,color:'#B71C1C',fillOpacity:0.5,fillColor:'#B71C1C'};

var A_Style_S6 = {weight:1.0,opacity:1.0,color:'#424242',fillOpacity:1.0,fillColor:'#424242'};
var T_Style_S6 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var TP_Style_S6 = {weight:1.0,opacity:1.0,color:'#757575',fillOpacity:1.0,fillColor:'#757575'};
var R_Style_S6 = {weight:1.0,opacity:1.0,color:'#212121',fillOpacity:1.0,fillColor:'#212121'};

// =================
// SCENARIO 1 LAYERS
// =================
var S1_GEOJSON,ITBC_Design_S1,ITB_Design_S1,ITBCCS_Design_S1,DTBC_Design_S1,DTB_Design_S1,RT_Design_S1,RC_Design_S1,RO_Design_S1,CP_Design_S1,CC_Design_S1,C_Design_S1,M_Design_S1,ITBC_Construction_S1,ITB_Construction_S1,ITBCCS_Construction_S1,DTBC_Construction_S1,DTB_Construction_S1,RT_Construction_S1,RC_Construction_S1,RO_Construction_S1,CP_Construction_S1,CC_Construction_S1,C_Construction_S1,M_Construction_S1,ITBC_HandOver_S1,ITB_HandOver_S1,ITBCCS_HandOver_S1,DTBC_HandOver_S1,DTB_HandOver_S1,RT_HandOver_S1,RC_HandOver_S1,RO_HandOver_S1,CP_HandOver_S1,CC_HandOver_S1,C_HandOver_S1,M_HandOver_S1,A_S1,T_S1,TP_S1,R_S1;
$.ajax({
	url: "data/S1.geojson",
	async: false,
	dataType: 'json',
	success: function(data){
		S1_GEOJSON = data;
		ITBC_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S1,smoothFactor:0}).addTo(map);
		ITB_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S1,smoothFactor:0}).addTo(map);
		ITBCCS_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S1,smoothFactor:0}).addTo(map);
		DTBC_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S1,smoothFactor:0}).addTo(map);
		DTB_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S1,smoothFactor:0}).addTo(map);
		RT_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S1,smoothFactor:0}).addTo(map);
		RC_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S1,smoothFactor:0}).addTo(map);
		RO_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S1,smoothFactor:0}).addTo(map);
		CP_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S1,smoothFactor:0}).addTo(map);
		CC_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S1,smoothFactor:0}).addTo(map);
		C_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S1,smoothFactor:0}).addTo(map);
		M_Design_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S1,smoothFactor:0}).addTo(map);

		ITBC_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S1,smoothFactor:0}).addTo(map);
		ITB_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S1,smoothFactor:0}).addTo(map);
		ITBCCS_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S1,smoothFactor:0}).addTo(map);
		DTBC_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S1,smoothFactor:0}).addTo(map);
		DTB_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S1,smoothFactor:0}).addTo(map);
		RT_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S1,smoothFactor:0}).addTo(map);
		RC_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S1,smoothFactor:0}).addTo(map);
		RO_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S1,smoothFactor:0}).addTo(map);
		CP_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S1,smoothFactor:0}).addTo(map);
		CC_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S1,smoothFactor:0}).addTo(map);
		C_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S1,smoothFactor:0}).addTo(map);
		M_Construction_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S1,smoothFactor:0}).addTo(map);

		ITBC_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		ITB_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		ITBCCS_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		DTBC_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		DTB_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		RT_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		RC_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		RO_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		CP_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		CC_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		C_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S1,smoothFactor:0}).addTo(map);
		M_HandOver_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S1,smoothFactor:0}).addTo(map);

		A_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S1,smoothFactor:0});
		T_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S1,smoothFactor:0});
		TP_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S1,smoothFactor:0});
		R_S1 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S1,smoothFactor:0});
	}
});

// =================
// SCENARIO 2 LAYERS
// =================
var S2_GEOJSON,ITBC_Design_S2,ITB_Design_S2,ITBCCS_Design_S2,DTBC_Design_S2,DTB_Design_S2,RT_Design_S2,RC_Design_S2,RO_Design_S2,CP_Design_S2,CC_Design_S2,C_Design_S2,M_Design_S2,ITBC_Construction_S2,ITB_Construction_S2,ITBCCS_Construction_S2,DTBC_Construction_S2,DTB_Construction_S2,RT_Construction_S2,RC_Construction_S2,RO_Construction_S2,CP_Construction_S2,CC_Construction_S2,C_Construction_S2,M_Construction_S2,ITBC_HandOver_S2,ITB_HandOver_S2,ITBCCS_HandOver_S2,DTBC_HandOver_S2,DTB_HandOver_S2,RT_HandOver_S2,RC_HandOver_S2,RO_HandOver_S2,CP_HandOver_S2,CC_HandOver_S2,C_HandOver_S2,M_HandOver_S2,A_S2,T_S2,TP_S2,R_S2;
$.ajax({
	url: "data/S2.geojson",
	async: false,
	dataType: 'json',
	success: function(data){
		S2_GEOJSON = data;
		ITBC_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S2,smoothFactor:0});
		ITB_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S2,smoothFactor:0});
		ITBCCS_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S2,smoothFactor:0});
		DTBC_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S2,smoothFactor:0});
		DTB_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S2,smoothFactor:0});
		RT_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S2,smoothFactor:0});
		RC_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S2,smoothFactor:0});
		RO_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S2,smoothFactor:0});
		CP_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S2,smoothFactor:0});
		CC_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S2,smoothFactor:0});
		C_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S2,smoothFactor:0});
		M_Design_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S2,smoothFactor:0});

		ITBC_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S2,smoothFactor:0});
		ITB_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S2,smoothFactor:0});
		ITBCCS_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S2,smoothFactor:0});
		DTBC_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S2,smoothFactor:0});
		DTB_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S2,smoothFactor:0});
		RT_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S2,smoothFactor:0});
		RC_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S2,smoothFactor:0});
		RO_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S2,smoothFactor:0});
		CP_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S2,smoothFactor:0});
		CC_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S2,smoothFactor:0});
		C_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S2,smoothFactor:0});
		M_Construction_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S2,smoothFactor:0});

		ITBC_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S2,smoothFactor:0});
		ITB_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S2,smoothFactor:0});
		ITBCCS_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S2,smoothFactor:0});
		DTBC_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S2,smoothFactor:0});
		DTB_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S2,smoothFactor:0});
		RT_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S2,smoothFactor:0});
		RC_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S2,smoothFactor:0});
		RO_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S2,smoothFactor:0});
		CP_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S2,smoothFactor:0});
		CC_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S2,smoothFactor:0});
		C_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S2,smoothFactor:0});
		M_HandOver_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S2,smoothFactor:0});

		A_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S2,smoothFactor:0});
		T_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S2,smoothFactor:0});
		TP_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S2,smoothFactor:0});
		R_S2 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S2,smoothFactor:0});
	}
});

// =================
// SCENARIO 3 LAYERS
// =================
var S3_GEOJSON,ITBC_Design_S3ITB_Design_S3ITBCCS_Design_S3DTBC_Design_S3DTB_Design_S3RT_Design_S3RC_Design_S3RO_Design_S3CP_Design_S3CC_Design_S3C_Design_S3M_Design_S3ITBC_Construction_S3ITB_Construction_S3ITBCCS_Construction_S3DTBC_Construction_S3DTB_Construction_S3RT_Construction_S3RC_Construction_S3RO_Construction_S3CP_Construction_S3CC_Construction_S3C_Construction_S3M_Construction_S3ITBC_HandOver_S3ITB_HandOver_S3ITBCCS_HandOver_S3DTBC_HandOver_S3DTB_HandOver_S3RT_HandOver_S3RC_HandOver_S3RO_HandOver_S3CP_HandOver_S3CC_HandOver_S3C_HandOver_S3M_HandOver_S3A_S3T_S3TP_S3R_S3;
$.ajax({
	url: "data/S3.geojson",
	async: false,
	dataType: 'json',
	success: function(data){
		S3_GEOJSON = data;
		ITBC_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S3,smoothFactor:0});
		ITB_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S3,smoothFactor:0});
		ITBCCS_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S3,smoothFactor:0});
		DTBC_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S3,smoothFactor:0});
		DTB_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S3,smoothFactor:0});
		RT_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S3,smoothFactor:0});
		RC_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S3,smoothFactor:0});
		RO_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S3,smoothFactor:0});
		CP_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S3,smoothFactor:0});
		CC_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S3,smoothFactor:0});
		C_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S3,smoothFactor:0});
		M_Design_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S3,smoothFactor:0});

		ITBC_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S3,smoothFactor:0});
		ITB_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S3,smoothFactor:0});
		ITBCCS_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S3,smoothFactor:0});
		DTBC_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S3,smoothFactor:0});
		DTB_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S3,smoothFactor:0});
		RT_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S3,smoothFactor:0});
		RC_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S3,smoothFactor:0});
		RO_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S3,smoothFactor:0});
		CP_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S3,smoothFactor:0});
		CC_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S3,smoothFactor:0});
		C_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S3,smoothFactor:0});
		M_Construction_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S3,smoothFactor:0});

		ITBC_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S3,smoothFactor:0});
		ITB_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S3,smoothFactor:0});
		ITBCCS_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S3,smoothFactor:0});
		DTBC_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S3,smoothFactor:0});
		DTB_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S3,smoothFactor:0});
		RT_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S3,smoothFactor:0});
		RC_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S3,smoothFactor:0});
		RO_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S3,smoothFactor:0});
		CP_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S3,smoothFactor:0});
		CC_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S3,smoothFactor:0});
		C_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S3,smoothFactor:0});
		M_HandOver_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S3,smoothFactor:0});

		A_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S3,smoothFactor:0});
		T_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S3,smoothFactor:0});
		TP_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S3,smoothFactor:0});
		R_S3 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S3,smoothFactor:0});
	}
});

// =================
// SCENARIO 4 LAYERS
// =================
var S4_GEOJSON,ITBC_Design_S4ITB_Design_S4ITBCCS_Design_S4DTBC_Design_S4DTB_Design_S4RT_Design_S4RC_Design_S4RO_Design_S4CP_Design_S4CC_Design_S4C_Design_S4M_Design_S4ITBC_Construction_S4ITB_Construction_S4ITBCCS_Construction_S4DTBC_Construction_S4DTB_Construction_S4RT_Construction_S4RC_Construction_S4RO_Construction_S4CP_Construction_S4CC_Construction_S4C_Construction_S4M_Construction_S4ITBC_HandOver_S4ITB_HandOver_S4ITBCCS_HandOver_S4DTBC_HandOver_S4DTB_HandOver_S4RT_HandOver_S4RC_HandOver_S4RO_HandOver_S4CP_HandOver_S4CC_HandOver_S4C_HandOver_S4M_HandOver_S4A_S4T_S4TP_S4R_S4;
$.ajax({
	url: "data/S4.geojson",
	async: false,
	dataType: 'json',
	success: function(data){
		S4_GEOJSON = data;
		ITBC_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S4,smoothFactor:0});
		ITB_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S4,smoothFactor:0});
		ITBCCS_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S4,smoothFactor:0});
		DTBC_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S4,smoothFactor:0});
		DTB_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S4,smoothFactor:0});
		RT_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S4,smoothFactor:0});
		RC_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S4,smoothFactor:0});
		RO_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S4,smoothFactor:0});
		CP_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S4,smoothFactor:0});
		CC_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S4,smoothFactor:0});
		C_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S4,smoothFactor:0});
		M_Design_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S4,smoothFactor:0});

		ITBC_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S4,smoothFactor:0});
		ITB_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S4,smoothFactor:0});
		ITBCCS_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S4,smoothFactor:0});
		DTBC_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S4,smoothFactor:0});
		DTB_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S4,smoothFactor:0});
		RT_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S4,smoothFactor:0});
		RC_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S4,smoothFactor:0});
		RO_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S4,smoothFactor:0});
		CP_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S4,smoothFactor:0});
		CC_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S4,smoothFactor:0});
		C_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S4,smoothFactor:0});
		M_Construction_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S4,smoothFactor:0});

		ITBC_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S4,smoothFactor:0});
		ITB_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S4,smoothFactor:0});
		ITBCCS_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S4,smoothFactor:0});
		DTBC_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S4,smoothFactor:0});
		DTB_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S4,smoothFactor:0});
		RT_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S4,smoothFactor:0});
		RC_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S4,smoothFactor:0});
		RO_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S4,smoothFactor:0});
		CP_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S4,smoothFactor:0});
		CC_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S4,smoothFactor:0});
		C_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S4,smoothFactor:0});
		M_HandOver_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S4,smoothFactor:0});

		A_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S4,smoothFactor:0});
		T_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S4,smoothFactor:0});
		TP_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S4,smoothFactor:0});
		R_S4 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S4,smoothFactor:0});
	}
});

// =================
// SCENARIO 5 LAYERS
// =================
var S5_GEOJSON,ITBC_Design_S5,ITB_Design_S5,ITBCCS_Design_S5,DTBC_Design_S5,DTB_Design_S5,RT_Design_S5,RC_Design_S5,RO_Design_S5,CP_Design_S5,CC_Design_S5,C_Design_S5,M_Design_S5,ITBC_Construction_S5,ITB_Construction_S5,ITBCCS_Construction_S5,DTBC_Construction_S5,DTB_Construction_S5,RT_Construction_S5,RC_Construction_S5,RO_Construction_S5,CP_Construction_S5,CC_Construction_S5,C_Construction_S5,M_Construction_S5,ITBC_HandOver_S5,ITB_HandOver_S5,ITBCCS_HandOver_S5,DTBC_HandOver_S5,DTB_HandOver_S5,RT_HandOver_S5,RC_HandOver_S5,RO_HandOver_S5,CP_HandOver_S5,CC_HandOver_S5,C_HandOver_S5,M_HandOver_S5,A_S5,T_S5,TP_S5,R_S5;
$.ajax({
	url: "data/S5.geojson",
	async: false,
	dataType: 'json',
	success: function(data){
		S5_GEOJSON = data
		ITBC_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S5,smoothFactor:0});
		ITB_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S5,smoothFactor:0});
		ITBCCS_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S5,smoothFactor:0});
		DTBC_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S5,smoothFactor:0});
		DTB_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S5,smoothFactor:0});
		RT_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S5,smoothFactor:0});
		RC_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S5,smoothFactor:0});
		RO_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S5,smoothFactor:0});
		CP_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S5,smoothFactor:0});
		CC_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S5,smoothFactor:0});
		C_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S5,smoothFactor:0});
		M_Design_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S5,smoothFactor:0});

		ITBC_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S5,smoothFactor:0});
		ITB_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S5,smoothFactor:0});
		ITBCCS_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S5,smoothFactor:0});
		DTBC_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S5,smoothFactor:0});
		DTB_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S5,smoothFactor:0});
		RT_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S5,smoothFactor:0});
		RC_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S5,smoothFactor:0});
		RO_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S5,smoothFactor:0});
		CP_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S5,smoothFactor:0});
		CC_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S5,smoothFactor:0});
		C_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S5,smoothFactor:0});
		M_Construction_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S5,smoothFactor:0});

		ITBC_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S5,smoothFactor:0});
		ITB_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S5,smoothFactor:0});
		ITBCCS_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S5,smoothFactor:0});
		DTBC_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S5,smoothFactor:0});
		DTB_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S5,smoothFactor:0});
		RT_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S5,smoothFactor:0});
		RC_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S5,smoothFactor:0});
		RO_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S5,smoothFactor:0});
		CP_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S5,smoothFactor:0});
		CC_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S5,smoothFactor:0});
		C_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S5,smoothFactor:0});
		M_HandOver_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S5,smoothFactor:0});

		A_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S5,smoothFactor:0});
		T_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S5,smoothFactor:0});
		TP_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S5,smoothFactor:0});
		R_S5 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S5,smoothFactor:0});
	}
});

// =================
// SCENARIO 5A LAYERS
// =================
var S5A_GEOJSON,ITBC_Design_S5A,ITB_Design_S5A,ITBCCS_Design_S5A,DTBC_Design_S5A,DTB_Design_S5A,RT_Design_S5A,RC_Design_S5A,RO_Design_S5A,CP_Design_S5A,CC_Design_S5A,C_Design_S5A,M_Design_S5A,ITBC_Construction_S5A,ITB_Construction_S5A,ITBCCS_Construction_S5A,DTBC_Construction_S5A,DTB_Construction_S5A,RT_Construction_S5A,RC_Construction_S5A,RO_Construction_S5A,CP_Construction_S5A,CC_Construction_S5A,C_Construction_S5A,M_Construction_S5A,ITBC_HandOver_S5A,ITB_HandOver_S5A,ITBCCS_HandOver_S5A,DTBC_HandOver_S5A,DTB_HandOver_S5A,RT_HandOver_S5A,RC_HandOver_S5A,RO_HandOver_S5A,CP_HandOver_S5A,CC_HandOver_S5A,C_HandOver_S5A,M_HandOver_S5A,A_S5A,T_S5A,TP_S5A,R_S5A;
$.ajax({
    url: "data/S5A.geojson",
    async: false,
    dataType: 'json',
    success: function(data){
        S5A_GEOJSON = data
        ITBC_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S5A,smoothFactor:0});
        ITB_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S5A,smoothFactor:0});
        ITBCCS_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S5A,smoothFactor:0});
        DTBC_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S5A,smoothFactor:0});
        DTB_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S5A,smoothFactor:0});
        RT_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S5A,smoothFactor:0});
        RC_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S5A,smoothFactor:0});
        RO_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S5A,smoothFactor:0});
        CP_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S5A,smoothFactor:0});
        CC_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S5A,smoothFactor:0});
        C_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S5A,smoothFactor:0});
        M_Design_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S5A,smoothFactor:0});

        ITBC_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S5A,smoothFactor:0});
        ITB_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S5A,smoothFactor:0});
        ITBCCS_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S5A,smoothFactor:0});
        DTBC_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S5A,smoothFactor:0});
        DTB_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S5A,smoothFactor:0});
        RT_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S5A,smoothFactor:0});
        RC_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S5A,smoothFactor:0});
        RO_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S5A,smoothFactor:0});
        CP_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S5A,smoothFactor:0});
        CC_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S5A,smoothFactor:0});
        C_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S5A,smoothFactor:0});
        M_Construction_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S5A,smoothFactor:0});

        ITBC_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S5A,smoothFactor:0});
        ITB_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S5A,smoothFactor:0});
        ITBCCS_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S5A,smoothFactor:0});
        DTBC_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S5A,smoothFactor:0});
        DTB_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S5A,smoothFactor:0});
        RT_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S5A,smoothFactor:0});
        RC_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S5A,smoothFactor:0});
        RO_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S5A,smoothFactor:0});
        CP_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S5A,smoothFactor:0});
        CC_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S5A,smoothFactor:0});
        C_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S5A,smoothFactor:0});
        M_HandOver_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S5A,smoothFactor:0});

        A_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S5A,smoothFactor:0});
        T_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S5A,smoothFactor:0});
        TP_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S5A,smoothFactor:0});
        R_S5A = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S5A,smoothFactor:0});
    }
});

// =================
// SCENARIO 6 LAYERS
// =================
var S6_GEOJSON,ITBC_Design_S6,ITB_Design_S6,ITBCCS_Design_S6,DTBC_Design_S6,DTB_Design_S6,RT_Design_S6,RC_Design_S6,RO_Design_S6,CP_Design_S6,CC_Design_S6,C_Design_S6,M_Design_S6,ITBC_Construction_S6,ITB_Construction_S6,ITBCCS_Construction_S6,DTBC_Construction_S6,DTB_Construction_S6,RT_Construction_S6,RC_Construction_S6,RO_Construction_S6,CP_Construction_S6,CC_Construction_S6,C_Construction_S6,M_Construction_S6,ITBC_HandOver_S6,ITB_HandOver_S6,ITBCCS_HandOver_S6,DTBC_HandOver_S6,DTB_HandOver_S6,RT_HandOver_S6,RC_HandOver_S6,RO_HandOver_S6,CP_HandOver_S6,CC_HandOver_S6,C_HandOver_S6,M_HandOver_S6,A_S6,T_S6,TP_S6,R_S6;
$.ajax({
    url: "data/S6.geojson",
    async: false,
    dataType: 'json',
    success: function(data){
        S6_GEOJSON = data
        ITBC_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Design_Style_S6,smoothFactor:0});
        ITB_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Design_Style_S6,smoothFactor:0});
        ITBCCS_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Design_Style_S6,smoothFactor:0});
        DTBC_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Design_Style_S6,smoothFactor:0});
        DTB_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Design_Style_S6,smoothFactor:0});
        RT_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Design_Style_S6,smoothFactor:0});
        RC_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Design_Style_S6,smoothFactor:0});
        RO_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Design_Style_S6,smoothFactor:0});
        CP_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Design_Style_S6,smoothFactor:0});
        CC_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Design_Style_S6,smoothFactor:0});
        C_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Design_Style_S6,smoothFactor:0});
        M_Design_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Design_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Design_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Design_Style_S6,smoothFactor:0});

        ITBC_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_Construction_Style_S6,smoothFactor:0});
        ITB_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_Construction_Style_S6,smoothFactor:0});
        ITBCCS_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_Construction_Style_S6,smoothFactor:0});
        DTBC_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_Construction_Style_S6,smoothFactor:0});
        DTB_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_Construction_Style_S6,smoothFactor:0});
        RT_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_Construction_Style_S6,smoothFactor:0});
        RC_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_Construction_Style_S6,smoothFactor:0});
        RO_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_Construction_Style_S6,smoothFactor:0});
        CP_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_Construction_Style_S6,smoothFactor:0});
        CC_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_Construction_Style_S6,smoothFactor:0});
        C_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_Construction_Style_S6,smoothFactor:0});
        M_Construction_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Delivery_Start_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Delivery_Start_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_Construction_Style_S6,smoothFactor:0});

        ITBC_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.1 ITB committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBC_HandOver_Style_S6,smoothFactor:0});
        ITB_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.3 ITB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITB_HandOver_Style_S6,smoothFactor:0});
        ITBCCS_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P1.2 ITB ccs" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:ITBCCS_HandOver_Style_S6,smoothFactor:0});
        DTBC_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.1 DTB Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTBC_HandOver_Style_S6,smoothFactor:0});
        DTB_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P2.2 DTB" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:DTB_HandOver_Style_S6,smoothFactor:0});
        RT_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P3.2 RW&T other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RT_HandOver_Style_S6,smoothFactor:0});
        RC_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.1 Roads committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RC_HandOver_Style_S6,smoothFactor:0});
        RO_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P4.2 Roads other" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:RO_HandOver_Style_S6,smoothFactor:0});
        CP_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P5.2 CP" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CP_HandOver_Style_S6,smoothFactor:0});
        CC_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.1 Commercial Committed" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:CC_HandOver_Style_S6,smoothFactor:0});
        C_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P6.2 Commercial" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:C_HandOver_Style_S6,smoothFactor:0});
        M_HandOver_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date){return feature.properties.Package === "P8.1 Misc" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:M_HandOver_Style_S6,smoothFactor:0});

        A_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Airfield" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:A_Style_S6,smoothFactor:0});
        T_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:T_Style_S6,smoothFactor:0});
        TP_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Terminal Precinct" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:TP_Style_S6,smoothFactor:0});
        R_S6 = L.mapbox.featureLayer(data, {filter:function(feature, layer) {if(!!feature.properties.Handover_Finish_Date && !!feature.properties.Project_Categoy){return feature.properties.Project_Categoy === "Transportation" && feature.properties.Handover_Finish_Date.substring(0,8) <= formatDate_fromGEOJSON(brush.extent()[0]);}},style:R_Style_S6,smoothFactor:0});
    }
});
