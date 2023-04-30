export default class TicketAdapter {
  // Converts JSON to XML
  toXML(ticket) {
    const xml = `
        <ticket>
          <id>${ticket._id}</id>
          <type>${ticket.type}</type>
          <subject>${ticket.subject}</subject>
          <description>${ticket.description}</description>
          <priority>${ticket.priority}</priority>
          <status>${ticket.status}</status>
        </ticket>
      `;
    return xml;
  }

  // Converts XML to JSON
  toJSON(ticket) {
    var obj = {
      _id: ticket.id,
      type: ticket.type,
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
    };

    return obj;
  }
}
