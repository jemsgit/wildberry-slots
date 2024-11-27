import { Box, Paper } from "@mui/material";
import SectionHeader from "../SectionHeader/SectionHeader";
import Settings from "../Settings/Settings";
import {
  setAutoopenLink,
  setSoundClose,
  setSoundOpen,
} from "../../store/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

function SettingsSection() {
  const dispatch = useAppDispatch();
  const { autoopenLinkOn, soundCloseOn, soundOpenOn } = useAppSelector(
    (state) => state.settings
  );

  const handleSetAutoopenLink = (val: boolean) => {
    dispatch(setAutoopenLink(val));
  };

  const handleSetSoundClose = (val: boolean) => {
    dispatch(setSoundClose(val));
  };

  const handleSetSoundOpen = (val: boolean) => {
    dispatch(setSoundOpen(val));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, flex: "1 1 100px", borderRadius: 3 }}>
      <SectionHeader text="Настройки" />

      <Box>
        <Settings
          autoopenLinkOn={autoopenLinkOn}
          soundCloseOn={soundCloseOn}
          soundOpenOn={soundOpenOn}
          setSoundClose={handleSetSoundClose}
          setSoundOpen={handleSetSoundOpen}
          setAutoopenLink={handleSetAutoopenLink}
        />
      </Box>
    </Paper>
  );
}

export default SettingsSection;
