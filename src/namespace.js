// ---------------------------
// window.App namespace
// ---------------------------
// Consolidates all public globals under a single namespace.
// Inline page scripts use App.* instead of individual global references.
// Rename 'App' to whatever suits your project.

import {
    getRouteParams,
    populateSelect,
    escapeHtml,
    apiFetch,
    GrasprToast,
    openGlobalModal,
    closeGlobalModal,
    isGlobalModalOpen,
    GrasprConfirm,
    openFormModal,
    createBurst,
    attachClickBurst,
    initClickBurst,
    createTypeahead,
} from '@phillipsharring/graspr-framework';

window.App = {
    // API client
    api: { fetch: apiFetch },

    // Shared utilities
    getRouteParams,
    populateSelect,
    escapeHtml,

    // UI widgets
    ui: {
        toast: GrasprToast,
        modal: {
            open: openGlobalModal,
            close: closeGlobalModal,
            isOpen: isGlobalModalOpen,
        },
        confirm: GrasprConfirm,
        openFormModal,
        clickBurst: {
            create: createBurst,
            attach: attachClickBurst,
            init: initClickBurst,
        },
        createTypeahead,
    },
};
