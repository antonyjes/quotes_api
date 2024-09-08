import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, Download, TwitterIcon } from "lucide-react";
import { toast } from "react-toastify";

export const QuoteSection = ({
  backgroundImage,
  quote,
  author,
  user,
}: {
  backgroundImage: string;
  quote: string;
  author: string;
  user: boolean;
}) => {
  const handleTwitterShare = async () => {
    try {
      if (user) {
        console.log("You can share this quote");
      } else {
        toast.error("Inicia sesion para compartir");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (user) {
        console.log("You can bookmark this quote");
      } else {
        toast.error("Inicia sesion para guardar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      if (user) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = 900;
        canvas.height = 500;

        const imageUrl = backgroundImage.match(
          /url\(["']?([^"')]+)["']?\)/
        )?.[1];

        if (!imageUrl) {
          throw new Error("Invalid background image URL");
        }

        const backgroundImg = new Image();
        backgroundImg.src = imageUrl;

        await new Promise((resolve, reject) => {
          backgroundImg.onload = resolve;
          backgroundImg.onerror = reject;
        });

        context?.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        context!.fillStyle = "white";
        context!.textAlign = "center";
        context!.shadowColor = "black";
        context!.shadowBlur = 10;
        context!.shadowOffsetX = 5;
        context!.shadowOffsetY = 5;

        // Set desired font size
        context!.font = "50px Pacifico, sans-serif";

        // Function to wrap text to fit within the canvas
        const wrapText = (
          context: CanvasRenderingContext2D,
          text: string,
          x: number,
          y: number,
          maxWidth: number,
          lineHeight: number
        ) => {
          const words = text.split(" ");
          let line = "";
          let yOffset = 0;

          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + " ";
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              context.fillText(line, x, y + yOffset);
              line = words[i] + " ";
              yOffset += lineHeight;
            } else {
              line = testLine;
            }
          }

          context.fillText(line, x, y + yOffset);
          return yOffset + lineHeight; // return the total height used by the text
        };

        const lineHeight = 60; // Set line height for the wrapped text
        const textX = canvas.width / 2; // Center X coordinate
        const textY = canvas.height / 2 - 30; // Start Y coordinate

        // Wrap and draw the quote text
        const usedHeight = wrapText(
          context!,
          quote,
          textX,
          textY,
          canvas.width - 40,
          lineHeight
        );

        // Draw author text below the quote if it exists and is not "Anonymous"
        if (author && author !== "Anonymous") {
          context!.font = "30px Roboto, sans-serif";
          context!.fillText(author, textX, textY + usedHeight);
        }

        const imageData = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        downloadLink.href = imageData;
        downloadLink.download = "quote.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        toast.error("Inicia sesion para descargar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row">
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
                  <TwitterIcon
                    className="w-6 h-6"
                    onClick={handleTwitterShare}
                  />
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
                  <Bookmark className="w-6 h-6" onClick={handleBookmark} />
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
                  <Download className="w-6 h-6" onClick={handleDownload} />
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
  );
};
