/*
 * JSON INPUT TO XML OUTPUT
 * JSON object to XML data
 * Read .json file containing ticket objects
 * Covert json data to xml data
 * write xml to file
 */
import { XMLBuilder } from "fast-xml-parser";
import * as fs from "fs";

// read json file data
const jsonTickets = fs.readFile(
  "./xml-sample.json",
  "utf-8",
  function (err, data) {
    if (err) throw err;
    return JSON.parse(data);
    //   console.log(data);
  }
);

// original
const tickets = [
  {
    _id: 202,
    type: "sports",
    subject: "swimming",
    description: "water",
    priority: "go fast",
    status: "wet",
    date: new Date(),
  },
  {
    _id: 203,
    type: "sports",
    subject: "track",
    description: "gotta go fast",
    priority: "run",
    status: "hot",
    date: new Date(),
  },
];

const builder = new XMLBuilder({
  arrayNodeName: "ticket",
});
const xmlContent = `<?xml version="1.0"?>
<database>
    ${builder.build(tickets)}
</database>`;

console.log(`xml: `, xmlContent);

/* write XML data parsed from JSON object to file */
fs.writeFile("xml-json-tickets.xml", xmlContent, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON has been parsed and wrote to 'xml-json-tickets.xml'");
  }
});
