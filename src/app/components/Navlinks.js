import Link from "next/link";

const Navlinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  const data = await res.json();

  console.log(data);

  return (
    <nav className=" bg-base-100">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {data.map((items) => (
            <Link href={items.slug} key={items.id} className="group shrink-0">
              <div className="flex items-center gap-2 rounded-full  px-4 py-2.5 text-sm font-medium text-base-content transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
                <span className="text-base transition-transform duration-200 group-hover:scale-110">
                  {items.icon}
                </span>

                <span className="whitespace-nowrap">{items.nameBn}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
