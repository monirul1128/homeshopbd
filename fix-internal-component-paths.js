const fs = require('fs');
const path = require('path');

// Function to recursively get all JS/JSX files in components folder
function getAllComponentFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllComponentFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Fix imports in files inside components/ directory
function fixInternalPaths(filePath) {
  try {
    // Only fix files inside components/ directory
    if (!filePath.includes(path.sep + 'components' + path.sep)) {
      return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Files inside components/ folder should NOT have /components/ in their imports
    // when importing from Shared, Components, or hooks
    
    // Fix: from '../../components/Shared/ -> from '../../Shared/
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)components\/Shared\//g, 'from $1$2Shared/');
    
    // Fix: from '../../components/Components/ -> from '../../Components/
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)components\/Components\//g, 'from $1$2Components/');
    
    // Fix: from '../../components/hooks/ -> from '../../hooks/
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)components\/hooks\//g, 'from $1$2hooks/');
    
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
console.log('Fixing internal component paths...\n');
console.log('Rule: Files inside components/ should use relative paths without /components/ prefix\n');

const componentsRoot = path.join(__dirname, 'components');
const allFiles = getAllComponentFiles(componentsRoot);

let fixedCount = 0;
const fixedFiles = [];

allFiles.forEach(filePath => {
  if (fixInternalPaths(filePath)) {
    fixedCount++;
    fixedFiles.push(path.relative(__dirname, filePath));
  }
});

console.log(`\n✅ Fixed ${fixedCount} files:\n`);
fixedFiles.slice(0, 30).forEach(file => console.log(`   - ${file}`));
if (fixedFiles.length > 30) {
  console.log(`   ... and ${fixedFiles.length - 30} more`);
}

console.log('\n🎉 Internal component paths corrected!');
console.log('\nExample:');
console.log('  Before: from \'../../../../components/Shared/CustomModal\'');
console.log('  After:  from \'../../../../Shared/CustomModal\'');
