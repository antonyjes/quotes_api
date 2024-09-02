import { Heading } from "@/components/heading";
import RootLayout from "../layout";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { rapidApiKey } from "../../../config";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const dateToday = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getQuote = async () => {
    try {
      // Request random quote
      const response = await fetch("http://localhost:3003/quote/random-quote");
      const quote = await response.json();

      const data = new FormData();
      data.append("source_language", "en");
      data.append("target_language", "es");
      data.append("text", quote.q);
      
      const headers = new Headers({
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "x-rapidapi-key": rapidApiKey,
        "Accept-Encoding": "application/gzip",
      });

      // Translate quote
      const translatedQuote = await fetch(
        "https://text-translator2.p.rapidapi.com/translate",
        {
          method: "POST",
          headers: headers,
          body: data,
        }
      );
      const translated = await translatedQuote.json();
      setQuote(translated.data.translatedText);

      setBackgroundImage('url("https://picsum.photos/200/300")');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading title="La frase de hoy" description={dateToday} />
          <Separator />
          <div className="flex items-center justify-center">
            {backgroundImage ? (
              <div
                className="bg-cover bg-center w-[900px] h-[500px] rounded-lg flex items-center justify-center"
                style={{ backgroundImage: backgroundImage }}
              >
                <div className="p-10 text-5xl text-center font-pacifico text-shadow-custom">
                  {quote}
                </div>
              </div>
            ) : (
              <div>Loading..</div>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
