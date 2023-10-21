const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Respond with the HTML content
app.get("/html", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
     <!DOCTYPE html>
     <html>
         <head>
         </head>
         <body>
             <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
             <p> - Martin Fowler</p>
         </body>
     </html>
  `);
});

// Respond with json content
app.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(
    JSON.stringify({
      slideshow: {
        author: "Yours Truly",
        date: "date of publication",
        slides: [
          {
            title: "Wake up to WonderWidgets!",
            type: "all",
          },
          {
            items: [
              "Why <em>WonderWidgets</em> are great",
              "Who <em>buys</em> WonderWidgets",
            ],
            title: "Overview",
            type: "all",
          },
        ],
        title: "Sample Slide Show",
      },
    })
  );
});

// Respond with the generated UUID
app.get("/uuid", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const generatedUUID = uuidv4();

  res.json(JSON.stringify({ uuid: generatedUUID }));
});

// Setting the status for the page
app.get("/status/:statusCode", (req, res) => {
  const statusCode = parseInt(req.params.statusCode);

  if (!isNaN(statusCode)) {
    res.status(statusCode).send(`Response with status code ${statusCode}`);
  } else {
    res.status(400).send("Invalid status code format");
  }
});

// Responding after delay 
app.get("/delay/:delayInSec", (req, res) => {
  const delayInSec = parseInt(req.params.delayInSec);
  if (!isNaN(delayInSec)) {
    setTimeout(() => {
      res.status(200).send(`Success response after ${delayInSec} seconds`);
    }, delayInSec * 1000);
  } else {
    res.status(400).send("Invalid status code format");
  }
});

// Handle other requests with a 404 Not Found response
app.use((req, res) => {
  res.status(404).send("Req Not Found");
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
