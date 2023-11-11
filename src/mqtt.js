fetch("./location.json", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });
export default function MQTT() {
  return <h1>Hello</h1>;
}
