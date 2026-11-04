const fs = require('fs');
const path = require('path');

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace all ../src/ paths with ../components/
    const replacements = [
      { from: /from ["']\.\.\/src\/Components/g, to: 'from "../components/Components' },
      { from: /from ["']\.\.\/src\/Shared/g, to: 'from "../components/Shared' },
      { from: /from ["']\.\.\/src\/hooks/g, to: 'from "../components/hooks' },
      { from: /from ["']\.\.\/src\/assets/g, to: 'from "../components/assets' },
      { from: /from ["']\.\.\/src\/RequireAuth/g, to: 'from "../components/RequireAuth' },
    ];

    replacements.forEach(({ from, to }) => {
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

function walkDirectory(dir) {
  let fixed = 0;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      fixed += walkDirectory(filePath);
    } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
      if (fixImportsInFile(filePath)) {
        fixed++;
      }
    }
  });

  return fixed;
}

console.log('🔧 Fixing import paths...\n');

const pagesFixed = walkDirectory(path.join(__dirname, 'pages'));
const componentsFixed = walkDirectory(path.join(__dirname, 'components'));

console.log(`\n✨ Done! Fixed ${pagesFixed + componentsFixed} files total`);
console.log(`   - Pages: ${pagesFixed} files`);
console.log(`   - Components: ${componentsFixed} files`);
