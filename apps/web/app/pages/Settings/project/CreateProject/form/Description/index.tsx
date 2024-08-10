import { Icon } from "@iconify/react";
import { useNavigation } from "@remix-run/react";
import { ChangeEvent } from "react";
import Editor from "~/components/core/Editor";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import useUploadImage from "~/pages/Settings/hooks/useUploadImage";

const Description = () => {
  const { state } = useNavigation();

  const { onSelectedImage } = useUploadImage({
    currentImage: "",
  });

  return (
    <div className="space-y-4">
      <div className="mt-2">
        <p className="text-sm font-semibold tracking-tight text-neutral-900">Event Thumbnail</p>
        <p className="mb-4 text-sm font-normal text-neutral-600">
          We support only JPEGs or PNGs under 1MB.
        </p>
        <div>
          <Input
            id="picture"
            type="file"
            className="w-auto"
            onChange={(e: ChangeEvent) => onSelectedImage(e)}
          />
        </div>
      </div>
      <Editor
        label="Description"
        description="We need some more descriptions about the events being held, this is can help visitors / users."
      />
      <Button type="submit" className="flex items-center" disabled={state === "submitting"}>
        <Icon
          icon="material-symbols:check-small-rounded"
          className="mr-1 text-2xl text-neutral-200"
        />
        <p className="text-sm font-medium text-neutral-200 antialiased">Submit</p>
      </Button>
    </div>
  );
};

export default Description;
