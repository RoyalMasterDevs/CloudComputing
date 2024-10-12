import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

const client = new TranslateClient({});

export const handler = async (event) => {
    try {
        // Hacemos la solicitud a la API para obtener la cita
        const quotes = await fetch("http://api.quotable.io/quotes/random")
            .then(res => res.json())
            .catch(error => {
                throw new Error("Error al obtener la cita: " + er
throw new Error("Error al obtener la cita: " + error.message);
            });

        // Verificamos si el contenido de la cita existe
        if (!quotes || !quotes.content) {
            throw new Error("El contenido de la cita está vacío o no se obtuvo correctamente.");
        }

        // Creamos el comando de traducción
        const command = new TranslateTextCommand({
            Text: quotes.content,
            SourceLanguageCode: "en",
            TargetLanguageCode: "es"
        }
// Enviamos la solicitud de traducción
const TranslatedText = await client.send(command);

// Devolvemos la cita traducida y el autor
return {
    cita: TranslatedText.TranslatedText,  // Asegúrate de obtener el texto traducido correctamente
    autor: quotes.author
};
} catch (error) {
// En caso de error, devolvemos un mensaje adecuado
console.error("Error en el proceso de traducción: ", error.message);
return {
    statusCode: 500,
    body: JSON.stringify({ message: "Error en el proceso de traducción", error: error.message })
};
}
};