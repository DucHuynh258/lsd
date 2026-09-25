const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;

// Tìm IP LAN (Wi-Fi hoặc Ethernet)
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    // Ưu tiên Wi-Fi hoặc Ethernet, bỏ qua loopback & VM
    if (/loopback|vmware|virtual/i.test(name)) continue;
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : reqUrl);

  // An toàn đường dẫn
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Không tìm thấy file');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log('\n============================================================');
  console.log('  🚀 SERVER ÔN TẬP LỊCH SỬ ĐẢNG ĐANG CHẠY TRONG MẠNG LAN');
  console.log('============================================================\n');
  console.log('  📱 Các thiết bị khác (điện thoại, laptop cùng Wi-Fi) truy cập vào:');
  console.log(`     👉  http://${localIP}:${PORT}\n`);
  console.log('  💻 Máy tính này truy cập vào:');
  console.log(`     👉  http://localhost:${PORT}\n`);
  console.log('  (Nhấn Ctrl + C để dừng server khi không dùng nữa)');
  console.log('============================================================\n');
});
