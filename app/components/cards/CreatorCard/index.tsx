type CreatorCardPropsType = {
  title: string;
  imgUrl: string;
};

const CreatorCard = ({ title, imgUrl }: CreatorCardPropsType) => (
  <article className="flex size-full flex-col items-center justify-center rounded-md bg-neutral-200 p-4">
    <div className="max-w-[60px]">
      <img src={imgUrl} alt={`alt-${imgUrl}`} className="h-[60px] w-full rounded-md object-cover" />
    </div>
    <p className="mt-4 h-9 text-wrap text-center text-base font-semibold leading-4 text-neutral-900 antialiased">
      {title}
    </p>
  </article>
);

export default CreatorCard;
