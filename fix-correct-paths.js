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

// Fix imports in a file
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // The actual folder structure is:
    // components/Components/ (capital C)
    // components/Shared/ (capital S)  
    // components/hooks/ (lowercase h)
    
    // Fix lowercase back to proper case
    content = content.replace(/from\s+['"]((\.\.\/)+)components\//g, 'from \'$1Components/');
    content = content.replace(/from\s+['"]((\.\.\/)+)shared\//g, 'from \'$1Shared/');
    
    // These are already correct
    // from '../../../Components/hooks/' is correct
    
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
console.log('Fixing import paths to match actual folder structure...\n');

const projectRoot = __dirname;
const allFiles = getAllFiles(projectRoot);

let fixedCount = 0;
const fixedFiles = [];

allFiles.forEach(filePath => {
  if (fixImportsInFile(filePath)) {
    fixedCount++;
    fixedFiles.push(path.relative(projectRoot, filePath));
  }
});

console.log(`\n✅ Fixed ${fixedCount} files:\n`);
fixedFiles.slice(0, 20).forEach(file => console.log(`   - ${file}`));
if (fixedFiles.length > 20) {
  console.log(`   ... and ${fixedFiles.length - 20} more`);
}

console.log('\n🎉 Import paths now match actual folder structure!');
console.log('   components/Components/ (capital C)');
console.log('   components/Shared/ (capital S)');
console.log('   components/hooks/ (lowercase h)');
