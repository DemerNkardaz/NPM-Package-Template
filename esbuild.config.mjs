import { build } from 'esbuild';
import { rm } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

await rm('dist', {
	recursive: true,
	force: true,
});

const common = {
	bundle: true,
	treeShaking: true,
	sourcemap: true,
	metafile: true,
	platform: 'neutral',
	target: 'es2022',
	tsconfig: 'tsconfig.build.json',
};

/*
 * You additional imports for index here, example:
	const yourImportMJS = await build({
		...common,
		entryPoints: ['src/your-import.ts'],
		format: 'esm',
		outfile: 'dist/your-import.mjs',
	});

	await writeFile('dist/your-import-meta-esm.json', JSON.stringify(yourImportMJS.metafile));
*/

const externalImportsPlugin = (format) => ({
	name: 'external-imports',
	setup(build) {
		build.onResolve({ filter: /.*/ }, (args) => {
			// if (args.importer && args.path.includes('/your-import')) {
			// 	return {
			// 		path: './your-import.mjs',
			// 		external: true,
			// 	};
			// }
		});
	},
});

const resultMJS = await build({
	...common,
	entryPoints: ['src/index.ts'],
	format: 'esm',
	outfile: 'dist/index.mjs',
	plugins: [externalImportsPlugin('esm')],
});

await writeFile('dist/meta-esm.json', JSON.stringify(resultMJS.metafile));

function getDirSize(dir) {
	return readdirSync(dir).reduce((sum, f) => {
		const full = `${dir}/${f}`;
		if (statSync(full).isDirectory()) return sum + getDirSize(full);
		if (f.endsWith('.map') || f.endsWith('.json')) return sum;
		return sum + statSync(full).size;
	}, 0);
}

function sizeToKB(size) {
	return size / 1024;
}

import pkg from './package.json' with { type: 'json' };
const totalSize = sizeToKB(getDirSize('dist'));
const limit = sizeToKB(pkg.bundleSizeLimit ?? 102400);

if (totalSize > limit) {
	console.log('\x1b[33m%s\x1b[0m', `Bundle too large: ${totalSize}KB > ${limit}KB`);
	process.exit(1);
} else {
	console.log('\x1b[32m%s\x1b[0m', `Bundle size: ${totalSize}KB < ${limit}KB`);
}
