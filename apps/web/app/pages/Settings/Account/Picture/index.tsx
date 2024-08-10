import { ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import useInitialName from "../../hooks/useInitialName";

type PicturePropsType = {
  name: string;
  isLoading: boolean;
  onSelectedImage: (e: ChangeEvent) => void;
  onUploadImage: () => void;
  onDeleteImage: () => void;
  previewImage: string;
  isImageEmpty: boolean;
};

const Picture = ({
  name = "",
  isLoading,
  onSelectedImage,
  onUploadImage,
  previewImage,
  onDeleteImage,
  isImageEmpty,
}: PicturePropsType) => {
  const { initialName } = useInitialName({ name });

  return (
    <div className="py-4">
      <p className="text-xl font-semibold tracking-tight text-neutral-900">Profile Picture</p>
      <p className="mb-4 text-sm font-normal text-neutral-600">
        We support only JPEGs or PNGs under 5MB.
      </p>
      <div className="flex items-center">
        <Avatar className="mr-4 size-[100px]">
          <AvatarImage
            src={previewImage}
            srcSet={previewImage}
            className="size-[100px] object-cover"
          />
          <AvatarFallback className="size-[100px]">
            <p className="font-medium antialiased">{initialName}</p>
          </AvatarFallback>
        </Avatar>
        <div>
          <Input
            id="picture"
            type="file"
            className="w-auto"
            onChange={(e: ChangeEvent) => onSelectedImage(e)}
          />
          <div className="mt-2 flex items-center gap-2">
            <Button
              onClick={() => {
                onUploadImage();
              }}
              variant="outline"
              disabled={isLoading}
            >
              Upload
            </Button>
            <Button
              onClick={() => {
                onDeleteImage();
              }}
              variant="outline"
              className="bg-red-600 text-white"
              disabled={isLoading || isImageEmpty}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picture;
