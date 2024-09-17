import { Typography, Box, CardContent, Card, Stack } from "@mui/material";

export interface NotFoundCardProps {
    message: string;
}


const NotFoundCard = (props: NotFoundCardProps) => {
    const { message } = props;

    const availableIcons: string[][] = [
        ["https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_3.png", "Ted Price"],
        ["https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_128.png", "Eviscerator"],
        ["https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_129.png", "Reactor"],
        ["https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_130.png", "Shellshock"],
        ["https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_131.png", "Ace Hardlight"],
        ["https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_132.png", "Gleeman Vox"],
    ]

    let selected: string[] = availableIcons[Math.floor(Math.random() * (availableIcons.length))];

    return <Card sx={{width: "80vw"}}>
        <CardContent>
            <Stack direction="row" justifyContent="center">
                
                <img src={selected[0]} alt={selected[1]} width={100} height={100} />
                <Box sx={{marginRight: 2}} />
                <Stack direction="column" justifyContent="flex-start">
                    <Typography fontWeight="bold" fontSize={32}>404</Typography>
                    <Typography fontWeight="bold" fontSize={16}>{message}</Typography>
                </Stack>
            </Stack>
        </CardContent>
    </Card>
}

export default NotFoundCard;