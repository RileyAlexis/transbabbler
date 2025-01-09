import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//RadixUI
import { Tabs } from "@radix-ui/themes";

//Components
import { BabbleHeader } from "../BabbleHeader";
import { Collections } from "./Collections";
import { DbOptions } from "./DbOptions";
import { AddWordsToCollection } from "./AddWordsToCollection";

//Types
import { BabbleRootState } from "src/Types/BabblerRootState";


export const AdminPanel: React.FC = () => {
    const database = useSelector((state: BabbleRootState) => state.database);
    const [collection, setCollection] = useState("nouns");

    useEffect(() => {
        console.log(collection);
    }, [collection]);

    return (
        <>
            <BabbleHeader />
            <div className="adminContainer">
                <div style={{
                    display: 'flex',
                    gap: 10
                }}>
                    <AddWordsToCollection collection={collection} database={database.selectedDatabase} />
                    <DbOptions />
                </div>
                <Tabs.Root style={{
                    width: '100%'
                }}>
                    <Tabs.List style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Tabs.Trigger value="Nouns" onClick={() => setCollection("nouns")}>Nouns</Tabs.Trigger>
                        <Tabs.Trigger value="Verbs" onClick={() => setCollection("verbs")}>Verbs</Tabs.Trigger>
                        <Tabs.Trigger value="Adjectives" onClick={() => setCollection("adjectives")}>Adjectives</Tabs.Trigger>
                        <Tabs.Trigger value="Prefixes" onClick={() => setCollection("prefixes")}>Prefixes</Tabs.Trigger>
                        <Tabs.Trigger value="Suffixes" onClick={() => setCollection("suffixes")}>Suffixes</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="Nouns">
                        <Collections collection={collection} />
                    </Tabs.Content>

                    <Tabs.Content value="Verbs">
                        <Collections collection={collection} />

                    </Tabs.Content>

                    <Tabs.Content value="Adjectives">
                        <Collections collection={collection} />

                    </Tabs.Content>

                    <Tabs.Content value="Prefixes">
                        <Collections collection={collection} />

                    </Tabs.Content>

                    <Tabs.Content value="Suffixes">
                        <Collections collection={collection} />

                    </Tabs.Content>

                </Tabs.Root>
            </div>
        </>
    )
}