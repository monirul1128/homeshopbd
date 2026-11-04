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

// Fix all import paths
function fixPathsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // The actual folder structure is:
    // components/Components/ (for component files)
    // components/Shared/ (for shared files)
    // components/hooks/ (for hooks)
    
    // Fix: from '../../../components/Components/ -> from '../../../components/Components/
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)Components\//g, 'from $1$2components/Components/');
    
    // Fix: from '../../../components/Shared/ -> from '../../../components/Shared/
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)Shared\//g, 'from $1$2components/Shared/');
    
    // Fix: from '../../../components/hooks/ -> from '../../../components/hooks/
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)hooks\//g, 'from $1$2components/hooks/');
    
    // Fix standalone imports without trailing slash
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)Components(['"])/g, 'from $1$2components/Components$3');
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)Shared(['"])/g, 'from $1$2components/Shared$3');
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)hooks(['"])/g, 'from $1$2components/hooks$3');
    
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
console.log('Fixing all import paths to correct structure...\n');
console.log('Target structure:');
console.log('  - components/Components/ (for UI components)');
console.log('  - components/Shared/ (for shared utilities)');
console.log('  - components/hooks/ (for custom hooks)\n');

const projectRoot = __dirname;
const allFiles = getAllFiles(projectRoot);

let fixedCount = 0;
const fixedFiles = [];

allFiles.forEach(filePath => {
  if (fixPathsInFile(filePath)) {
    fixedCount++;
    fixedFiles.push(path.relative(projectRoot, filePath));
  }
});

console.log(`\n✅ Fixed ${fixedCount} files:\n`);
fixedFiles.slice(0, 30).forEach(file => console.log(`   - ${file}`));
if (fixedFiles.length > 30) {
  console.log(`   ... and ${fixedFiles.length - 30} more`);
}

console.log('\n🎉 All import paths corrected!');
