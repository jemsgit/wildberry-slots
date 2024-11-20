import WebSocket, { WebSocketServer } from "ws";

// Изначальный массив данных
const slots = [
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 6,
    warehouseID: 507,
    warehouseName: "Коледино5",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-17T12:31:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 7,
    warehouseID: 508,
    warehouseName: "Склад-508",
    boxTypeName: "Ящик",
    boxTypeID: 3,
    openedAt: "2024-11-17T12:32:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 8,
    warehouseID: 509,
    warehouseName: "Коледино3",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-17T12:33:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 9,
    warehouseID: 510,
    warehouseName: "Склад-510",
    boxTypeName: "Ящик",
    boxTypeID: 3,
    openedAt: "2024-11-17T12:34:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 10,
    warehouseID: 511,
    warehouseName: "Коледино1",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-17T12:35:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 11,
    warehouseID: 512,
    warehouseName: "Склад-512",
    boxTypeName: "Ящик",
    boxTypeID: 3,
    openedAt: "2024-11-17T12:36:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 12,
    warehouseID: 513,
    warehouseName: "Коледино13",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-17T12:37:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 13,
    warehouseID: 514,
    warehouseName: "Склад-514",
    boxTypeName: "Ящик",
    boxTypeID: 3,
    openedAt: "2024-11-17T12:38:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 14,
    warehouseID: 515,
    warehouseName: "Коледино15",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-17T12:39:24.963814+03:00",
  },
  {
    date: "2024-11-17T00:00:00Z",
    coefficient: 15,
    warehouseID: 516,
    warehouseName: "Склад-516",
    boxTypeName: "Ящик",
    boxTypeID: 3,
    openedAt: "2024-11-17T12:40:24.963814+03:00",
  },
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
  const shouldAddNew = true; // С 30% вероятностью добавляем новый элемент

  if (shouldAddNew) {
    // Добавляем новый элемент
    const newSlot = {
      date: "2024-12-05T00:00:00Z",
      coefficient: -1,
      warehouseID: 218732,
      warehouseName: "СЦ Ош",
      boxTypeName: "QR-поставка с коробами",
      boxTypeID: 0,
      openedAt: "2024-11-19T00:00:21.675385Z",
    };
    slots.push(newSlot);
    broadcast({ type: "update", data: newSlot });
  } else {
    // Изменяем score случайного элемента
    const randomIndex = Math.floor(Math.random() * slots.length);
    slots[randomIndex].coefficient += Math.floor(Math.random() * 10) - 5; // Изменение на число от -5 до 5
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
