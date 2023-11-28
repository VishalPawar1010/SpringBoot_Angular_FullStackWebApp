const fs = require('fs');
const path = require('path');
const { Script } = require('vm');

const rootDirectory = './backend-tests/';

// Define a map to store the cumulative counts of function calls
const cumulativeFunctionCallCounts = new Map();

function analyzeDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error checking file stats: ${err}`);
          return;
        }

        if (stats.isDirectory()) {
          // If it's a directory, recursively analyze it
          analyzeDirectory(filePath);
        } else if (stats.isFile() && file.endsWith('.js')) {
          // If it's a JavaScript file, analyze it
          console.log(`Analyzing file: ${filePath}`);
          analyzeFile(filePath);
        }
      });
    });
  });
}

function analyzeFile(filePath) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Create a map to store function call counts for this specific file
    const functionCallCounts = new Map();

    const functionCallPattern = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*{[^}]*}/g;

    while ((match = functionCallPattern.exec(data)) !== null) {
      const functionName = match[1];
      if (functionCallCounts.has(functionName)) {
        functionCallCounts.set(functionName, functionCallCounts.get(functionName) + 1);
      } else {
        functionCallCounts.set(functionName, 1);
      }

      // Update the cumulative count
      if (cumulativeFunctionCallCounts.has(functionName)) {
        cumulativeFunctionCallCounts.set(
          functionName,
          cumulativeFunctionCallCounts.get(functionName) + 1
        );
      } else {
        cumulativeFunctionCallCounts.set(functionName, 1);
      }
    }
  });
}

// Start the analysis with the root directory
analyzeDirectory(rootDirectory);

// After analyzing all files, log the cumulative counts
let index = 1;
setTimeout(() => {
  for (const [functionName, callCount] of cumulativeFunctionCallCounts) {
    if (callCount > 3) {
      console.log(`${index++} : ${functionName}: ${callCount}`);
    }
  }
}, 1000); // Add a timeout to ensure all files are processed before logging

