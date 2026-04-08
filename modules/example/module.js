// Smoke test for the frontend module wiring.
//
// `import.meta.glob('../modules/*/module.js', { eager: true })` in src/app.js
// pulls this file into the bundle. The console.log below is the cheapest
// possible "the module loaded" signal — open devtools and look for it.
//
// Real modules would do things here like:
//   - register Handlebars helpers
//   - attach App.<modulename> = { ... }
//   - subscribe to lifecycle hooks (App.hooks.onAfterSwap)
//   - import HTMX extensions specific to the module
console.log('[example module] loaded');
