import { Heading } from "@/components/heading";
import RootLayout from "../layout";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  const dateToday = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading title="La frase de hoy" description={dateToday} />
          <Separator />
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
