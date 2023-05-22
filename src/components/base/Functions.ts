export function formatTime(time: number, shorten: boolean = false) {
    let days = Math.floor(time / 86400);
    time -= days * 86400;

    let hours = Math.floor(time / 3600);
    time -= hours * 3600;

    let minutes = Math.floor(time / 60);
    time -= minutes * 60;

    let seconds = time;

    let daysFormatted = "";

    if (days > 0) {
        daysFormatted += `${days}D `;
    }

    let secondsFormatted = `${seconds}`
    if (seconds < 10) {
        secondsFormatted = `0${secondsFormatted}`;
    }
    let minutesFormatted = `${minutes}`
    if (minutes < 10) {
        minutesFormatted = `0${minutesFormatted}`;
    }

    if (shorten) {
        return `${(minutes + (hours * 60) + (days * 1440))}:${secondsFormatted}`;
    } 
    else {
        return `${daysFormatted}${hours}:${minutesFormatted}:${secondsFormatted}`;
    }
}   

export function computeSkillLevel(rank: number) {

    let DEADLOCKED_SKILLS_TABLE = [
        0,
        200,
        800,
        1600,
        2500,
        3500,
        5000,
        6500,
        8000,
        9500
    ]

    let i = 0
    if (rank >= DEADLOCKED_SKILLS_TABLE[9]) {
        return "10.00"
    }
    if (rank <= DEADLOCKED_SKILLS_TABLE[0]) {
        return "1.00"
    }

    while (rank > DEADLOCKED_SKILLS_TABLE[i]) {
        i += 1
    }
    
    return (i + (rank - DEADLOCKED_SKILLS_TABLE[i-1]) / (DEADLOCKED_SKILLS_TABLE[i] - DEADLOCKED_SKILLS_TABLE[i-1])).toFixed(2);
}

export function addCommasToNumber(amount: string | number) {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}