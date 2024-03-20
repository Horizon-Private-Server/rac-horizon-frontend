import { Typography, Box, Stack, CardContent, Card, CardActionArea, Divider } from "@mui/material";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../utils/WindowDimensions";

import { useNavigate } from "react-router-dom";

export interface SectionCardProps {
    label: string;
    description: string;
    url: string;
    icon: JSX.Element;
}

export const SectionCard = (props: SectionCardProps) => {

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const {label, description, url, icon} = props;

    return <Card sx={{margin: 2, width: screenSize === ScreenSize.Desktop ? "20vw" : screenSize === ScreenSize.Tablet ? "50vw" : "70vw", minHeight: "20vh"}}>
        <CardActionArea
            sx={{width, display: "flex", alignItems: "baseline", justifyContent: "normal"}}
            onClick={() => {

                console.log(url);

                if (url.includes("http://") || url.includes("https://")) {
                    window.open(url, "_blank", "noreferrer");
                }
                else {
                    navigate(url);
                }

            }}
        >
            <CardContent>
                <Stack direction="row" justifyContent="flex-start" sx={{width: screenSize === ScreenSize.Desktop ? "20vw" : screenSize === ScreenSize.Tablet ? "50vw" : "70vw", minHeight: "3vh", pl: 1}}>
                    <Stack direction="column" justifyContent="center">
                        {icon}
                    </Stack>
                    <Box sx={{marginRight: 3}} />
                    <Typography fontSize={24}>{label}</Typography>
                </Stack>
                <Divider sx={{marginTop: 1, marginBottom: 1, width: screenSize === ScreenSize.Desktop ? "18vw" : screenSize === ScreenSize.Tablet ? "47vw" : "62vw" }} />
                <Typography sx={{width: screenSize === ScreenSize.Desktop ? "20vw" : screenSize === ScreenSize.Tablet ? "50vw" : "70vw", minHeight: "17vh", p: 1, pr: 5}} fontSize={18}>{description}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>;
}