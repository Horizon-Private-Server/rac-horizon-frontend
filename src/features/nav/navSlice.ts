export interface NavItemState {
    label: string, 
    tooltip: string, 
    icon: JSX.Element, 
    path: string,
    hidden: boolean
}

export interface NavState {
    header: string,
    headerAbbreviated: string,
    logo?: JSX.Element,
    navItems: NavItemState[],
    children: JSX.Element | JSX.Element[]
}

export const NAV_ITEM_NAME = "HORIZON/NAV"
