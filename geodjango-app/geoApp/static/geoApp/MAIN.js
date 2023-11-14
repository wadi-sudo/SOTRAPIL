// window.addEventListener('resize', function(){
      //     myChart.update()
      // }, true)

      // let drawb = document
      //   .getElementsByClassName("leaflet-draw-draw-rectangle")
      //   .addEventListener("click", () => {
      //     console.log(
      //       document.getElementsByClassName("leaflet-draw-actions-bottom")
      //     );
      //   });

      //var valueb = drawb.childNodes;
      // var nameb = valueb.children;
      //console.log(valueb);

      //////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////
      window.addEventListener("resize", function () {
        if ($(window).width() <= 991) {
          if (stathidden == false) {
            document.getElementById("map").style.height = "68vh";
            document.getElementById("statcontent").style.height = "40vh";
            document.getElementById("stat").style.display = "none";
            document.getElementById("statcontent").style.display = "block";
          }
        } else {
          document.getElementById("map").style.height = "99vh";
          document.getElementById("statcontent").style.height = "89vh";
          document.getElementById("statcontent").style.display = "";
          document.getElementById("stat").style.display = "";
        }
      });
      var num1 = 0;
      var num2 = 0;
      var num3 = 0;
      var myChart;
      document.getElementById("container2").style.display = "none";

      var stathidden = true;

      function showstat() {
        if (stathidden == true) {
          document.getElementById("container2").style.display = "";
          document.getElementById("map").classList.add("col-lg-8");
          // document.getElementById('map').classList.add('map-height')
          myChart.destroy();
          charts();
          stathidden = false;

          if ($(window).width() <= 991) {
            console.log("ok");
            document.getElementById("map").style.height = "68vh";
            document.getElementById("statcontent").style.height = "40vh";
            document.getElementById("stat").style.display = "none";
            document.getElementById("statcontent").style.display = "block";
          } else {
            document.getElementById("map").style.height = "99vh";
            document.getElementById("statcontent").style.height = "89vh";
            document.getElementById("statcontent").style.display = "";
            document.getElementById("stat").style.display = "";
          }
        } else {
          document.getElementById("map").style.height = "99vh";
          document.getElementById("container2").style.display = "none";
          document.getElementById("map").classList.remove("col-lg-8");
          stathidden = true;
        }
      }

      function change() {
        location.replace("http://127.0.0.1:8000/admin/");
      }
      var crs = new L.Proj.CRS(
        "ESPG:32632",
        "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
        // [166021.4431, 0, 833978.5569, 9329005.1825],
        {
          resolutions: [8192, 4096, 2048, 1024, 512, 256, 128],
          origin: [0, 0],
        }
      );
      console.log(crs);
      var map = L.map("map", {
        center: [36.96874, 9.73938],
        zoom: 10,
        maxZoom: 18,
        opacity: 0.8,
        minZoom: 9,
        // crs: crs,
        zoomControl: true,
        editable: true,
        maxBounds: [
          [37.82931081282506, 12.076721191406252],
          [36.01800375871416, 7.756347656250001],
        ],
      });
      

      //var lyrImagery = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');
      //var lyrImagery= L.tileLayer.wms("http://127.0.0.1:8081/geoserver/soutrapil/wms?", { layers: 'soutrapil:GrandTunis_Bizerte', format: 'image/png', transparent:true});

      var lyrImagery = L.tileLayer("/static/Tuilage2/{z}/{x}/{y}.png");

      var lyrvid = { Empty: L.tileLayer("") };
      var baseLayers = {
        "Fond Cartographique": lyrvid.Empty,
        "Fond Satellitaire": lyrImagery,
      };
      // var pointgrp = L.layerGroup().addTo(map);
      var pointgrp = L.markerClusterGroup().addTo(map);

      var linegrp = L.layerGroup().addTo(map);
      var polygongrp = L.layerGroup().addTo(map);
      var selectedArea1 = L.geoJson();
      var selectedArea2 = L.geoJson();
      var selectedArea3 = L.geoJson();

      var control = new L.control.layers(baseLayers).addTo(map);

      map.addLayer(lyrvid.Empty);

      // var zoom_bar = new L.Control.ZoomBar({
      //     position: 'topleft'
      // }).addTo(map);

      L.control
        .mousePosition({
          position: "bottomleft",
          prefix: "lat : long",
        })
        .addTo(map);

      L.control
        .scale({
          position: "bottomleft",
        })
        .addTo(map);

      var url = "http://127.0.0.1:8081/geoserver/soutrapil/wfs?";

      var adm1 = L.tileLayer
        .wms(url, {
          layers: "soutrapil:adm1",
          format: "image/png",
          transparent: true,
        })
        .addTo(map);
      var green = L.tileLayer
        .wms(url, {
          layers: "soutrapil:green3",
          format: "image/png",
          transparent: true,
        })
        .addTo(map);
      var adm2 = L.tileLayer
        .wms(url, {
          layers: "soutrapil:adm2",
          format: "image/png",
          transparent: true,
        })
        .addTo(map);

      var water = L.tileLayer
        .wms(url, {
          layers: "soutrapil:water",
          format: "image/png",
          transparent: true,
        })
        .addTo(map);
      var route_s = L.tileLayer
        .wms(url, {
          layers: "soutrapil:route_s",
          format: "image/png",
          transparent: true,
        })
        .addTo(map);
      var route_p = L.tileLayer
        .wms(url, {
          layers: "soutrapil:route_p",
          format: "image/png",
          transparent: true,
        })
        .addTo(map);

      // control.addOverlay(selectedArea1, "Pipelines");
      // control.addOverlay(selectedArea2, "Sites");
      // control.addOverlay(selectedArea3, "Locations");

      // var toggle = false;
      // function view() {
      //   if (toggle == false) {
      //     toggle = true;

      //     var mydiv = document.getElementById("mydiv");
      //     mydiv.style.display = "block";
      //   } else {
      //     toggle = false;
      //     var mydiv = document.getElementById("mydiv");
      //     mydiv.style.display = "none";
      //   }
      // }
      // L.easyButton("fa fa-map", function () {
      //   view();
      // })
      //   .setPosition("topright")
      //   .addTo(map);

      L.easyButton(
        "fa fa-bar-chart",
        function () {
          showstat();
        },
        { id: "easy1" }
      )
        .setPosition("topright")
        .addTo(map);

      L.easyButton("fa fa-home", function () {
        clear_all();
      })
        .setPosition("topleft")
        .addTo(map);

      // var checkpipeline = document.getElementById("pipeline");
      // var checklocation = document.getElementById("location");
      // var checksite = document.getElementById("site");

      // checkpipeline.addEventListener("change", function () {
      //   if (this.checked) {
      //     addPipe(url_pipe);
      //   } else {
      //     linegrp.clearLayers();
      //   }
      // });

      // checklocation.addEventListener("change", function () {
      //   if (this.checked) {
      //     addLocation(url_location);
      //   } else {
      //     pointgrp.clearLayers();
      //   }
      // });

      // checksite.addEventListener("change", function () {
      //   if (this.checked) {
      //     addSite(url_site);
      //   } else {
      //     polygongrp.clearLayers();
      //   }
      // });

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////        ADD Data      //////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var url_pipe =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Apipeline&outputFormat=application%2Fjson";

      var myStyle = { color: "grey", weight: 8 };
      function addPipe(url) {
        control.removeLayer(selectedArea1);
        $.getJSON(url, function (data) {
          //console.log(data.features.length)
          num2 = data.features.length;
          selectedArea1 = L.geoJson(data, {
            style: myStyle,
            onEachFeature: function (feature, layer) {
              var h2name = document.createElement("h6");
              h2name.innerHTML = feature.properties.name1;
              var h2time = document.createElement("h6");
              h2name.className = "namepopup";
              h2time.className = "timepopup";
              h2time.innerHTML = feature.properties.time.substr(
                0,
                feature.properties.time.length - 1
              );
              //console.log(feature.properties.time.substr(0, feature.properties.time.length-1))
              var linkpdf = document.createElement("a");
              linkpdf.className = "pdfLinks";
              var linktext = document.createTextNode("Fichier PDF");
              linkpdf.appendChild(linktext);
              linkpdf.href = "/static/pdf/" + feature.properties.pdf;

              var edbtn = document.createElement("button");
              edbtn.innerHTML = "Modifier";
              var id = feature.id;
              let pointIndex = id.indexOf(".");
              var linkid = id.substr(pointIndex + 1, id.length - 1);
              edbtn.addEventListener("click", function () {
                location.replace(
                  `http://127.0.0.1:8000/admin/geoApp/pipeline/${linkid}/change/`
                );
              });
              edbtn.className = "stylebuttonP";

              var brelement = document.createElement("br");

              var divElement = document.createElement("div");
              divElement.appendChild(h2name);
              divElement.appendChild(h2time);
              divElement.appendChild(linkpdf);
              divElement.appendChild(brelement);
              divElement.appendChild(edbtn);

              layer.bindPopup(divElement);
            },
          }).addTo(linegrp);

          control.addOverlay(selectedArea1, "Pipelines");
          map.fitBounds(selectedArea1.getBounds());
          console.log(map.hasLayer(selectedArea1) == true);
        });
      }

      addPipe(url_pipe);
      ///////////////////////////////////////////////////////////////////////////////////

      var url_site =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Asite&outputFormat=application%2Fjson";

      var myStyle2 = { color: "red", weight: 1 };
      function addSite(url) {
        control.removeLayer(selectedArea2);
        $.getJSON(url, function (data) {
          num3 = data.features.length;
          selectedArea2 = L.geoJson(data, {
            style: myStyle2,
            onEachFeature: function (feature, layer) {
              var h2name = document.createElement("h6");
              h2name.innerHTML = feature.properties.name1;
              var h2time = document.createElement("h6");
              h2name.className = "namepopup";
              h2time.className = "timepopup";
              h2time.innerHTML = feature.properties.time.substr(
                0,
                feature.properties.time.length - 1
              );

              var edbtn = document.createElement("button");
              edbtn.innerHTML = "Modifier";
              var id = feature.id;
              let pointIndex = id.indexOf(".");
              var linkid = id.substr(pointIndex + 1, id.length - 1);
              edbtn.addEventListener("click", function () {
                location.replace(
                  `http://127.0.0.1:8000/admin/geoApp/site/${linkid}/change/`
                );
              });
              edbtn.className = "stylebuttonP";

              var brelement = document.createElement("br");

              var divElement = document.createElement("div");

              divElement.appendChild(h2name);
              divElement.appendChild(h2time);
              divElement.appendChild(brelement);
              divElement.appendChild(edbtn);

              layer.bindPopup(divElement);
            },
          }).addTo(polygongrp);

          control.addOverlay(selectedArea2, "Sites");
          map.fitBounds(selectedArea2.getBounds());
        });
      }
      addSite(url_site);
      /////////////////////////////////////////////////////////////////////////////////////////

      var url_location =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Alocation&outputFormat=application%2Fjson";

      function pointToLayer(f, ll) {
        // var icon = L.icon({
        //   iconSize: [35, 35],
        //   iconAnchor: [10, 10],
        //   popupAnchor: [0, 0],
        //   iconUrl: "{% static 'geoApp/placeholde/hotelh.png' %}",
        // });
        return L.marker(ll, {
          riseOnHover: true,
        //   icon: icon,
        });
      }
      function addLocation(url) {
        control.removeLayer(pointgrp);
        $.getJSON(url, function (data) {
          num1 = data.features.length;
          selectedArea3 = L.geoJson(data, {
            pointToLayer: pointToLayer,
            onEachFeature: function (feature, layer) {
              var h2name = document.createElement("h6");
              h2name.innerHTML = feature.properties.name1;
              var h2time = document.createElement("h6");
              h2name.className = "namepopup";
              h2time.className = "timepopup";
              h2time.innerHTML = feature.properties.time.substr(
                0,
                feature.properties.time.length - 1
              );

              var edbtn = document.createElement("button");
              edbtn.innerHTML = "Modifier";
              var id = feature.id;
              let pointIndex = id.indexOf(".");
              var linkid = id.substr(pointIndex + 1, id.length - 1);
              edbtn.addEventListener("click", function () {
                location.replace(
                  `http://127.0.0.1:8000/admin/geoApp/location/${linkid}/change/`
                );
              });
              edbtn.className = "stylebuttonP";

              var brelement = document.createElement("br");

              var divElement = document.createElement("div");
              divElement.appendChild(h2name);
              divElement.appendChild(h2time);
              divElement.appendChild(brelement);
              divElement.appendChild(edbtn);

              layer.bindPopup(divElement);
            },
          }).addTo(pointgrp);

          control.addOverlay(pointgrp, "Locations");
          map.fitBounds(selectedArea3.getBounds());
        });
      }
      addLocation(url_location);
      /////////////////////////////////////////////////////////////////////////

      function clear_all() {
        // checklocation.checked = true;
        // checkpipeline.checked = true;
        // checksite.checked = true;
        document.getElementById("x1").value = "";
        document.getElementById("y1").value = "";
        cercles_draw.clearLayers();
        pointgrp.clearLayers();
        linegrp.clearLayers();
        polygongrp.clearLayers();
        //control.removeLayer(selectedArea3)
        addSite(url_site);
        addPipe(url_pipe);
        addLocation(url_location);
        markersdragged.clearLayers();

        map.flyTo([36.96874, 9.73938], 10);
        // $.getJSON(url1, function(data) {
        //  num1= data.features.length

        // return num1

        //     })
        // $.getJSON(url2, function(data) {
        //   num2= data.features.length
        //  return num2

        //     })
        //     $.getJSON(url3, function(data) {
        //   num3= data.features.length
        //  return num3

        //     })
        myChart.destroy();
        setTimeout(charts, 500);
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////        Download Content      //////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var drawn = new L.Control.Draw({
        draw: {
          marker: false,
          polygon: true,
          polyline: false,
          rectangle: true,
          circle: false,
        },
        edit: false,
      })
        .setPosition("topright")
        .addTo(map);

      L.Polygon.include({
        contains: function (latLng) {
          return turf.inside(
            new L.Marker(latLng).toGeoJSON(),
            this.toGeoJSON()
          );
        },
      });

      L.Rectangle.include({
        contains: function (latLng) {
          return this.getBounds().contains(latLng);
        },
      });

      // L.Circle.include({
      //     contains: function (latLng) {
      //         return this.getLatLng().distanceTo(latLng) < this.getRadius();
      //     }
      // });

      function downloadContent(name, content) {
        var atag = document.createElement("a");
        var file = new Blob([content], { type: "json/application" });
        atag.href = URL.createObjectURL(file);
        atag.download = name;
        atag.click();
      }
      function downloadObjectAsJson(exportObj, exportName) {
        var dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".geojson");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }

    //   var icon = L.icon({
    //     iconSize: [35, 35],
    //     iconAnchor: [10, 10],
    //     popupAnchor: [0, 0],
    //     iconUrl: "{% static 'geoApp/placeholde/hotelh.png' %}",
    //   });

      var url =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Alocation&outputFormat=application%2Fjson";

      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          map.on(L.Draw.Event.CREATED, function (e) {
            //console.log(e.layer)
            if (map.hasLayer(pointgrp) == true) {
              // if (checklocation.checked) {
              try {
                map.fitBounds(e.layer.getBounds());
              } catch (err) {
                map.flyTo(e.layer.getLatLng(), 16);
              }
              arr = [];

              for (i = 0; i < data.features.length; i++) {
                //console.log(data.features[i])
                var lat = data.features[i].geometry.coordinates[1];
                var lon = data.features[i].geometry.coordinates[0];

                mymarker = L.marker([lat, lon]);
                //console.log(mymarker.getLatLng())
                if (e.layer.contains(mymarker.getLatLng())) {
                  // L.marker([lat, lon],{icon : Icon}).bindPopup(data[i].name).addTo(markers)
                  // map.flyTo([lat, lon], 16)
                  arr.push(i);

                  //marker.addTo(map);
                } else {
                  console.log("no");
                }
              }
              if (arr.length > 0) {
                var collection = {
                  type: "FeatureCollection",
                  name: "location",
                  crs: {
                    type: "name",
                    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
                  },
                  features: [],
                };
                var shpcollection = {
                  type: "FeatureCollection",
                  name: "location",
                  crs: {
                    type: "name",
                    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
                  },
                  features: [],
                };
                var collection2 =
                  "<?xml version='1.0' encoding='UTF-8'?><kml xmlns='http://www.opengis.net/kml/2.2'><Document>";
                //pointgrp.clearLayers()

                for (j = 0; j < arr.length; j++) {
                  lat = data.features[arr[j]].geometry.coordinates[1];
                  lon = data.features[arr[j]].geometry.coordinates[0];

                  var h2name = document.createElement("h6");
                  h2name.innerHTML = data.features[arr[j]].properties.name1;
                  var h2time = document.createElement("h6");
                  h2name.className = "namepopup";
                  h2time.className = "timepopup";
                  h2time.innerHTML = data.features[
                    arr[j]
                  ].properties.time.substr(
                    0,
                    data.features[arr[j]].properties.time.length - 1
                  );

                  var edbtn = document.createElement("button");
                  edbtn.innerHTML = "Modifier";
                  var id = data.features[arr[j]].id;
                  let pointIndex = id.indexOf(".");
                  var linkid = id.substr(pointIndex + 1, id.length - 1);
                  edbtn.addEventListener("click", function () {
                    location.replace(
                      `http://127.0.0.1:8000/admin/geoApp/location/${linkid}/change/`
                    );
                  });
                  edbtn.className = "stylebuttonP";

                  var brelement = document.createElement("br");
                  var divElement = document.createElement("div");
                  divElement.appendChild(h2name);
                  divElement.appendChild(h2time);
                  divElement.appendChild(brelement);
                  divElement.appendChild(edbtn);

                  //L.marker([lat, lon],{icon : icon}).bindPopup(divElement).addTo(pointgrp)
                  var elem = {
                    type: "Feature",
                    properties: {
                      name1: data.features[arr[j]].properties.name1,
                    },
                    geometry: { type: "MultiPoint", coordinates: [[lon, lat]] },
                  };
                  var shpelem = {
                    type: "Feature",
                    properties: {
                      name1: data.features[arr[j]].properties.name1,
                    },
                    geometry: { type: "MultiPoint", coordinates: [lon, lat] },
                  };
                  var elem2 =
                    "<Placemark><name1>" +
                    data.features[arr[j]].properties.name1 +
                    "</name1><Point><coordinates>" +
                    lon +
                    "," +
                    lat +
                    "</coordinates></Point></Placemark>";

                  collection.features.push(elem);
                  shpcollection.features.push(shpelem);
                  collection2 += elem2;
                }

                collection2 += "</Document></kml>";

                // console.log(collection);
                var options = {
                  types: {
                    MultiPoint: "Location",
                    polygon: "Sites",
                    line: "Pipes",
                  },
                };
                console.log(collection);
                // shpwrite.download(shpcollection, options);

                shpwrite.zip(shpcollection, options).then(function (content) {
                  saveAs(content, "location.zip");
                });
                downloadContent("locations.kml", collection2);
                downloadObjectAsJson(collection, "locations");
              }
            }
          });
        });

      var url2 =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Apipeline&outputFormat=application%2Fjson";

      fetch(url2)
        .then((resp) => resp.json())
        .then(function (data) {
          map.on(L.Draw.Event.CREATED, function (e) {
            //console.log(e.layer)
            if (map.hasLayer(selectedArea1) == true) {
              // if (checkpipeline.checked) {
              try {
                map.fitBounds(e.layer.getBounds());
              } catch (err) {
                map.flyTo(e.layer.getLatLng(), 16);
              }
              arr = [];

              for (i = 0; i < data.features.length; i++) {
                console.log(data.features[i].geometry.coordinates[0]);
                for (
                  k = 0;
                  k < data.features[i].geometry.coordinates[0].length;
                  k++
                ) {
                  var lat = data.features[i].geometry.coordinates[0][k][1];
                  var lon = data.features[i].geometry.coordinates[0][k][0];

                  mymarker = L.marker([lat, lon]);

                  if (e.layer.contains(mymarker.getLatLng())) {
                    arr.push(i);
                  } else {
                    console.log("no");
                  }
                }
              }
              let arr2 = [...new Set(arr)];
              //console.log(arr2)
              if (arr2.length > 0) {
                var collection = {
                  type: "FeatureCollection",
                  name: "pipeline",
                  crs: {
                    type: "name",
                    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
                  },
                  features: [],
                };
                var collection2 =
                  "<?xml version='1.0' encoding='UTF-8'?><kml xmlns='http://www.opengis.net/kml/2.2'><Document>";
                //linegrp.clearLayers()

                for (j = 0; j < arr2.length; j++) {
                  var elem = {
                    type: "Feature",
                    properties: {
                      name1: data.features[arr2[j]].properties.name1,
                    },
                    geometry: {
                      type: "MultiLineString",
                      coordinates: [
                        data.features[arr2[j]].geometry.coordinates[0],
                      ],
                    },
                  };
                  collection.features.push(elem);
                }

                for (j = 0; j < arr2.length; j++) {
                  var elementarr =
                    data.features[arr2[j]].geometry.coordinates[0];
                  //console.log('waditesttttttt',data.features[arr2[j]].geometry.coordinates[0].length)
                  var elem2 =
                    "<Placemark><name1>" +
                    data.features[arr2[j]].properties.name1 +
                    "</name1><LineString><coordinates>";
                  for (m = 0; m < elementarr.length; m++) {
                    var elem3 =
                      data.features[arr2[j]].geometry.coordinates[0][m] + " ";
                    elem2 += elem3;
                  }
                  elem2 += "</coordinates></LineString></Placemark>";

                  collection2 += elem2;
                }

                collection2 += "</Document></kml>";

                console.log(collection);
                // shpwrite.download(collection);
                var options = {
                  types: {
                    MultiPoint: "Location",
                    polygon: "Sites",
                    line: "Pipes",
                  },
                };
                shpwrite.zip(collection, options).then(function (content) {
                  saveAs(content, "pipeline.zip");
                });
                downloadContent("pipelines.kml", collection2);
                downloadObjectAsJson(collection, "pipelines");
              }
            }
          });
        });

      var url3 =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Asite&outputFormat=application%2Fjson";

      fetch(url3)
        .then((resp) => resp.json())
        .then(function (data) {
          map.on(L.Draw.Event.CREATED, function (e) {
            //console.log(e.layer)
            if (map.hasLayer(selectedArea2) == true) {
              // if (checksite.checked) {
              try {
                map.fitBounds(e.layer.getBounds());
              } catch (err) {
                map.flyTo(e.layer.getLatLng(), 16);
              }
              arr = [];

              for (i = 0; i < data.features.length; i++) {
                console.log(data.features[i].geometry.coordinates[0][0].length);
                for (
                  k = 0;
                  k < data.features[i].geometry.coordinates[0][0].length;
                  k++
                ) {
                  var lat = data.features[i].geometry.coordinates[0][0][k][1];
                  var lon = data.features[i].geometry.coordinates[0][0][k][0];

                  mymarker = L.marker([lat, lon]);

                  if (e.layer.contains(mymarker.getLatLng())) {
                    arr.push(i);
                  } else {
                    console.log("no");
                  }
                }
              }
              let arr2 = [...new Set(arr)];
              //console.log(arr2)
              if (arr2.length > 0) {
                var collection = {
                  type: "FeatureCollection",
                  name: "pipeline",
                  crs: {
                    type: "name",
                    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
                  },
                  features: [],
                };
                var collection2 =
                  "<?xml version='1.0' encoding='UTF-8'?><kml xmlns='http://www.opengis.net/kml/2.2'><Document>";
                //linegrp.clearLayers()

                for (j = 0; j < arr2.length; j++) {
                  var elem = {
                    type: "Feature",
                    properties: {
                      name1: data.features[arr2[j]].properties.name1,
                    },
                    geometry: {
                      type: "MultiPolygon",
                      coordinates: [
                        [data.features[arr2[j]].geometry.coordinates[0][0]],
                      ],
                    },
                  };
                  collection.features.push(elem);
                }

                for (j = 0; j < arr2.length; j++) {
                  var elementarr =
                    data.features[arr2[j]].geometry.coordinates[0][0];
                  //console.log('waditesttttttt',data.features[arr2[j]].geometry.coordinates[0].length)
                  var elem2 =
                    "<Placemark><name1>" +
                    data.features[arr2[j]].properties.name1 +
                    "</name1><Polygon><outerBoundaryIs><LinearRing><coordinates>";
                  for (m = 0; m < elementarr.length; m++) {
                    var elem3 =
                      data.features[arr2[j]].geometry.coordinates[0][0][m] +
                      " ";
                    elem2 += elem3;
                  }
                  elem2 +=
                    "</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>";

                  collection2 += elem2;
                }

                collection2 += "</Document></kml>";

                console.log(collection);
                // shpwrite.download(collection);
                var options = {
                  types: {
                    MultiPoint: "Location",
                    polygon: "Sites",
                    line: "Pipes",
                  },
                };
                shpwrite.zip(collection, options).then(function (content) {
                  saveAs(content, "site.zip");
                });
                downloadContent("sites.kml", collection2);
                downloadObjectAsJson(collection, "sites");
              }
            }
          });
        });

      /////////////////////////////////////////////////////////////////////////////////////////////////////

      function sidebarreturn() {
        ctlSidebar.toggle();
      }
      ctlSidebar = L.control.sidebar("side-bar").addTo(map);
      ctlEasybutton = L.easyButton("fa fa-bars", function () {
        ctlSidebar.toggle();
      })
        .setPosition("topleft")
        .addTo(map);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////        CQL FILTER      //////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var geojson;
      // layer dropdown query
      $(document).ready(function () {
        $.ajax({
          type: "GET",
          url: "http://127.0.0.1:8081/geoserver/soutrapil/wfs?request=getCapabilities",
          dataType: "xml",
          success: function (xml) {
            var select = $("#layer");
            $(xml)
              .find("FeatureType")
              .each(function () {
                //var title = $(this).find('ows:Operation').attr('name');
                //alert(title);
                var name = $(this).find("Name").text();
                //select.append("<option/><option class='ddheader' value='"+ name +"'>"+title+"</option>");
                $(this)
                  .find("Name")
                  .each(function () {
                    var value = $(this).text();
                    select.append(
                      "<option class='ddindent' value='" +
                        value +
                        "'>" +
                        value +
                        "</option>"
                    );
                  });
              });
            //select.children(":first").text("please make a selection").attr("selected",true);
          },
        });
      });
      let optionsvl;
      let valueint = document.getElementById("types");
      // attribute dropdown
      $(function () {
        $("#layer").change(function () {
          var attributes = document.getElementById("attributes");
          var length = attributes.options.length;
          for (i = length - 1; i >= 0; i--) {
            attributes.options[i] = null;
          }

          var value_layer = $(this).val();

          attributes.options[0] = new Option("Select attributes", "");
          //  alert(url);
          let layersname = document.getElementById("layer");
          $(document).ready(function () {
            $.ajax({
              type: "GET",
              url:
                "http://127.0.0.1:8081/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" +
                value_layer,
              dataType: "xml",
              success: function (xml) {
                var select = $("#attributes");
                var title = $(xml).find("xsd\\:complexType").attr("name");
                //  alert(title);
                $(xml)
                  .find("xsd\\:sequence")
                  .each(function () {
                    $(this)
                      .find("xsd\\:element")
                      .each(function () {
                        var value = $(this).attr("name");
                        //alert(value);
                        var type = $(this).attr("type");
                        //alert(type);
                        if (value != "geom" && value != "the_geom") {
                          select.append(
                            "<option class='ddindent'  value='" +
                              type +
                              "' name='" +
                              value +
                              "'>" +
                              value +
                              "</option>"
                          );
                        }
                      });
                  });
              },
            });
          });
        });
      });
      var attributeterere = document.getElementById("attributes");
      // console.log(attributeterere.selectedIndex)

      attributeterere.onchange = function () {
        var layer = document.getElementById("layer");
        var value_layer = layer.options[layer.selectedIndex].value;
        if (value_layer == "soutrapil:location") {
          if (attributeterere.selectedIndex == 3) {
            valueint.innerHTML = "";
            myelement = document.createElement("option");
            myelement.setAttribute("value", "Bizerte");
            valueint.appendChild(myelement);
            myelement2 = document.createElement("option");
            myelement2.setAttribute("value", "Manubah");
            valueint.appendChild(myelement2);
            myelement3 = document.createElement("option");
            myelement3.setAttribute("value", "Ben Arous");
            valueint.appendChild(myelement3);
            myelement4 = document.createElement("option");
            myelement4.setAttribute("value", "Ariana");
            valueint.appendChild(myelement4);
            myelement5 = document.createElement("option");
            myelement5.setAttribute("value", "Tunis");
            valueint.appendChild(myelement5);
          } else {
            valueint.innerHTML = "";
          }
        }
        if (value_layer == "soutrapil:pipeline") {
          valueint.innerHTML = "";
          if (attributeterere.selectedIndex == 1) {
            myelement = document.createElement("option");
            myelement.setAttribute("value", "Bizerte");
            valueint.appendChild(myelement);
            myelement2 = document.createElement("option");
            myelement2.setAttribute("value", "Manubah");
            valueint.appendChild(myelement2);
            myelement3 = document.createElement("option");
            myelement3.setAttribute("value", "Ben Arous");
            valueint.appendChild(myelement3);
            myelement4 = document.createElement("option");
            myelement4.setAttribute("value", "Ariana");
            valueint.appendChild(myelement4);
            myelement5 = document.createElement("option");
            myelement5.setAttribute("value", "Tunis");
            valueint.appendChild(myelement5);
          } else {
            valueint.innerHTML = "";
          }
        }

        if (value_layer == "soutrapil:site") {
          valueint.innerHTML = "";
          if (attributeterere.selectedIndex == 2) {
            myelement = document.createElement("option");
            myelement.setAttribute("value", "Bizerte");
            valueint.appendChild(myelement);
            myelement2 = document.createElement("option");
            myelement2.setAttribute("value", "Manubah");
            valueint.appendChild(myelement2);
            myelement3 = document.createElement("option");
            myelement3.setAttribute("value", "Ben Arous");
            valueint.appendChild(myelement3);
            myelement4 = document.createElement("option");
            myelement4.setAttribute("value", "Ariana");
            valueint.appendChild(myelement4);
            myelement5 = document.createElement("option");
            myelement5.setAttribute("value", "Tunis");
            valueint.appendChild(myelement5);
          } else {
            valueint.innerHTML = "";
          }
        }
      };

      // operator combo
      $(function () {
        $("#attributes").change(function () {
          var operator = document.getElementById("operator");
          var length = operator.options.length;
          for (i = length - 1; i >= 0; i--) {
            operator.options[i] = null;
          }

          var value_type = $(this).val();

          // alert(value_type);
          var value_attribute = $("#attributes option:selected").text();
          operator.options[0] = new Option("Select operator", "");

          if (
            value_type == "xsd:short" ||
            value_type == "xsd:int" ||
            value_type == "xsd:double" ||
            value_type == "xsd:long"
          ) {
            var operator1 = document.getElementById("operator");
            operator1.options[1] = new Option("Greater than", ">");
            operator1.options[2] = new Option("Less than", "<");
            operator1.options[3] = new Option("Equal to", "=");
            operator1.options[4] = new Option("Between", "BETWEEN");
          } else if (value_type == "xsd:string") {
            var operator1 = document.getElementById("operator");
            operator1.options[1] = new Option("Like", "ILike");
          }
        });
      });
      var len = 0;
      function msg() {
        Toastify({
          text: len.toString() + " entités",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true,
          className: "info",
          // style: {
          //   background: "#31D76B",
          // }
        }).showToast();
      }

      function query() {
        //alert('jsbchdb');
        var layer = document.getElementById("layer");
        var value_layer = layer.options[layer.selectedIndex].value;

        var attribute = document.getElementById("attributes");
        var value_attribute = attribute.options[attribute.selectedIndex].text;
        //alert(value_attribute);

        var operator = document.getElementById("operator");
        var value_operator = operator.options[operator.selectedIndex].value;
        //alert(value_operator);

        var txt = document.getElementById("value");
        var value_txt = txt.value;

        if (value_operator == "ILike") {
          value_txt = "'" + value_txt + "%25'";
          //alert(value_txt);
          //value_attribute = 'strToLowerCase('+value_attribute+')';
        } else {
          value_txt = value_txt;
          //value_attribute = value_attribute;
        }
        //alert(value_txt);

        var url =
          "http://127.0.0.1:8081/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
          value_layer +
          "&CQL_FILTER=" +
          value_attribute +
          "%20" +
          value_operator +
          "%20" +
          value_txt +
          "&outputFormat=application/json";
        console.log(value_layer);
        if (value_layer == "soutrapil:pipeline") {
          linegrp.clearLayers();
          myChart.destroy();
          addPipe(url);
          setTimeout(charts, 500);

          $.getJSON(url, function (data) {
            len = data.features.length;
            console.log(len);
            return len;
          }).then(function () {
            msg();
          });
          //setTimeout(msg,1000)
        }
        if (value_layer == "soutrapil:site") {
          polygongrp.clearLayers();
          myChart.destroy();
          addSite(url);
          setTimeout(charts, 500);
          $.getJSON(url, function (data) {
            len = data.features.length;
            console.log(len);
            return len;
          }).then(function () {
            msg();
          });
        }
        if (value_layer == "soutrapil:location") {
          pointgrp.clearLayers();
          myChart.destroy();
          addLocation(url);
          setTimeout(charts, 500);
          $.getJSON(url, function (data) {
            len = data.features.length;
            console.log(len);
            return len;
          }).then(function () {
            msg();
          });
        }
      }

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////     Buffer Analysis         //////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // layer dropdown query
      $(document).ready(function () {
        $.ajax({
          type: "GET",
          url: "http://127.0.0.1:8081/geoserver/soutrapil/wfs?request=getCapabilities",
          dataType: "xml",
          success: function (xml) {
            var select = $("#layer2");
            $(xml)
              .find("FeatureType")
              .each(function () {
                //var title = $(this).find('ows:Operation').attr('name');
                //alert(title);
                var name = $(this).find("Name").text();
                //select.append("<option/><option class='ddheader' value='"+ name +"'>"+title+"</option>");
                $(this)
                  .find("Name")
                  .each(function () {
                    var value = $(this).text();
                    select.append(
                      "<option class='ddindent' value='" +
                        value +
                        "'>" +
                        value +
                        "</option>"
                    );
                  });
              });
            //select.children(":first").text("please make a selection").attr("selected",true);
          },
        });
      });

      //  map.on('click', function(e) {

      //                     if(document.getElementById('x1').value==''){

      //                         document.getElementById('x1').value=e.latlng.lng;
      //                         document.getElementById('y1').value=e.latlng.lat;

      //                     }

      // });

      var cercles_draw = L.layerGroup();
      cercles_draw.addTo(map);

      var markersdragged = L.layerGroup().addTo(map);
      var markerdrag = L.marker([36.96874, 9.73938], {
        draggable: true,
        autoPan: true,
      });

      function setmarker() {
        markerdrag.addTo(markersdragged);
      }

      markerdrag.on("dragend", function (event) {
        var marker = event.target;
        var position = marker.getLatLng();
        document.getElementById("x1").value = position.lng;
        document.getElementById("y1").value = position.lat;

        cercles_draw.clearLayers();

        //alert('jsbchdb');
        var layer = document.getElementById("layer2");
        var value_layer = layer.options[layer.selectedIndex].value;
        //alert(value_layer);

        var txt = document.getElementById("value2");
        var value_txt = txt.value;
        var x1 = document.getElementById("x1").value;
        var y1 = document.getElementById("y1").value;
        var circle = L.circle([y1, x1], {
          radius: value_txt,
          color: "blue",
        }).addTo(cercles_draw);
        var theCenterPt = [y1, x1];
        var theRadius = value_txt;
        var counter_points_in_circle = 0;

        var url =
          "http://127.0.0.1:8081/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
          value_layer +
          "&outputFormat=application/json";

        if (value_layer == "soutrapil:location") {
          pointgrp.clearLayers();

          $.getJSON(url, function (data) {
            var geojson = L.geoJson(data, {
              pointToLayer: pointToLayer,
              onEachFeature: function (feature, layer) {
                var h2name = document.createElement("h6");
                h2name.innerHTML = feature.properties.name1;
                var h2time = document.createElement("h6");
                h2name.className = "namepopup";
                h2time.className = "timepopup";
                h2time.innerHTML = feature.properties.time.substr(
                  0,
                  feature.properties.time.length - 1
                );

                var edbtn = document.createElement("button");
                edbtn.innerHTML = "Modifier";
                var id = feature.id;
                let pointIndex = id.indexOf(".");
                var linkid = id.substr(pointIndex + 1, id.length - 1);
                edbtn.addEventListener("click", function () {
                  location.replace(
                    `http://127.0.0.1:8000/admin/geoApp/location/${linkid}/change/`
                  );
                });
                edbtn.className = "stylebuttonP";

                var brelement = document.createElement("br");

                var divElement = document.createElement("div");
                divElement.appendChild(h2name);
                divElement.appendChild(h2time);
                divElement.appendChild(brelement);
                divElement.appendChild(edbtn);

                layer.bindPopup(divElement);
              },
            });

            geojson.eachLayer(function (layer) {
              layer_lat_long = layer.getLatLng();

              distance_from_centerPoint =
                layer_lat_long.distanceTo(theCenterPt);
              if (distance_from_centerPoint <= theRadius) {
                counter_points_in_circle += 1;

                layer.addTo(pointgrp);
              }
            });
            //console.log(counter_points_in_circle)
            num1 = counter_points_in_circle;
            myChart.destroy();
            charts();
            Toastify({
              text: num1.toString() + " entités",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              className: "info",
              // style: {
              //   background: "#31D76B",
              // }
            }).showToast();
          });
        }

        if (value_layer == "soutrapil:site") {
          polygongrp.clearLayers();

          $.getJSON(url, function (data) {
            var geojson = L.geoJson(data, {
              style: myStyle2,
              onEachFeature: function (feature, layer) {
                var h2name = document.createElement("h6");
                h2name.innerHTML = feature.properties.name1;
                var h2time = document.createElement("h6");
                h2name.className = "namepopup";
                h2time.className = "timepopup";
                h2time.innerHTML = feature.properties.time.substr(
                  0,
                  feature.properties.time.length - 1
                );

                var edbtn = document.createElement("button");
                edbtn.innerHTML = "Modifier";
                var id = feature.id;
                let pointIndex = id.indexOf(".");
                var linkid = id.substr(pointIndex + 1, id.length - 1);
                edbtn.addEventListener("click", function () {
                  location.replace(
                    `http://127.0.0.1:8000/admin/geoApp/site/${linkid}/change/`
                  );
                });
                edbtn.className = "stylebuttonP";

                var brelement = document.createElement("br");

                var divElement = document.createElement("div");
                divElement.appendChild(h2name);
                divElement.appendChild(h2time);
                divElement.appendChild(brelement);
                divElement.appendChild(edbtn);

                layer.bindPopup(divElement);
              },
            });

            geojson.eachLayer(function (layer) {
              layer_lat_long = layer.getBounds().getCenter();

              distance_from_centerPoint =
                layer_lat_long.distanceTo(theCenterPt);
              if (distance_from_centerPoint <= theRadius) {
                counter_points_in_circle += 1;

                layer.addTo(polygongrp);
              }
            });
            num3 = counter_points_in_circle;
            myChart.destroy();
            charts();
            Toastify({
              text: num3.toString() + " entités",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              className: "info",
              // style: {
              //   background: "#31D76B",
              // }
            }).showToast();
          });
        }

        if (value_layer == "soutrapil:pipeline") {
          linegrp.clearLayers();

          $.getJSON(url, function (data) {
            var geojson = L.geoJson(data, {
              style: myStyle,
              onEachFeature: function (feature, layer) {
                var h2name = document.createElement("h6");
                h2name.innerHTML = feature.properties.name1;
                var h2time = document.createElement("h6");
                h2name.className = "namepopup";
                h2time.className = "timepopup";
                h2time.innerHTML = feature.properties.time.substr(
                  0,
                  feature.properties.time.length - 1
                );
                var linkpdf = document.createElement("a");
                linkpdf.className = "pdfLinks";
                var linktext = document.createTextNode("Fichier PDF");
                linkpdf.appendChild(linktext);
                linkpdf.href = "/static/pdf/" + feature.properties.pdf;

                var edbtn = document.createElement("button");
                edbtn.innerHTML = "Modifier";
                var id = feature.id;
                let pointIndex = id.indexOf(".");
                var linkid = id.substr(pointIndex + 1, id.length - 1);
                edbtn.addEventListener("click", function () {
                  location.replace(
                    `http://127.0.0.1:8000/admin/geoApp/pipeline/${linkid}/change/`
                  );
                });
                edbtn.className = "stylebuttonP";

                var brelement = document.createElement("br");

                var divElement = document.createElement("div");
                divElement.appendChild(h2name);
                divElement.appendChild(h2time);
                divElement.appendChild(linkpdf);
                divElement.appendChild(brelement);
                divElement.appendChild(edbtn);

                layer.bindPopup(divElement);
              },
            });

            geojson.eachLayer(function (layer) {
              layer_lat_long = layer.getBounds().getCenter();

              distance_from_centerPoint =
                layer_lat_long.distanceTo(theCenterPt);
              if (distance_from_centerPoint <= theRadius) {
                counter_points_in_circle += 1;

                layer.addTo(linegrp);
              }
            });
            num2 = counter_points_in_circle;
            myChart.destroy();
            charts();
            Toastify({
              text: num2.toString() + " entités",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              className: "info",
              // style: {
              //   background: "#31D76B",
              // }
            }).showToast();
          });
        }
      });

      function query2() {
        $("#value_layer").empty();
        cercles_draw.clearLayers();

        //alert('jsbchdb');
        var layer = document.getElementById("layer2");
        var value_layer = layer.options[layer.selectedIndex].value;
        //alert(value_layer);

        var txt = document.getElementById("value2");
        var value_txt = txt.value;
        var x1 = document.getElementById("x1").value;
        var y1 = document.getElementById("y1").value;
        var circle = L.circle([y1, x1], {
          radius: value_txt,
          color: "blue",
        }).addTo(cercles_draw);
        var theCenterPt = [y1, x1];
        var theRadius = value_txt;
        var counter_points_in_circle = 0;

        var url =
          "http://127.0.0.1:8081/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
          value_layer +
          "&outputFormat=application/json";

        if (value_layer == "soutrapil:location") {
          pointgrp.clearLayers();

          $.getJSON(url, function (data) {
            var geojson = L.geoJson(data, {
              pointToLayer: pointToLayer,
              onEachFeature: function (feature, layer) {
                var h2name = document.createElement("h6");
                h2name.innerHTML = feature.properties.name1;
                var h2time = document.createElement("h6");
                h2name.className = "namepopup";
                h2time.className = "timepopup";
                h2time.innerHTML = feature.properties.time.substr(
                  0,
                  feature.properties.time.length - 1
                );

                var edbtn = document.createElement("button");
                edbtn.innerHTML = "Modifier";
                var id = feature.id;
                let pointIndex = id.indexOf(".");
                var linkid = id.substr(pointIndex + 1, id.length - 1);
                edbtn.addEventListener("click", function () {
                  location.replace(
                    `http://127.0.0.1:8000/admin/geoApp/location/${linkid}/change/`
                  );
                });
                edbtn.className = "stylebuttonP";

                var brelement = document.createElement("br");

                var divElement = document.createElement("div");
                divElement.appendChild(h2name);
                divElement.appendChild(h2time);
                divElement.appendChild(brelement);
                divElement.appendChild(edbtn);

                layer.bindPopup(divElement);
              },
            });

            geojson.eachLayer(function (layer) {
              layer_lat_long = layer.getLatLng();

              distance_from_centerPoint =
                layer_lat_long.distanceTo(theCenterPt);
              if (distance_from_centerPoint <= theRadius) {
                counter_points_in_circle += 1;

                layer.addTo(pointgrp);
              }
            });
          });
        }

        if (value_layer == "soutrapil:site") {
          polygongrp.clearLayers();

          $.getJSON(url, function (data) {
            var geojson = L.geoJson(data, {
              style: myStyle2,
              onEachFeature: function (feature, layer) {
                var h2name = document.createElement("h6");
                h2name.innerHTML = feature.properties.name1;
                var h2time = document.createElement("h6");
                h2name.className = "namepopup";
                h2time.className = "timepopup";
                h2time.innerHTML = feature.properties.time.substr(
                  0,
                  feature.properties.time.length - 1
                );

                var edbtn = document.createElement("button");
                edbtn.innerHTML = "Modifier";
                var id = feature.id;
                let pointIndex = id.indexOf(".");
                var linkid = id.substr(pointIndex + 1, id.length - 1);
                edbtn.addEventListener("click", function () {
                  location.replace(
                    `http://127.0.0.1:8000/admin/geoApp/site/${linkid}/change/`
                  );
                });
                edbtn.className = "stylebuttonP";

                var brelement = document.createElement("br");

                var divElement = document.createElement("div");
                divElement.appendChild(h2name);
                divElement.appendChild(h2time);
                divElement.appendChild(brelement);
                divElement.appendChild(edbtn);

                layer.bindPopup(divElement);
              },
            });

            geojson.eachLayer(function (layer) {
              layer_lat_long = layer.getBounds().getCenter();

              distance_from_centerPoint =
                layer_lat_long.distanceTo(theCenterPt);
              if (distance_from_centerPoint <= theRadius) {
                counter_points_in_circle += 1;

                layer.addTo(polygongrp);
              }
            });
          });
        }

        if (value_layer == "soutrapil:pipeline") {
          linegrp.clearLayers();

          $.getJSON(url, function (data) {
            var geojson = L.geoJson(data, {
              style: myStyle,
              onEachFeature: function (feature, layer) {
                var h2name = document.createElement("h6");
                h2name.innerHTML = feature.properties.name1;
                var h2time = document.createElement("h6");
                h2name.className = "namepopup";
                h2time.className = "timepopup";
                h2time.innerHTML = feature.properties.time.substr(
                  0,
                  feature.properties.time.length - 1
                );
                var linkpdf = document.createElement("a");
                linkpdf.className = "pdfLinks";
                var linktext = document.createTextNode("Fichier PDF");
                linkpdf.appendChild(linktext);
                linkpdf.href = "/static/pdf/" + feature.properties.pdf;

                var edbtn = document.createElement("button");
                edbtn.innerHTML = "Modifier";
                var id = feature.id;
                let pointIndex = id.indexOf(".");
                var linkid = id.substr(pointIndex + 1, id.length - 1);
                edbtn.addEventListener("click", function () {
                  location.replace(
                    `http://127.0.0.1:8000/admin/geoApp/pipeline/${linkid}/change/`
                  );
                });
                edbtn.className = "stylebuttonP";

                var brelement = document.createElement("br");

                var divElement = document.createElement("div");
                divElement.appendChild(h2name);
                divElement.appendChild(h2time);
                divElement.appendChild(linkpdf);
                divElement.appendChild(brelement);
                divElement.appendChild(edbtn);

                layer.bindPopup(divElement);
              },
            });

            geojson.eachLayer(function (layer) {
              layer_lat_long = layer.getBounds().getCenter();

              distance_from_centerPoint =
                layer_lat_long.distanceTo(theCenterPt);
              if (distance_from_centerPoint <= theRadius) {
                counter_points_in_circle += 1;

                layer.addTo(linegrp);
              }
            });
          });
        }
      }

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////     search box         //////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
          var a,
            b,
            i,
            val = this.value;
          /*close any already open lists of autocompleted values*/
          closeAllLists();
          if (!val) {
            return false;
          }
          currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
              arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              b.setAttribute("class", "autocomplete-each-item");
              /*make the matching letters bold:*/
              b.innerHTML =
                "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                closeAllLists();
              });
              a.appendChild(b);
            }
          }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
          var x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
          }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = x.length - 1;
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
          closeAllLists(e.target);
        });
      }

      var countries = [];

      var url1 =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Alocation&outputFormat=application%2Fjson";
      var url2 =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Apipeline&outputFormat=application%2Fjson";
      var url3 =
        "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Asite&outputFormat=application%2Fjson";

      function getdata(url1, url2, url3) {
        countries.length = 0;
        $.getJSON(url1, function (data) {
          for (i = 0; i < data.features.length; i++) {
            try {
              countries.push(data.features[i].properties.name1);
            } catch (err) {}
          }
        });
        $.getJSON(url2, function (data) {
          for (i = 0; i < data.features.length; i++) {
            try {
              countries.push(data.features[i].properties.name1);
            } catch (err) {}
          }
        });
        $.getJSON(url3, function (data) {
          for (i = 0; i < data.features.length; i++) {
            try {
              countries.push(data.features[i].properties.name1);
            } catch (err) {}
          }
        });
        return countries;
      }

      autocomplete(
        document.getElementById("myInput"),
        getdata(url1, url2, url3)
      );

      function myFunction() {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        var url1 =
          "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Alocation&outputFormat=application%2Fjson";
        var url2 =
          "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Apipeline&outputFormat=application%2Fjson";
        var url3 =
          "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Asite&outputFormat=application%2Fjson";

        $.getJSON(url1, function (data) {
          for (i = 0; i < data.features.length; i++) {
            txtValue = data.features[i].properties.name1;
            var lat = data.features[i].geometry.coordinates[1];
            var lon = data.features[i].geometry.coordinates[0];

            if (txtValue.toUpperCase() == filter) {
              map.flyTo([lat, lon], 14);
            }
          }
        });
        $.getJSON(url2, function (data) {
          for (i = 0; i < data.features.length; i++) {
            txtValue = data.features[i].properties.name1;
            var lat = data.features[i].geometry.coordinates[0][1][1];
            var lon = data.features[i].geometry.coordinates[0][1][0];

            if (txtValue.toUpperCase() == filter) {
              map.flyTo([lat, lon], 13);
            }
          }
        });
        $.getJSON(url3, function (data) {
          for (i = 0; i < data.features.length; i++) {
            txtValue = data.features[i].properties.name1;
            var lat = data.features[i].geometry.coordinates[0][0][0][1];
            var lon = data.features[i].geometry.coordinates[0][0][0][0];

            if (txtValue.toUpperCase() == filter) {
              map.flyTo([lat, lon], 13);
            }
          }
        });
      }

      //  var url1 = 'http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Alocation&outputFormat=application%2Fjson'
      //  var url2 = 'http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Apipeline&outputFormat=application%2Fjson'
      // var url3 = 'http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Asite&outputFormat=application%2Fjson'
      // var arr1 = []
      // var arr1type = []

      // $.getJSON(url1, function(data) {
      //      num1= data.features.length

      //     return num1

      //         })
      //     $.getJSON(url2, function(data) {
      //       num2= data.features.length
      //      return num2

      //         })
      //         $.getJSON(url3, function(data) {
      //       num3= data.features.length
      //      return num3

      //         })

      function charts() {
        var ctx = document.getElementById("mychart").getContext("2d");
        // doughnut
        myChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["location", "pipeline", "site"],
            datasets: [
              {
                label: "Total",
                data: [num1, num2, num3],
                backgroundColor: [
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                ],
                borderColor: [
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            // scales:{
            //     y:{
            //         beginAtZero : true
            //     }
            // }
          },
        });
        return myChart;
      }

      function charts2() {
        const ctx = document.getElementById("mychart2").getContext("2d");

        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Bizerte", "Ariana", "Tunis", "Ben Arous", "Manubah"],
            datasets: [
              {
                label: "Locations",
                data: [5, 3, 3, 2, 4],
                backgroundColor: [
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                ],
                borderColor: [
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
          },
        });
      }

      function charts3() {
        const ctx = document.getElementById("mychart3").getContext("2d");

        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Bizerte", "Ariana", "Tunis", "Ben Arous", "Manubah"],
            datasets: [
              {
                label: "Pipelines",
                data: [3, 1, 1, 1, 1],
                backgroundColor: [
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                  "rgba(255,99,132,0.5)",
                ],
                borderColor: [
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                  "rgba(255,99,132,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
          },
        });
      }

      function charts4() {
        const ctx = document.getElementById("mychart4").getContext("2d");

        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Bizerte", "Ariana", "Tunis", "Ben Arous", "Manubah"],
            datasets: [
              {
                label: "Sites",
                data: [3, 2, 1, 1, 2],
                backgroundColor: [
                  "rgba(255,206,86,0.5)",
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",

                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                ],
                borderColor: [
                  "rgba(255,206,86,0.5)",
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",
                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
          },
        });
      }

      setTimeout(charts, 500);
      setTimeout(charts2, 1000);
      setTimeout(charts3, 2000);
      setTimeout(charts4, 3000);

      // let val1 = document.getElementsByClassName(
      //   "leaflet-draw-toolbar leaflet-bar leaflet-draw-toolbar-top"
      // )[0].children[0];

      // val1.addEventListener("click", function () {
      //   console.log("val1 clicked");
      //   document.getElementsByClassName(
      //     "leaflet-draw-actions leaflet-draw-actions-top leaflet-draw-actions-bottom"
      //   )[0].children[0].children[0].innerText = "annuler";
      // });

      // val1.addEventListener("mouseover", function () {
      //   document.getElementsByClassName(
      //     "leaflet-draw-draw-rectangle"
      //   )[0].title = "Tracer un rectangle";

      // });

      // var print = L.easyPrint({
      //   title: "Print",
      //   position: "topleft",
      //   sizeModes: ["A4Portrait", "A4Landscape"],
      //   hideControlContainer: false,
      // });
      // map.addControl(print);

      L.simpleMapScreenshoter({ position: "topleft" }).addTo(map);
      // L.control.browserPrint({ closePopupsOnPrint: false }).addTo(map);

      // L.BrowserPrint.Utils.registerLayer(
      //   L.MarkerClusterGroup,
      //   "L.MarkerClusterGroup",
      //   function (layer, utils) {
      //     return layer;
      //   }
      // );

      // map.on(L.BrowserPrint.Event.PrintEnd, function (e) {
      //   window.print();
      // });

      // L.easyButton("fa fa-print", function () {
      //   window.print();
      // })
      //   .setPosition("topleft")
      //   .addTo(map);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////   ADD  WMS LAYERS   ////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function wms_layers() {
        $("#wms_layers_window").modal({ backdrop: false });
        //$("#wms_layers_window").draggable();
        $("#wms_layers_window").modal("show");

        $(document).ready(function () {
          $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8081/geoserver/wms?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
              $("#table_wms_layers").empty();
              // console.log("here");
              $("<tr></tr>")
                .html("<th>Name</th><th>Title</th><th>Abstract</th>")
                .appendTo("#table_wms_layers");
              $(xml)
                .find("Layer")
                .find("Layer")
                .each(function () {
                  var name = $(this).children("Name").text();
                  // alert(name);
                  //var name1 = name.find('Name').text();
                  //alert(name);
                  var title = $(this).children("Title").text();

                  var abst = $(this).children("Abstract").text();
                  //   alert(abst);

                  //   alert('test');
                  $("<tr></tr>")
                    .html(
                      "<td>" +
                        name +
                        "</td><td>" +
                        title +
                        "</td><td>" +
                        abst +
                        "</td>"
                    )
                    .appendTo("#table_wms_layers");
                  //document.getElementById("table_wms_layers").setAttribute("class", "table-success");
                });
              addRowHandlers1();
            },
          });
        });

        function addRowHandlers1() {
          //alert('knd');
          var rows = document.getElementById("table_wms_layers").rows;
          var table = document.getElementById("table_wms_layers");
          var heads = table.getElementsByTagName("th");
          var col_no;
          for (var i = 0; i < heads.length; i++) {
            // Take each cell
            var head = heads[i];
            //alert(head.innerHTML);
            if (head.innerHTML == "Name") {
              col_no = i + 1;
              //alert(col_no);
            }
          }
          for (i = 0; i < rows.length; i++) {
            rows[i].onclick = (function () {
              return function () {
                $(function () {
                  $("#table_wms_layers td").each(function () {
                    $(this).parent("tr").css("background-color", "white");
                  });
                });
                var cell = this.cells[col_no - 1];
                layer_name = cell.innerHTML;
                // alert(layer_name);

                $(document).ready(function () {
                  $("#table_wms_layers td:nth-child(" + col_no + ")").each(
                    function () {
                      if ($(this).text() == layer_name) {
                        $(this).parent("tr").css("background-color", "grey");
                      }
                    }
                  );
                });

                //alert("id:" + id);
              };
            })(rows[i]);
          }
        }
      }
      // add wms layer to map on click of button
      function add_layer() {
        //  alert("jd");

        //alert(layer_name);
        //map.removeControl(layerSwitcher);

        var name = layer_name.split(":");
        //alert(layer_name);
        var layer_wms = L.tileLayer
          .wms("http://127.0.0.1:8081/geoserver/wms?", {
            layers: layer_name,
            transparent: "true",
            format: "image/png",
          })
          .addTo(map);
        //layerControl.addOverlay(india_district,"india_district");

        //layerControl.addOverlay(layer_wms, layer_name);
        //overlays.addLayer(layer_wms, layer_name);
        control.addOverlay(layer_wms, layer_name);

        $(document).ready(function () {
          $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8081/geoserver/wms?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
              $(xml)
                .find("Layer")
                .find("Layer")
                .each(function () {
                  var name = $(this).children("Name").text();
                  // alert(name);
                  if (name == layer_name) {
                    // use this for getting the lat long of the extent
                    var bbox1 = $(this)
                      .children("EX_GeographicBoundingBox")
                      .children("southBoundLatitude")
                      .text();
                    var bbox2 = $(this)
                      .children("EX_GeographicBoundingBox")
                      .children("westBoundLongitude")
                      .text();
                    var bbox3 = $(this)
                      .children("EX_GeographicBoundingBox")
                      .children("northBoundLatitude")
                      .text();
                    var bbox4 = $(this)
                      .children("EX_GeographicBoundingBox")
                      .children("eastBoundLongitude")
                      .text();
                    var southWest = L.latLng(bbox1, bbox2);
                    var northEast = L.latLng(bbox3, bbox4);
                    var bounds = L.latLngBounds(southWest, northEast);
                    map.fitBounds(bounds);

                    // use below code for getting the extent in the projection defined in geoserver

                    /* $(this).find('BoundingBox').each(function(){
                       if ($(this).attr('CRS') != "CRS:84" ){
                       var bbox1 = $(this).attr('minx');
                       var bbox2 = $(this).attr('miny');
                       var bbox3 = $(this).attr('maxx');
                       var bbox4 = $(this).attr('maxy');
                       var southWest = L.latLng(bbox1, bbox2);
                       var northEast = L.latLng(bbox3, bbox4);
                       var bounds = L.latLngBounds(southWest, northEast);
                        map.fitBounds(bounds);
                       }
                       });*/

                    //  alert($(this).children('EX_GeographicBoundingBox').text());
                    if (bounds != undefined) {
                      alert(layer_name + " added to the map");
                    }
                  }
                });
            },
          });
        });
      }

      function close_wms_window() {
        layer_name = undefined;
      }

      L.easyButton("fa fa-database", function () {
        wms_layers();
      })
        .setPosition("topright")
        .addTo(map);

      /////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////// upload /////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////
      var shapefileInput = document.createElement("input");
      shapefileInput.type = "file";
      shapefileInput.accept = ".zip";
      var i = 0;
      var j = 0;
      var uploadButton = L.easyButton("fa fa-upload", function (btn, map) {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = ".geojson,.kml,.zip";
        input.style.display = "none";
        input.onchange = function () {
          var file = this.files[0];
          var reader = new FileReader();
          reader.onload = function (e) {
            var fileContent = e.target.result;
            var fileType = file.name.split(".").pop();
            var layer;
            if (fileType === "geojson") {
              layer = L.geoJSON(JSON.parse(fileContent));
            } else if (fileType === "kml") {
              layer = omnivore.kml.parse(fileContent);
            } else if (fileType === "zip") {
              var file2 = shapefileInput.files[0];
              var reader2 = new FileReader();

              reader2.onload = function () {
                var shpfile = reader2.result;
                layer2 = L.shapefile(shpfile);

                control.addOverlay(layer2, "shp" + i);

                layer2.addTo(map);
                i = i + 1;
              };

              reader2.readAsArrayBuffer(file);
            } else {
              alert("Unsupported file type");
              return;
            }
            if (layer) {
              map.addLayer(layer);
              map.fitBounds(layer.getBounds());
              control.addOverlay(layer, "couche" + j);
              j = j + 1;
            }
          };
          reader.readAsText(file);
        };
        input.click();
      });
      uploadButton.setPosition("topright").addTo(map);

      // L.easyButton("fa fa-upload", function () {
      //   shapefileInput.click();
      // }).addTo(map);
      // shapefileInput.addEventListener("change", function () {
      //   var file = shapefileInput.files[0];
      //   var reader = new FileReader();

      //   reader.onload = function () {
      //     var shpfile = reader.result;
      //     var layer = L.shapefile(shpfile);
      //     layer.addTo(map);
      //   };

      //   reader.readAsArrayBuffer(file);
      // });
      ///ctlStyle = L.control.styleEditor({ position: "topleft" }).addTo(map);

      // map.addControl(L.control.styleEditor());

      $(document).ready(function () {
        $("#prediction").submit(function (event) {
          event.preventDefault(); // prevent default form submission behavior
          var form_data = $(this).serialize(); // serialize form data as a string
          $.ajax({
            url: "/predict/", // URL of the predict view
            type: "POST",
            data: form_data,
            success: function (response) {
              var activity = response.value;
              var name = document.getElementById("name").value;
              console.log(name);
              var date = document.getElementById("date").value;
              var url2 =
                "http://127.0.0.1:8081/geoserver/soutrapil/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soutrapil%3Apipeline&outputFormat=application%2Fjson";

              $.getJSON(url2, function (data) {
                for (i = 0; i < data.features.length; i++) {
                  txtValue = data.features[i].properties.name1;
                  var lat = data.features[i].geometry.coordinates[0][1][1];
                  var lon = data.features[i].geometry.coordinates[0][1][0];

                  if (txtValue.toUpperCase() == name.toUpperCase()) {
                    map.flyTo([lat, lon], 12);
                    var popup = L.popup().setContent(
                      "Prévoir une " + activity + " lors du " + date
                    );
                    var latlng = L.latLng(lat, lon);
                    popup.setLatLng(latlng).openOn(map);
                  }
                }
              });
              Toastify({
                text: "Il y'aura une " + activity + " au niveau de la " + name,
                duration: 5000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true,
                className: "info",
                // style: {
                //   background: "#31D76B",
                // }
              }).showToast();

              console.log("Predicted activity: " + activity); // update HTML content
            },
            error: function (xhr, errmsg, err) {
              console.log(xhr.status + ": " + xhr.responseText); // log error message to console
            },
          });
        });
      });


//       var polyline = L.polyline([[37.82, 12.07], [38, 12.57],[37.70, 11.07]]).addTo(map);
// polyline.enableEdit();

//L.WFST.include(MultiEditableMixin);

// var wfst = new L.WFST({
//     showExisting: true,
//     geometryField: 'geom',
//     url: 'http://localhost:8081/geoserver/ows',
//     typeNS: 'soutrapil',
//     typeName: 'pipeline',
//     forceMulti: true,
//     style: {
//         color: 'blue',
//         weight: 6
//     }
// }).addTo(map).once('load', function () {
//            //map.fitBounds(wfst);
//         });

//         var drawControl = new L.Control.Draw({ 
//           draw:{circle:false, circlemarker:false, rectangle:false,
//                 },
//           edit:{featureGroup: wfst } });
//       map.addControl(drawControl);
      
//       map.on('draw:created', function (e) {
//           var layer = e.layer;
//           wfst.addLayer(layer)});
      
//       map.on('draw:edited', function (e) {
//           var layers = e.layers;
//           layers.eachLayer( function (layer) {
//               wfst.editLayer(layer);
//               });
//       });

// L.easyButton('fa-save', function () {
//      wfst.save();
//  }, 'Save changes').addTo(map);

