const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Change opacities: bg-color/10, /15, /20, /25 -> bg-color/5
  content = content.replace(/bg-(skyblue|softpink|lavender|mint|purple-500)\/(10|15|20|25)/g, 'bg-$1/5');
  
  // Change positions to move farther away
  content = content.replace(/right-\[-10%\]/g, 'right-[-25%]');
  content = content.replace(/right-\[-5%\]/g, 'right-[-25%]');
  content = content.replace(/left-\[-10%\]/g, 'left-[-25%]');
  content = content.replace(/left-\[-15%\]/g, 'left-[-25%]');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Blobs updated successfully!');
