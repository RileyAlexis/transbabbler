import { useState } from "react";
import axios from "axios";

import { Button, TextField, Tabs, Text } from "@radix-ui/themes";


import { BabbleHeader } from "../BabbleHeader";
import { Collections } from "./Collections";

import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";

export const AdminPanel: React.FC = () => {

    const [collection, setCollection] = useState<string | undefined>();

    // const handleLoadCollection = () => {
    //     if (collection) {
    //         axios.get(`api/words/loadCollection/${collection}`)
    //             .then((response) => {
    //                 setAllWords(response.data);
    //             }).catch((error) => {
    //                 console.error(error);
    //             })
    //     } else {
    //         setError('Must select Collection to load');
    //     }
    // }

    // const handleAddWord = () => {
    //     if (wordToAdd !== '' && wordType) {
    //         axios.post(`/api/words/AddOneWord`, { word: wordToAdd, type: wordType }, { withCredentials: true })
    //             .then((response) => {
    //                 console.log(response.data.message);
    //                 setWordToAdd('');
    //                 handleLoadCollection();
    //             }).catch((error) => {
    //                 console.error(error);
    //             })
    //     }
    // }

    // const handleDeleteWord = (id: string) => {
    //     axios.delete(`/api/words/deleteWord/${id}/${collection}`)
    //         .then((response) => {
    //             console.log(response.data.message);
    //             handleLoadCollection();
    //         }).catch((error) => {
    //             console.error(error);
    //         })
    // }


    return (
        <>
            <BabbleHeader />
            <div className="adminContainer">
                <Tabs.Root>
                    <Tabs.List>
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