"use client";
import React from "react";
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddEducation = ({ data, educationFields, setEducationFields, handleBack }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEducationFields((prev) => ({
        ...prev,
        media: file,
      }));
    }
  };

  const handleChange = (name, value) => {
    setEducationFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        width: "auto",
        maxHeight: "630px",
        overflowY: "scroll",
        p: 1,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "100%" },
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          py: "15px",
          mb: "20px",
        }}
      >
        <Button onClick={handleBack} sx={{ minWidth: 0, p: 0 }}>
          <CloseIcon sx={{ color: "#00305B", fontSize: 32 }} />
        </Button>
      </Box>
      {data?.form?.map((item, index) => {
        if (item.name === "is_continue") {
          return (
            <>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#222222",
                  mb: "10px",
                  mt: "14px",
                  textTransform: "capitalize",
                }}
              >
                {item?.title}
              </Typography>
              <Box
                key={item.name}
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 3px #00000040",
                  border: "none",
                  mb: "20px",
                  padding: "8px 20px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={educationFields[item.name] || false}
                      onChange={(e) =>
                        handleChange("is_continue", e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Did You Graduate"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                      fontWeight: 300,
                      lineHeight: "18px",
                      color: "#222222",
                    },
                  }}
                />
              </Box>
            </>
          );
        }
        if (item.name === "start_date" || item.name === "end_date") {
          return (
            <Box key={item.name} sx={{ py: 0.5, my: 0.5 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#222222",
                  mb: "10px",
                  textTransform: "capitalize",
                }}
              >
                {item?.title}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["month", "year"]}
                  value={
                    educationFields[item.name]
                      ? dayjs(educationFields[item.name], "MM/YYYY")
                      : null
                  }
                  onChange={(newValue) => {
                    handleChange(
                      item.name,
                      newValue ? dayjs(newValue).format("MM/YYYY") : null
                    );
                  }}
                  slotProps={{
                    textField: {
                      sx: {
                        width: "100%",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 3px #00000040",
                        border: "none",
                        "& input": {
                          color: "#000",
                          padding: "13px 10px",
                          width: "100%",
                          border: "none",
                          outline: "none ",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    height: "40px",
                  }}
                />
              </LocalizationProvider>
            </Box>
          );
        }
        if (item.name === "media") {
          return (
            <Box
              key={index}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#222222",
                  mb: "10px",
                  textTransform: "capitalize",
                }}
              >
                {item?.title}
              </Typography>
              <Box
                component="input"
                type="file"
                accept="image/*"
                sx={{
                  width: "100%",
                  boxShadow: "0px 0px 3px 1px #00000040",
                  border: "none",
                  padding: "18px 20px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: "18px",
                  color: "#222222",
                }}
                onChange={handleFileChange}
              />
              {item[item.name] && (
                <Typography
                  sx={{
                    mt: "10px",
                    fontStyle: "italic",
                    color: "#555",
                  }}
                >
                  Selected File: {item[item.name].name}
                </Typography>
              )}
            </Box>
          );
        }

        if (item.type === "field") {
          return (
            <Box key={item.name} sx={{ mb: "20px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#222222",
                  mb: "10px",
                  textTransform: "capitalize",
                }}
              >
                {item?.title}
              </Typography>
              <Box
                component="input"
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 3px #00000040",
                  border: "none",
                  padding: "18px 20px",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: "18px",
                  color: "#222222",
                }}
                placeholder={item?.placeHolder}
                value={educationFields[item.name] || ""}
                onChange={(e) => handleChange(item.name, e.target.value)}
              />
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
};

export default AddEducation;
