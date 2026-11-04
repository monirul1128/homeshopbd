const fs = require('fs');
const path = require('path');

function fixSwiperImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip node_modules, .git, .next
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') {
      continue;
    }
    
    if (entry.isDirectory()) {
      fixSwiperImports(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Fix: import { Pagination, Autoplay } from "swiper/modules";
      // To:  import { Pagination, Autoplay } from "swiper/modules";
      if (content.match(/from\s+['"]swiper['"];/)) {
        const oldContent = content;
        // Match imports like: import { X, Y, Z } from "swiper/modules";
        content = content.replace(
          /import\s*\{([^}]+)\}\s*from\s*['"]swiper['"];/g,
          'import {$1} from "swiper/modules";'
        );
        
        if (content !== oldContent) {
          modified = true;
          console.log(`✓ Fixed: ${fullPath}`);
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

console.log('Scanning and fixing Swiper imports...\n');
fixSwiperImports('./');
console.log('\n✓ Done! All Swiper imports have been checked and fixed.');
