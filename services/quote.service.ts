const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type QouteData = {
    quote: string;
    author: string;
};

export const getQuote = async () : Promise<QouteData | null> => {
    try {
        const res = await fetch("https://api.api-ninjas.com/v2/quoteoftheday", {
            headers: {
                "X-Api-Key": API_KEY || "",
            }
        });
        const data = await res.json();
        if(res.ok) {
            return data[0];
        }
        return null;
    } catch (error) {
        console.error("Error fetching quote:", error);
        return null;
    }
}