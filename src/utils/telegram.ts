// Telegram notifications for VELLURE.
//
// SECURITY: the bot token must never reach the browser. All Telegram messages are sent by the server
// (server.ts holds the token via TELEGRAM_BOT_TOKEN / admin settings). The browser only asks the server
// to send a notification and never sees, stores or sends a bot token.

/**
 * Remove any Telegram bot token that earlier versions of the site cached in visitors' browsers.
 * Safe to call on every page load.
 */
export function purgeLegacyTelegramSecrets() {
  try {
    localStorage.removeItem('vellure_telegram_bot_token');
    localStorage.removeItem('vellure_telegram_chat_id');
    const saved = localStorage.getItem('vellure_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      let changed = false;
      for (const key of Object.keys(parsed)) {
        if (/^(telegram|googleSheet)|token|secret|password|webhook|apikey/i.test(key)) {
          delete parsed[key];
          changed = true;
        }
      }
      if (changed) localStorage.setItem('vellure_settings', JSON.stringify(parsed));
    }
  } catch {
    // ignore
  }
}

/**
 * Ask the server to notify the merchant when a customer adds a product to the cart.
 */
export async function notifyTelegramAddToCart(params: {
  productName: string;
  productNameBn?: string;
  size: string;
  price: number;
  quantity: number;
  cartSubtotal: number;
  language?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/notifications/telegram/add-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json().catch(() => ({}));
    return { success: !!data.success, error: data.error };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * New-order notifications are sent by the server when the order is created (POST /api/orders),
 * so there is nothing to do in the browser. Kept so existing callers keep working.
 */
export async function notifyTelegramNewOrder(_order: unknown): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}
