import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { CustomMapIndexEntry, useCustomMapBackgroundImage } from "../../hooks/custom-maps";
import { Download } from "@mui/icons-material";
import { GameType } from "../../constants/game";
import { WaitFor } from "./WaitFor";

type Props = {
    game: GameType;
    entry: CustomMapIndexEntry;
};

export const CustomMapCard = ({ game, entry: { slug, name, version } }: Props) => {
    const customMapBackground = useCustomMapBackgroundImage(game, slug);
    const { data: background } = customMapBackground;

    return (
        <Card sx={{ width: 345 }} variant="outlined">
            <WaitFor data={customMapBackground}>
                <CardMedia sx={{ height: 140 }} image={background?.toString()} />
            </WaitFor>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Some custom map description
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
