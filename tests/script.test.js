// script.test.js
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// Load the HTML and JS files
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
const script = fs.readFileSync(path.resolve(__dirname, "../scripts/script.js"), "utf-8");

// Create a JSDOM instance
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
const { window } = dom;
const { document } = window;

// Eval the script to have access to the functions
eval(script);

// Test suite
describe("Magic 8-Ball web app", () => {
  afterEach(() => {
    // Reset the document after each test
    dom.reconfigure({ url: "about:blank" });
    document.documentElement.innerHTML = html;
    eval(script);
  });

  test("has expected elements", () => {
    // Test if the HTML contains the expected elements
    expect(document.getElementById("eightBall")).toBeTruthy();
    expect(document.getElementById("user-input")).toBeTruthy();
    expect(document.getElementById("response")).toBeTruthy();
    expect(document.getElementById("clear-button")).toBeTruthy();
    expect(document.getElementById("results-body")).toBeTruthy();
  });

  test("getAnswer function returns a valid response", () => {
    // Test if getAnswer returns a response contained in the "responses" array
    const answer = getAnswer();
    expect(responses.includes(answer)).toBeTruthy();
  });

  test("updateResponseText updates the response element", () => {
    // Test if updateResponseText updates the innerText of the "response" element
    const responseElement = document.getElementById("response");
    updateResponseText();
    const responseText = responseElement.innerText;
    expect(responses.includes(responseText)).toBeTruthy();
  });

  test("appendResultRow adds a new row to the results table", () => {
    const resultsBody = document.getElementById("results-body");
    const initialRowCount = resultsBody.rows.length;
    const question = "Test question";
    const response = "Test response";
    appendResultRow(question, response);
    const currentRowCount = resultsBody.rows.length;
    expect(currentRowCount).toBe(initialRowCount + 1);

    const newRow = resultsBody.rows[0];
    expect(newRow.cells[0].innerText).toBe(question);
    expect(newRow.cells[1].innerText).toBe(response);
  });

  test("clearTable removes all rows from the results table", () => {
    // Add a row to the results table
    appendResultRow("Test question", "Test response");

    // Clear the results table
    clearTable();

    // Test if the results table is empty
    const resultsBody = document.getElementById("results-body");
    expect(resultsBody.rows.length).toBe(0);
  });
});
