// ==UserScript==
// @name         Instagram Video Controls
// @namespace    instagram_video
// @version      0.2.3
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
            
            // Check for the play button to be removed, i.e. the video is being played
            if (mutation.removedNodes) {
                mutation.removedNodes.forEach(removedNode => {
                    if (removedNode.classList.contains('_8jZFn')) {
                        
                        // The <video/> element should be before the removed button
                        var video = mutation.previousSibling;                      
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
                            
                        }
                        
                    }
                });
            }
            
        });
    }).observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
})();
