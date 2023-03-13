import fs from "fs";
import { transform } from "node-json-transform";

var map = {
  item: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: ["longitude", "latitude"],
    },
    properties: {
      id: "id",
      businessArea: "business_area",
      address: "address",
      address2: "address_2",
      city: "city",
      state: "state",
      zipcode: "zipcode",
      phone: "phone",
      longitude: "longitude",
      latitude: "latitude",
      facilitySummary: "facility_summary"
    },
  },
  operate: [
    {
      run: (val) => {
        return val.trim().toLowerCase();
      },
      on: "properties.address"
    }
  ],
  each: function (item, idx) {
    item.type = "Feature";
    item.geometry.type = "Point";
    item.properties.id = idx;
    return item;
  },
};

let projectData;

const data = fs.readFileSync("./src/data/locations.json", "utf8");
projectData = JSON.parse(data);
projectData = projectData.filter((x) => {
  if (!parseFloat(x.longitude) || !parseFloat(x.latitude)) {
    console.log(
      `Error parsing Lng/Lat for ${x['address']}`
    );
  }
  return parseFloat(x.longitude) && parseFloat(x.latitude);
});
const result = transform(projectData, map);

const projects = `const locations = ${JSON.stringify(
  result
)}; export default locations`;

fs.writeFile("./src/data/locations.js", projects, (err) => {
  if (err) throw err;
  console.log("The file was successfully saved!");
});
