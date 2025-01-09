export const wordsToArray = (dataObj: any): [] => {
    const wordsArray = dataObj.map((item: { word: string }) => item.word);
    return wordsArray;
}
