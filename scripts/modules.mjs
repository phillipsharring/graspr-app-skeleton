import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Resolve a list of module names into the directories graspr-build should
 * scan. This is the single source of truth for "what is a frontend module"
 * in this app — both `vite.config.js` (dev server) and `scripts/build-pages.mjs`
 * (production bake) call this so they discover the same set of pages and
 * components.
 *
 * ## Convention
 *
 * A module is a directory at `<rootDir>/modules/<name>/` with the following
 * conventional layout (every part is optional):
 *
 *     modules/<name>/
 *       pages/         # added to pagesDirs if present
 *       components/    # added to componentsDirs if present
 *       module.js      # bundled automatically by src/app.js's import.meta.glob
 *
 * Modules namespace their own routes — there is no auto-prefixing. A blog
 * module exposing `/blog/` would put files at `modules/blog/pages/blog/index.html`,
 * not `modules/blog/pages/index.html`. The redundancy (`blog/blog`) is mild and
 * makes route ownership explicit.
 *
 * Module JS is NOT returned here. It's picked up by `import.meta.glob` in
 * `src/app.js`, which Vite resolves at build time. The helper only deals with
 * filesystem roots that graspr-build needs to know about.
 *
 * @param {string} rootDir - The app root (where the `modules/` directory lives).
 * @param {string[]} [moduleNames] - Names of enabled modules (directory names under `modules/`).
 * @returns {{ pagesDirs: string[], componentsDirs: string[] }}
 */
export function resolveModuleDirs(rootDir, moduleNames = []) {
    const pagesDirs = [];
    const componentsDirs = [];

    for (const name of moduleNames) {
        const moduleRoot = path.join(rootDir, 'modules', name);

        if (!existsSync(moduleRoot)) {
            throw new Error(
                `Module '${name}' is listed in site.config.modules but ${path.relative(rootDir, moduleRoot)} does not exist.`
            );
        }

        const pagesDir = path.join(moduleRoot, 'pages');
        if (existsSync(pagesDir)) pagesDirs.push(pagesDir);

        const componentsDir = path.join(moduleRoot, 'components');
        if (existsSync(componentsDir)) componentsDirs.push(componentsDir);
    }

    return { pagesDirs, componentsDirs };
}
