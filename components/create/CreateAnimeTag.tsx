import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateAnimeTag.module.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { Box, Button } from "@mui/material";

const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 6,
  placeholder: "장르, 태그",
  dropdown: {
    enabled: 0, // a;ways show suggestions dropdown
  },
};

const CreateAnimeTag = ({ defaultValue = [] }: { defaultValue?: string[] }) => {
  const tagifyRef = useRef<any>();
  const [tagifySettings, setTagifySettings] = useState(defaultValue);
  const [tagifyProps, setTagifyProps] = useState({});

  // on component mount
  useEffect(() => {
    setTagifyProps({ loading: true });
    setTagifyProps((lastProps) => ({
      ...lastProps,
      whitelist: [],
      showFilteredDropdown: "a",
      loading: false,
    }));
  }, []);

  const settings = {
    ...baseTagifySettings,
    ...tagifySettings,
  };

  const clearAll = () => {
    tagifyRef.current && tagifyRef.current.removeAllTags();
  };

  return (
    <Box className={styles.container}>
      <Button className={styles.button} onClick={clearAll}>
        Clear All
      </Button>
      <Tags
        name="tags"
        value={defaultValue.join(",")}
        tagifyRef={tagifyRef}
        settings={settings}
        autoFocus={true}
        {...tagifyProps}
      />
    </Box>
  );
};

export default CreateAnimeTag;
