import { Box, Container, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import { GameType } from "../../constants/game";
import { useCustomMapsIndex, useGetAllCustomMapVersions } from "../../hooks/custom-maps";
import { CustomMapCard } from "../../components/base/CustomMapCard";
import { CustomGameModeUYA, CustomGameModeNamesUYA } from "../../constants/game-mode";
import { useState } from "react";

export const UYACustomMaps = () => {
    const [game, setGame] = useState(GameType.UYA_NTSC);
    const customMapsIndex = useCustomMapsIndex(game);
    const { data: customMapsMetadata } = useGetAllCustomMapVersions(game, customMapsIndex?.data?.map((entry) => entry.slug) ?? []);

    // Separate different categories of maps to select from
    const categories = [CustomGameModeUYA.CUSTOM_MODE_NONE];

    return (
        <Box>
            <HorizonBreadcrumbs
                paths={[
                    { text: "Up Your Arsenal", route: "/uya" },
                    { text: "Custom Maps", route: "/uya/custom-maps" },
                ]}
            />
            <Container maxWidth="xl">
                <Tabs value={game} onChange={(event, value) => setGame(value)} sx={{ marginBottom: "16px" }}>
                    <Tab label="NTSC" value={GameType.UYA_NTSC} />
                    <Tab label="PAL" value={GameType.UYA_PAL} />
                </Tabs>
                {customMapsMetadata && (
                    <Box>
                        {categories.map((cat) => {
                            const categoryEntries = customMapsMetadata?.filter(({ data }) => data?.versionInfo.forcedCustomMode === cat);

                            return (
                                <Box key={cat}>
                                    <Typography variant="h3">{CustomGameModeNamesUYA[cat]}</Typography>
                                    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
                                        {categoryEntries.length ? (
                                            categoryEntries.map(({ data }) => (
                                                <CustomMapCard
                                                    key={data?.slug}
                                                    game={game}
                                                    entry={{
                                                        name: data?.versionInfo.mapName ?? "",
                                                        version: data?.versionInfo.version ?? 0,
                                                        slug: data?.slug ?? "",
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <Box>There are currently no maps for this game mode.</Box>
                                        )}
                                    </Stack>
                                    <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </Container>
        </Box>
    );
};
