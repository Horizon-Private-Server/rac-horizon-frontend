import React, {} from "react";

import Chart from "chart.js/auto";
import {Radar} from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import {Box} from "@mui/material";

export interface UYAStatsChartProps {
    deathmatchRank: number;
    siegeRank: number;
    ctfRank: number;
}

Chart.register(CategoryScale);
Chart.defaults.borderColor = "rgba(255, 255, 255, 0.25)";
Chart.defaults.color = "#FFFFFF";

const UYAStatsChart = (props: UYAStatsChartProps) => {

    const {deathmatchRank, siegeRank, ctfRank} = props;

    // @ts-ignore
    return <Box className="chart-container" sx={{maxWidth: "40vw", maxHeight: "40vh"}}>
        <Radar
            data={{
                labels: ["Deathmatch", "Conquest", "KOTH", "CTF", "Juggernaut"],
                datasets: [
                    {
                        label: "Player",
                        data: [deathmatchRank, siegeRank, ctfRank],
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        pointBackgroundColor: [
                            "rgba(255, 0, 0, 1)",
                            "rgba(0, 0, 255, 1)",
                            "rgba(255, 0, 255, 1)",
                            "rgba(255, 255, 0, 1)",
                            "rgba(0, 255, 255, 1)"
                        ],
                        borderColor: "rgba(255, 255, 255, 1)"
                    }
                ]
            }}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Rank Distribution"
                    },
                    legend: {
                        display: false
                    },
                    subtitle: {
                        display: false
                    },
                    tooltip: {

                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 5000,
                        ticks: {
                            display: false
                        },
                    },
                },

            }}
        />
    </Box>

}

export default UYAStatsChart;