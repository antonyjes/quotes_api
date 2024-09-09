import { Card, CardContent } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { Quote } from "@/lib/data"
import { useState } from "react"

export const QuotesSection = ({quotes}: {quotes: Quote[]}) => {
    const quotesPerPage = 5
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(quotesPerPage)

    const handlePreviousClick = () => {
        if (startIndex >= quotesPerPage) {
            setStartIndex(startIndex - quotesPerPage)
            setEndIndex(endIndex - quotesPerPage)
        }
    }

    const handleNextClick = () => {
        if (endIndex < quotes.length) {
            setStartIndex(startIndex + quotesPerPage)
            setEndIndex(endIndex + quotesPerPage)
        }
    }

    return(
        <div className="flex flex-col gap-2 justify-center lg:w-[70%]">
            {quotes.slice(startIndex, endIndex).map((quote) => (
                <Card className="p-2 pb-0 cursor-pointer" key={quote._id}>
                    <CardContent>
                        <p className="text-xl font-bold tracking-tight">{quote.content}</p>
                        {
                            quote.author ? <p className="text-sm text-muted-foreground mt-3">{quote.author}</p> : null
                        }
                    </CardContent>
                </Card>
            ))}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={handlePreviousClick} className={startIndex === 0 ? "pointer-events-none opacity-50" : undefined} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={handleNextClick} className={endIndex >= quotes.length ? "pointer-events-none opacity-50" : undefined} />
                    </PaginationItem>
                </PaginationContent>    
            </Pagination>   
        </div>
    )
} 