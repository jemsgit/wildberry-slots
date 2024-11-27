import { Box, Button, Stack } from "@mui/material";

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
        <Button
          onClick={() => setSoundClose(!soundCloseOn)}
          startIcon={soundCloseOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          Сгорающие слоты
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => setSoundOpen(!soundOpenOn)}
          startIcon={soundOpenOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          Новые слоты
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => setAutoopenLink(!autoopenLinkOn)}
          startIcon={autoopenLinkOn ? <LinkIcon /> : <LinkOffIcon />}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          Автооткрытие ссылок
        </Button>
      </Box>
    </Stack>
  );
}

export default Settings;
