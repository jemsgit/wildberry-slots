import { Typography } from "@mui/material";

interface Props {
  text: string;
  center?: boolean;
}

function SectionHeader(props: Props) {
  const { text, center } = props;

  return (
    <Typography
      variant="h5"
      sx={{
        color: (theme) => theme.palette.text.secondary,
        textAlign: center ? "center" : "left",
        mb: 2,
      }}
    >
      {text}
    </Typography>
  );
}

export default SectionHeader;
