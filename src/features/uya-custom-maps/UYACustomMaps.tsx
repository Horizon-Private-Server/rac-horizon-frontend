import { Box, Container, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import { GameType } from "../../constants/game";
import { CustomMapRepoEntry, useCustomMapRepos, useCustomMapRepoIndex, useGetAllCustomMapRepoVersions } from "../../hooks/custom-maps";
import { CustomMapCard } from "../../components/base/CustomMapCard";
import { CustomGameModeUYA, CustomGameModeNamesUYA } from "../../constants/game-mode";
import { useState } from "react";

function UYACustomMapRepo({repo, game} : {
  repo: CustomMapRepoEntry
  game: GameType
}) {

  const customMapsIndex = useCustomMapRepoIndex(game, repo);
  const { data: customMapsMetadata } = useGetAllCustomMapRepoVersions(game, repo, customMapsIndex?.data?.map((entry) => entry.slug) ?? []);

  return (
      <Box key={repo.name}>
          <Typography variant="h3">{repo.name}</Typography>
          <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
              {customMapsMetadata.length ? (
                  customMapsMetadata.map(({ data }) => (
                      <CustomMapCard
                          key={data?.slug}
                          game={game}
                          repo={repo}
                          entry={{
                              name: data?.versionInfo.mapName ?? "",
                              version: data?.versionInfo.version ?? 0,
                              slug: data?.slug ?? "",
                          }}
                      />
                  ))
              ) : (
                  <Box>There are currently no maps for this repo.</Box>
              )}
          </Stack>
          <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
      </Box>
  );
}

export const UYACustomMaps = () => {
    const [game, setGame] = useState(GameType.UYA_NTSC);
    const { data: customMapRepos } = useCustomMapRepos(game);

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
                {customMapRepos && (
                    <Box>
                        {customMapRepos.map((repo) => {
                            return (
                                <UYACustomMapRepo repo={repo} game={game} />
                            );
                        })}
                    </Box>
                )}
            </Container>
        </Box>
    );
};
