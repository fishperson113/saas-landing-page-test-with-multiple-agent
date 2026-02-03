/**
 * Zalo OA Integration Script
 * 
 * Documentation: https://developers.zalo.me/docs/social-api/official-account/follow-oa-widget
 */

// Configuration - USER MUST UPDATE THIS
const ZALO_CONFIG = {
    // REPLACE THIS WITH YOUR REAL OA ID
    oaId: 'YOUR_OA_ID_HERE', 
    
    // Optional: Zalo App ID if using full API
    appId: 'YOUR_APP_ID_HERE'
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Zalo integration...');

    // 1. Load Zalo SDK asynchronously
    // This is the standard script from Zalo Developers
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://sp.zalo.me/plugins/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'zalo-jssdk'));

    // 2. Initialize Widget (Placeholder logic)
    // In a real implementation, you would use the <div class="zalo-chat-widget"> provided by Zalo's generator
    // or use the SDK's ZaloSocialSDK.chatWidget() if available.
    
    // Setup generic click handler for the custom button in index.html
    const customWidget = document.getElementById('zalo-chat-widget');
    if (customWidget) {
        customWidget.addEventListener('click', () => {
            if (ZALO_CONFIG.oaId === 'YOUR_OA_ID_HERE') {
                alert('Zalo OA ID not configured! Please update scripts/zalo.js with your OA ID.');
                return;
            }
            
            // Open Zalo Chat URL
            // Format: https://zalo.me/<OA_ID>
            window.open(`https://zalo.me/${ZALO_CONFIG.oaId}`, '_blank');
        });
    }
});

// Zalo SDK Callback (optional)
window.ZaloSocialSDK = window.ZaloSocialSDK || {};
window.ZaloSocialSDK.onload = function() {
    console.log('Zalo SDK loaded successfully');
};
