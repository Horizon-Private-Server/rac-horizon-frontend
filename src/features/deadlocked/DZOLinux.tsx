import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TableCell,
    TableRow,
    TableHead,
    TableContainer,
    TableBody,
    Link,
    Breadcrumbs,
    Stack
} from "@mui/material";
import { TextHeading, TextList, CodeBox } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { ChangingImage } from "../../components/base/ChangingImage";
import { MobileFriendlyIconRow, MobileFriendlyTextRow } from "../../components/base/MobileFriendlyRow";
import {Construction} from "@mui/icons-material";
import LineBreak from "../../components/base/LineBreak";

export const DZOLinux = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const cs = () => {

        if (screenSize === ScreenSize.Desktop) {
            return 64;
        }
        else if (screenSize === ScreenSize.Tablet) {
            return 56;
        }
        else {
            return 48;
        }
    };

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingBottom: 2}}>
            <Link underline="hover" color="inherit" href="/">
                Horizon
            </Link>
            <Typography color="text.primary">DreadZone Online Linux Install Guide</Typography>
        </Breadcrumbs>

        <Card>
            <CardContent>
                
                <TextHeading heading="DreadZone Online Linux Install Guide" variant="h4" />

                <Typography marginBottom={3}>
                    DreadZone Online (DZO) is a rerenderer for Ratchet: Deadlocked emulated on PCSX2.
                    DZO has basic support for Linux through Unity's linux builder and PCSX2's AppImage.
                    Installation on Linux must be done through a command line script.
                    The following guide will walk you through the installation process.
                </Typography>

                <TextHeading heading="Setup" variant="h5" />

                <Typography marginBottom={3}>
                    DZO is installed into one folder. Please make a new directory and open a terminal window inside of it.
                </Typography>
                
                <CodeBox>
                    <Box>cd ~/Desktop</Box>
                    <Box>mkdir dzo</Box>
                    <Box>cd dzo</Box>
                </CodeBox>

                <TextHeading heading="Install" variant="h5" />

                <Typography marginBottom={1}>
                    Download the install script into your new DZO directory and run it.
                </Typography>
                
                <CodeBox>
                    <Box>wget https://box.rac-horizon.com/downloads/dzo/update.sh && bash ./update.sh</Box>
                </CodeBox>

                <Typography marginTop={3} marginBottom={1} color="yellow">
                    NOTE: If that fails you may need to run the command with sudo.
                </Typography>
                
                <CodeBox>
                    <Box>sudo wget https://box.rac-horizon.com/downloads/dzo/update.sh && sudo bash ./update.sh</Box>
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
                        src="https://www.youtube.com/embed/KKeOXb0R4mM?start=80"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="video"
                        width={"100%"}
                        height={"500px"}
                    />
                </Box>

            </CardContent>
        </Card>
    </Box>;
}
