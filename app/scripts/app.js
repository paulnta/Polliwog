console.log(baseurl);
// 4. Conditionally load the webcomponents polyfill if needed by the browser.
var webComponentsSupported = ('registerElement' in document
&& 'import' in document.createElement('link')
&& 'content' in document.createElement('template'));

if (!webComponentsSupported) {
    console.log("doesn't support webcomponnents !");
    var script = document.createElement('script');
    script.async = true;
    script.src = baseurl + 'scripts/vendor/webcomponents-lite.min.js';
    script.onload = finishLazyLoading;
    document.head.appendChild(script);
} else {
    finishLazyLoading();
}

function finishLazyLoading() {

    // Use native Shadow DOM if it's available in the browser.
    window.Polymer = window.Polymer || {dom: 'shadow'};

    // Fades the splash screen, then remove it.
    var onImportLoaded = function() {
        var loadEl = document.getElementById('splash');
        loadEl.addEventListener('transitionend', loadEl.remove);

        document.body.classList.remove('loading');

        // App is visible and ready to load some data!
    };

    var link = document.querySelector('#bundle');

    // 5. Go if the async Import loaded quickly. Otherwise wait for it.
    if (link.import && link.import.readyState === 'complete') {
        onImportLoaded();
    } else {
        link.addEventListener('load', onImportLoaded);
    }
}