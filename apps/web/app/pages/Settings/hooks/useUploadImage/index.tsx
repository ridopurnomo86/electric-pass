/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { useToast } from "~/components/ui/Toaster/useToast";
import useHttpRequest from "~/hooks/useHttpRequest";

const DEFAULT_IMAGE_PROFILE = "https://github.com/shadcn.png";

const useUploadImage = ({ currentImage }: { currentImage: any }) => {
  const { user } = useOutletContext<{ user: { name: string; id: string } }>();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState(
    Object.hasOwn(currentImage, "image_url")
      ? `${currentImage.image_url}?v=${currentImage.version}`
      : DEFAULT_IMAGE_PROFILE
  );

  const isImageEmpty = previewImage === DEFAULT_IMAGE_PROFILE;

  const { request: uploadImageRequest, isLoading: isUploadImageRequest } = useHttpRequest({
    path: "/settings/account/image/upload",
    reqHeaders: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
  });

  const { request: deleteImageRequest, isLoading: isDeleteImageRequest } = useHttpRequest({
    path: "/settings/account/image/delete",
    reqHeaders: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const onSelectedImage = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;
    setSelectedImage(target.files[0]);
    setPreviewImage(window.URL.createObjectURL(target.files[0]));
  };

  const onUploadImage = async () => {
    const formData = new FormData();
    formData.append("image_profile", selectedImage);
    formData.append("user_id", user.id);
    formData.append("name", user.name);

    if (!selectedImage)
      return toast({
        title: "Error",
        description: "The field image is required",
        variant: "destructive",
      });

    const { data, error } = await uploadImageRequest({
      body: formData,
    });

    if (data)
      return toast({
        title: data?.type,
        description: data?.message,
        variant: "default",
      });

    if (error) {
      const { message } = error.response.data;

      return toast({
        title: "Warning",
        description: message,
        variant: "destructive",
      });
    }

    return toast({
      title: "Warning",
      description: "Something gone wrong",
      variant: "destructive",
    });
  };

  const onDeleteImage = async () => {
    const { data, error } = await deleteImageRequest({
      body: {
        user_id: `${user.id}`,
        name: user.name,
      },
    });

    if (data) {
      setPreviewImage(DEFAULT_IMAGE_PROFILE);
      return toast({
        title: data?.type,
        description: data?.message,
        variant: "default",
      });
    }

    if (error) {
      const { message } = error.response.data;

      return toast({
        title: "Warning",
        description: message,
        variant: "destructive",
      });
    }

    return toast({
      title: "Warning",
      description: "Something gone wrong",
      variant: "destructive",
    });
  };

  return {
    selectedImage,
    previewImage,
    onUploadImage,
    isImageEmpty,
    onSelectedImage,
    onDeleteImage,
    isLoading: isDeleteImageRequest || isUploadImageRequest,
  };
};

export default useUploadImage;
