import RootLayout from "@/pages/layout";
import { useParams } from "react-router-dom";
import { Quote, User } from "@/lib/data";
import { QuoteSection } from "@/components/quote-section";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Download } from "lucide-react";

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
          <Heading title="Frase" description="La frase seleccionada" />
          <Separator />
          <div className="flex items-center justify-center">
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
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="grid items-center gap-2 grid-cols-2 w-[50%] justify-center">
            <Card>
              <CardContent className="pt-4">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Descargas</div>
                  <div className="flex gap-1 text-xl font-bold tabular-nums leading-none">
                    {quote.downloadCount}
                    <span className="text-sm font-normal text-muted-foreground">
                      <Download />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Guardados</div>
                  <div className="flex gap-1 text-xl font-bold tabular-nums leading-none">
                    {quote.savedCount}
                    <span className="text-sm font-normal text-muted-foreground">
                      <Bookmark className="w-6 h-6" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default QuotePage;
