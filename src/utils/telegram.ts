// Client-Side Telegram Bot Resiliency Layer for VELLURE
// Dispatches notifications directly from the browser if backend server is offline or deployed as static GitHub/Vercel host.

export interface TelegramCredentials {
  botToken: string;
  chatId: string;
}

export function getTelegramCredentials(): TelegramCredentials {
  let botToken = '';
  let chatId = '';

  // 1. Check Vite Environment Variables (available in client builds)
  try {
    if (import.meta.env.VITE_TELEGRAM_BOT_TOKEN) {
      botToken = String(import.meta.env.VITE_TELEGRAM_BOT_TOKEN).trim();
    }
    if (import.meta.env.VITE_TELEGRAM_CHAT_ID) {
      chatId = String(import.meta.env.VITE_TELEGRAM_CHAT_ID).trim();
    }
  } catch {
    // ignore
  }

  // 2. Check localStorage direct keys
  try {
    const localToken = localStorage.getItem('vellure_telegram_bot_token');
    const localChat = localStorage.getItem('vellure_telegram_chat_id');
    if (localToken && !botToken) botToken = localToken.trim();
    if (localChat && !chatId) chatId = localChat.trim();
  } catch {
    // ignore
  }

  // 3. Check cached settings in localStorage
  try {
    const savedSettings = localStorage.getItem('vellure_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.telegramBotToken && !botToken) botToken = parsed.telegramBotToken.trim();
      if (parsed.telegramChatId && !chatId) chatId = parsed.telegramChatId.trim();
    }
  } catch {
    // ignore
  }

  return { botToken, chatId };
}

export function saveTelegramCredentials(botToken: string, chatId: string) {
  try {
    if (botToken) localStorage.setItem('vellure_telegram_bot_token', botToken.trim());
    if (chatId) localStorage.setItem('vellure_telegram_chat_id', chatId.trim());
  } catch {
    // ignore
  }
}

/**
 * Send an HTML formatted message directly to Telegram via Telegram Bot API
 */
export async function sendClientTelegramMessage(
  text: string,
  customToken?: string,
  customChatId?: string
): Promise<{ success: boolean; error?: string }> {
  const creds = getTelegramCredentials();
  const token = (customToken || creds.botToken || '').trim();
  const chatId = (customChatId || creds.chatId || '').trim();

  if (!token || !chatId) {
    return {
      success: false,
      error: 'Telegram Bot Token or Chat ID not configured. Please configure them in Admin Settings or .env file.'
    };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const result = await response.json();
    if (!result.ok) {
      return {
        success: false,
        error: result.description || 'Telegram API returned an error.'
      };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error reaching Telegram API.'
    };
  }
}

/**
 * Notify merchant when customer adds a product to the cart
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
  const now = new Date();
  const timeStr =
    now.toLocaleDateString('en-GB') +
    ' ' +
    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const message =
    `🛍️ <b>VELLURE — Customer Added Item to Cart!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `✨ <b>Fragrance:</b> ${params.productName} ${params.productNameBn ? `(${params.productNameBn})` : ''}\n` +
    `💎 <b>Size:</b> ${params.size}\n` +
    `🔢 <b>Quantity:</b> ${params.quantity}\n` +
    `💰 <b>Price:</b> ৳${params.price}\n` +
    `🛒 <b>Estimated Cart Subtotal:</b> ৳${params.cartSubtotal}\n` +
    `🕒 <b>Time:</b> ${timeStr}\n` +
    `🌐 <b>Language:</b> ${params.language === 'bn' ? 'বাংলা' : 'English'}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `<i>Customer is actively browsing their bag on VELLURE.</i>`;

  return sendClientTelegramMessage(message);
}

/**
 * Notify merchant when customer submits an order (Cart Checkout or 1-Click Quick Order)
 */
export async function notifyTelegramNewOrder(order: {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  area?: string;
  deliveryNote?: string;
  paymentMethod: string;
  paymentStatus?: string;
  totalAmount: number;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
}): Promise<{ success: boolean; error?: string }> {
  const itemsList = order.items
    .map(
      (it) =>
        `• <b>${it.name}</b> (${it.size}) × ${it.quantity} — ৳${it.price * it.quantity}`
    )
    .join('\n');

  const orderMsg =
    `🎉 <b>VELLURE — New Order Placed!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔖 <b>Order ID:</b> <code>${order.id}</code>\n` +
    `👤 <b>Customer:</b> ${order.customerName}\n` +
    `📞 <b>Phone:</b> ${order.phone}\n` +
    (order.email ? `✉️ <b>Email:</b> ${order.email}\n` : '') +
    `📍 <b>Address:</b> ${order.address}, ${order.city || 'Dhaka'}${order.area ? ` (${order.area})` : ''}\n` +
    `💳 <b>Payment:</b> ${(order.paymentMethod || 'COD').toUpperCase()} (${order.paymentStatus || 'pending'})\n` +
    `💵 <b>Total Amount:</b> ৳${order.totalAmount}\n` +
    (order.deliveryNote ? `📝 <b>Note:</b> ${order.deliveryNote}\n` : '') +
    `📦 <b>Items:</b>\n${itemsList}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🚚 <i>Dispatched from VELLURE boutique queue.</i>`;

  return sendClientTelegramMessage(orderMsg);
}
