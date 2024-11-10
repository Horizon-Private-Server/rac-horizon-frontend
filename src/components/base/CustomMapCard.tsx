import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { CustomMapIndexEntry, useCustomMapBackgroundImage } from "../../hooks/custom-maps";
import { Download } from "@mui/icons-material";
import { GameType } from "../../constants/game";
import { WaitFor } from "./WaitFor";
import DeadlockedLogo from "../../assets/img/dl-logo.webp";
import UYALogo from "../../assets/img/uya-logo.webp";
import RAC3Logo from "../../assets/img/rc3-logo.webp";
import { useMemo } from "react";
import { getCustomMapResourceInfo } from "../../api/dao/custom-maps";
import { downloadFile } from "../../utils/file";

type Props = {
    game: GameType;
    entry: CustomMapIndexEntry;
};

export const CustomMapCard = ({ game, entry: { slug, name, version } }: Props) => {
    const customMapBackground = useCustomMapBackgroundImage(game, slug);
    const { data: background, status, error } = customMapBackground;

    const onDownload = () => {
        const { mapsPath, mapsRegion } = getCustomMapResourceInfo(game);

        // UYA custom maps use .ntsc or .pal in the zip file name, DL does not.
        const gameType = game === GameType.DL_NTSC ? "" : `.${mapsRegion}`;

        const url = `${process.env.REACT_APP_HORIZON_CUSTOM_MAPS_DOMAIN}/${mapsPath}/${slug}${gameType}.zip?v=${version}`;
        downloadFile(url, `${slug}.zip`);
    };

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
            </CardContent>
            <CardActions>
                <IconButton onClick={onDownload}>
                    <Download />
                </IconButton>
            </CardActions>
        </Card>
    );
};
