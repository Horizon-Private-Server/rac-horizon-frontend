import React from "react";

import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import { Backbar } from "../../components/base/Backbar";
import { TextHeading, TextList } from "../../components/base/TextComponents";

export const ConfigurePCSX2 = () => {

    return <Box
        marginLeft={4}
        marginRight={4}
        marginBottom={4}
    >
        <Backbar previous={"/getting-started"} />
        <Card>
            <CardContent>

                <TextHeading heading="PCSX2 Tweaks &amp; Optimizations" variant="h4" />

                <Typography>
                    Test
                </Typography>

                <TextList
                    items={[
                        "Test",
                    ]}
                    ordered={true}
                />

                <TextHeading heading="Horizon Rules" variant="h5" />

            </CardContent>
        </Card>
        
    </Box>;

}