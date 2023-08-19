
## Introduction:

This application is a customer support chatbot powered by the GPT-2 model from Hugging Face. Users can interact with the chatbot to receive responses generated based on their input messages.

## Prerequisites

Node.js and npm: [Download](https://nodejs.org/)


## Installation
Clone the repository to your local machine

git clone https://github.com/MounikaArra/chatbot-gpt2.git
cd chatbot-gpt2

Install the dependencies

npm install

## Usage

Start the server by running the following command:

npm start

Open your broswer and go to 'http://localhost:3000'

## How to use:

Enter your message in the input field and click "Send" or clicking "Enter" key
The chatbot will respond with a generated response

For production to deploy the app you can use Docker to conternarize

1. Build the Docker image:

docker build -t chatbot-gpt2

2. Deploy using Docker compose:

docker-compose up -d
