import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { CustomMapIndexEntry, useCustomMapBackgroundImage, useGetCustomMapVersion } from "../../hooks/custom-maps";
import { Download } from "@mui/icons-material";
import { GameType } from "../../constants/game";
import { WaitFor } from "./WaitFor";
import DeadlockedLogo from "../../assets/img/dl-logo.webp";
import UYALogo from "../../assets/img/uya-boxart.jpg";
import RAC3Logo from "../../assets/img/rc3-boxart.jpg";
import { useMemo } from "react";
import { CustomGameModeNames } from "../../constants/game-mode";

type Props = {
    game: GameType;
    entry: CustomMapIndexEntry;
};

export const CustomMapCard = ({ game, entry: { slug, name, version } }: Props) => {
    const customMapBackground = useCustomMapBackgroundImage(game, slug);
    const customMapVersionFile = useGetCustomMapVersion(game, slug);
    const { data: background, status, error } = customMapBackground;
    const { data: versionFile } = customMapVersionFile;

    const imageData = useMemo(() => {
        if (status === "success" && background) return background;

        switch (game) {
            case GameType.DL_NTSC:
                return DeadlockedLogo;
            case GameType.UYA_NTSC:
                return UYALogo; // placeholder until I get a better logo
            case GameType.UYA_PAL:
                return RAC3Logo; // placeholder until I get a better logo
        }
    }, [background, status, error]);

    return (
        <Card sx={{ width: 345 }} variant="outlined">
            <WaitFor data={customMapBackground} showDataOnError>
                <CardMedia sx={{ height: 150, background: "round" }} image={imageData} />
            </WaitFor>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Version: {version}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Custom Mode: {(versionFile && CustomGameModeNames[versionFile?.forcedCustomMode]) ?? "None"}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Download />
                </IconButton>
            </CardActions>
        </Card>
    );
};