const http = require("http");
const { v4: uuidv4 } = require("uuid");

// Creating the server
const server = http.createServer((req, res) => {
  // Handle different URL paths
  if (req.url === "/html" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    // Respond with the HTML content
    res.end(`<!DOCTYPE html>
        <html>
            <head>
            </head>
            <body>
                <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
                <p> - Martin Fowler</p>
            </body>
        </html>`);
  } else if (req.url === "/json" && req.method === "GET") {
    // Respond with json content
    res.setHeader("Content-Type", "application/json");
    res.end(
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
  } else if (req.url === "/uuid" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    // Generate a UUID (UUIDv4)
    const generatedUUID = uuidv4();
    // Respond with the generated UUID

    res.end(JSON.stringify({ uuid: generatedUUID }));
    
  } else if (req.url.startsWith("/status/") && req.method === "GET") {
    const statusCode = parseInt(req.url.split("/")[2]);
    console.log(statusCode);
    if (!isNaN(statusCode)) {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = statusCode;
      res.end(`Response with status code ${statusCode}`);
    } else {
      res.statusCode = 400; // Bad Request
      res.end("Invalid status code format");
    }
  } else if (req.url.startsWith("/delay/") && req.method === "GET") {
    const delayInSeconds = parseInt(req.url.split("/")[2]);
    if (!isNaN(delayInSeconds)) {
      setTimeout(() => {
        res.statusCode = 200;
        res.end(`Success response after ${delayInSeconds} seconds`);
      }, delayInSeconds * 1000);
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
  } else {
    // Handle other requests with a 404 Not Found response
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/, please edit the url");
});
