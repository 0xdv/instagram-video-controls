// ==UserScript==
// @name         Instagram Video Controls
// @namespace    instagram_video
// @version      0.2.5
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
        mutations = Array.from(mutations);

        function videoClassCount(removedNodes) {
            return Array.from(removedNodes)
                .filter(node => node.classList && node.classList.contains('_8jZFn')).length;
        }

        // Check for the play button to be removed, i.e. the video is being played
        let videoMutations = mutations
            .filter(m => m.removedNodes && videoClassCount(m.removedNodes) > 0);

        if(videoMutations.length === 0) return;

        videoMutations.forEach(m => {
            // The <video/> element should be before the removed button
            var video = m.previousSibling;
            if (video && video.tagName && video.tagName.toLowerCase() == 'video') {
                if (!video.controls) {

                    // Add native video controls
                    video.controls = 'controls';

                    // Remove overlay
                    let article = video.closest('article');
                    article.querySelectorAll('.PyenC, .fXIG0').forEach(trash => {
                        trash.parentNode.removeChild(trash);
                    });
                    
                    // Keep volume value in localStorage
                    video.volume = localStorage.getItem('video_volume') || 1;
                    video.onvolumechange = (event) => {
                        localStorage.setItem('video_volume', event.target.volume);
                    };
                }

                if (!video.loop) {
                    video.loop = true;
                }
            }
        });
    }).observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
})();
