import { build } from 'esbuild';
import { rm } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import pkg from './package.json' with { type: 'json' };
const limit = pkg.bundleSizeLimit;

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
	const yourImportCJS = await build({
		...common,
		entryPoints: ['src/your-import.ts'],
		format: 'cjs',
		outfile: 'dist/your-import.cjs',
	});

	await writeFile('dist/your-import-meta-esm.json', JSON.stringify(yourImportMJS.metafile));
	await writeFile('dist/your-import-meta-cjs.json', JSON.stringify(yourImportCJS.metafile));
*/

const externalImportsPlugin = (format) => ({
	name: 'external-imports',
	setup(build) {
		build.onResolve({ filter: /.*/ }, (args) => {
			// if (args.importer && args.path.includes('/your-import')) {
			// 	return {
			// 		path: format === 'esm' ? './your-import.mjs' : './your-import.cjs',
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
const resultCJS = await build({
	...common,
	entryPoints: ['src/index.ts'],
	format: 'cjs',
	outfile: 'dist/index.cjs',
	plugins: [externalImportsPlugin('cjs')],
});

await writeFile('dist/meta-esm.json', JSON.stringify(resultMJS.metafile));
await writeFile('dist/meta-cjs.json', JSON.stringify(resultCJS.metafile));

function getDirSize(dir) {
	return readdirSync(dir).reduce((sum, f) => {
		const full = `${dir}/${f}`;
		if (statSync(full).isDirectory()) return sum + getDirSize(full);
		if (f.endsWith('.map') || f.endsWith('.json')) return sum;
		return sum + statSync(full).size;
	}, 0);
}

const totalSize = getDirSize('dist');

if (totalSize > limit) {
	console.log('\x1b[33m%s\x1b[0m', `Bundle too large: ${totalSize} > ${limit}`);
	process.exit(1);
} else {
	console.log('\x1b[32m%s\x1b[0m', `Bundle size: ${totalSize} < ${limit}`);
}
