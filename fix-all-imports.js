const fs = require('fs');
const path = require('path');

function fixAllImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix all ../src/ paths to ../components/
    const patterns = [
      { from: /from ["']\.\.\/src\//g, to: 'from "../components/' },
      { from: /from ["']\.\.\/\.\.\/src\//g, to: 'from "../../components/' },
      { from: /from ["']\.\.\/\.\.\/\.\.\/src\//g, to: 'from "../../../components/' },
    ];

    patterns.forEach(({ from, to }) => {
      if (content.match(from)) {
        content = content.replace(from, to);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir, depth = 0) {
  let fixed = 0;
  
  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      
      try {
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && depth < 10) {
          fixed += walkDirectory(filePath, depth + 1);
        } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
          if (fixAllImports(filePath)) {
            fixed++;
          }
        }
      } catch (err) {
        // Skip files that can't be accessed
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }

  return fixed;
}

console.log('🔧 Fixing all import paths from ../src/ to ../components/...\n');

const pagesFixed = walkDirectory(path.join(__dirname, 'pages'));
const componentsFixed = walkDirectory(path.join(__dirname, 'components'));

console.log(`\n✨ Done! Fixed ${pagesFixed + componentsFixed} files total`);
console.log(`   - Pages: ${pagesFixed} files`);
console.log(`   - Components: ${componentsFixed} files`);
console.log('\n🎉 All import paths updated! Server should auto-reload.');
