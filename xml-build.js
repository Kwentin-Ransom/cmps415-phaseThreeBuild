/* JSON object to XML data */
import { XMLBuilder } from "fast-xml-parser";

const tickets = [
  {
    _id: 200,
    type: "sports",
    subject: "swimming",
    description: "water",
    priority: "go fast",
    status: "wet",
    date: new Date(),
  },
  {
    _id: 201,
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
