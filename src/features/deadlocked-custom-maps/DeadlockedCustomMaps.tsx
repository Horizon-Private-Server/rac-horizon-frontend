import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import { GameType } from "../../constants/game";
import { useCustomMapsIndex, useGetAllCustomMapVersions } from "../../hooks/custom-maps";
import { CustomMapCard } from "../../components/base/CustomMapCard";
import { CustomGameModeDL, CustomGameModeNamesDL } from "../../constants/game-mode";

export const DeadlockedCustomMaps = () => {
    const game = GameType.DL_NTSC;
    const customMapsIndex = useCustomMapsIndex(game);
    const { data: customMapsMetadata } = useGetAllCustomMapVersions(game, customMapsIndex?.data?.map((entry) => entry.slug) ?? []);

    // Separate different categories of maps to select from
    const categories = [CustomGameModeDL.CUSTOM_MODE_SURVIVAL, CustomGameModeDL.CUSTOM_MODE_NONE];

    return (
        <Box>
            <HorizonBreadcrumbs
                paths={[
                    { text: "Deadlocked", route: "/deadlocked" },
                    { text: "Custom Maps", route: "/deadlocked/custom-maps" },
                ]}
            />
            <Container maxWidth="xl">
                {customMapsMetadata && (
                    <Box>
                        {categories.map((cat) => {
                            const categoryEntries = customMapsMetadata?.filter(({ data }) => data?.versionInfo.forcedCustomMode === cat);

                            return (
                                <Box key={cat}>
                                    <Typography variant="h3">{CustomGameModeNamesDL[cat]}</Typography>
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
