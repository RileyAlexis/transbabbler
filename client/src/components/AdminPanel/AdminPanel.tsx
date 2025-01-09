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
import { BabbleRootState } from "../../Types/BabblerRootState";
import { loadCollection } from "../../modules/loadCollection";


export const AdminPanel: React.FC = () => {
    const database = useSelector((state: BabbleRootState) => state.database);
    const [collection, setCollection] = useState("nouns");
    const [allWords, setAllWords] = useState<string[]>([]);


    const handleCollectionChange = async (collection: string) => {
        loadCollection(database.selectedDatabase, collection)
            .then((response) => {
                setCollection(collection);
                console.log(response);
                setAllWords(response);
            }).catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
            <BabbleHeader />
            <div className="adminContainer">
                <div style={{
                    display: 'flex',
                    gap: 10
                }}>
                    <AddWordsToCollection collection={collection} database={database.selectedDatabase} setAllWords={setAllWords} />
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
                        <Tabs.Trigger value="Nouns" onClick={() => handleCollectionChange("nouns")}>Nouns</Tabs.Trigger>
                        <Tabs.Trigger value="Verbs" onClick={() => handleCollectionChange("verbs")}>Verbs</Tabs.Trigger>
                        <Tabs.Trigger value="Adjectives" onClick={() => handleCollectionChange("adjectives")}>Adjectives</Tabs.Trigger>
                        <Tabs.Trigger value="Prefixes" onClick={() => handleCollectionChange("prefixes")}>Prefixes</Tabs.Trigger>
                        <Tabs.Trigger value="Suffixes" onClick={() => handleCollectionChange("suffixes")}>Suffixes</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="Nouns">
                        <Collections collection={collection} allWords={allWords} setAllWords={setAllWords} />
                    </Tabs.Content>

                    <Tabs.Content value="Verbs">
                        <Collections collection={collection} allWords={allWords} setAllWords={setAllWords} />

                    </Tabs.Content>

                    <Tabs.Content value="Adjectives">
                        <Collections collection={collection} allWords={allWords} setAllWords={setAllWords} />

                    </Tabs.Content>

                    <Tabs.Content value="Prefixes">
                        <Collections collection={collection} allWords={allWords} setAllWords={setAllWords} />

                    </Tabs.Content>

                    <Tabs.Content value="Suffixes">
                        <Collections collection={collection} allWords={allWords} setAllWords={setAllWords} />

                    </Tabs.Content>

                </Tabs.Root>
            </div>
        </>
    )
}