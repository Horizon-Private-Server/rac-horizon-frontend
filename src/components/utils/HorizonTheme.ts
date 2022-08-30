import { createTheme } from "@mui/material";

export const horizonThemeDark = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: "#888888",
        },
    },
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    // Create a greyish backdrop to emphasize the modal.
                    backgroundColor: "rgba(50,50,50,0.5)",
                },
            },
        },
    },
});

export const horizonThemeLight = createTheme({
    palette: {
        mode: "light",
        secondary: {
            main: "#888888",
        },
    },
});
