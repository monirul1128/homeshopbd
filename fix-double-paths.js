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

// Fix duplicate paths
function fixDoublePaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix: /components/Components/ -> /components/Components/
    content = content.replace(/\/components\/Components\/Components\//g, '/components/Components/');
    
    // Fix: /components/Shared/ -> /components/Shared/
    content = content.replace(/\/components\/Components\/Shared\//g, '/components/Shared/');
    
    // Fix: /components/hooks/ -> /components/hooks/
    content = content.replace(/\/components\/Components\/hooks\//g, '/components/hooks/');
    
    // Fix: /components/Shared/ -> /components/Shared/
    content = content.replace(/\/components\/Shared\/Shared\//g, '/components/Shared/');
    
    // Fix: /components/hooks/ -> /components/hooks/
    content = content.replace(/\/components\/hooks\/hooks\//g, '/components/hooks/');
    
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
console.log('Fixing duplicate path segments...\n');

const projectRoot = __dirname;
const allFiles = getAllFiles(projectRoot);

let fixedCount = 0;
const fixedFiles = [];

allFiles.forEach(filePath => {
  if (fixDoublePaths(filePath)) {
    fixedCount++;
    fixedFiles.push(path.relative(projectRoot, filePath));
  }
});

console.log(`\n✅ Fixed ${fixedCount} files with duplicate paths:\n`);
fixedFiles.forEach(file => console.log(`   - ${file}`));

console.log('\n🎉 All duplicate paths removed!');
console.log('\nExample fixes:');
console.log('  /components/Components/ → /components/Components/');
console.log('  /components/Shared/ → /components/Shared/');
console.log('  /components/hooks/ → /components/hooks/');
