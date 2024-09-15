import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Quote, User } from "@/lib/data";
import RootLayout from "@/pages/layout";
import { useEffect, useState } from "react";
import { QuotesSection } from "@/pages/home/components/quotes";
import { useSelector } from "react-redux";

const FavoritesPage = () => {
    const user = useSelector((state: { user: User | null }) => state.user);
    const token = useSelector((state: { token: string }) => state.token);

    const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);

    const getFavoritesQuotes = async () => {
        try {
            const response = await fetch(`http://localhost:3003/favorite/${user?._id}`, {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const quotes = await response.json();
            setFavoriteQuotes(quotes);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFavoritesQuotes();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <RootLayout>
            <div className="flex-col">
                <div className="flex-1 space-y-6 p-8 pt-6">
                    <Heading title="Favorites" description="View your favorites quotes" />
                    <Separator />
                    <div className="flex justify-center items-center">
                        {
                            favoriteQuotes && (
                                <QuotesSection quotes={favoriteQuotes} perPage={10} />
                            )
                        }
                    </div>
                </div>
            </div>
        </RootLayout>
    )
}

export default FavoritesPage;