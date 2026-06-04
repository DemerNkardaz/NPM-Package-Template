import { build } from 'esbuild';
import { rm } from 'node:fs/promises';

await rm('dist', {
	recursive: true,
	force: true,
});

const common = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	treeShaking: true,
	sourcemap: true,
	metafile: true,
	platform: 'neutral',
	target: 'es2022',
	tsconfig: 'tsconfig.build.json',
};

await Promise.all([
	build({
		...common,
		format: 'esm',
		outfile: 'dist/index.mjs',
	}),
	build({
		...common,
		format: 'cjs',
		outfile: 'dist/index.cjs',
	}),
]);
