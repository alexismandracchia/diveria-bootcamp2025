import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import type { TabPanelProps, ImageTabsProps } from "../../../types/ImageTypes";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

export default function ImageTabs({ images }: ImageTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 500,
      }}
    >
      {images.map((src, index) => (
        <TabPanel key={index} value={value} index={index}>
          <img
            src={src}
            alt={`full-${index}`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </TabPanel>
      ))}

      <Tabs
        orientation="horizontal" 
        value={value}
        onChange={handleChange}
        sx={{ borderColor: "divider",  maxWidth: "100%" }}
      >
        {images.map((src, index) => (
          <Tab
            key={index}
            icon={
              <img
                src={src}
                alt={`thumbnail-${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 4,
                  objectFit: "cover",
                }}
              />
            }
            sx={{ padding: 1, minWidth: "auto",  width: `${100 / images.length}%`,}}
          />
        ))}
      </Tabs>
    </Box>
  );
}
