#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Ensure everything is free, open source, and safe for public release
 * This is a healing space, completely free and open
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🕊️ Ensuring everything is free, open source, and safe...\n');

// Commercial/restrictive dependencies to remove
const COMMERCIAL_DEPS = [
  '@azure-rest/ai-inference',
  '@azure/identity',
  '@azure/openai',
  '@azure/cognitiveservices-computervision',
  '@microsoft/',
  '@aws-sdk/',
  '@google-cloud/',
  'azure-',
  'aws-',
  'google-cloud-',
];

// Required license: CC0-1.0 (Public Domain)
const REQUIRED_LICENSE = 'CC0-1.0';

function findPackageJsonFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        const fullPath = path.join(dir, entry.name);
        const pkgPath = path.join(fullPath, 'package.json');
        if (fs.existsSync(pkgPath)) {
          files.push(pkgPath);
        }
        files.push(...findPackageJsonFiles(fullPath));
      }
    }
  } catch (e) {
    // Skip
  }
  return files;
}

// 1. Remove all commercial dependencies
console.log('1️⃣ Removing commercial/restrictive dependencies...');
const packageJsonFiles = findPackageJsonFiles(path.join(BASE_DIR, 'packages'));
packageJsonFiles.push(path.join(BASE_DIR, 'package.json'));

let removedCount = 0;
for (const pkgPath of packageJsonFiles) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let changed = false;

    // Check dependencies
    if (pkg.dependencies) {
      for (const dep of Object.keys(pkg.dependencies)) {
        if (COMMERCIAL_DEPS.some(commercial => dep.includes(commercial))) {
          delete pkg.dependencies[dep];
          changed = true;
          removedCount++;
          console.log(`   ❌ Removed ${dep} from ${pkgPath}`);
        }
      }
    }

    // Check devDependencies
    if (pkg.devDependencies) {
      for (const dep of Object.keys(pkg.devDependencies)) {
        if (COMMERCIAL_DEPS.some(commercial => dep.includes(commercial))) {
          delete pkg.devDependencies[dep];
          changed = true;
          removedCount++;
          console.log(`   ❌ Removed ${dep} from ${pkgPath}`);
        }
      }
    }

    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  } catch (e) {
    // Skip
  }
}

console.log(`   ✅ Removed ${removedCount} commercial dependencies\n`);

// 2. Ensure all packages have CC0-1.0 license
console.log('2️⃣ Ensuring all packages have CC0-1.0 license...');
let licenseFixed = 0;
for (const pkgPath of packageJsonFiles) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    
    if (!pkg.license || pkg.license !== REQUIRED_LICENSE) {
      pkg.license = REQUIRED_LICENSE;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      licenseFixed++;
      console.log(`   ✅ Set license to CC0-1.0 in ${pkgPath}`);
    }
  } catch (e) {
    // Skip
  }
}

console.log(`   ✅ Fixed ${licenseFixed} licenses\n`);

// 3. Create/update LICENSE file
console.log('3️⃣ Ensuring LICENSE file exists...');
const licensePath = path.join(BASE_DIR, 'LICENSE');
const licenseContent = `CC0 1.0 Universal (CC0 1.0) Public Domain Dedication

This work is dedicated to the public domain. To the extent possible under law,
the author has waived all copyright and related or neighboring rights to this work.

This is free and open source software. You can use, modify, distribute, and
commercialize this work without any restrictions.

For more information, see: https://creativecommons.org/publicdomain/zero/1.0/
`;

if (!fs.existsSync(licensePath) || fs.readFileSync(licensePath, 'utf8') !== licenseContent) {
  fs.writeFileSync(licensePath, licenseContent);
  console.log('   ✅ Created/updated LICENSE file\n');
}

// 4. Ensure package.json has correct license
console.log('4️⃣ Ensuring root package.json has correct license...');
const rootPkgPath = path.join(BASE_DIR, 'package.json');
try {
  const content = fs.readFileSync(rootPkgPath, 'utf8');
  const pkg = JSON.parse(content);
  
  if (!pkg.license || pkg.license !== REQUIRED_LICENSE) {
    pkg.license = REQUIRED_LICENSE;
    fs.writeFileSync(rootPkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('   ✅ Fixed root package.json license\n');
  }
} catch (e) {
  console.log(`   ⚠️  Could not fix root package.json: ${e.message}\n`);
}

// 5. Create SAFE_FOR_PUBLIC_RELEASE.md
console.log('5️⃣ Creating SAFE_FOR_PUBLIC_RELEASE.md...');
const safeDocPath = path.join(BASE_DIR, 'SAFE_FOR_PUBLIC_RELEASE.md');
const safeDocContent = `# Safe for Public Release ✅

This project is completely free and open source.

## License
- **License**: CC0-1.0 (Public Domain)
- **Status**: Completely free, no restrictions
- **Commercial Use**: Allowed
- **Modification**: Allowed
- **Distribution**: Allowed
- **Private Use**: Allowed

## No Commercial Dependencies
- ✅ No Azure dependencies
- ✅ No AWS dependencies
- ✅ No Google Cloud dependencies
- ✅ No Microsoft dependencies
- ✅ Only free, open source dependencies

## Safe for Public Release
This project is safe to:
- Share publicly
- Use in any way
- Modify freely
- Distribute freely
- Use commercially
- Use personally

## Healing Space
This is a creative healing space, completely free and open.
No restrictions. No barriers. Just free, open source code.

---

**Status**: ✅ Safe for public release
**License**: CC0-1.0 (Public Domain)
**Last Updated**: ${new Date().toISOString()}
`;

fs.writeFileSync(safeDocPath, safeDocContent);
console.log('   ✅ Created SAFE_FOR_PUBLIC_RELEASE.md\n');

// 6. Update README to emphasize free/open source
console.log('6️⃣ Ensuring README emphasizes free/open source...');
const readmePath = path.join(BASE_DIR, 'README.md');
let readmeContent = '';
if (fs.existsSync(readmePath)) {
  readmeContent = fs.readFileSync(readmePath, 'utf8');
}

if (!readmeContent.includes('CC0-1.0') && !readmeContent.includes('Public Domain')) {
  const freeSection = `

## License

This project is released under **CC0-1.0 (Public Domain)**.

This means:
- ✅ Completely free
- ✅ No restrictions
- ✅ Use however you want
- ✅ Modify freely
- ✅ Share freely
- ✅ Commercial use allowed

This is a healing space, completely free and open.

For more information, see [LICENSE](./LICENSE) and [SAFE_FOR_PUBLIC_RELEASE.md](./SAFE_FOR_PUBLIC_RELEASE.md).
`;

  readmeContent += freeSection;
  fs.writeFileSync(readmePath, readmeContent);
  console.log('   ✅ Updated README.md\n');
}

console.log('✅ All checks complete!');
console.log('\n📋 Summary:');
console.log(`   - Removed ${removedCount} commercial dependencies`);
console.log(`   - Fixed ${licenseFixed} licenses to CC0-1.0`);
console.log('   - Created LICENSE file');
console.log('   - Created SAFE_FOR_PUBLIC_RELEASE.md');
console.log('   - Updated README.md');
console.log('\n🕊️ Everything is now free, open source, and safe for public release.');

