# WhatsAppBroadcast
# WhatsApp Blast with whatsapp-web.js and Node.js

This project is a simple WhatsApp broadcast tool using `whatsapp-web.js`, `xlsx`, and `Node.js`. It allows you to send personalized messages (including custom links) to a list of phone numbers provided in an Excel (.xlsx) file.

## 🚀 Features
- Read contact data from Excel file (`.xlsx`) with columns: number, name, and link
- Customizable message template with `{name}` and `{link}` placeholders
- Sends message to each number with randomized delay (9–12 seconds) to reduce detection
- Supports session saving using `LocalAuth` (not recommended)
- Handles disconnection and unhandled promise rejections gracefully

## 📦 Dependencies
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [xlsx](https://www.npmjs.com/package/xlsx)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)

Install them with:
```bash
npm install whatsapp-web.js xlsx qrcode puppeteer
```

## 📁 Excel Format Example
Save your Excel file as `numbers.xlsx` and ensure it includes the following headers:

| number       | name       | link                         |
|--------------|------------|------------------------------|
| 628123456789 | John Doe   | https://example.com/john     |
| 628987654321 | Jane Smith | https://example.com/jane     |

## 🛠️ How to Use

1. Clone the repository or copy the script
2. Place your `numbers.xlsx` file in the same folder
3. Run the app:
   ```bash
   node index.js
   ```
4. Scan the QR code using your WhatsApp
5. Messages will be sent one by one with a short delay

## ✨ Message Customization
Change the template here:
```js
const messageTemplate = "Hello {name}! Check this out: {link}";
```
You can use `{name}` and `{link}` placeholders which will be dynamically replaced.

## ⚠️ Limitations
- May be blocked if used aggressively by WhatsApp (not officially supported API)
- Requires active WhatsApp Web session
- Cannot send media (only text) in current setup
- Messages go out sequentially (not parallel)

## ✅ Advantages
- Simple and quick setup
- No need for paid API
- Fully customizable messages per contact
- Random delay helps mimic human behavior

## 📎 Notes
- Ensure your WhatsApp session stays connected
- Do not close the terminal while sending
- Use responsibly to avoid account restrictions

---

This tool is great for small-scale messaging campaigns like event invites, notifications, or updates — not intended for spamming or unsolicited messages.
Feel free to fork and modify it as needed! 😊


