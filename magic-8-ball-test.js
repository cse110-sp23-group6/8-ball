// Import the functions from the app
import { getAnswer } from './app';

// A test suite for the Magic 8-Ball app
describe('Magic 8-Ball', () => {
  // A test to check that the getAnswer function returns a response from the array
  test('getAnswer returns a response from the array', () => {
    // Get a random answer from the array
    const response = getAnswer();
    // Check that the response is not undefined or null
    expect(response).toBeDefined();
    expect(response).not.toBeNull();
    // Check that the response is a string
    expect(typeof response).toBe('string');
    // Check that the response is in the array
    expect(responses).toContain(response);
  });

  // A test to check that the clearButton clears the table
  test('clearButton clears the table', () => {
    // Create a mock HTML element for the results body
    const resultsBody = document.createElement('tbody');
    // Add some rows to the results body
    resultsBody.innerHTML = `
      <tr>
        <td>What is the meaning of life?</td>
        <td>It is certain.</td>
      </tr>
      <tr>
        <td>Will I get a promotion?</td>
        <td>Ask again later.</td>
      </tr>
    `;
    // Set the results body as the child of a mock HTML table element
    const table = document.createElement('table');
    table.appendChild(resultsBody);
    // Set the mock HTML table element as the child of the document body
    document.body.appendChild(table);

    // Simulate a click on the clearButton
    clearButton.click();

    // Check that the results body is empty
    expect(resultsBody.innerHTML).toBe('');
  });
});
