import { Box, CircularProgress, Container, Grid, Stack } from "@mui/material";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import { GameType } from "../../constants/game";
import { useCustomMapsIndex } from "../../hooks/custom-maps";
import { CustomMapCard } from "../../components/base/CustomMapCard";
import { WaitFor } from "../../components/base/WaitFor";

export const DeadlockedCustomMaps = () => {
    const customMapsIndex = useCustomMapsIndex(GameType.DL_NTSC);
    const { data: customMapsEntries, status } = customMapsIndex;

    return (
        <Box>
            <HorizonBreadcrumbs
                paths={[
                    { text: "Deadlocked", route: "/deadlocked" },
                    { text: "Custom Maps", route: "/deadlocked/custom-maps" },
                ]}
            />
            <Container maxWidth="xl">
                <WaitFor data={customMapsIndex}>
                    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
                        {customMapsEntries?.map((entry) => (
                            <CustomMapCard key={entry.slug} game={GameType.DL_NTSC} entry={entry} />
                        ))}
                    </Stack>
                </WaitFor>
            </Container>
        </Box>
    );
};
