## HornChat

**HornChat** is a chatbot built with a combination of **Large Language Models(LLM)** and **Translation Systems** to solve linguistic problems of low-resource languages, currently _Tigrinya_ and _Amharic_.

![HornChat](./public/screenshots/screenshot-0402023.png)

## Deploy

**Vercel**

Host

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNegasiHaile%2FHornChat)

**Docker**

Build locally:

```shell
docker build -t chatgpt-ui .
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 chatgpt-ui
```

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/NegasiHaile/HornChat.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide Translaton key**

Create a `.env.local` file in the root of the project and add the following in to it:

```bash
LESAN_API_URL=https://api.lesan.ai/translate/v1
LESAN_API_KEY=YOUR_LESAN_API_KEY
```

**4. Provide OpenAI API Key**

And add the following OPENAI keys

```bash
OPENAI_API_TYPE=openai
OPENAI_API_HOST=https://api.openai.com
OPENAI_API_KEY=YOUR_OPENAI_KEY
OPENAI_API_VERSION='2023-03-15-preview'
```

**5. Provide MongoDB URL**

Add the following in to your `.env.local` file

```bash
MONGODB_URI=mongodb+srv://negasi:Goa3sixMQsxgLUGC@hornchat-v01.ogqsg0j.mongodb.net/HornChat?retryWrites=true&w=majority
```

> **[!NOTE]**
> If you need to use your own credentials, Please replace my MongoDB credentials with your own like the following

```bash
MONGODB_URI=mongodb+srv://YOUR_USER_NAME:YOUR_PASSWORD@hornchat-v01.ogqsg0j.mongodb.net/HornChat?retryWrites=true&w=majority
```

**5. Run App**
**A. For use only**

```bash
npm run build
```

Then

```bash
npm run start
```

**B. For development (If you need to make a change on the codebase and see your results)**

```bash
npm run dev
```

> **[!NOTE]**
> If you use the first option you will experiance a better performance (Fast page rendering and Fast response)

**6. Use It**

You should be able to start chatting.

## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                       | Description                                                                                                                               |
| --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| MONGODB_URL                       |                                     | `mongodb+srv://ADMIN_USER_NAME:ADMIN_PASSWORD@hornchat-v01.ogqsg0j.mongodb.net/HornChat_TG?retryWrites=true&w=majority`                   |
| LESAN_API_KEY                     |                                     | The default API key used for authentication with LESAN AI                                                                                 |
| OPENAI_API_URL                    | `https://api.lesan.ai/translate/v1` | Root API URL of LEAN AI                                                                                                                   |
| OPENAI_API_KEY                    |                                     | The default API key used for authentication with OpenAI                                                                                   |
| OPENAI_API_HOST                   | `https://api.openai.com`            | The base url, for Azure use `https://<endpoint>.openai.azure.com`                                                                         |
| OPENAI_API_TYPE                   | `openai`                            | The API type, options are `openai` or `azure`                                                                                             |
| OPENAI_API_VERSION                | `2023-03-15-preview`                | Only applicable for Azure OpenAI                                                                                                          |
| AZURE_DEPLOYMENT_ID               |                                     | Needed when Azure OpenAI, Ref [Azure OpenAI API](https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference#completions) |
| OPENAI_ORGANIZATION               |                                     | Your OpenAI organization ID                                                                                                               |
| DEFAULT_MODEL                     | `gpt-3.5-turbo`                     | The default model to use on new conversations, for Azure use `gpt-35-turbo`                                                               |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts)      | The default system prompt to use on new conversations                                                                                     |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                                   | The default temperature to use on new conversations                                                                                       |
| GOOGLE_API_KEY                    |                                     | See [Custom Search JSON API documentation][GCSE]                                                                                          |
| GOOGLE_CSE_ID                     |                                     | See [Custom Search JSON API documentation][GCSE]                                                                                          |

If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).
