import React, { useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box } from "@mui/material";

import PageCard from "../../components/base/PageCard";
import CenterObject from "../../components/base/CenterObject";
import LineBreak from "../../components/base/LineBreak";

import { useAppSelector } from "../../app/hooks";
import { selectLatestVideos, setHomeLatestVideos } from "./homeSlice";

import { useAppDispatch } from "../../app/hooks";

import githubIcon from "../../assets/img/GitHub-Icon.png";
import ps2Logo from "../../assets/img/ps2-logo.png";
import pcsx2Logo from "../../assets/img/pcsx2-logo.png";
import dzoLogo from "../../assets/img/dzo-logo.png";

import DownloadIcon from '@mui/icons-material/Download';

import HomeCardContent from "./HomeCardContent";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        pagePadding: {
            padding: "24px"
        }
    })
);

const Home = () => {

    const classes = useStyles();

    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    useEffect(() => {

        // axios.get(
        //     "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCqtDa52wBLmQs8fyAkeb8wg&maxResults=6&order=date&type=video&key=AIzaSyCl1h_dAXR037rDUma82dqwgPAdISMHUPw"
        // ).then((response) => {
        //     dispatch(setHomeLatestVideos(response.data.items));
        // }).catch((error) => {
        //     console.log(error);
        // })


        dispatch(setHomeLatestVideos([
            {id: {videoId: "OUns2ZzXsao"}},
            {id: {videoId: "Bx0VeJu7O_U"}},
            {id: {videoId: "k2RAvQtLo1A"}},
        ]));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const latestVideos: string[] = useAppSelector(selectLatestVideos);

    let header: JSX.Element = <Box />;
    
    if (screenSize !== ScreenSize.Mobile) {
        header = <CenterObject>
            <Typography variant={(screenSize === ScreenSize.Desktop) ? "h3" : "h4"}>
                Welcome to the Horizon Private Server
            </Typography>
        </CenterObject>;
    }
    else {
        header = <Typography variant={"h5"}>
            Welcome to the Horizon Private Server
        </Typography>;
    }


    return <Page>

        <Box sx={{p: 3}}>

            {header}

            <LineBreak amount={20} />

            <Typography>
                Welcome to the Horizon Private Server! Horizon is a community-revival project for Ratchet and Clank: Up Your Arsenal, 
                Ratchet: Deadlocked (Gladiator) and Secret Agent Clank. We are a small community of R&amp;C fans dedicated to ensuring 
                the survival of these beloved childhood titles. The goal of the Horizon is to fully revive the multiplayer experience 
                for each title and to provide support for community mods which breathe new life into these games.
            </Typography>

            <LineBreak amount={20} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: "100%",
                }}
            >

                <PageCard>
                    <HomeCardContent
                        link={"https://discord.com/invite/horizonps"}
                        icon={"https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg"}
                        iconAltText="Discord Logo"
                        title={"Horizon Discord"}
                        description={"Get involved with the Horizon community by joining our Discord Server!"}
                    />
                </PageCard>

                <PageCard>
                    <HomeCardContent
                        link={"https://www.youtube.com/channel/UCqtDa52wBLmQs8fyAkeb8wg"}
                        icon={"https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"}
                        iconAltText="YouTube Logo Logo"
                        title={"Horizon YouTube Channel"}
                        description={"Check out the Horizon YouTube for tutorials and gameplay."}
                    />
                </PageCard>
                <PageCard>
                    <HomeCardContent
                        link={"https://github.com/Horizon-Private-Server"}
                        icon={githubIcon}
                        iconAltText="GitHub Logo"
                        title={"Horizon Development"}
                        description={"The Horizon project Medius emulator is open-source."}
                    />
                </PageCard>
                
            </Box>

            <LineBreak amount={40} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    width: "100%",
                }}
            >
                <PageCard>
                    <HomeCardContent
                        link={"https://box.rac-horizon.com/downloads/DreadZone%20Online%20Installer.exe"}
                        icon={dzoLogo}
                        iconAltText="DZO Logo"
                        title={"DreadZone Online PC Client"}
                        description={"Download the DreadZone Online PC Client Installer."}
                        actionIcon={<DownloadIcon />}
                        tooltip={"Download the DreadZone Online PC Client Installer"}
                    />
                </PageCard> 
                
                <Box sx={{marginRight: "0.8%"}} />

                <PageCard>
                    <HomeCardContent
                        link={"https://box.rac-horizon.com/downloads/cmaps/dl_custom_maps_ps2.zip"}
                        icon={ps2Logo}
                        iconAltText="PS2 Logo"
                        title={"PS2 Custom Maps"}
                        description={"Download the latest Deadlocked custom maps for PS2."}
                        actionIcon={<DownloadIcon />}
                        tooltip={"Download the latest custom maps for PS2"}
                    />
                </PageCard>

                <Box sx={{marginRight: "0.8%"}} />

                <PageCard>
                    <HomeCardContent
                        link={"https://box.rac-horizon.com/downloads/cmaps/dl_custom_maps_pcsx2.zip"}
                        icon={pcsx2Logo}
                        iconAltText="PCSX2 Logo"
                        title={"PCSX2 Custom Maps"}
                        description={"Download the latest Deadlocked custom maps for PCSX2."}
                        actionIcon={<DownloadIcon />}
                        tooltip={"Download the latest custom maps for PCSX2"}
                    />
                </PageCard>
                
            </Box>


            <LineBreak amount={40} />

            <CenterObject>
                <Typography variant="h4">Community Highlights</Typography>
            </CenterObject>

            <LineBreak amount={20} />

            <CenterObject wrap={true}>
                {
                    latestVideos.map((videoId, index) => {
                        
                        return <Box
                            sx={{
                                marginRight: "10px",
                                marginBottom: "10px",
                                minWidth: "30%"
                            }}
                        >
                            <iframe
                                key={index}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                                width={"100%"}
                                height={"300px"}
                            />
                        </Box>;
                    })
                }

            </CenterObject>

        </Box>
        
    </Page>;
}

export default Home;