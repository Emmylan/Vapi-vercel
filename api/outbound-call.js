js
export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { toolCallId, args } = req.body;
  const { toNumber, fromNumber } = args;

  if (!toNumber || !fromNumber) {
    return res.status(400).json({
      results: [
        {
          toolCallId,
          error: 'Missing toNumber or fromNumber'
        }
      ]
    });
  }

  const responsePayload = {
    results: [
      {
        toolCallId,
        functionCall: {
          name: "transferCall",
          parameters: {
            destination: {
              type: "number",
              number: toNumber,
              caller_id: fromNumber,
              message: "Please hold while I connect you."
            }
          }
        }
      }
   ]
  };

  return res.status(200).json(responsePayload);
}

