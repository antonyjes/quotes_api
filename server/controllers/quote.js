export const getRamdomQuote = async (req, res) => {
    try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}