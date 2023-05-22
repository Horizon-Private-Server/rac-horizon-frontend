import React from "react";
import Page from "../../components/base/Page";
import { Typography } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import InlineImage from "../../components/base/InlineImage";
import LineBreak from "../../components/base/LineBreak";

import healthbox from "../../assets/img/healthbox.jpg";
import ProgressiveHeader from "../../components/base/ProgressiveHeader";
import AutoList from "../../components/base/AutoList";


const DeadlockedTutorials = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <Page>
        <Typography paragraph>
            Ratchet: Deadlocked online can be a competitive experience, this section is designed to help you navigate and improve while playing online.
            There are also certain conventions that competitive DL players abide by due to developer oversights.
        </Typography>

        <LineBreak amount={20} />

        <Typography variant="h4">Conventions</Typography>

        <LineBreak amount={20} />

        <InlineImage
            image={<img src={healthbox} alt="Healthbox" width="28%" height="28%" />}

        >
            <ProgressiveHeader headerText="Healthboxes/Health Crates" />
            <LineBreak amount={20} />
            <Typography paragraph>
                Healthboxes or health crates in Deadlocked spawn at fixed places on each map that were not necessarily well balanced
                by the developers. It has also been tradtion in DL to not pick up health while fighting. These have led to a few common
                community rules regarding healthboxes.
            </Typography>
            <AutoList
                listType="ordered"
                contents={[
                    `Don't pick up health while fighting someone on even terms ("Healthrunning").`,
                    `"Healthrunning" is acceptable if you are playing specific objectives (e.g., trying to capture a flag in CTF or you have killed at 
                        least 1 person and need health to stay in the hill in King of the Hill).`,
                    `"Healthrunning" may be permissible if you are fighting on uneven terms (2v1, 3v1, etc.), 
                        though some community members may call you out on it.`
                ]}
            />
        </InlineImage>

        <LineBreak amount={30} />

        <InlineImage
            image={<img src={healthbox} alt="Healthbox" width="28%" height="28%" />}
            imageSide="left"
        >
            <ProgressiveHeader headerText="Wallsniping" />
            <LineBreak amount={20} />
            <Typography paragraph>
                DL has notoriously bad hit detection with the fusion rifle. This is made worse when people hide behind cover in the map.
                Due to this, it has been a community rule not to jump in and out of cover when fighting (i.e., wallsniping).
            </Typography>

            <Typography paragraph>
                This rule has been frequently broken and in response a custom setting was made to fix hit detection while wallsniping.
                This is a custom rule that can be applied for any game mode, but it is not 100% effective. Rule of thumb, don't wallsnipe!
            </Typography>

        </InlineImage>

        <LineBreak amount={30} />

        <InlineImage
            image={<img src={healthbox} alt="Healthbox" width="28%" height="28%" />}
            imageSide="right"
        >
            <ProgressiveHeader headerText="Farming Kills in King of the Hill" />

            <LineBreak amount={20} />

            <Typography paragraph>
                King of the Hill is meant to be an objective game mode where death is inevitable. However, due to the objective nature of the game, some
                players have used it as an opportunity to rack up easy kills while forfeiting the game by not getting in the hill. This behavior is
                not tolerated by the community and will typically result in being kicked from future games. Killing people before going into the hill is
                acceptable, this only applies when one is intentionally staying outside of the hill to get kills.
            </Typography>

        </InlineImage>

    </Page>;
}

export default DeadlockedTutorials;