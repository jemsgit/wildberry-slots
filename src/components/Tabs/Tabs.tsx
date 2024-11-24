import { Box, Tab, Tabs as TabsMUI } from "@mui/material";
import React from "react";
import { containerStyles, tabItemStyle, tabsStyle } from "./Tabs.styles";

interface Props {
  renderWatcherTab: () => React.ReactNode;
  renderSettingsTab: () => React.ReactNode;
  renderFAQTab: () => React.ReactNode;
}

function Tabs(props: Props) {
  const { renderWatcherTab, renderFAQTab, renderSettingsTab } = props;

  const [value, setValue] = React.useState("watcher");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={containerStyles}>
      <TabsMUI
        sx={tabsStyle}
        value={value}
        onChange={handleChange}
        aria-label="main control tabs"
        variant="fullWidth"
        centered
      >
        <Tab label="Отслеживания" value="watcher" sx={tabItemStyle} />
        <Tab label="Настройки" value="settings" sx={tabItemStyle} />
        <Tab label="FAQ" value="faq" sx={tabItemStyle} />
      </TabsMUI>
      <Box>
        {value === "watcher" && renderWatcherTab()}
        {value === "settings" && renderSettingsTab()}
        {value === "faq" && renderFAQTab()}
      </Box>
    </Box>
  );
}

export default Tabs;
