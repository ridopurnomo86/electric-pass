const Thumbnail = () => (
  <div className="hidden lg:block">
    <div className="h-full w-full block absolute left-[600px]">
      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&dpr=2&q=80"
        alt="thumbnail-background"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
);

export default Thumbnail;
