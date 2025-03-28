"use client"
import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { useWizard } from "react-use-wizard";

const BackbuttonWithTitle = ({ title }) => {
    const { previousStep } = useWizard();
    const handleBack = () => {
        previousStep()
    };
    return (
        <>
            <Box
                sx={{
                    width: { xs: "100%", sm: "100%" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: "15px",
                    mb: "20px",
                }}
                onClick={handleBack}
            >
                <Button
                    onClick={() => console.log("Back")}
                    sx={{ minWidth: 0, p: 0 }}
                >
                    <ArrowCircleLeftRoundedIcon
                        sx={{ color: "#00305B", fontSize: 32 }}
                    />
                </Button>
            </Box>
            <Typography
                sx={{
                    fontSize: { xs: "18px", sm: "21px", md: "30px" },
                    fontWeight: 700,
                    lineHeight: {
                        xs: "25px",
                        sm: "30px",
                        md: "18px",
                        lg: "20px",
                    },
                    color: "#222222",
                    pb: "25px",
                }}
            >
                {title}
            </Typography>
        </>
    )
}

export default BackbuttonWithTitle