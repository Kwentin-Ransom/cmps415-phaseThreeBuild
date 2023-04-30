/* Parse XML file into JSON object */
import { XMLParser } from "fast-xml-parser";
// import { readFileSync, writeFileSync } from "fs";
import * as fs from "fs";

const xmlFile = fs.readFileSync("./tickets.xml", "utf-8");
const parser = new XMLParser();
const json = parser.parse(xmlFile);

console.log(`First ticket: `, json.database.ticket[0]);

/* Need to figure out how to write to a file */
fs.writeFile("xml-tickets.json", JSON.stringify(json, null, 2), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("XML has been parsed and wrote to 'xml-tickets.json'");
  }
});
