const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // URL Replacement
      const doubleQuoteRegex = /"http:\/\/localhost:5000([^"]*)"/g;
      if (doubleQuoteRegex.test(content)) {
        content = content.replace(doubleQuoteRegex, '`${import.meta.env.VITE_API_URL}$1`');
        changed = true;
      }
      const singleQuoteRegex = /'http:\/\/localhost:5000([^']*)'/g;
      if (singleQuoteRegex.test(content)) {
        content = content.replace(singleQuoteRegex, '`${import.meta.env.VITE_API_URL}$1`');
        changed = true;
      }
      const backtickRegex = /`http:\/\/localhost:5000([^`]*)`/g;
      if (backtickRegex.test(content)) {
        content = content.replace(backtickRegex, '`${import.meta.env.VITE_API_URL}$1`');
        changed = true;
      }

      // localStorage Token Null-Safety
      if (content.match(/localStorage\.getItem\("token"\)/)) {
        content = content.replace(/localStorage\.getItem\("token"\)(?!\s*\|\|)/g, 'localStorage.getItem("token") || ""');
        changed = true;
      }
      if (content.match(/localStorage\.getItem\("role"\)/)) {
          content = content.replace(/localStorage\.getItem\("role"\)(?!\s*\|\|)/g, 'localStorage.getItem("role") || ""');
          changed = true;
      }
      
      // Import Replacement
      if (content.includes('./Compoent/')) {
        content = content.replace(/\.\/Compoent\//g, './Component/');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Modified:', fullPath);
      }
    }
  }
}

replaceInDir('k:/WORKTOOL/LMS/Frontend/LMS/src');
console.log('Done');
