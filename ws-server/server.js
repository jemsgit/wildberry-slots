import WebSocket, { WebSocketServer } from "ws";

// Изначальный массив данных
let slots = [
  { startTime: new Date(), score: 2, name: "222", location: "Тула", id: 1 },
  { startTime: new Date(), score: -1, name: "3333", location: "Тула2", id: 2 },
  { startTime: new Date(), score: 30, name: "4444", location: "Тула3", id: 3 },
  { startTime: new Date(), score: 4, name: "1111", location: "Тула4", id: 4 },
  { startTime: new Date(), score: 5, name: "5555", location: "Тула5", id: 5 },
  { startTime: new Date(), score: 2, name: "6666", location: "Тула6", id: 6 },
  { startTime: new Date(), score: 1, name: "7777", location: "Тула", id: 7 },
  { startTime: new Date(), score: 0, name: "88888", location: "Тула", id: 8 },
  { startTime: new Date(), score: 2, name: "9999", location: "Тула", id: 9 },
];

// Инициализация WebSocket сервера
const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

// Обработчик подключения клиента
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Отправляем начальные данные клиенту
  ws.send(JSON.stringify({ type: "initial", data: slots }));

  // Обработчик закрытия соединения
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Функция для случайного изменения данных
function updateSlots() {
  const shouldAddNew = Math.random() > 0.9; // С 30% вероятностью добавляем новый элемент

  if (shouldAddNew) {
    // Добавляем новый элемент
    const newSlot = {
      startTime: new Date(),
      score: Math.floor(Math.random() * 100) - 50, // Случайное число от -50 до 50
      name: `New Name ${Math.random().toString(36).substring(7)}`,
      location: `Location ${Math.random().toString(36).substring(7)}`,
      id: slots.length + 1,
    };
    slots.push(newSlot);
    broadcast({ type: "add", data: newSlot });
  } else {
    // Изменяем score случайного элемента
    const randomIndex = Math.floor(Math.random() * slots.length);
    slots[randomIndex].score += Math.floor(Math.random() * 10) - 5; // Изменение на число от -5 до 5
    broadcast({ type: "update", data: slots[randomIndex] });
  }
}

// Функция для отправки данных всем подключенным клиентам
function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// Запуск изменения данных каждые 5 секунд
setInterval(updateSlots, 5000);
