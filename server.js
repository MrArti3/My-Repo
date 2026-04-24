const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// API endpoint for phone statuses
app.get('/api/phones', (req, res) => {
  // Mock phone data - replace with your actual data source
  const phones = [
    { id: 1, ip: '100.104.201.128', status: 'online' },
    { id: 2, ip: '100.118.16.3', status: 'online' },
    { id: 3, ip: '100.67.94.55', status: 'online' },
    { id: 4, ip: '100.93.236.122', status: 'online' },
    { id: 5, ip: '100.101.96.110', status: 'online' },
    { id: 6, ip: '100.86.8.29', status: 'offline' },
    { id: 7, ip: '100.68.153.7', status: 'online' },
    { id: 8, ip: '100.76.109.63', status: 'online' },
    { id: 9, ip: '100.121.125.16', status: 'online' },
    { id: 10, ip: '100.74.181.105', status: 'online' },
    { id: 11, ip: '100.124.154.23', status: 'online' },
    { id: 12, ip: '100.76.17.96', status: 'online' },
    { id: 13, ip: '100.106.9.40', status: 'online' },
    { id: 14, ip: '100.83.93.110', status: 'online' },
    { id: 15, ip: '100.127.141.118', status: 'online' },
    { id: 16, ip: '100.100.106.56', status: 'online' },
    { id: 17, ip: '100.72.90.121', status: 'online' },
    { id: 18, ip: '100.82.158.5', status: 'online' },
    { id: 19, ip: '100.84.209.57', status: 'online' },
    { id: 20, ip: '100.104.253.84', status: 'online' },
    { id: 21, ip: '100.88.206.53', status: 'online' },
    { id: 22, ip: '100.67.13.45', status: 'online' },
    { id: 23, ip: '100.92.236.61', status: 'online' },
    { id: 24, ip: '100.117.147.55', status: 'online' },
    { id: 25, ip: '100.88.214.19', status: 'offline' },
    { id: 26, ip: '100.123.182.21', status: 'online' },
    { id: 27, ip: '100.104.178.88', status: 'offline' },
    { id: 28, ip: '100.78.166.6', status: 'offline' },
    { id: 29, ip: '100.69.228.93', status: 'online' },
    { id: 30, ip: '100.94.69.51', status: 'offline' },
    { id: 31, ip: '100.71.150.59', status: 'online' },
    { id: 32, ip: '100.87.213.67', status: 'offline' },
    { id: 33, ip: '100.84.102.30', status: 'online' },
    { id: 34, ip: '100.70.179.36', status: 'offline' }
  ];

  // Simulate some status changes for demo
  phones.forEach(phone => {
    if (Math.random() < 0.1) { // 10% chance to toggle status
      phone.status = phone.status === 'online' ? 'offline' : 'online';
    }
  });

  res.json(phones);
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial phone data
  ws.send(JSON.stringify({ type: 'phones', data: getPhones() }));

  // Send updates every 30 seconds
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'phones', data: getPhones() }));
    }
  }, 30000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });

  ws.on('message', (message) => {
    console.log('Received:', message);
  });
});

function getPhones() {
  // Same mock data as API
  const phones = [
    { id: 1, ip: '100.104.201.128', status: 'online' },
    { id: 2, ip: '100.118.16.3', status: 'online' },
    { id: 3, ip: '100.67.94.55', status: 'online' },
    { id: 4, ip: '100.93.236.122', status: 'online' },
    { id: 5, ip: '100.101.96.110', status: 'online' },
    { id: 6, ip: '100.86.8.29', status: 'offline' },
    { id: 7, ip: '100.68.153.7', status: 'online' },
    { id: 8, ip: '100.76.109.63', status: 'online' },
    { id: 9, ip: '100.121.125.16', status: 'online' },
    { id: 10, ip: '100.74.181.105', status: 'online' },
    { id: 11, ip: '100.124.154.23', status: 'online' },
    { id: 12, ip: '100.76.17.96', status: 'online' },
    { id: 13, ip: '100.106.9.40', status: 'online' },
    { id: 14, ip: '100.83.93.110', status: 'online' },
    { id: 15, ip: '100.127.141.118', status: 'online' },
    { id: 16, ip: '100.100.106.56', status: 'online' },
    { id: 17, ip: '100.72.90.121', status: 'online' },
    { id: 18, ip: '100.82.158.5', status: 'online' },
    { id: 19, ip: '100.84.209.57', status: 'online' },
    { id: 20, ip: '100.104.253.84', status: 'online' },
    { id: 21, ip: '100.88.206.53', status: 'online' },
    { id: 22, ip: '100.67.13.45', status: 'online' },
    { id: 23, ip: '100.92.236.61', status: 'online' },
    { id: 24, ip: '100.117.147.55', status: 'online' },
    { id: 25, ip: '100.88.214.19', status: 'offline' },
    { id: 26, ip: '100.123.182.21', status: 'online' },
    { id: 27, ip: '100.104.178.88', status: 'offline' },
    { id: 28, ip: '100.78.166.6', status: 'offline' },
    { id: 29, ip: '100.69.228.93', status: 'online' },
    { id: 30, ip: '100.94.69.51', status: 'offline' },
    { id: 31, ip: '100.71.150.59', status: 'online' },
    { id: 32, ip: '100.87.213.67', status: 'offline' },
    { id: 33, ip: '100.84.102.30', status: 'online' },
    { id: 34, ip: '100.70.179.36', status: 'offline' }
  ];

  phones.forEach(phone => {
    if (Math.random() < 0.1) {
      phone.status = phone.status === 'online' ? 'offline' : 'online';
    }
  });

  return phones;
}