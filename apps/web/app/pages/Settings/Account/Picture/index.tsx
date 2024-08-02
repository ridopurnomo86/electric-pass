"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

type PicturePropsType = {
  name: string;
  isLoading: boolean;
  onSelectedImage: (e: ChangeEvent) => void;
  onUploadImage: () => void;
  previewImage: string;
};

const Picture = ({
  name = "",
  isLoading,
  onSelectedImage,
  onUploadImage,
  previewImage,
}: PicturePropsType) => {
  const [initialName, setInitialName] = useState("");

  useEffect(() => {
    const names = name.split(" ");
    let label = "";
    names.forEach((n) => {
      if (n.length > 0) label += n[0];
    });
    setInitialName(label);
  }, [name]);

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
          <Button
            onClick={() => {
              onUploadImage();
            }}
            className="mt-2"
            variant="outline"
            disabled={isLoading}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Picture;
