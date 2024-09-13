import { Heading } from "@/components/heading";
import RootLayout from "@/pages/layout";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Quote, User } from "@/lib/data";
import { QuoteSection } from "@/components/quote-section";
import { QuotesSection } from "@/pages/home/components/quotes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();

  const user = useSelector((state: { user: User | null }) => state.user);

  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [quote, setQuote] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [author, setAuthor] = useState("Anonymous");
  const [quoteId, setQuoteId] = useState(null);

  const dateToday = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getQuotes = async () => {
    try {
      const response = await fetch("http://localhost:3003/quote/all");
      const quotes = await response.json();
      setQuotes(quotes);
    } catch (error) {
      console.log(error);
    }
  };

  const preloadImages = () => {
    for (let i = 1; i < 11; i++) {
      const img = new Image();
      img.src = `/background-images/bg${i}.png`;
    }
  };

  const getQuote = async () => {
    try {
      const response = await fetch("http://localhost:3003/quote/random-quote");
      const quote = await response.json();

      setQuote(quote.content)
      setAuthor(quote.author)
      setQuoteId(quote._id)
      setBackgroundImage(`url(${quote.bgPath})`)
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewQuote = () => {
    if (!user){
      toast.error("Inicia sesión para crear una frase");
      return;
    }

    navigate("/quotes/create");
  }

  useEffect(() => {
    getQuotes();
    preloadImages();
    getQuote();
  }, []);

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-6 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="La frase de hoy" description={dateToday} />
            <Button onClick={handleNewQuote}>
              <Plus className="mr-2 h-4 w-4" />
              Add Quote
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-center">
            {backgroundImage ? (
              <QuoteSection
                backgroundImage={backgroundImage}
                quote={quote}
                author={author}
                user={user}
                quoteId={quoteId}
              />
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
          <div className="flex justify-center lg:items-center flex-col gap-2">
            <p className="lg:w-[70%] text-xl font-semibold">More quotes</p>
            <Separator className="lg:w-[70%]" />
          </div>
          <div className="flex justify-center items-center">
            {<QuotesSection quotes={quotes} />}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
