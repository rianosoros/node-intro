const fs = require('fs');

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

// Get the path argument from the command line
const pathArgument = process.argv[2];

// Call the cat function with the specified path
cat(pathArgument);
