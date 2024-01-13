const fs = require('fs').promises;
const axios = require('axios');
const process = require('process');

// Define the cat function
async function cat(path, outputFile) {
  try {
    // Read the file contents
    const content = await fs.readFile(path, 'utf8');
    if (outputFile) {
      await fs.writeFile(outputFile, content);
    } else {
      console.log(content);
    }
  } catch (error) {
    // Handle file not found or write error
    console.error(`Error ${outputFile ? 'writing to' : 'reading'} ${path}:\n  ${error.message}`);
    process.exit(1); // Halt the script execution with a non-zero exit code
  }
}

// Define the webCat function
async function webCat(url, outputFile) {
  try {
    // Fetch the content of the URL
    const response = await axios.get(url);
    if (outputFile) {
      await fs.writeFile(outputFile, response.data);
    } else {
      console.log(response.data);
    }
  } catch (error) {
    // Handle URL fetch or write error
    console.error(`Error ${outputFile ? 'writing to' : 'fetching'} ${url}:\n  ${error.message}`);
    process.exit(1); // Halt the script execution with a non-zero exit code
  }
}

// Get the command line arguments
const args = process.argv.slice(2);

// Check if --out option is provided
const outIndex = args.indexOf('--out');
if (outIndex !== -1 && outIndex + 1 < args.length) {
  // Extract output file name and remove --out and its argument from the list
  const outputFile = args[outIndex + 1];
  args.splice(outIndex, 2);

  // Determine whether the argument is a file path or a URL and call the appropriate function
  if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
    // If the argument is a URL, call webCat
    webCat(args[0], outputFile);
  } else {
    // If the argument is a file path, call cat
    cat(args[0], outputFile);
  }
} else {
  // If --out is not provided, handle the case without writing to a file
  if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
    // If the argument is a URL, call webCat
    webCat(args[0]);
  } else {
    // If the argument is a file path, call cat
    cat(args[0]);
  }
}
