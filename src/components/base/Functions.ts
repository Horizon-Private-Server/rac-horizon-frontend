import {Optional} from "../../utils/Interfaces";

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

    if (rank >= DEADLOCKED_SKILLS_TABLE[9]) {
        return "10.00"
    }
    if (rank <= DEADLOCKED_SKILLS_TABLE[0]) {
        return "1.00"
    }

    let i = 0
    while (rank > DEADLOCKED_SKILLS_TABLE[i]) {
        i += 1
    }

    let rawSkillLevel: number = i + (rank - DEADLOCKED_SKILLS_TABLE[i-1]) / (DEADLOCKED_SKILLS_TABLE[i] - DEADLOCKED_SKILLS_TABLE[i-1]);
    let processedSkillLevel: number = Math.floor(rawSkillLevel * 100) / 100;

    return processedSkillLevel.toFixed(2);
}

export function addCommasToNumber(amount: string | number) {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isNumeric(n: number) {
    return !isNaN(parseFloat(n.toString())) && isFinite(n);
}

export function titleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export function domainFormatting(domain: string, mobile: boolean): string {

    if (mobile) {
        switch (domain.replaceAll("_", " ").toLowerCase()) {
            case "koth":
                return "KOTH";
            case "ctf":
                return "CTF";
            case "weapon":
                return "Weapons";
            case "vehicle":
                return "Vehicles";
            default:
                return titleCase(domain.replaceAll("_", " "));
        }
    }

    switch (domain.replaceAll("_", " ").toLowerCase()) {
        case "koth":
            return "King of the Hill";
        case "ctf":
            return "Capture the Flag";
        case "weapon":
            return "Weapons";
        case "vehicle":
            return "Vehicles";
        default:
            return titleCase(domain.replaceAll("_", " "));
    }
}

export function statFormatting(stat: string, mobile: boolean): string {

    if (mobile) {
        switch (stat.replaceAll("_", " ").toLowerCase()) {
            case "hunter mine launcher kills":
                return "Mine Kills";
            case "hunter mine launcher deaths":
                return "Mine Deaths";
            case "b6 obliterator kills":
                return "B6 Kills";
            case "b6 obliterator deaths":
                return "B6 Deaths";
            case "holoshield launcher kills":
                return "Holoshield Kills";
            case "holoshield launcher deaths":
                return "Holoshield Deaths";
            case "fusion rifle kills":
                return "Fusion Kills";
            case "fusion rifle deaths":
                return "Fusion Deaths";
            case "scorpion flail kills":
                return "Flail Kills";
            case "scorpion flail deaths":
                return "Flail Deaths";
            case "magma cannon kills":
                return "Magma Kills";
            case "magma cannon deaths":
                return "Magma Deaths";
            case "dual viper kills":
                return "Viper Kills";
            case "dual viper deaths":
                return "Viper Deaths";
            default:
                return titleCase(stat.replaceAll("_", " "));
        }
    }

    switch (stat.replaceAll("_", " ").toLowerCase()) {
        default:
            return titleCase(stat.replaceAll("_", " "));
    }
}

export function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())];
}

export function addNumericObjects<T extends {[key: string]: any}>(a: Optional<T>, b: Optional<T>, ignore: string[] = []): Optional<T> {

    if (a === null && b === null) {
        return null;
    }

    if (a === null && b !== null) {
        return {...b} as T;
    }

    if (a !== null && b === null) {
        return {...a} as T;
    }

    if (a !== null && b !== null)
    {

        let c = {};

        for (let prop in a) {
            if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {

                if (ignore.includes(prop)) {

                    // TODO figure out the correct way to type these.
                    // @ts-ignore
                    c[prop] = a[prop];
                    continue;
                }

                if (typeof b[prop] === "number" && typeof b[prop] === "number") {
                    // @ts-ignore
                    c[prop] = a[prop] + b[prop];
                }
                else if (typeof b[prop] === "object" && typeof b[prop] === "object") {
                    // @ts-ignore
                    c[prop] = addNumericObjects(a[prop], b[prop], ignore);
                }
            }
        }
        return c as T;
    }

    return null;
}

// TODO Implement aggregated data

//     const data = useAggregatedDeadlockedPlayerDetails([12049, 14279])
//
//     let aggregate: Optional<DeadlockedPlayerDetails> = null;
//
//     if (data != null) {
//         data.data.forEach((item) => {
//             aggregate = addNumericObjects<DeadlockedPlayerDetails>(aggregate, item ?? null, ["id", "username", "rank"])
//         })
//     }
