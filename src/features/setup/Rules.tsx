import React from "react";

import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import { Backbar } from "../../components/base/Backbar";
import { TextHeading, TextList } from "../../components/base/TextComponents";

export const Rules = () => {

    return <Box
        marginLeft={4}
        marginRight={4}
        marginBottom={4}
    >
        <Backbar previous={"/getting-started"} />
        <Card>
            <CardContent>

                <TextHeading heading="Horizon Private Server Rules and Policies" variant="h4" />

                <Typography>
                    This section contains important rules and policies that the Horizon staff has put in place.  
                    Unless otherwise noted, everything on this page applies in all of the following places:  
                </Typography>

                <TextList
                    items={[
                        "The Horizon Discord server.",
                        "The Ratchet and Clank: Up Your Arsenal/Ratchet and Clank 3 game server that Horizon runs.",
                        "The Ratchet: Deadlocked/Ratchet: Gladiator game servers that Horizon runs.",
                        "All test game servers that Horizon runs."
                    ]}
                    ordered={true}
                />

                <TextHeading heading="Horizon Rules" variant="h5" />

                <Typography>
                    As listed in the <code>#rules</code> channel of the <Link href="https://discord.com/invite/horizonps">Horizon Discord Server</Link>, all players are expected to follow these rules.
                </Typography>

                <TextList
                    items={[
                        "Respect each other. No discrimination, persistent insults or uncomfortable/sensitive issues.",
                        "No toxicity. This includes but is not limited to: repeatedly trying to force others to play the games in a certain way, lack of common sense, or being excessively negative or combative.",
                        "Please try to keep conversations in the appropriate channels here on Discord. Linking to other Discord servers is also prohibited without prior approval from staff.",
                        "Flooding and/or spamming messages is not allowed, nor is any NSFW content.",
                        "Death/assault threats (both written and verbal) are strictly prohibited. These threats will result in immediate bans from both game servers and this Discord server."
                    ]}
                    ordered={true}
                />

                <TextHeading heading="Horizon Disciplinary Policy" variant="h5" />
                <Typography>This section outlines the Horizon Disciplinary Policy. If a user violates the rules above, Horizon staff will generally follow the three-step disciplinary policy outlined here.</Typography>
                
                <TextHeading heading="1. Warnings" variant="h6" />
                <Typography>The first time that a user violates the rules ("Warned Once" level):</Typography>
                 
                <TextList
                    items={[
                        "The user will receive a message from a Horizon staff member explaining the warning. ",
                        "The user will be muted for one hour.",
                        "The user will be given the \"Warned Once\" role.",
                        "The warning will expire in 3 months if there are no additional violations."
                    ]}
                    ordered={false}
                />

                <TextHeading heading="2. Mutes" variant="h6" />
                <Typography>The second time that a user violates the rules ("Warned Twice" level):</Typography>
                 
                 <TextList
                     items={[
                         "The user will receive a message from a Horizon staff member explaining the warning.",
                         "The user will be muted for one day.",
                         "The user will be blocked from all voice chat channels.",
                         "The user will be given the \"Warned Twice\" role.",
                         "The warning will expire in 6 months if there are no additional violations."
                     ]}
                     ordered={false}
                 />

                <TextHeading heading="3. Bans" variant="h6" />
                <Typography>The third time that a user violates the rules:</Typography>
                 
                 <TextList
                     items={[
                        "The user will be banned from the Horizon Discord server.",
                        "At the discretion of the UYA Staff, the user may be banned from the UYA/R&C 3 game server.", 
                        "At the discretion of the DL Staff, the user may be banned from the DL/Gladiator game servers.",
                        "The ban will expire in 9 months."
                     ]}
                     ordered={false}
                 />

                <TextHeading heading="Ban Expiration" variant="h5" />
                <Typography marginBottom={2}>
                    Horizon has a universal 9 month "ban expiration" policy in place.
                    This means that 9 months after the date a user is banned, he/she will be unbanned (from the Discord server, and any game servers as applicable).
                    Horizon staff will not reach out to users to remind them of their "unban date", but the date is documented by staff and available upon request.
                    If you believe that over 9 months have passed and you have not been unbanned, you may contact a Horizon staff member via direct message on Discord for assistance.
                    Please keep in mind that unbanning is a manual process that requires time and effort from Horizon staff.
                </Typography>

                <Typography>
                    Horizon staff expects that all community members will treat any previously banned users who choose to rejoin with respect, and give them the same new chance to be a part of the community that we (the staff) are giving them.
                    Of course, Horizon staff will also be keeping a close eye on them. All previously banned users will be started at the "Warned Once" level outlined above, and the 3 month and 6 month warning expirations will not apply (i.e., warnings never expire for previously banned users).
                </Typography>
                
                <TextHeading heading="Exceptions" variant="h5" />
                <Typography>There are a few exceptions to the Horizon Disciplicary Process that should be noted.</Typography>

                <TextList 
                    items={[
                        "Horizon staff, at their discretion, may issue informal warnings that do not carry the above consequences (e.g., to first-time offenders and those whose violations are considered mild). Horizon staff will clarify whether warnings are informal or not.",
                        "For severe offenses, Horizon staff may also skip steps above. For example, as stated in rule #5, death/assault threats are strictly prohibited - so users who break this rule may be banned immediately even if they have not been previously warned.",
                        "Discord now officially supports account switching, but we DISCOURAGE the use of multiple Discord accounts because of the confusion it causes for other community members. Any disciplinary steps applied to one of your Discord accounts will also be applied to all of your other Discord accounts that we are aware of. For example, if your main account receives a first formal warning and we know that you also have a second account, that second account would also have the warning applied to it."
                    ]}
                    ordered={true}
                />

                <TextHeading heading="Exile from UYA/DL" variant="h5" />
                <Typography>
                    While we encourage community members to try both UYA/R & C 3 and DL/Gladiator, we recognize that most players do have a clear favorite between the two games (including all Horizon staff members).
                    Unfortunately, we have seen some players take this too far and make it their mission to visit the channels for the other game only to stir the pot and create drama.
                    To address this, the Horizon staff has created exile roles and applied them to users as needed.
                    The "Exiled from UYA" role means that all channels in the UYA section will be hidden from the user.
                    The "Exiled from DL" role means that all channels in the DL section will be hidden from the user.
                </Typography>

                <Box marginBottom={3} />

                <TextHeading heading="Horizon Staff Expectations" variant="h4" />
                <Typography>You can expect Horizon staff members to try their best to:</Typography>

                <TextList
                     items={[
                        "Treat all community members equally and with respect. ",
                        "Resolve any and all disputes democratically. If you have an issue, please tag the Moderators role to get our attention. ", 
                        "Be transparent and honest with community members at all times.",
                        "Take community feedback into account as much as possible."
                     ]}
                     ordered={false}
                 />

                <Box marginBottom={4} />

                 <Typography variant="h5" fontWeight="bold">Thank you for being a part of the Horizon community!</Typography>

            </CardContent>
        </Card>
        
    </Box>;

}