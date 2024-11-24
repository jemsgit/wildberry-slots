import { Typography } from "@mui/material";

interface Props {}

function Description(props: Props) {
  const {} = props;

  return (
    <Typography sx={{ textAlign: "left" }}>
      Отслеживайте свободные слоты на отгрузку в бесконечно меняющихся реалиях
      Wildberries. Посмотрите параметры доступных слотов в таблице, которая
      обновляется в реальном времени. Добавьте отслеживание, для того чтобы
      получить уведомление и автоматически открыть страницу отгрузки на сайте
      wildberries как только появится интересующий вас слот.
    </Typography>
  );
}

export default Description;
