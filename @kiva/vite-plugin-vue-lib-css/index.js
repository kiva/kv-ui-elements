import { writeFileSync } from 'node:fs';
import {
	basename,
	dirname,
	relative,
	resolve,
} from 'node:path';

let viteConfig;

export default function vueLibCss() {
	return {
		name: 'lib-css',
		apply: 'build',
		enforce: 'post',

		// Get Vite config when it's resolved to use later
		configResolved(config) {
			viteConfig = config;
		},

		// Write css import statements to files with imported css after bundle is created
		writeBundle(option, bundle) {
			// Only run for es format in library mode
			if (!viteConfig.build?.lib || option.format !== 'es') {
				return;
			}

			const { root } = viteConfig;
			const { outDir } = viteConfig.build;
			const cssReplaceRegex = /\/\* empty css \s*\*\//;
			const files = Object.keys(bundle);

			// Find files with imported css
			const filesWithImportedCss = files.filter((file) => bundle[file].viteMetadata?.importedCss?.size > 0);

			// Replace empty css comment with css import statement in each file
			filesWithImportedCss.forEach((file) => {
				if (bundle[file].viteMetadata.importedCss.size > 1) {
					console.warn(`Multiple css file imports not supported yet, skipping ${file}`);
					return;
				}

				// Get css import path relative to current file
				const [cssPath] = bundle[file].viteMetadata.importedCss;
				const cssImportPath = relative(dirname(file), cssPath);

				// Add prefix for current directory to css import path if necessary
				const prefix = cssImportPath === basename(cssPath) ? './' : '';

				// Replace empty css comment with css import statement
				const fileContent = bundle[file].code.replace(cssReplaceRegex, `import "${prefix}${cssImportPath}";`);

				// Write updated file content
				writeFileSync(resolve(root, outDir, file), fileContent);
			});
		},
	};
}
