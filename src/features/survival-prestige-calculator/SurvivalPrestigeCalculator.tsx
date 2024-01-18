import React, { useState } from "react";
import {Box, TextField, Typography, Stack, Alert} from "@mui/material";

export function skillLevelToRank(skillLevel: number): number {

    if (skillLevel >= 10) {
        return 9500;
    }
    if (skillLevel <= 1) {
        return 0;
    }

    let baseSkill: number = Math.floor(skillLevel);

    let stats: {[code: number]: number} = {
        1: 0,
        2: 200,
        3: 800,
        4: 1600,
        5: 2500,
        6: 3500,
        7: 5000,
        8: 6500,
        9: 8000,
        10: 9500
    }

    let delta = stats[baseSkill + 1] - stats[baseSkill]

    return Math.floor(stats[baseSkill] + (delta * (skillLevel - baseSkill)));
}

export function rankToRemainingBolts(rank: number): number {
    return (10000 - rank) * 5000;
}

export function commaToNumber(value: number): string {
    // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SurvivalPrestigeCalculator = () => {

    const [skillLevel, setSkillLevel] = useState<string>("1.00");
    const [skillLevelNum, setSkillLevelNum] = useState<null | number>(1.00);


    return <Box
        sx={{
            border: 1,
            borderColor: "white",
            borderRadius: 2,
            p: 5
        }}
    >

        <Typography variant="h4" sx={{mb: 2}}>Survival Prestige Calculator</Typography>

        <TextField
            value={skillLevel}
            label="Enter your Skill Level"
            fullWidth
            onChange={(event) => {

                let eventArray: string[] = event.target.value.split("");
                let dotCount: number = 0;

                for (let i in eventArray) {

                    if (!"1234567890.".includes(eventArray[i])) {
                        return;
                    }

                    if (eventArray[i] === ".") {
                        dotCount++;
                        if (dotCount > 1) {return;}
                    }
                }

                setSkillLevel(event.target.value)
                let skillLevelFloat = parseFloat(event.target.value);

                if (!isNaN(skillLevelFloat)) {
                    setSkillLevelNum(skillLevelFloat);
                }
                else {
                    setSkillLevelNum(null);
                }

            }}
        />

        <Stack direction="row" justifyContent="flex-start" sx={{mt: 5}}>
            <img
                src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_6.png"
                alt="bolt icon"
                width={28}
                height={28}
                style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(220deg)"}}
            />
            <Stack direction="column" justifyContent="center">
                <Typography variant="h5" sx={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(220deg)", ml: 1}}>
                    {
                        skillLevelNum === null ? "-------------" : commaToNumber(
                            rankToRemainingBolts(
                                skillLevelToRank(skillLevelNum as number)
                            )
                        )
                    }
                    {
                        skillLevelNum === null ? "--" : " Remaining"
                    }
                </Typography>
            </Stack>
        </Stack>

        <Alert severity="info" sx={{mt: 4}}>
            Survival ranks are based the the same number scale developed by Insomniac Games. A 10.00 is not the maximum
            rank available. There is an additional 500 points required to reach maximum rank. This translates to an
            additional 2.5 Million bolts after reaching an in-game 10. This additional amount may be required for you
            to prestige.
        </Alert>

    </Box>

}

export default SurvivalPrestigeCalculator;
