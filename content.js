// Мониторинг активности на Roblox
console.log('Roblox Cookie Monitor activated');

// Перехват сетевых запросов
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const response = await originalFetch.apply(this, args);
    
    // Проверяем авторизационные запросы
    if (args[0] && args[0].includes('roblox.com')) {
        chrome.runtime.sendMessage({
            type: 'ROBLOX_ACTIVITY_DETECTED',
            url: args[0],
            method: 'FETCH',
            timestamp: new Date().toISOString()
        });
    }
    
    return response;
};

// Мониторинг XMLHttpRequest
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
    if (url && url.includes('roblox.com')) {
        this.addEventListener('load', function() {
            chrome.runtime.sendMessage({
                type: 'ROBLOX_ACTIVITY_DETECTED',
                url: url,
                method: 'XHR',
                timestamp: new Date().toISOString()
            });
        });
    }
    return originalXHROpen.apply(this, arguments);
};

// Детект входа в аккаунт
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.innerHTML && 
                    (node.innerHTML.includes('Welcome') || node.innerHTML.includes('Dashboard'))) {
                    chrome.runtime.sendMessage({
                        type: 'ROBLOX_LOGIN_DETECTED',
                        timestamp: new Date().toISOString()
                    });
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
