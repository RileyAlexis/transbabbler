import { useState } from "react";
import { useSelector } from "react-redux";

//RadixUI
import { Tabs, Text } from "@radix-ui/themes";

//Components
import { BabbleHeader } from "../BabbleHeader";
import { Collections } from "./Collections";
import { NewDataSet } from "./NewDataSet";
import { AddWordsToCollection } from "./AddWordsToCollection";

//Types
import { BabbleRootState } from "../../Types/BabblerRootState";
import { DataSetSelector } from "../DataSetSelector";


export const AdminPanel: React.FC = () => {
    const database = useSelector((state: BabbleRootState) => state.database);
    const [collection, setCollection] = useState("nouns");
    const [allWords, setAllWords] = useState<string[]>([]);


    const handleCollectionChange = async (collection: string) => {
        setCollection(collection);
    }

    return (
        <>
            <BabbleHeader />
            <div className="adminContainer">
                <div style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <AddWordsToCollection collection={collection} database={database.selectedDatabase} setAllWords={setAllWords} />
                    <NewDataSet />
                    <DataSetSelector />
                    {allWords.length > 0 &&
                        <Text size="2" weight="bold">{allWords.length} entries</Text>
                    }
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