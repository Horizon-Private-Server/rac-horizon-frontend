import React from "react";
import { Box, Typography } from "@mui/material";
import SpoilerGuard from "../../../../components/base/SpoilerGuard";
import { CodeBox } from "../../../../components/base/TextComponents";

export interface FormulaSpoilerProps {
    formulas: string[];
    notes?: string | JSX.Element;
}

// formulas are hidden behind a spoiler guard
export const FormulaSpoiler = (props: FormulaSpoilerProps) => {

    const {formulas, notes} = props;

    return <Box marginBottom={3}>
        <SpoilerGuard weight={5}>
            <Box>
                {formulas.map((formula) => <Box key={formula} marginBottom={1}><CodeBox>{formula}</CodeBox></Box>)}
                {notes && <Typography marginTop={2}>{notes}</Typography>}
            </Box>
        </SpoilerGuard>
    </Box>;
};

export default FormulaSpoiler;
