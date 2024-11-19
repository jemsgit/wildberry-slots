import { Chip } from "@mui/material";
import styles from "./Settings.module.css";

const chipStyle = (isOn: boolean) => {
  return {
    backgroundColor: isOn ? "#2b892b" : "#af0000",
    fontSize: "16px",
  };
};

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
    <div className={styles.container}>
      <Chip
        onClick={() => setSoundClose(!soundCloseOn)}
        color={"primary"}
        variant={"filled"}
        label={`Уведомления сгорающих слотов: ${
          soundCloseOn ? "🔉 on" : "🔇 off"
        }`}
        sx={chipStyle(soundCloseOn)}
      />
      <Chip
        onClick={() => setSoundOpen(!soundOpenOn)}
        color={"primary"}
        variant={"filled"}
        label={`Уведомления новых слотов: ${soundOpenOn ? "🔉 on" : "🔇 off"}`}
        sx={chipStyle(soundOpenOn)}
      />
      <Chip
        onClick={() => setAutoopenLink(!autoopenLinkOn)}
        color={"primary"}
        variant={"filled"}
        label={`Автоокрытие ссылки: ${autoopenLinkOn ? "on" : "off"}`}
        sx={chipStyle(autoopenLinkOn)}
      />
    </div>
  );
}

export default Settings;
