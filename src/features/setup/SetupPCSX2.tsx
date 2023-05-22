import React from "react";

import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import { Backbar } from "../../components/base/Backbar";
import { TextHeading, TextList } from "../../components/base/TextComponents";

export const SetupPCSX2 = () => {

    return <Box
        marginLeft={4}
        marginRight={4}
        marginBottom={4}
    >
        <Backbar previous={"/getting-started"} />
        <Card>
            <CardContent>

                <TextHeading heading="Connecting to Horizon with PCSX2" variant="h4" />

                <TextHeading heading="Introduction" variant="h5" />

                <Typography marginBottom={3}>
                    Welcome to the Ratchet and Clank: Up Your Arsenal (Ratchet and Clank 3) and Ratchet: Deadlocked (Ratchet: Gladiator) online community.
                </Typography>

                <Typography marginBottom={3}>
                    If possible, we recommend playing both titles on a PS2 for the smoothest gameplay experience (instructions for connecting on a PS2 are available <Link href="https://github.com/Horizon-Private-Server/horizon-wiki/tree/main/getting-online/ps2" target="_blank">here</Link>).
                    However, we realize that PS2s are 20+ year old technology, so you may not still have one lying around or wish to invest in one.
                    This overview guide is meant for those who cannot or choose not to get a PS2, and would therefore like to play on emulator.
                </Typography>

                <Typography marginBottom={3}>
                    The PS2 emulator is PCSX2 <Link href="https://pcsx2.net/" target="_blank">https://pcsx2.net/</Link>.
                    It is free and versions exist for Windows, Mac, and Linux operating systems. To play any PS2 game on PCSX2, you need the following:
                </Typography>

                <TextList
                    items={[
                        "A BIOS file from a PS2.",
                        <Typography>
                            An ISO file for each game you wish to play, OR the original PS2 disc for the game AND a disc drive with which to read the disc.
                            Furthermore, to play UYA or DL online the ISO file must be for a version of the game that we support (as listed <Link href="https://github.com/Horizon-Private-Server/horizon-wiki/tree/main/getting-online#how-to-play--getting-online">here</Link>).
                            We recommend using an NTSC-U/C ISO if possible, because there are fewer steps needed to play online and more people in our community use that version (so more people will be able to help you if you have issues setting it up).
                        </Typography>
                    ]}
                    ordered={true}
                />

                <Box marginBottom={3} />

                <Typography marginBottom={3}>
                    A quick Internet search will yield detailed guides for how to obtain both BIOS and ISO files, and some websites offer downloads of them.
                    <b>
                        <i>
                            Depending on where you live, these downloads may or may not be legal. 
                            If using an illegal copy of the BIOS and/or ISO, you agree to completely release the Horizon staff and community from any liability resulting from your actions.
                        </i>
                    </b>
                </Typography>

                <Typography marginBottom={3}>
                    Setting up PCSX2 requires you to have administrative, write-level access to the folder that you install PCSX2 into.
                    You also must have enough tech-savviness to move files around between specific folders on your computer.
                </Typography>

                <Typography marginBottom={3}>
                    Due to the wide variety of computer specs available, PCSX2 optimization and even configuration are to some extent matters of trial and error.
                    If you have any questions or issues regarding PCSX2 setup, ask in the <code>#tech-support</code> channel in the <Link href="https://discord.com/invite/horizonps">Horizon Discord server</Link>.
                </Typography>

                <TextHeading heading="PCSX2 1.7 Nightly Build" variant="h5" />

            </CardContent>
        </Card>
        
    </Box>;

}