const fs = require('fs');
const path = require('path');

function fixSwiperImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix: import { Pagination, Autoplay } from "swiper";
    // To:  import { Pagination, Autoplay } from "swiper/modules";
    if (content.includes('from "swiper"') || content.includes("from 'swiper'")) {
      content = content.replace(
        /from ["']swiper["'];/g,
        'from "swiper/modules";'
      );
      modified = true;
    }

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
      if (fixSwiperImports(filePath)) {
        fixed++;
      }
    }
  });

  return fixed;
}

console.log('🔧 Fixing Swiper imports...\n');

const componentsFixed = walkDirectory(path.join(__dirname, 'components'));
const pagesFixed = walkDirectory(path.join(__dirname, 'pages'));

console.log(`\n✨ Done! Fixed ${componentsFixed + pagesFixed} files total`);
console.log(`   - Components: ${componentsFixed} files`);
console.log(`   - Pages: ${pagesFixed} files`);
