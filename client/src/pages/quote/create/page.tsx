import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import RootLayout from "@/pages/layout";
import { useState } from "react";
import { ImagesCarrousel } from "../components/images-carrousel";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { User } from "@/lib/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateQuotePage = () => {
  const navigate = useNavigate();

  const token = useSelector((state: { token: string }) => state.token);
  const user = useSelector((state: { user: User}) => state.user);

  const [content, setContent] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/background-images/bg1.png"
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3003/quote/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        topic,
        author,
        bgPath: backgroundImage,
        submittedBy: user._id 
      })
    })

    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message);
      throw new Error(error.message);
    }

    const data = await response.json();

    if (data) {
      toast.success("Quote created successfully");
      navigate(`/quotes/${data._id}`);
    } 
  }

  return (
    <RootLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-6 p-8 pt-6">
          <Heading title="Create Quote" description="Create a new quote" />
          <Separator />
          <div className="flex items-center justify-center flex-col gap-4 w-full">
            <form onSubmit={handleSubmit}>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Enter the content of the quote</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      placeholder="Life is ..."
                      id="content"
                      value={content}
                      cols={20}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      placeholder="Nature"
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      placeholder="Anonymous"
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center flex-col max-w-3xl gap-2">
                <div
                  className="bg-cover bg-center rounded-lg flex items-center justify-center w-full h-[500px]"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                  <div className="p-10 text-5xl text-center text-shadow-custom text-white">
                    <p className="font-pacifico">{content}</p>
                    {author && author !== "Anonymous" ? (
                      <p className="text-3xl font-bold mt-5">{author}</p>
                    ) : null}
                  </div>
                </div>
                {/* Image selector */}
                <ImagesCarrousel setBackgroundImage={setBackgroundImage} />
              </div>
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CreateQuotePage;
