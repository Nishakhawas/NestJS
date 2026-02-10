import { useEffect, useRef } from "react";
import "./trumbowyg-custom.css";

export default function TrumbowygSimple({ value, onChange, options = {} }) {
    const editorRef = useRef(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!editorRef.current || isInitialized.current) return;

        const initializeEditor = async () => {
            try {
                // Step 1: Import and setup jQuery
                const jQueryModule = await import('jquery');
                const $ = jQueryModule.default;

                // Ensure jQuery prototype exists
                if (!$.fn) {
                    $.fn = $.prototype;
                }

                // Set global jQuery BEFORE importing Trumbowyg
                window.$ = window.jQuery = $;

                console.log('jQuery loaded:', typeof $ !== 'undefined');
                console.log('jQuery.fn exists:', typeof $.fn !== 'undefined');

                // Step 2: Import Trumbowyg after jQuery is ready
                await import('trumbowyg');
                await import('trumbowyg/dist/ui/trumbowyg.min.css');

                console.log('Trumbowyg loaded:', typeof $.fn.trumbowyg !== 'undefined');

                // Step 3: Wait a bit more to ensure everything is ready
                await new Promise(resolve => setTimeout(resolve, 100));

                // Step 4: Initialize Trumbowyg
                if (editorRef.current && $.fn.trumbowyg) {
                    const $el = $(editorRef.current);

                    $el.trumbowyg({
                        svgPath: window.location.origin + '/icons.svg',
                        btns: [
                            ['viewHTML'],
                            ['undo', 'redo'], // History group
                            ['formatting'],
                            // ['p', 'h1', 'h2', 'h3'], // Individual heading buttons with icons
                            ['strong', 'em', 'del'], // Basic formatting
                            ['superscript', 'subscript'],
                            ['link'],
                            ['insertImage'],
                            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'], // Alignment
                            ['unorderedList', 'orderedList'],
                            ['horizontalRule'],
                            ['removeformat'],
                            ['fullscreen']
                        ],
                        autogrow: true,
                        removeformatPasted: true,
                        ...options
                    });

                    // Debug: Check if SVG icons are loaded
                    setTimeout(() => {
                        const hasIcons = $el.closest('.trumbowyg-box').find('svg').length > 0;
                        console.log('SVG icons loaded:', hasIcons);
                        if (!hasIcons) {
                            console.warn('SVG icons not loaded. Check if /icons.svg is accessible.');
                        }
                    }, 500);

                    // Listen for changes
                    $el.on("tbwchange", () => {
                        if (onChange) {
                            onChange($el.trumbowyg("html"));
                        }
                    });

                    // Set initial value
                    if (value) {
                        $el.trumbowyg("html", value);
                    }

                    isInitialized.current = true;
                    console.log('✅ Trumbowyg initialized successfully!');
                } else {
                    console.error('❌ Failed to initialize Trumbowyg');
                }

            } catch (error) {
                console.error('❌ Error initializing Trumbowyg:', error);
            }
        };

        initializeEditor();

        return () => {
            if (isInitialized.current && editorRef.current && window.$ && window.$.fn && window.$.fn.trumbowyg) {
                try {
                    window.$(editorRef.current).trumbowyg("destroy");
                    isInitialized.current = false;
                } catch (e) {
                    console.warn("Trumbowyg destroy error:", e);
                }
            }
        };
    }, []);

    // Handle value changes from parent
    useEffect(() => {
        if (isInitialized.current && editorRef.current && window.$ && window.$.fn && window.$.fn.trumbowyg) {
            const currentHtml = window.$(editorRef.current).trumbowyg("html");
            if (value !== currentHtml) {
                window.$(editorRef.current).trumbowyg("html", value || "");
            }
        }
    }, [value]);

    return (
        <div>
            <textarea ref={editorRef} defaultValue={value}></textarea>
        </div>
    );
}
