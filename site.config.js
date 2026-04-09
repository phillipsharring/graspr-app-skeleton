/**
 * Site-wide configuration.
 * These values are injected into layouts via [[propName]] placeholders.
 *
 * `modules` is the list of frontend modules to enable. Each entry is the
 * directory name under `modules/`. See `scripts/modules.mjs` for the
 * convention. Order doesn't affect routing — graspr-build merges all roots
 * and errors loudly on cross-root route conflicts.
 */
export default {
    siteUrl: '/',
    siteName: 'My App',
    copyright: '© My App. All Rights Reserved',
    modules: ['examples'],
};
