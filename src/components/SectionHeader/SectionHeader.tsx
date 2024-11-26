import { Typography } from "@mui/material";

interface Props {
  text: string;
}

function SectionHeader(props: Props) {
  const { text } = props;

  return (
    <Typography
      variant="h5"
      sx={{
        color: (theme) => theme.palette.text.secondary,
        textAlign: "left",
        mb: 2,
      }}
    >
      {text}
    </Typography>
  );
}

export default SectionHeader;
