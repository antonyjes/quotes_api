import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Quote } from "@/lib/data";
import { cn } from "@/lib/utils";
import RootLayout from "@/pages/layout";
import { useEffect, useState } from "react";
import { QuotesSection } from "@/pages/home/components/quotes";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [activeAuthor, setActiveAuthor] = useState("Todos");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);

  const getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3003/quote/authors");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const authors = await response.json();
      setAuthors(authors);
    } catch (error) {
      console.log(error);
    }
  };  

  const getQuotes = async () => {
    try {
        const response = await fetch("http://localhost:3003/quote/all");

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const quotes = await response.json();
        setQuotes(quotes);
        setAllQuotes(quotes);
    } catch (error) {
        console.log(error);
    }
  }

  const filterQuotesByAuthor = () => {
    if (activeAuthor === "Todos") {
      setQuotes(allQuotes);
    } else {
      const filteredQuotes = allQuotes.filter((quote) => quote.author === activeAuthor);
      setQuotes(filteredQuotes);
    }
  }

  useEffect(() => {
    getAuthors();
    getQuotes();
  }, [])

  useEffect(() => {
    filterQuotesByAuthor();
  }, [activeAuthor]);  // eslint-disable-line

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-6 p-8 pt-6">
          <Heading title="Autores" description="Selecciona un autor" />
          <Separator />
          <div className="mb-4 flex items-center">
            <a
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                activeAuthor === "Todos"
                  ? "text-primary bg-muted font-medium"
                  : "text-muted-foreground"
              )}
              onClick={() => setActiveAuthor("Todos")}
            >
              Todos
            </a>
            {authors &&
              authors.map((author) => (
                <a
                  onClick={() => setActiveAuthor(author)}
                  key={author}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                    activeAuthor === author
                      ? "text-primary bg-muted font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {author}
                </a>
              ))}              
          </div>
          <div className="flex justify-center items-center">
              {
                quotes && (
                  <QuotesSection quotes={quotes} perPage={10} />
                )
              }
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default AuthorsPage;
