#!/usr/bin/env node

/**
 * Checklist helper for creating a new package from template
 * Usage: node verify-template.js
 */

const fs = require('fs');
const path = require('path');

const files = [
	'package.json',
	'tsconfig.json',
	'tsconfig.build.json',
	'tsup.config.ts',
	'prettier.config.mjs',
	'.eslintrc.json',
	'vitest.config.ts',
	'.npmignore',
	'.npmrc',
	'.editorconfig',
	'.gitignore',
	'src/index.ts',
	'src/types.ts',
	'src/index.test.ts',
	'README.md',
	'SETUP.md',
	'TEMPLATE-README.md',
];

const scripts = ['setup-new-package.sh', 'setup-new-package.bat'];

console.log('\n📋 Template Verification\n');

let allGood = true;

console.log('Essential files:');
files.forEach((file) => {
	const exists = fs.existsSync(path.join(__dirname, file));
	const status = exists ? '✅' : '❌';
	console.log(`  ${status} ${file}`);
	if (!exists) allGood = false;
});

console.log('\nSetup scripts:');
scripts.forEach((script) => {
	const exists = fs.existsSync(path.join(__dirname, script));
	const status = exists ? '✅' : '❌';
	console.log(`  ${status} ${script}`);
});

console.log('\n');
if (allGood) {
	console.log('✨ Template is complete and ready to use!');
	console.log('\nUsage:');
	console.log('  Windows: .\\setup-new-package.bat "my-package"');
	console.log('  macOS/Linux: bash setup-new-package.sh "my-package"');
} else {
	console.log('⚠️  Some files are missing!');
	process.exit(1);
}
