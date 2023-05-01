/*
 * XML INPUT TO JSON OUTPUT
 * Parse XML file into JSON object
 * Reading tickets.xml
 * Converting xml data to json data
 * Writing that json data to xml-tickets.json
 */
import { XMLParser } from "fast-xml-parser";
import * as fs from "fs";

const xmlFile = fs.readFileSync("./xml_stuff/tickets.xml", "utf-8");
const parser = new XMLParser();
const json = parser.parse(xmlFile);

console.log(`First ticket: `, json.database.ticket[0]);

/* write to a file */
fs.writeFile(
  "./xml_stuff/xml-tickets.json",
  JSON.stringify(json, null, 2),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("XML has been parsed and wrote to 'xml-tickets.json'");
    }
  }
);
