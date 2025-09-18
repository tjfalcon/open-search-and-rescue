// scripts/set-build-time.js
const fs = require('fs');
const path = require('path');
const buildTime = new Date().toISOString();
const envPath = path.join(__dirname, '../.env.local');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(/^NEXT_PUBLIC_BUILD_TIME=.*/m, '');
}
envContent += `\nNEXT_PUBLIC_BUILD_TIME=${buildTime}\n`;
fs.writeFileSync(envPath, envContent.trim() + '\n');
console.log('Set NEXT_PUBLIC_BUILD_TIME to', buildTime);
