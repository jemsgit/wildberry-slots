import { Paper, Typography, Stack, Box, List, ListItem } from "@mui/material";
import { container, header, plate } from "./InfoPage.styles";

function InfoPage() {
  return (
    <Box sx={container}>
      <Stack gap={3}>
        <Paper sx={plate} elevation={3}>
          <Typography variant="h4" sx={header}>
            О проекте
          </Typography>

          <Typography>
            Проект создан энтузиастами и преследует следующие цели:
            <List>
              <ListItem>
                1. Показать реальную картину с слотами на Wildberries (Спойлер:
                они есть каждый день).
              </ListItem>
              <ListItem>
                2. Дать возможность забронировать слоты с минимальными
                трудозатратами для Вас или Вашего менеджера и с высокой
                вероятностью успеть забронировать слот, когда он появился.
              </ListItem>{" "}
              <ListItem>
                3. Сатирические. Один из авторов проекта, по совместительству
                селлер, уже решил задачу бронирования поставок, но был крайне
                удивлён ситуацией с наличием слотов: [Изначально мы написали
                себе бота, который шлет уведомления в telegram о доступных
                слотах. Но в первый день использования столкнулись с проблемой
                ложноположительных данных. Т.е. слоты есть и их много, но 95% из
                них живут около секунды. При детальном анализе мы выяснили, что
                несколько раз за день существуют слоты, которые живут до минуты.
                Именно о таких слотах мы и стали слать себе уведомления и
                бронировать такие слоты. Специфика перегруженности telegram
                (обилие чатов и иногда невнимательность) приводила к тому, что
                менеджеры не всегда успевали бронировать слот и возникла идея
                создания этого ресурса и предоставление его в пользование всем
                желающим]
              </ListItem>
            </List>
          </Typography>
        </Paper>
        <Paper sx={plate}>
          <Typography variant="h6" sx={header}>
            Текущая стадия проекта: Развитие
          </Typography>
          <Typography>
            Сейчас проект полностью выполняет свои функции, а именно:{" "}
            <List>
              <ListItem>
                1. Отображает онлайн-табло с текущими слотами и длительностью их
                жизни.{" "}
              </ListItem>
              <ListItem>
                2. Позволяет подписаться на отслеживание необходимого склада и
                типа поставки. В момент возникновения такого слота, произойдёт{" "}
              </ListItem>
              <ListItem>2.1 Звуковой сигнал при обнаружении слота </ListItem>
              <ListItem>
                2.2 Поверх всех окон откроется окно с Вашей открытой поставкой.
                Останется только выбрать дату и забронировать поставку. Для
                этого:{" "}
              </ListItem>
              <ListItem>2.1 Нажмите "Добавить отслеживание". </ListItem>
              <ListItem>
                2.2 Заполните интересующий [Склад], [Тип поставки], [Поставка] -
                это номер вашего шаблона поставки на ВБ, [Задержка] - через
                сколько секунд открывать вкладку с поставкой после обнаружения,
                [Дата отслеживания] - Дата от которой искать поставку. Допустим,
                вы уже забронировали поставки на эту неделю и вам интересны
                только более поздние даты. Тогда этот параметр для Вас. Если
                оставить поле пустым - будет оповещать о всех датах.{" "}
              </ListItem>
            </List>
            Проект в стадии развития, среди планируемых доработок:{" "}
            <List>
              <ListItem>
                1. Улучшение интерфейса для более интуитивного пользования.{" "}
              </ListItem>
              <ListItem>
                2. Потом придумаем. (Надеемся на Вашу обратную связь)
              </ListItem>
            </List>
          </Typography>
        </Paper>
        <Paper sx={plate}>
          <Typography variant="h6" sx={header}>
            Безопасность
          </Typography>
          <Typography>
            Проект никак не связан с авторизационными данными и не имеет доступа
            к Вашему личному кабинету и вашим данным.
          </Typography>
        </Paper>
        <Paper sx={plate}>
          <Typography variant="h6" sx={header}>
            Ограничения
          </Typography>
          <Typography>
            1. Чтобы функция автоматического открытия окна, нужно в браузере
            выдать разрешение [скрин] 2. Чтобы поставка открылась корректно,
            нужно в этом браузере быть авторизованным в кабинете, в рамках
            которого создавалась поставка. Это ограничение можно обойти, если
            создать в браузере несколько профилей, и в каждом профиле открыть
            нужный кабинет [скрин] 3. Все данные берутся из API Wildberries.
            Легитимность данных полностью основана на этой информации.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}

export default InfoPage;
