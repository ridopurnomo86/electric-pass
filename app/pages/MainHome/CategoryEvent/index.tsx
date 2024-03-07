import CategoryCard from "~/components/cards/CategoryCard";

const CategoryEvent = () => (
  <section className="container mx-auto mt-12">
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Category Events</h3>
    <div className="flex gap-4 overflow-x-scroll py-4">
      <div className="min-w-[180px]">
        <CategoryCard title="Workshop" totalEvent={10} icon="mdi:education-outline" />
      </div>
      <div className="min-w-[180px]">
        <CategoryCard title="Concert" totalEvent={10} icon="akar-icons:music-album-fill" />
      </div>
      <div className="min-w-[180px]">
        <CategoryCard title="Conference" totalEvent={10} icon="material-symbols:forum-rounded" />
      </div>
      <div className="min-w-[180px]">
        <CategoryCard title="Festival" totalEvent={10} icon="material-symbols:festival-rounded" />
      </div>
    </div>
  </section>
);

export default CategoryEvent;
