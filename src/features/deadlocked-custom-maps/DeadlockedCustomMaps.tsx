import { Box, Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import { GameType } from "../../constants/game";
import { CustomMapRepoEntry, useCustomMapRepos, useCustomMapRepoIndex, useGetAllCustomMapRepoVersions } from "../../hooks/custom-maps";
import { CustomMapCard } from "../../components/base/CustomMapCard";
import { CustomGameModeDL, CustomGameModeNamesDL, CustomGameModeUYA } from "../../constants/game-mode";
import { getCustomMapResourceInfo } from "../../api/dao/custom-maps";
import { downloadFile } from "../../utils/file";

const onDownload = (repo: CustomMapRepoEntry, game: GameType) => {
    const { mapsZipFile } = getCustomMapResourceInfo(game);

    const url = `https://${repo.slug}/${mapsZipFile}`;
    downloadFile(url, `${repo.name}.zip`);
};

function DeadlockedCustomMapRepo({repo, game} : {
    repo: CustomMapRepoEntry
    game: GameType
}) {

    const customMapsIndex = useCustomMapRepoIndex(game, repo);
    const { data: customMapsMetadata } = useGetAllCustomMapRepoVersions(game, repo, customMapsIndex?.data?.map((entry) => entry.slug) ?? []);

    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <IconButton onClick={() => onDownload(repo, game)}><Download /></IconButton>
                <Typography variant="h3">{repo.name}</Typography>
            </Stack>
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

export const DeadlockedCustomMaps = () => {
    const game = GameType.DL_NTSC;
    const { data: customMapRepos } = useCustomMapRepos(game);

    return (
        <Box>
            <HorizonBreadcrumbs
                paths={[
                    { text: "Deadlocked", route: "/deadlocked" },
                    { text: "Custom Maps", route: "/deadlocked/custom-maps" },
                ]}
            />
            <Container maxWidth="xl">
                {customMapRepos && (
                    <Box>
                        <Stack spacing={2}>
                            {customMapRepos.map((repo) => {
                                return (
                                    <DeadlockedCustomMapRepo key={repo.name} repo={repo} game={game} />
                                );
                            })}
                        </Stack>
                    </Box>
                )}
            </Container>
        </Box>
    );
};
