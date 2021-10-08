const fs = require("fs");
const http = require("http");
const url = require("url");

const templateChange = (temp, product) => {
  let outPut = temp.replace(/{%ProductName%}/g, product.productName);
  outPut = outPut.replace(/{%ProductPrice%}/g, product.price);
  outPut = outPut.replace(/{%ProductImage%}/g, product.image);
  return outPut;
};
const front = fs.readFileSync(`${__dirname}/frontEnd/index.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/frontEnd/temp.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/doc/doc.txt`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const path = req.url;

  if (path === "/" || path === "/homePage") {
    res.writeHead(200, { "content-type": "text/html" });
    const cards = dataObj.map((el) => templateChange(card, el)).join("");
    const output = front.replace("{%Product_Cards%}", cards);
    res.end(output);
  } //Product Discription/////
  else if (path === "/productDiscription") {
    res.end("This is the Product Discription Page ");
  } //$)$ error////
  else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-header": "hello world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Wakeing up the server Boss!");
});
