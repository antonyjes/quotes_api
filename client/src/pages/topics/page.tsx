import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Quote } from "@/lib/data";
import { cn } from "@/lib/utils";
import RootLayout from "@/pages/layout";
import { useEffect, useState } from "react";
import { QuotesSection } from "@/pages/home/components/quotes";

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);

  const getTopics = async () => {
    try {
      const response = await fetch("http://localhost:3003/quote/topics");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const topics = await response.json();
      setTopics(topics);
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
  };

  const filterQuotesByTopic = () => {
    if (activeTopic === "Todos") {
      setQuotes(allQuotes);
    } else {
      const filteredQuotes = allQuotes.filter(
        (quote) => quote.topic === activeTopic
      );
      setQuotes(filteredQuotes);
    }
  };

  useEffect(() => {
    getTopics();
    getQuotes();
  }, []);

  useEffect(() => {
    filterQuotesByTopic();
  }, [activeTopic]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-6 p-8 pt-6">
          <Heading title="Temas" description="Selecciona un tema" />
          <Separator />
          <div className="mb-4 flex items-center">
            <a
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                activeTopic === "Todos"
                  ? "text-primary bg-muted font-medium"
                  : "text-muted-foreground"
              )}
              onClick={() => setActiveTopic("Todos")}
            >
              Todos
            </a>
            {topics &&
              topics.map((topic) => (
                <a
                  onClick={() => setActiveTopic(topic)}
                  key={topic}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                    activeTopic === topic
                      ? "text-primary bg-muted font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {topic}
                </a>
              ))}
          </div>
          <div className="flex justify-center items-center">
            {quotes && <QuotesSection quotes={quotes} perPage={10} />}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default TopicsPage;
