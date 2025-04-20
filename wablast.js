// const { Client, LocalAuth } = require('whatsapp-web.js');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const xlsx = require('xlsx');

// Inisialisasi client WhatsApp dengan puppeteer config (tanpa harus login ulang)
// const client = new Client({
//     authStrategy: new LocalAuth(),
//     puppeteer: {
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     }
// });

//Inisiasi client WhatsApp (harus login ulang setiap running code)
const client = new Client();

// Menampilkan QR Code untuk login pertama kali dengan ukuran 100x100 px
client.on('qr', qr => {
    console.log('Scan QR Code ini dengan WhatsApp Anda:');
    qrcode.generate(qr, { small: true });
});

// Jika sudah terhubung
client.on('ready', () => {
    console.log('WhatsApp Web Client siap!');
    loadNumbersAndSend(); // Kirim pesan setelah siap
});

// Tangani disconnect
client.on('disconnected', (reason) => {
    console.log('Client disconnected:', reason);
});

// Fungsi untuk membaca nomor, nama, dan link dari file Excel (bisa dilakukan kustomisasi sesuai kebutuhan)
const contacts = [];
const loadNumbersAndSend = () => {
    const workbook = xlsx.readFile('listwa.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    data.forEach(row => {
        if (row.number && row.name && row.link) {
            contacts.push({ number: row.number.toString(), name: row.name, link: row.link });
        }
    });

    console.log(`Total nomor yang akan dikirim: ${contacts.length}`);
    sendBlast();
};


// Template pesan yang bisa di-custom dengan link unik
const messageTemplate = "Halo {name}, ini adalah pesan broadcast melalui Node.js / Javascript kamu bisa akses link ini untuk keterangan lebih lanjut \n {link}"


// Fungsi untuk mendapatkan jeda random antara 9-12 detik
const getRandomDelay = () => {
    return Math.floor(Math.random() * (12000 - 9000 + 1)) + 9000;
};

// Fungsi untuk mengirim pesan ke semua nomor dengan jeda random
const sendBlast = async () => {
    for (let contact of contacts) {
        let formattedNumber = contact.number + '@c.us'; // Format nomor WhatsApp
        let personalizedMessage = messageTemplate.replace("{name}", contact.name).replace("{link}", contact.link);
        try {
            await client.sendMessage(formattedNumber, personalizedMessage);
            console.log(`Pesan terkirim ke: ${contact.name} (${contact.number})`);
        } catch (error) {
            console.log(`Gagal mengirim ke ${contact.name} (${contact.number}):`, error);
        }
        let delay = getRandomDelay();
        console.log(`Menunggu ${delay / 1000} detik sebelum mengirim pesan berikutnya...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    console.log('Pengiriman WA Blast Selesai');
};

// Tangani unhandled promise rejection agar tidak crash
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection:', reason);
});

client.initialize();
