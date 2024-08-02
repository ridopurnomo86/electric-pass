/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useToast } from "~/components/ui/Toaster/useToast";

const useUploadImage = ({ currentImage }: { currentImage: any }) => {
  const { user } = useOutletContext<{ user: { name: string; id: string } }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>({});
  const [previewImage, setPreviewImage] = useState(
    currentImage
      ? `${currentImage.image_url}?v=${currentImage.version}`
      : "https://github.com/shadcn.png"
  );

  const onSelectedImage = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;
    setSelectedImage(target.files[0]);
    setPreviewImage(window.URL.createObjectURL(target.files[0]));
  };

  const onUploadImage = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image_profile", selectedImage);
    formData.append("user_id", user.id);
    formData.append("name", user.name);

    try {
      const post = await axios.post("/settings/account/upload", formData, {
        baseURL: window.process.env.BACKEND_URL,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${window.process.env.API_KEY}`,
        },
      });

      if (post) {
        toast({
          title: post.data?.type,
          description: post.data?.message,
          variant: "default",
        });
        setIsLoading(false);
      }

      return post;
    } catch (error) {
      const errorResponse = (error as any).response?.data;
      setIsLoading(false);
      if (errorResponse)
        return toast({
          title: errorResponse.type,
          description: errorResponse.message,
          variant: "destructive",
        });

      return toast({
        title: "Error",
        description: "Something gone wrong",
        variant: "destructive",
      });
    }
  };

  return { selectedImage, previewImage, onUploadImage, onSelectedImage, isLoading };
};

export default useUploadImage;
