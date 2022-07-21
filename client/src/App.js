import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
// Icon
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  // Use State
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [stringList, setStringList] = useState([]);

  // Use Effect
  // get stringList from DB
  const getStrings = async () => {
    const res = await axios.get("http://localhost:3600/rest/strings/");
    setStringList([...res.data]);
  };

  useEffect(() => getStrings(), []);

  useEffect(() => {
    value.length > 0 && value.length < 31 ? setValid(true) : setValid(false);
  }, [value]);

  // Functions
  const handleValue = (e) => {
    setValue(e.target.value);
  };
  const handleAddClick = async () => {
    if (value.length > 0 && value.length < 31) {
      setValue("");
      await axios.post("http://localhost:3600/rest/strings/", {
        text: value,
      });
      getStrings();
    }
  };

  const handleRemove = async (index) => {
    let arr = [...stringList];
    await axios.delete(`http://localhost:3600/rest/strings/${arr[index]._id}`);
    getStrings();
  };

  return (
    <>
      <Box sx={{ width: "20vw", m: "auto" }}>
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              variant="standard"
              id="string"
              label="Type Here..."
              value={value}
              onChange={handleValue}
              onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
              autoFocus
              error={value.length > 30 ? true : false}
              helperText={
                <Typography
                  variant="body2"
                  color={value.length > 30 ? "error" : "primary"}
                  align="right"
                >
                  {value.length}/30
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              size="small"
              onClick={handleAddClick}
              color="secondary"
              endIcon={<AddBoxIcon sx={{ mb: 0.2 }} />}
              disabled={!valid}
              sx={{ width: "100%" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        {stringList &&
          stringList.length > 0 &&
          stringList.map((x, i) => (
            <Fragment key={i}>
              <Grid
                container
                spacing={0}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item sx={{ flexGrow: 2 }}>
                  <Typography variant="body1" color="warning">
                    {x.text && x.text.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip arrow title="remove" placement="top">
                    <IconButton size="small" onClick={() => handleRemove(i)}>
                      <CloseIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <Divider />
            </Fragment>
          ))}
      </Box>
    </>
  );
}

export default App;
