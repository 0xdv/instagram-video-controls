// ==UserScript==
// @name         Instagram Video Controls
// @namespace    instagram_video
// @version      0.2
// @description  Adds standart video controls for video in Instagram
// @homepageURL  https://github.com/0xC0FFEEC0DE/instagram-video-controls
// @supportURL   https://github.com/0xC0FFEEC0DE/instagram-video-controls/issues
// @downloadURL  https://raw.githubusercontent.com/0xC0FFEEC0DE/instagram-video-controls/master/instagram-video-controls.user.js
// @updateURL    https://raw.githubusercontent.com/0xC0FFEEC0DE/instagram-video-controls/master/instagram-video-controls.user.js
// @author       0xC0FFEEC0DE
// @match        https://*.instagram.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let videoObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let video = mutation.target;
            //console.log(video);
            if(!video.controls) {
                video.controls = 'controls';
                let article = video.closest('article');
                article.querySelectorAll('._7thjo, ._j12ff').forEach(trash => {
                    trash.parentNode.removeChild(trash);
                });

                video.volume = localStorage.getItem('video_volume') || 1;
                video.onvolumechange = (event) => {
                    localStorage.setItem('video_volume', event.target.volume);
                };
            }
        });
    }).observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['loop']
    });
})();