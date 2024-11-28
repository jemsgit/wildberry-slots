import WebSocket, { WebSocketServer } from "ws";

// Изначальный массив данных
const slots = [
  {
    date: "2024-11-27T00:00:00Z",
    coefficient: 3,
    warehouseID: 130744,
    warehouseName: "Краснодар (Тихорецкая)",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-27T00:42:12.200303Z",
  },
  {
    date: "2024-12-09T00:00:00Z",
    coefficient: 0,
    warehouseID: 218987,
    warehouseName: "Алматы Атакент",
    boxTypeName: "Монопаллеты",
    boxTypeID: 5,
    openedAt: "2024-11-26T23:39:22.079138Z",
  },
  {
    date: "2024-12-09T00:00:00Z",
    coefficient: 2,
    warehouseID: 218987,
    warehouseName: "Алматы Атакент",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-26T23:39:22.06747Z",
  },
  {
    date: "2024-12-08T00:00:00Z",
    coefficient: 2,
    warehouseID: 218987,
    warehouseName: "Алматы Атакент",
    boxTypeName: "Короба",
    boxTypeID: 2,
    openedAt: "2024-11-26T23:39:21.569715Z",
  },
  {
    date: "2024-12-08T00:00:00Z",
    coefficient: 0,
    warehouseID: 218987,
    warehouseName: "Алматы Атакент",
    boxTypeName: "Монопаллеты",
    boxTypeID: 5,
    openedAt: "2024-11-26T23:39:21.538984Z",
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
  const shouldAddNew = false; // С 30% вероятностью добавляем новый элемент

  if (shouldAddNew) {
    // Добавляем новый элемент
    const newSlot = {
      date: new Date().toISOString(),
      coefficient: 2,
      warehouseID: 218732,
      warehouseName: "СЦ Ош",
      boxTypeName: "QR-поставка с коробами",
      boxTypeID: 0,
      openedAt: "2024-11-28T10:43:17.194Z",
    };
    slots.push(newSlot);
    broadcast({ type: "update", data: newSlot });
  } else {
    //   // Изменяем score случайного элемента
    //   const randomIndex = Math.floor(Math.random() * slots.length);
    //   slots[randomIndex].coefficient += Math.floor(Math.random() * 10) - 5; // Изменение на число от -5 до 5
    //   broadcast({ type: "update", data: slots[randomIndex] });
    //
    // Изменяем score случайного элемента
    const randomIndex = Math.floor(Math.random() * slots.length);
    slots[randomIndex].coefficient = -1; // Изменение на число от -5 до 5
    slots[randomIndex].closedAt = new Date();
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
