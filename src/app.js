import htmx from '@phillipsharring/graspr-framework/src/lib/htmx.js';
import Handlebars from 'handlebars';
import './styles/style.css';
import {
    registerHandlebarsHelpers,
    initCopyIdHandler,
    registerToastHelpers,
    initToastEventHandlers,
    initPagination,
    initTableSort,
    onPageLoad,
    onAfterSwap,
    registerAdminPermissionPrefixes,
    registerAbHelpers,
} from '@phillipsharring/graspr-framework';

// Boosted navigation defaults to scrolling the swapped content into view.
// That can feel like a "jump" when moving between short/long pages (or using back/forward).
htmx.config.scrollIntoViewOnBoost = false;

window.Handlebars = Handlebars;

// Register Handlebars helpers
registerToastHelpers(Handlebars);
registerHandlebarsHelpers(Handlebars);
registerAbHelpers(Handlebars);

// Import HTMX extensions AFTER globals are set
import '@phillipsharring/graspr-framework/src/lib/json-enc.js';
import '@phillipsharring/graspr-framework/src/lib/client-side-templates.js';

// Core infrastructure (self-registering — registers CSRF, boosted-nav, auth-state, forms, search, sortable, hooks)
import '@phillipsharring/graspr-framework/init';

// Admin permission prefixes — must be registered before DOMContentLoaded fires.
// More specific prefixes first; the framework's checkAdminPermissions() matches
// the first prefix that starts with the current pathname.
registerAdminPermissionPrefixes([
    ['/admin/', 'admin.access'],
]);

// A/B testing (self-registering — fetches assignments via lifecycle hooks)
import './ab.js';

// Assemble window namespace (must be after all module imports)
import './namespace.js';
// Copy-to-clipboard button handler
initCopyIdHandler();

// App-level lifecycle hooks
onPageLoad(function(doc) {
    initPagination(doc);
    initTableSort(doc);
    initToastEventHandlers();
});

onAfterSwap(function(target) {
    initPagination(target);
    initTableSort(target);
});
