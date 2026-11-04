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
    
    // Fix capitalized imports to lowercase
    // ../../../Components/ -> ../../../components/
    content = content.replace(/from\s+['"]((\.\.\/)+)Components\//g, 'from \'$1components/');
    
    // ../../../Shared/ -> ../../../shared/
    content = content.replace(/from\s+['"]((\.\.\/)+)Shared\//g, 'from \'$1shared/');
    
    // ../../../Hooks/ -> ../../../hooks/
    content = content.replace(/from\s+['"]((\.\.\/)+)Hooks\//g, 'from \'$1hooks/');
    
    // Also fix standalone (without trailing slash)
    content = content.replace(/from\s+['"]((\.\.\/)+)Components['"]/g, 'from \'$1components\'');
    content = content.replace(/from\s+['"]((\.\.\/)+)Shared['"]/g, 'from \'$1shared\'');
    content = content.replace(/from\s+['"]((\.\.\/)+)Hooks['"]/g, 'from \'$1hooks\'');
    
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
console.log('Fixing case-sensitive import paths...\n');

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
fixedFiles.forEach(file => console.log(`   - ${file}`));

console.log('\n🎉 All imports now use correct lowercase folder names!');
