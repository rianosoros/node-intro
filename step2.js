const fs = require('fs');
const axios = require('axios');
const process = require('process');

// Define the cat function
function cat(path) {
  try {
    // Read the file contents
    const content = fs.readFileSync(path, 'utf8');
    console.log(content);
  } catch (error) {
    // Handle file not found error
    console.error(`Error reading ${path}:\n  ${error.message}`);
    process.exit(1); // Halt the script execution with a non-zero exit code
  }
}

// Define the webCat function
async function webCat(url) {
  try {
    // Fetch the content of the URL
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    // Handle URL fetch error
    console.error(`Error fetching ${url}:\n  ${error.message}`);
    process.exit(1); // Halt the script execution with a non-zero exit code
  }
}

// Get the argument from the command line
const arg = process.argv[2];

// Determine whether the argument is a file path or a URL and call the appropriate function
if (arg.startsWith('http://') || arg.startsWith('https://')) {
  // If the argument is a URL, call webCat
  webCat(arg);
} else {
  // If the argument is a file path, call cat
  cat(arg);
}
