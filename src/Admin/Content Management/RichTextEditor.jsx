// // import 'bootstrap/dist/css/bootstrap.min.css';
// import 'summernote/dist/summernote-bs4.css';
// import 'summernote/dist/summernote-bs4.js';
// import $ from 'jquery';
// // import 'bootstrap';
// import 'popper.js';
// import { useEffect } from 'react';

// export default function RichTextEditor() {
//     useEffect(() => {
//         $('#summernote').summernote({
//             placeholder: 'Enter Content Here',
//             tabsize: 2,
//             height: 200,
//         });
//     }, []);
//     return (
//         <div className="App p-4">
//             <label className="block font-medium text-gray-700 mb-1">
//                 Banner Contents<span className="text-red-500">*</span>:
//             </label>
//             <div>
//                 <textarea id="summernote" />
//             </div>
//         </div>
//     )
// }


// import 'summernote/dist/summernote-bs4.css';
// import 'summernote/dist/summernote-bs4.js';
// import $ from 'jquery';
// import 'bootstrap';
// import 'popper.js';
// import { useEffect } from 'react';

// export default function RichTextEditor() {
//     useEffect(() => {
//         // Inject Bootstrap CSS into the head just once
//         const existingLink = document.getElementById('bootstrap-summernote-css');
//         if (!existingLink) {
//             const link = document.createElement('link');
//             link.id = 'bootstrap-summernote-css';
//             link.rel = 'stylesheet';
//             link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css';
//             document.head.appendChild(link);
//         }

//         $('#summernote').summernote({
//             placeholder: 'Enter Content Here',
//             tabsize: 2,
//             height: 200,
//         });
//     }, []);

//     return (
//         <div className="App p-4">
//             <label className="block font-medium text-gray-700 mb-1">
//                 Banner Contents<span className="text-red-500">*</span>:
//             </label>
//             <div>
//                 <textarea id="summernote" />
//             </div>
//         </div>
//     );
// }


// import { useEffect } from 'react';
// import $ from 'jquery';
// import 'summernote/dist/summernote-bs4.js';
// import 'summernote/dist/summernote-bs4.css';
// import 'bootstrap'; // but load CSS dynamically as discussed
// import 'popper.js';

// export default function RichTextEditor({ register, setValue, errors }) {
//   useEffect(() => {
//     // Inject Bootstrap CSS dynamically
//     const existingLink = document.getElementById('bootstrap-summernote-css');
//     if (!existingLink) {
//       const link = document.createElement('link');
//       link.id = 'bootstrap-summernote-css';
//       link.rel = 'stylesheet';
//       link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css';
//       document.head.appendChild(link);
//     }

//     // Register manually if not auto-registered
//     register('bannerContents', {
//       required: 'Banner Content is Required',
//     });

//     $('#summernote').summernote({
//       placeholder: 'Enter Content Here',
//       tabsize: 2,
//       height: 200,
//       callbacks: {
//         onChange: function (contents) {
//           setValue('bannerContents', contents); // Sync with RHF
//         },
//       },
//     });
//   }, [register, setValue]);

//   return (
//     <div className="App p-4">
//       <label className="block font-medium text-gray-700 mb-1">
//         Banner Contents<span className="text-red-500">*</span>:
//       </label>
//       <textarea id="summernote" />

//       {errors?.bannerContents && (
//         <p className="text-red-500 text-sm mt-1">
//           {errors.bannerContents.message}
//         </p>
//       )}
//     </div>
//   );
// }


import { useEffect } from 'react';
import $ from 'jquery';
import 'summernote/dist/summernote-bs4.js';
import 'summernote/dist/summernote-bs4.css';

export default function RichTextEditor({ register, setValue, errors }) {
    useEffect(() => {
        // Inject Bootstrap CSS from CDN if not already loaded
        if (!document.getElementById('bootstrap-cdn')) {
            const link = document.createElement('link');
            link.id = 'bootstrap-cdn';
            link.rel = 'stylesheet';
            link.href =
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css';
            document.head.appendChild(link);
        }

        // Inject Popper and Bootstrap JS from CDN if needed
        const injectScript = (id, src) => {
            if (!document.getElementById(id)) {
                const script = document.createElement('script');
                script.id = id;
                script.src = src;
                script.async = false;
                document.body.appendChild(script);
            }
        };

        injectScript(
            'popper-cdn',
            'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'
        );
        injectScript(
            'bootstrap-js-cdn',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js'
        );

        // Register the field manually with RHF
        register('bannerContents', {
            required: 'Banner Content is Required',
        });

        // Initialize Summernote
        setTimeout(() => {
            $('#summernote').summernote({
                placeholder: 'Enter content here...',
                tabsize: 2,
                height: 200,
                callbacks: {
                    onChange: function (contents) {
                        setValue('bannerContents', contents);
                    },
                },
            });
        }, 500); // Wait a bit for scripts to load
    }, [register, setValue]);

    return (
        <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
                Banner Contents<span className="text-red-500">*</span>
            </label>
            {/* <textarea id="summernote" /> */}
            {errors?.bannerContents && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.bannerContents.message}
                </p>
            )}
        </div>
    );
}
