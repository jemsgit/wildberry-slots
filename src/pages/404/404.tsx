import { Paper, Box } from "@mui/material";

interface Props {}

function NotFoundPage(props: Props) {
  const {} = props;

  return (
    <Paper sx={{ minHeight: "70vh" }}>
      <Box>Упс. Кажется такой страницы нет.</Box>
    </Paper>
  );
}

export default NotFoundPage;
