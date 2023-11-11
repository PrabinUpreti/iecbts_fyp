import { useEffect, useState } from "react";
import { TileLayer, MapContainer, Marker, Popup, useMap } from "react-leaflet";
// import { Icon } from "leaflet";
import L from "leaflet";
import location from "../src/location.json";

function Mapa() {
  var Latitude = location.Latitude;
  var Longitude = location.Longitude;
  console.log(location);

  const [busLocation, setBusLocation] = useState({
    lat: Latitude,
    lng: Longitude,
  });
  const [myLocation, setmyLocation] = useState({
    lat: 27,
    lng: 85,
  });
  console.log(busLocation);
  function changeLocation() {
    console.log("i am clicked");

    fetch("./location.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        Latitude = response.Latitude;
        Longitude = response.Longitude;
        // return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
    setBusLocation({ lat: Latitude, lng: Longitude });
  }
  const busIcon = L.icon({
    iconUrl:
      "https://cdn.pixabay.com/photo/2014/04/03/00/35/bus-308765_1280.png",
    iconSize: [30, 30],
    iconAnchor: [50, 50],
    popupAnchor: [-35, -35],
    className: "leaflet-marker-icon-custom",
    rotationAngle: 5,
  });

  const myIcon = L.icon({
    iconUrl:
      "https://static.vecteezy.com/system/resources/previews/012/174/347/original/pin-location-gps-icon-png.png",
    iconSize: [50, 50],
    iconAnchor: [50, 50],
    popupAnchor: [0, 0],
    className: "leaflet-marker-icon-custom",
    rotationAngle: 5,
  });
  // const map = useMap;
  // useEffect(() => {
  //   map..on("locationfound", function (e) {
  //     setmyLocation(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //     const radius = e.accuracy;
  //     const circle = L.circle(e.latlng, radius);
  //     circle.addTo(map);
  //     // setBbox(e.bounds.toBBoxString().split(","));
  //   });
  // }, [map]);

  return (
    <>
      <MapContainer
        center={busLocation}
        zoom={19}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={busLocation}
          icon={busIcon}
          dragstart={changeLocation}
        >
          <Popup autoPan={false}>Time Remaining 0 min</Popup>
        </Marker>

        <Marker position={myLocation} icon={myIcon} dragstart={changeLocation}>
          <Popup autoPan={true}>You are here.</Popup>
        </Marker>
      </MapContainer>
      {/* 
      <MapContainer
        center={myLocation}
        zoom={19}
        scrollWheelZoom={true}
        style={{ height: "95vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=CNTjmw6EUmXeKtps7uDY"
        />
        <Marker position={myLocation} icon={myIcon} dragstart={changeLocation}>
          <Popup autoPan={true}>I am Here.</Popup>
        </Marker>
      </MapContainer> */}
      {/* <button className="btn btn-primary" onClick={changeLocation}>
        Reload Location
      </button> */}
    </>
  );
}
export default Mapa;
