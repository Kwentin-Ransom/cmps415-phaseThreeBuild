/* validating XML data */
import { XMLValidator } from "fast-xml-parser";
import { readFileSync } from "fs";

/* reading XML file */
const xmlStuff = readFileSync("./tickets.xml", "utf-8");

const xmlFile = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<database>
    <ticket>
        <_id>100</_id>
        <type>sports</type>
        <subject>baseball</subject>
        <description>pitcher</description>
        <priority>star player</priority>
        <status>injured</status>
    </ticket>
</database>`;

const result = XMLValidator.validate(xmlStuff);
if (result === true) {
  console.log(`XML file is valid`, result);
}

if (result.err) {
  console.log(`XML is invalid: ${result.err.msg}`, result);
}
