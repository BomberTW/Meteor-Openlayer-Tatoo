var posts = [];

if (Meteor.isClient) {
  // Template.openLayerTatoo.greeting = function () {
  //   return "Welcome to 3dplayer.";
  // };

  // Template.openLayerTatoo.helpers({
  //   "posts":Posts.find()
  // });

  //Meteor.subscribe("myBookPosts");

  Template.openLayerTatoo.events({
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
    posts = Template.main.posts.fetch();
    console.log(posts);
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
   bounds.extend(new OpenLayers.LonLat(400, 600));
   bounds.toBBOX();
   var bg_url = "/michael.jpg";
   var size = new OpenLayers.Size(400, 600);
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

   var label_point = new OpenLayers.Geometry.Point(306, 262);

   vectorLayer = new OpenLayers.Layer.Vector("labelLayer", {
     styleMap: new OpenLayers.StyleMap(style)
   });

   var feature = new OpenLayers.Feature.Vector(label_point);

   feature.attributes = {
     type: "test",
     fontColor: "#fff"
   };
   var feature_array = [feature];
   map.addLayer(vectorLayer);
   vectorLayer.addFeatures(feature_array);


   // markers = new OpenLayers.Layer.Markers("Hello");
   // var lls = [
   //   [112, 252],
   //   [86, 34],
   //   [150, 350],
   //   [100, 200],
   //   [450, 300]
   // ];
   // for (var i = 0; i < lls.length; i++) {
   //   var arr = lls[i];
   //   var lonlat = new OpenLayers.LonLat(arr[0], arr[1]);
   //   markers = autoAddMarker(lonlat, i);

   // }
   // map.addLayer(markers);

   // {{#each posts}}
   //     addFeature({{x}}, {{y}},{{text}});
   // {{/each}}

  //var Cats = new Meteor.Collection('myBookPosts');

  // var post;
  // while ( raceCusor.hasNext() ) {
  //   post = raceCusor.next();
  //   // console.log( post.text);
  //   // addFeature(400,400,"hello");
  //   alert(post.text);
  // }
  // alert(posts[1]);
  var count = 0;
  posts.forEach(function (post) {
    // console.log("Title of post " + count + ": " + post.x);
    // count += 1;
    addFeature(post.x, post.y, post.text)
  });

   // for( var index = 0; index<posts.length; index++){
   //    // console.log( posts[index].text);
   //    var post = posts[index];
   //    addFeature(post.x,post.y,post.text);
   // }
   // addFeature(100,100,"good");
 }

 function addFeature(x, y, message) {
    var style = new OpenLayers.Style({
      label: "${type}",
      fontColor: "#fff",
      fontFamily: "Georgia,Microsoft JhengHei,sans-serif;",
      fontWeight: "bold",
      fontSize: 30
    });

   var label_point = new OpenLayers.Geometry.Point(x, y);

   vectorLayer = new OpenLayers.Layer.Vector("labelLayer", {
     styleMap: new OpenLayers.StyleMap(style)
   });

   var feature = new OpenLayers.Feature.Vector(label_point);

   feature.attributes = {
     type: message,
     fontColor: "#fff"
   };
   var feature_array = [feature];
   map.addLayer(vectorLayer);
   vectorLayer.addFeatures(feature_array);
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

