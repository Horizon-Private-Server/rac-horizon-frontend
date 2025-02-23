import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Link,
    Breadcrumbs,
    Alert
} from "@mui/material";
import { TextHeading, CodeBox } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const DZOLinux = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);
    const navigate: NavigateFunction = useNavigate();

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingBottom: 2}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Typography color="text.primary">DreadZone Online Linux Install Guide</Typography>
        </Breadcrumbs>

        <Card>
            <CardContent>
                
                <TextHeading heading="DreadZone Online Linux Install Guide" variant="h4" />

                <Typography marginBottom={3}>
                    DreadZone Online (DZO) is a re-renderer for Ratchet: Deadlocked emulated on PCSX2.
                    DZO has basic support for Linux through Unity's linux builder and PCSX2's AppImage.
                    Installation on Linux must be done through a command line script.
                    The following guide will walk you through the installation process.
                </Typography>

                <TextHeading heading="Setup" variant="h5" />

                <Typography marginBottom={3}>
                    DZO is installed into one folder. Please open a terminal window and navigate to an empty directory.
                </Typography>
                
                <CodeBox>
                    <Box>cd ~/Desktop</Box>
                    <Box>mkdir dzo</Box>
                    <Box>cd dzo</Box>
                </CodeBox>

                <TextHeading heading="Install" variant="h5" />

                <Typography marginBottom={1}>
                    Download the install script into your new DZO directory and run it using the following command inside your terminal window.
                </Typography>
                
                <CodeBox>
                    <Box>wget https://box.rac-horizon.com/downloads/dzo/update.sh && bash ./update.sh</Box>
                </CodeBox>

                <Alert severity="info" sx={{mt: 1, mb: 2}}>
                    NOTE: If that fails you may need to run the command with sudo.
                </Alert>
                
                <CodeBox>
                    <Box>wget https://box.rac-horizon.com/downloads/dzo/update.sh && sudo bash ./update.sh</Box>
                </CodeBox>
                
                <TextHeading heading="Configuration" variant="h5" />

                <Typography marginBottom={1}>
                    Once installed, you will need a legally obtained PS2 BIOS and Ratchet: Deadlocked iso. You can then follow our video tutorial to complete the DZO installation.
                </Typography>
                
                <Box
                    sx={{
                        marginRight: "10px",
                        marginBottom: "10px",
                        minWidth: "30%"
                    }}
                >
                    <iframe
                        key={0}
                        src="https://www.youtube.com/embed/1yVIdE1hE4o?start=80"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="video"
                        width="100%"
                        height="500px"
                    />
                </Box>

            </CardContent>
        </Card>
    </Box>;
}
