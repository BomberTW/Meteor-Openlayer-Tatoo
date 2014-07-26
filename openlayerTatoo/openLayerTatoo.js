if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to 3dplayer.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  var map = null;
 var markers = null;
 var vectorLayer = null;


$(document).ready(function(){
    init();
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


 function init() {

   console.log("init");
   var options = {
     controls: [new OpenLayers.Control.KeyboardDefaults()]
   };
   map = new OpenLayers.Map('map', options);
   var bounds = new OpenLayers.Bounds();
   bounds.extend(new OpenLayers.LonLat(0, 0));
   bounds.extend(new OpenLayers.LonLat(500, 500));
   bounds.toBBOX();
   var bg_url = "http://www.fallingpixel.com/products/5594/mains/000_female_3d_adriana011.jpg";
   var size = new OpenLayers.Size(400, 400);
   var wms = new OpenLayers.Layer.Image('bg', bg_url, bounds, size);

   map.addLayer(wms);
   map.setBaseLayer(wms);
   map.zoomToMaxExtent();

   
   map.addControl(new OpenLayers.Control.PanZoomBar({
     position: new OpenLayers.Pixel(2, 15)
   }));
   map.addControl(new OpenLayers.Control.ScaleLine());
   map.addControl(new OpenLayers.Control.OverviewMap());
   map.addControl(new OpenLayers.Control.Navigation());

   
   var style = new OpenLayers.Style({
     label: "${type}",
     fontColor: "#fff",
     fontFamily: "Georgia,Microsoft JhengHei,sans-serif;",
     fontWeight: "bold",
     fontSize: 30
   });

   var label_point = new OpenLayers.Geometry.Point(116, 262);

   vectorLayer = new OpenLayers.Layer.Vector("labelLayer", {
     styleMap: new OpenLayers.StyleMap(style)
   });

   var feature = new OpenLayers.Feature.Vector(label_point);

   feature.attributes = {
     type: "Hello",
     fontColor: "#fff"
   };
   var feature_array = [feature];
   map.addLayer(vectorLayer);
   vectorLayer.addFeatures(feature_array);

   
   markers = new OpenLayers.Layer.Markers("Hello");
   var lls = [
     [112, 252],
     [86, 34],
     [150, 350],
     [100, 200],
     [450, 300]
   ];
   for (var i = 0; i < lls.length; i++) {
     var arr = lls[i];
     var lonlat = new OpenLayers.LonLat(arr[0], arr[1]);
     markers = autoAddMarker(lonlat, i);

   }
   map.addLayer(markers);


 }


 function getIcon() {
   var marker_url = "https://www.google.com/mapmaker/mapfiles/marker-k.png";
   var size = new OpenLayers.Size(21, 25);
   var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
   var icon = new OpenLayers.Icon(marker_url, size, offset);
   return icon;
 }

 function autoAddMarker(lonlat, i) {
   var marker = new OpenLayers.Marker(lonlat, getIcon());
   marker.events.register("click", marker, function(evt) {
     evt = getEvt(i);
     //window.location.href=evt+".html";
     document.getElementById("selected_marker").innerHTML = evt;
   });
   markers.addMarker(marker);
   return markers;
 }

 function getEvt(i) {
   var evt = null;
   if (i == 0) {
     evt = "Test2";
   } else if (i == 1) {
     evt = "Test3";
   } else if (i == 2) {
     evt = "Test4";
   } else if (i == 3) {
     evt = "Test5";
   } else if (i == 4) {
     evt = "Test6";
   }

   return evt;
 }

