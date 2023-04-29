const { MongoClient } = require("mongodb");

// Connection to the mongodb
const uri =
  "mongodb+srv://cmps415_02:admin123@krmdb.pzseua4.mongodb.net/?retryWrites=true&w=majority";

const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");

app.listen(port);
console.log("Server started at http://localhost:" + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "Hello world! Welcome to Phase III. <br/> Go to '/menu' for more options."
  );
});

//Open the Menu
//Menu shows us POST or PUT buttons that will take us to one of those two forms
app.get("/menu", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  fs.readFile("./menu.html", "utf8", (err, contents) => {
    if (err) {
      console.log("Form file Read Error", err);
      res.write("<p>Form file Read Error");
    } else {
      console.log("Form loaded\n");
      res.write(contents + "<br>");
    }
    res.end();
  });
});

// GET All tickets
app.get("/rest/list/", function (req, res) {
  //establish the new connection with the mongodb
  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db("krmdb");
      const ticketDb = database.collection("tickets");

      const query = {}; //this means that all tickets are selected

      //tickets is an array that holds all tickets that are of type JSON
      const tickets = await ticketDb.find(query).toArray();
      //if array is 0 there's no tickets
      if (tickets.length === 0) {
        res.status(404).send("Tickets do not exist!");
      } else {
        console.log(tickets);
        //return the tickets
        res.json(tickets);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

// GET ticket by id
app.get("/rest/ticket/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    //connect

    await client.connect();

    /*** make db calls ***/

    //get ticket by id
    await getTicketById(client);
  } catch (e) {
    console.error(e);
  } finally {
    //close the connection to mongo cluster
    await client.close();
  }

  async function getTicketById(client) {
    const result = await client
      .db("krmdb")
      .collection("tickets")
      .findOne({
        _id: Number(req.params.id),
      });

    if (result) {
      console.log(`Found a listing in the db with the id '${req.params.id}'`);
      console.log(result);
      res.send(result);
    } else {
      console.log(`No listing found with the id '${req.params.id}'`);
    }
  }
});

// A DELETE request
app.delete("/rest/ticket/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    //connect

    await client.connect();

    /*** make db calls ***/

    //get ticket by id
    await ticketExists(client); //check for ticket
    await deleteTicketById(client); //delete ticket
    await ticketExists(client); //check if deleted
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

  // delete ticket
  async function deleteTicketById(client) {
    const result = await client
      .db("krmdb")
      .collection("tickets")
      .deleteOne({ _id: Number(req.params.id) });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    res.send(`${result.deletedCount} document(s) was/were deleted.`);
  }

  // print ticket if it exists
  async function ticketExists(client) {
    const result = await client
      .db("krmdb")
      .collection("tickets")
      .findOne({ _id: Number(req.params.id) });

    if (result) {
      console.log(
        `Found a ticket in the collection with the id '${req.params.id}'.`
      );
    } else {
      console.log(`No ticket was found with the id '${req.params.id}'`);
    }
  }
});

// A POST request
app.get("/postform", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  fs.readFile("./post.html", "utf8", (err, contents) => {
    if (err) {
      console.log("Form file Read Error", err);
      res.write("<p>Form file Read Error");
    } else {
      console.log("Form loaded\n");
      res.write(contents + "<br>");
    }
    res.end();
  });
});

app.post("/rest/ticket/postTicket", function (req, res) {
  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db("krmdb");
      const ticketDb = database.collection("tickets");

      const _id = Number(req.body._id);
      const type = req.body.type;
      const subject = req.body.subject;
      const description = req.body.description;
      const priority = req.body.priority;
      const status = req.body.status;

      //creating the ticket of type JSON
      const ticket = {
        _id: _id,
        type: type,
        subject: subject,
        description: description,
        priority: priority,
        status: status,
        date: new Date(),
      };

      //here we don't handle much errors because all fields are pre-filled so if a mistake has been made
      //the ticket should be deleted and then added again
      const addTicket = await ticketDb.insertOne(ticket);
      console.log(addTicket);
      res.json(ticket);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

// A PUT request
app.get("/putform", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  fs.readFile("./put.html", "utf8", (err, contents) => {
    if (err) {
      console.log("Form file Read Error", err);
      res.write("<p>Form file Read Error");
    } else {
      console.log("Form loaded\n");
      res.write(contents + "<br>");
    }
    res.end();
  });
});

app.post("/rest/ticket/updateTicket", function (req, res) {
  console.log("yes");
  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db("krmdb");
      const ticketDb = database.collection("tickets");

      const _id = Number(req.body._id);
      const type = req.body.type;
      const subject = req.body.subject;
      const description = req.body.description;
      const priority = req.body.priority;
      const status = req.body.status;

      //creating the ticket of type JSON
      const ticket = {
        _id: _id,
        type: type,
        subject: subject,
        description: description,
        priority: priority,
        status: status,
        date: new Date(),
      };

      //Here we put the ticketID into the field and then fill out rest of the fields
      //Then findOneAndUpdate searches for that ticketID  and if found -> $set updates the whole ticket
      //if not we throw an error
      const updateTicket = await ticketDb.findOneAndUpdate(
        { _id: _id },
        { $set: ticket }
      );
      if (!updateTicket) {
        res.status(404).send("Ticket does not exist!");
      } else {
        console.log(updateTicket);
        res.json(ticket);
        res.status(200).send(`Ticket with _id: ${_id} has been updated!`);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});
