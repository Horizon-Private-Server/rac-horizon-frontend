import {Box, Button, Card, CardContent, Grid, Menu, MenuItem, Stack, Switch, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import useWindowDimensions, {computeDeviceScale, ScreenSize} from "./utils/WindowDimensions";

import {Menu as MenuIcon} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export interface InteractiveMapLayer {
    layerUrl: string;
    layerLabel: string;
}

export interface InteractiveMapProps {
    backgroundUrl: string;
    layers: InteractiveMapLayer[];
}

const InteractiveMap = (props: InteractiveMapProps) => {

    const {backgroundUrl, layers} = props;

    const [activeLayers, setActiveLayers] = useState<boolean[]>([]);
    const [toggleMenuOpen, setToggleMenuOpen] = useState<boolean>(false);

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    useEffect(() => {
        if (layers.length !== activeLayers.length) {
            setActiveLayers(layers.map(() => true));
        }
    }, [layers])

    function generateLayersCSS(layers: InteractiveMapLayer[]): string {
        if (layers.length === 0) {
            return `url(${backgroundUrl})`
        }
        let layerBackgrounds: string[] = layers.filter((layer: InteractiveMapLayer, index: number) => activeLayers[index]).map((layer: InteractiveMapLayer) => `url(${layer.layerUrl})`);
        return layerBackgrounds.join(", ") + `, url(${backgroundUrl})`;
    }

    if (screenSize === ScreenSize.Mobile) {
        return <Card>
            <CardContent>
                <Stack direction="column" justifyContent="flex-start">
                    <Grid container>
                        <Grid xs={6} item>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={() => setToggleMenuOpen(true)}
                                    sx={{mb: 2}}
                                >
                                    <MenuIcon />
                                    <Typography sx={{ml: 2}}>
                                        Toggle Layers
                                    </Typography>
                                </Button>

                                <Menu open={toggleMenuOpen} onClose={() => setToggleMenuOpen(false)}>
                                    {activeLayers.map((isLayerActive: boolean, index: number) => {
                                        return <MenuItem key={index}>
                                            <Stack direction="row" justifyContent="flex-start">
                                                <Switch
                                                    checked={isLayerActive}
                                                    onChange={(event) => {
                                                        activeLayers[index] = event.target.checked;
                                                        setActiveLayers([...activeLayers]);
                                                    }}
                                                />
                                                <Stack direction="column" justifyContent="column">
                                                    <Typography sx={{mt: 1}}>{layers[index].layerLabel}</Typography>
                                                </Stack>
                                            </Stack>
                                        </MenuItem>
                                    })}
                                </Menu>
                            </Box>
                        </Grid>
                        <Grid xs={12} item>
                            <div
                                style={{
                                    width: "100vw",
                                    height: "60vw",
                                    backgroundPositionY: "-22vw",
                                    backgroundImage: generateLayersCSS(layers),
                                    backgroundSize: "100%",
                                    // transform: "rotate(90deg)"
                                }}
                            />
                        </Grid>

                    </Grid>

                </Stack>
            </CardContent>
        </Card>
    }

    return <Card>
        <CardContent>
            <Stack direction="row" justifyContent="space-between">
                <Box sx={{width: "20%"}}>
                    <Typography variant="h6" sx={{mb: 3}}>
                        Toggle Layers
                    </Typography>
                    {activeLayers.map((isLayerActive: boolean, index: number) => {
                        return <Stack direction="row" justifyContent="flex-start" key={index}>
                            <Switch
                                checked={isLayerActive}
                                onChange={(event) => {
                                    activeLayers[index] = event.target.checked;
                                    setActiveLayers([...activeLayers]);
                                }}
                            />
                            <Stack direction="column" justifyContent="column">
                                <Typography sx={{mt: 1}}>{layers[index].layerLabel}</Typography>
                            </Stack>
                        </Stack>
                    })}
                </Box>

                <div
                    style={{
                        width: "70vw",
                        height: "40vw",
                        backgroundPositionY: "-15vw",
                        backgroundImage: generateLayersCSS(layers),
                        backgroundSize: "100%",
                    }}
                />

            </Stack>
        </CardContent>
    </Card>
}

export default InteractiveMap;