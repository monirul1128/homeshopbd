const fs = require('fs');
const path = require('path');

// Function to recursively get all JS/JSX files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      if (!['node_modules', '.next', '.git', 'out', 'build'].includes(file)) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Fix mismatched quotes in imports
function fixQuotesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix patterns like: from '../path/to/file'  (should be ')
    // Match single quote start with double quote end
    content = content.replace(/from\s+'([^'"]+)"/g, "from '$1'");
    
    // Fix patterns like: from "../path/to/file"  (should be ")
    // Match double quote start with single quote end
    content = content.replace(/from\s+"([^'"]+)'/g, 'from "$1"');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('Fixing mismatched quotes in import statements...\n');

const projectRoot = __dirname;
const allFiles = getAllFiles(projectRoot);

let fixedCount = 0;
const fixedFiles = [];

allFiles.forEach(filePath => {
  if (fixQuotesInFile(filePath)) {
    fixedCount++;
    fixedFiles.push(path.relative(projectRoot, filePath));
  }
});

console.log(`\n✅ Fixed ${fixedCount} files with quote mismatches:\n`);
fixedFiles.forEach(file => console.log(`   - ${file}`));

console.log('\n🎉 All quote syntax errors fixed!');
