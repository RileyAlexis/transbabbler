import { Tabs } from "@radix-ui/themes";

import { BabbleHeader } from "../BabbleHeader";
import { Collections } from "./Collections";

import { DbOptions } from "./DbOptions";

export const AdminPanel: React.FC = () => {


    return (
        <>
            <BabbleHeader />
            <div className="adminContainer">
                <DbOptions />
                <Tabs.Root style={{
                    width: '100%'
                }}>
                    <Tabs.List style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Tabs.Trigger value="Nouns">Nouns</Tabs.Trigger>
                        <Tabs.Trigger value="Verbs">Verbs</Tabs.Trigger>
                        <Tabs.Trigger value="Adjectives">Adjectives</Tabs.Trigger>
                        <Tabs.Trigger value="Prefixes">Prefixes</Tabs.Trigger>
                        <Tabs.Trigger value="Suffixes">Suffixes</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="Nouns">
                        <Collections collection="nouns" />
                    </Tabs.Content>

                    <Tabs.Content value="Verbs">
                        <Collections collection="verbs" />

                    </Tabs.Content>

                    <Tabs.Content value="Adjectives">
                        <Collections collection="adjectives" />

                    </Tabs.Content>

                    <Tabs.Content value="Prefixes">
                        <Collections collection="prefixes" />

                    </Tabs.Content>

                    <Tabs.Content value="Suffixes">
                        <Collections collection="suffixes" />

                    </Tabs.Content>

                </Tabs.Root>
            </div>
        </>
    )
}