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

// Fix remaining path issues
function fixRemainingPaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Files in components/Shared/ importing from other folders in components/
    // should use ../ not ../../Components/
    
    // Fix: ../../Components/Shared/ -> ../Shared/
    content = content.replace(/from\s+(['"])((?:\.\.\/){2,})Components\/Shared\//g, 'from $1../Shared/');
    
    // Fix: ../../Components/Components/ -> ../Components/
    content = content.replace(/from\s+(['"])((?:\.\.\/){2,})Components\/Components\//g, 'from $1../Components/');
    
    // Fix: ../../Components/hooks/ -> ../hooks/
    content = content.replace(/from\s+(['"])((?:\.\.\/){2,})Components\/hooks\//g, 'from $1../hooks/');
    
    // Fix: ../../Components/RequireAuth/ -> ../RequireAuth/
    content = content.replace(/from\s+(['"])((?:\.\.\/){2,})Components\/RequireAuth\//g, 'from $1../RequireAuth/');
    
    // Fix paths from pages to RequireAuth (should be components/RequireAuth not components/Components/RequireAuth)
    content = content.replace(/from\s+(['"])((?:\.\.\/)+)components\/Components\/RequireAuth\//g, 'from $1$2components/RequireAuth/');
    
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
console.log('Fixing remaining path issues...\n');

const projectRoot = __dirname;
const allFiles = getAllFiles(projectRoot);

let fixedCount = 0;
const fixedFiles = [];

allFiles.forEach(filePath => {
  if (fixRemainingPaths(filePath)) {
    fixedCount++;
    fixedFiles.push(path.relative(projectRoot, filePath));
  }
});

console.log(`\n✅ Fixed ${fixedCount} files:\n`);
fixedFiles.forEach(file => console.log(`   - ${file}`));

console.log('\n🎉 All remaining path issues resolved!');
console.log('\nFolder structure in components/:');
console.log('  components/Components/    (UI components)');
console.log('  components/Shared/        (shared utilities)');
console.log('  components/hooks/         (custom hooks)');
console.log('  components/RequireAuth/   (auth components)');
