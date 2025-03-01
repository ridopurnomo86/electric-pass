type CustomerPropsType = {
  fullName: string;
  email: string;
  phoneNumber: number;
  phoneCode: number;
};

const Costumer = ({ fullName, email, phoneNumber, phoneCode }: CustomerPropsType) => (
  <div className="border-b py-4">
    <p className="mb-2 text-sm font-medium text-neutral-900">Customer</p>
    <div className="mb-1 flex justify-between">
      <p className="text-sm font-medium text-neutral-500">Full Name:</p>
      <p className="text-sm font-medium text-neutral-500">{fullName}</p>
    </div>
    <div className="mb-1 flex justify-between">
      <p className="text-sm font-medium text-neutral-500">Email:</p>
      <p className="text-sm font-medium text-neutral-500">{email}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-sm font-medium text-neutral-500">Phone Number:</p>
      <p className="text-sm font-medium text-neutral-500">
        +{phoneCode} {phoneNumber}
      </p>
    </div>
  </div>
);

export default Costumer;
