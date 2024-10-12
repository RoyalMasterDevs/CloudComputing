export const handler = async (event) => {

    const quotes = await fetch("http://api.quotable.io/quotes/random").then(res => res.json())

    return quotes;
};
export const handler = async (event) => {

    const [quote] = await fetch("http://api.quotable.io/quotes/random").then(res => res.json())

    return quote;
};

/// Integrando el servicio de translate

import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
const client = new TranslateClient({});

export const handler = async (event) => {
    const [quote] = await fetch("http://api.quotable.io/quotes/random").then(res => res.json())

    const command = new TranslateTextCommand({
        Text: quote.content,
        SourceLanguageCode: "en",
        TargetLanguageCode: "es",
    });

    const { TranslatedText } = await client.send(command);

    return {
        cita: TranslatedText,
        autor: quote.author,
    };
};