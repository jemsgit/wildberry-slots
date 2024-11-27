import { Box, IconButton, Stack } from "@mui/material";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";

interface Props {
  setSoundClose: (enable: boolean) => void;
  setSoundOpen: (enable: boolean) => void;
  setAutoopenLink: (enable: boolean) => void;
  soundCloseOn: boolean;
  soundOpenOn: boolean;
  autoopenLinkOn: boolean;
}

function Settings(props: Props) {
  const {
    setSoundClose,
    setSoundOpen,
    setAutoopenLink,
    soundCloseOn,
    soundOpenOn,
    autoopenLinkOn,
  } = props;

  return (
    <Stack sx={{ textAlign: "left" }}>
      <Box>
        <IconButton onClick={() => setSoundClose(!soundCloseOn)}>
          {soundCloseOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
        Сгорающие слоты
      </Box>
      <Box>
        <IconButton onClick={() => setSoundOpen(!soundOpenOn)}>
          {soundOpenOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
        Новые слоты
      </Box>

      <Box>
        <IconButton onClick={() => setAutoopenLink(!autoopenLinkOn)}>
          {autoopenLinkOn ? <LinkIcon /> : <LinkOffIcon />}
        </IconButton>
        Автооткрытие ссылок
      </Box>
    </Stack>
  );
}

export default Settings;
