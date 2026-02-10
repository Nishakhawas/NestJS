// setupTrumbowyg.js
import jQuery from "jquery";

// Ensure jQuery is available globally and properly initialized
if (typeof window !== 'undefined') {
    // Initialize jQuery properly
    window.$ = window.jQuery = jQuery;

    // Make sure jQuery.fn exists
    if (!jQuery.fn) {
        jQuery.fn = jQuery.prototype;
    }
}

// Use dynamic import to ensure jQuery is ready before Trumbowyg loads
let trumbowygPromise = null;

const loadTrumbowyg = async () => {
    if (!trumbowygPromise) {
        trumbowygPromise = Promise.all([
            import("trumbowyg"),
            import("trumbowyg/dist/ui/trumbowyg.min.css")
        ]);
    }
    return trumbowygPromise;
};

// Pre-load Trumbowyg
loadTrumbowyg();

export { loadTrumbowyg };
export default jQuery;