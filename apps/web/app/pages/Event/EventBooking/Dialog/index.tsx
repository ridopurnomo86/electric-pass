import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/AlertDialog";

type EventBookingDialogPropsType = {
  onCancel: () => void;
  onContinue: () => void;
  isOpen: boolean;
};

const EventBookingDialog = ({
  onCancel,
  onContinue,
  isOpen = false,
}: EventBookingDialogPropsType) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your order and remove a data
          from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel name="dialog" onClick={onCancel}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction name="dialog" onClick={onContinue} value="reset">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default EventBookingDialog;
