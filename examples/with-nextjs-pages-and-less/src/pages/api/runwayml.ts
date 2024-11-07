import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { image, prompt } = req.body;

    try {
      const response = await axios.post('https://api.runwayml.com/v1/image-to-video', {
        image,
        prompt,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.RUNWAYML_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error processing request' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
