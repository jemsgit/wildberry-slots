const slots = [
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

export default function mocks() {
  return [
    {
      url: "/api/slots",
      method: "get",
      timeout: 2000,
      response: slots,
    },
  ];
}
