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
} from '@phillipsharring/graspr-framework';

// Boosted navigation defaults to scrolling the swapped content into view.
// That can feel like a "jump" when moving between short/long pages (or using back/forward).
htmx.config.scrollIntoViewOnBoost = false;

window.Handlebars = Handlebars;

// Register Handlebars helpers
registerToastHelpers(Handlebars);
registerHandlebarsHelpers(Handlebars);

// Import HTMX extensions AFTER globals are set
import '@phillipsharring/graspr-framework/src/lib/json-enc.js';
import '@phillipsharring/graspr-framework/src/lib/client-side-templates.js';

// Core infrastructure (self-registering — registers CSRF, boosted-nav, auth-state, forms, search, sortable)
import '@phillipsharring/graspr-framework/init';

// Assemble window namespace (must be after all module imports)
import './namespace.js';

// Copy-to-clipboard button handler
initCopyIdHandler();

document.addEventListener('DOMContentLoaded', () => {
    initPagination(document);
    initTableSort(document);
    initToastEventHandlers();
});

document.body.addEventListener('htmx:afterSwap', (e) => {
    const target = e.detail?.target;

    if (target && target.id === 'app') {
        initPagination(target);
        initTableSort(target);
    }
});
