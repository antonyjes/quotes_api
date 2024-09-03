import { Heading } from "@/components/heading";
import RootLayout from "../layout";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { rapidApiKey } from "../../../config";
import { Bookmark, Download, TwitterIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [author, setAuthor] = useState("Anonymous");

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
      setAuthor(quote.a);

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

      setBackgroundImage('url("https://picsum.photos/900/500")');
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
              <div className="flex flex-col lg:flex-row">
                <div
                  className="bg-cover bg-center rounded-lg flex items-center justify-center max-w-[900px] h-[500px]"
                  style={{ backgroundImage: backgroundImage }}
                >
                  <div className="p-10 text-5xl text-center text-shadow-custom">
                    <p className="font-pacifico">{quote}</p>
                    {author && author !== "Anonymous" ? (
                      <p className="text-3xl font-bold mt-5">{author}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex p-8 gap-4">
                  <div className="grid grid-rows-3">
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <TwitterIcon className="w-6 h-6" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Compartir en Twitter</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Bookmark className="w-6 h-6" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Añadir a favoritos</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Download className="w-6 h-6" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Descargar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
