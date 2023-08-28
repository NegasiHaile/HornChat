import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  let reqBody = req.body;
  if (typeof req.body !== 'object') {
    reqBody = JSON.parse(req.body);
  }

  const { src_lang, tgt_lang } = req.query;
  const { text } = reqBody;
  const API_URL = process.env.LESAN_API_URL;
  const API_KEY = process.env.LESAN_API_KEY;

  if (!(!!src_lang && !!tgt_lang))
    res
      .status(400)
      .json({ message: 'Source or Target language not provided!' });

  if (API_URL && API_KEY) {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: API_KEY,
        text: text,
        src_lang: src_lang,
        tgt_lang: tgt_lang,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  } else {
    res
      .status(500)
      .json({ message: 'API_URL or KEY or both are not provided!' });
  }
}
