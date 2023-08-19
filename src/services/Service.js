import fetch from "node-fetch";

export async function query(data) {
    const API_TOKEN = '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'
    const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result =  await response.json();
    return result;
}