import RootLayout from "@/pages/layout";
import { useParams } from "react-router-dom";
import { Quote, User } from "@/lib/data";
import { QuoteSection } from "@/components/quote-section";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const QuotePage = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState<Quote>({} as Quote);
  const user = useSelector((state: { user: User | null }) => state.user);

  const getQuote = async () => {
    try {
      const response = await fetch(`http://localhost:3003/quote/${quoteId}`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, [quoteId]); // eslint-disable-line

  if (!quote) {
    return null;
  }

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-6 p-8 pt-6">
          {quote && (
            <QuoteSection
              backgroundImage={`url(${quote.bgPath})`}
              quote={quote.content}
              author={quote.author || ""}
              user={user}
              quoteId={quote._id}
            />
          )}
        </div>
        <div>
          <div>
            <p>Guardado</p>
            <p>{quote.savedCount}</p>
          </div>
          <div>
            <p>Descargado</p>
            <p>{quote.downloadCount}</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default QuotePage;
