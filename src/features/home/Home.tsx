import React, {useEffect} from "react";
import Page from "../../components/base/Page";
import {Box, Grid, Typography} from "@mui/material";

import PageCard from "../../components/base/PageCard";
import CenterObject from "../../components/base/CenterObject";
import LineBreak from "../../components/base/LineBreak";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLatestVideos, selectTutorialVideos, setHomeLatestVideos, setHomeTutorialVideos} from "./homeSlice";

import githubIcon from "../../assets/img/GitHub-Icon.png";
import dzoLogo from "../../assets/img/dzo-logo.png";
import dlBoxArt from "../../assets/img/dl-boxart.jpg";
import uyaBoxArt from "../../assets/img/uya-boxart.jpg";
import rc3BoxArt from "../../assets/img/rc3-boxart.jpg";
import downloadWindows from "../../assets/img/download-windows.png";
import downloadLinux from "../../assets/img/download-linux.png";
import downloadMacOSX from "../../assets/img/download-apple.png";

import DownloadIcon from '@mui/icons-material/Download';

import HomeCardContent from "./HomeCardContent";
import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

import HomeCardMulticontent from "./HomeCardMulticontent";
import {NavigateFunction, useNavigate} from "react-router-dom";

const Home = () => {

    const dispatch = useAppDispatch();

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        dispatch(setHomeLatestVideos([
            {id: {videoId: "gXx23ZE3pH0"}},
            {id: {videoId: "nIIk39wytSY"}},
            {id: {videoId: "BCU0YZ23ajw"}},
        ]));

        dispatch(setHomeTutorialVideos([
            {id: {videoId: "hC7s5P9KKLE"}},
            {id: {videoId: "1yVIdE1hE4o"}},
            {id: {videoId: "ND61nvDr0bM"}},
        ]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const latestVideos: string[] = useAppSelector(selectLatestVideos);
    const tutorialVideos = useAppSelector(selectTutorialVideos);

    let header: JSX.Element = <Box />;
    
    if (screenSize !== ScreenSize.Mobile) {
        header = <CenterObject>
            <Typography variant={(screenSize === ScreenSize.Desktop) ? "h3" : "h4"}>
                Welcome to the Horizon Private Server
            </Typography>
        </CenterObject>;
    }
    else {
        header = <Typography variant="h5">
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

            <Grid xs={12} container sx={{p: 0}}>

                <Grid xs={4} item sx={{p: 1}}>
                    <PageCard animated>
                        <HomeCardContent
                            link="/discord"
                            icon="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg"
                            iconAltText="Discord Logo"
                            title="Horizon Discord"
                            description="Get involved with the Horizon community by joining our Discord Server!"
                        />
                    </PageCard>
                </Grid>

                <Grid xs={4} item sx={{p: 1}}>
                    <PageCard animated>
                        <HomeCardContent
                            link="https://www.youtube.com/channel/UCqtDa52wBLmQs8fyAkeb8wg"
                            icon="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
                            iconAltText="YouTube Logo Logo"
                            title="Horizon YouTube Channel"
                            description="Check out the Horizon YouTube for tutorials and gameplay."
                        />
                    </PageCard>
                </Grid>

                <Grid xs={4} item sx={{p: 1}}>
                    <PageCard animated>
                        <HomeCardContent
                            link="https://github.com/Horizon-Private-Server"
                            icon={githubIcon}
                            iconAltText="GitHub Logo"
                            title="Horizon Development"
                            description="The Horizon project Medius emulator is open-source."
                        />
                    </PageCard>
                </Grid>
                
            </Grid>

            <LineBreak amount={40} />

            <CenterObject>
                <Typography variant="h4">Downloads</Typography>
            </CenterObject>

            <LineBreak amount={20} />

            <Grid xs={12} container sx={{p: 0}}>

                <Grid xs={screenSize === ScreenSize.Desktop ? 4 : 6} item sx={{p: 1}}>
                    <PageCard noPadding color="#4B5A70">
                        <HomeCardMulticontent
                            icon={dzoLogo}
                            actionIcons={[
                                {
                                    icon: downloadWindows,
                                    action: () => {window.open("https://box.rac-horizon.com/downloads/DreadZone%20Online%20Installer.exe", "_download")},
                                    altText: "Download DZO Windows Launcher"
                                },
                                {
                                    icon: downloadLinux,
                                    action: () => {navigate("/dzo/linux")},
                                    altText: "View Linux Setup Guide for DZO"
                                },
                                {
                                    icon: downloadMacOSX,
                                    action: () => {navigate("/dzo/macosx")},
                                    altText: "View Mac OSX Setup Guide for DZO"
                                }
                            ]}
                            iconAltText="DZO Logo"
                            title="DreadZone Online Client"
                            mobileTitle="DZO Client"
                            description="Download the DreadZone Online Client for Windows or Linux."
                        />
                    </PageCard>
                </Grid>

                <Grid xs={screenSize === ScreenSize.Desktop ? 4 : 6} item sx={{p: 1}}>
                    <PageCard animated noPadding={screenSize === ScreenSize.Mobile}>
                        <HomeCardContent
                            link="https://box.rac-horizon.com/downloads/maps/dl_custom_maps.zip"
                            icon={dlBoxArt}
                            iconAltText="Deadlocked Box Art"
                            title="Ratchet: Deadlocked Custom Maps [NTSC]"
                            mobileTitle="Custom Maps [DL]"
                            description="Download the latest Deadlocked custom maps."
                            actionIcon={<DownloadIcon />}
                            tooltip="Download the latest custom maps for Deadlocked"
                        />
                    </PageCard>
                </Grid>

                <Grid xs={screenSize === ScreenSize.Desktop ? 4 : 6} item sx={{p: 1}}>
                    <PageCard animated noPadding={screenSize === ScreenSize.Mobile}>
                        <HomeCardContent
                            link="https://box.rac-horizon.com/downloads/maps/uya_custom_maps_ntsc.zip"
                            icon={uyaBoxArt}
                            iconAltText="UYA Box Art"
                            title="Up Your Arsenal Custom Maps [NTSC]"
                            mobileTitle="Custom Maps [UYA] [NTSC]"
                            description="Download the latest UYA custom maps."
                            actionIcon={<DownloadIcon />}
                            tooltip="Download the latest custom maps for UYA"
                        />
                    </PageCard>
                </Grid>

                <Grid xs={screenSize === ScreenSize.Desktop ? 4 : 6} item sx={{p: 1}}>
                    <PageCard animated noPadding={screenSize === ScreenSize.Mobile}>
                        <HomeCardContent
                            link="https://box.rac-horizon.com/downloads/maps/uya_custom_maps_pal.zip"
                            icon={rc3BoxArt}
                            iconAltText="R&C 3 Box Art"
                            title="R&C 3 Custom Maps [PAL]"
                            mobileTitle="Custom Maps [UYA] [PAL]"
                            description="Download the latest R&C 3 custom maps."
                            actionIcon={<DownloadIcon />}
                            tooltip="Download the latest custom maps for R&C 3"
                        />
                    </PageCard>
                </Grid>
            </Grid>

            <LineBreak amount={50} />

            <CenterObject>
                <Typography variant="h4">Tutorials</Typography>
            </CenterObject>

            <LineBreak amount={20} />

            <CenterObject wrap={true}>
                {
                    tutorialVideos.map((videoId, index) => {

                        return <Box sx={{mr: 2, mb: 2, minWidth: "30%"}}>
                            <iframe
                                key={index}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                                width={screenSize === ScreenSize.Mobile ? "400vw" : "100%"}
                                height="300px"
                            />
                        </Box>;
                    })
                }
            </CenterObject>

            <LineBreak amount={40} />

            <CenterObject>
                <Typography variant="h4">Community Highlights</Typography>
            </CenterObject>

            <LineBreak amount={20} />

            <CenterObject wrap={true}>
                {
                    latestVideos.map((videoId, index) => {
                        
                        return <Box sx={{mr: 2, mb: 2, minWidth: "30%"}}>
                            <iframe
                                key={index}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                                width={screenSize === ScreenSize.Mobile ? "400vw" : "100%"}
                                height="300px"
                            />
                        </Box>;
                    })
                }

            </CenterObject>

        </Box>
        
    </Page>;
}

export default Home;