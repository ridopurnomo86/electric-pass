import { Icon } from "@iconify/react";
import { useNavigation } from "@remix-run/react";
import { ChangeEvent, MutableRefObject, useState } from "react";
import RichTextEditor from "~/components/core/RichTextEditor";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { CreateEventDescriptionValidation } from "~/data/form-validation/CreateEventValidation";
import { handleZodValidation, ValidationError } from "~/modules/zod-validation";
import useUploadImage from "~/pages/Settings/hooks/useUploadImage";
import { CurrentDataRefType, StepType } from "../..";

type DescriptionPropsType = {
  currentData: MutableRefObject<CurrentDataRefType>;
  onStep: (step: StepType) => void;
};

const Description = ({ currentData, onStep }: DescriptionPropsType) => {
  const [editorValue, setEditorValue] = useState<string>();
  const [errors, setErrors] = useState<ValidationError<typeof CreateEventDescriptionValidation>>(
    {}
  );
  const { state } = useNavigation();

  const { onSelectedImage, selectedImage } = useUploadImage({
    currentImage: "",
  });

  const handleSubmit = () => {
    handleZodValidation({
      onError: setErrors,
      data: {
        image: selectedImage,
        description: editorValue,
      },
      onSuccess: (res) => {
        const data = {
          ...currentData.current,
          ...res,
        };
        currentData.current = data;
        onStep("ticket");
      },
      schema: CreateEventDescriptionValidation,
    });
  };

  return (
    <div className="space-y-4">
      <div className="mt-2">
        <p className="text-sm font-semibold tracking-tight text-neutral-900">Event Thumbnail</p>
        <p className="mb-4 text-sm font-normal text-neutral-600">
          We support only JPEGs or PNGs under 1MB.
        </p>
        <div>
          <Input
            id="image"
            type="file"
            name="image"
            className="w-auto"
            onChange={(e: ChangeEvent) => onSelectedImage(e)}
          />
          {errors.image && (
            <p className="mt-2 text-[0.8rem] font-medium text-destructive">{errors.image}</p>
          )}
        </div>
      </div>
      <div>
        <RichTextEditor
          onChange={(node) => setEditorValue(node)}
          label="Description"
          description="We need some more descriptions about the events being held, this is can help visitors / users."
        />
        {errors.description && (
          <p className="mt-2 text-[0.8rem] font-medium text-destructive">{errors.description}</p>
        )}
      </div>
      <Button
        onClick={handleSubmit}
        type="submit"
        className="flex items-center"
        disabled={state === "submitting"}
      >
        <Icon
          icon="material-symbols:check-small-rounded"
          className="mr-1 text-2xl text-neutral-200"
        />
        <p className="text-sm font-medium text-neutral-200 antialiased">Next</p>
      </Button>
    </div>
  );
};

export default Description;
