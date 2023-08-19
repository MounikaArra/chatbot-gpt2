import axios from 'axios';

const apiToken = process.env.REACT_APP_HUGGING_FACE_TOKEN;
const api = process.env.REACT_APP_MICROSOFT_GPT_API
const gptConvesation = async (conversationHistory, text) => {
    //https://huggingface.co/docs/api-inference/detailed_parameters#conversational-task
    const past_user_inputs = conversationHistory.filter(m => m.user).map(m => m.text);
    const generated_responses = conversationHistory.filter(m => !m.user).map(m => m.text);
    var data = {
        "inputs": {
            past_user_inputs,
            generated_responses,
            text
        }
    };

    const headers = {
        headers: { Authorization: `Bearer ${apiToken}` }
    };

    return axios.post(api, data, headers);
};

export default gptConvesation;