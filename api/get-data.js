export default async function handler(req, res) {
    const instrument = req.query.instrument || 'EUR/USD';
    const encodedInstrument = encodeURIComponent(instrument);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    const url = `https://mds-api.forexfactory.com/bars?to=${currentTimestamp}&interval=M5&instrument=${encodedInstrument}&per_page=290&extra_fields=`;

    try {
        const fetchRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });
        const data = await fetchRes.json();
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}
