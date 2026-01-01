// "use client";

// import { MapPin, Phone, Clock, Search } from "lucide-react";
// import { useState } from "react";

// type Store = {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   phone: string;
//   hours: string;
// };

// const STORES: Store[] = [
//   {
//     id: "1",
//     name: "Scennex Flagship Store",
//     address: "12 Adeola Odeku St",
//     city: "Lagos",
//     phone: "+234 812 345 6789",
//     hours: "Mon – Sat: 9am – 8pm",
//   },
//   {
//     id: "2",
//     name: "Scennex Mall Outlet",
//     address: "Shop 45, Palms Mall",
//     city: "Lagos",
//     phone: "+234 809 555 1122",
//     hours: "Daily: 10am – 9pm",
//   },
//   {
//     id: "3",
//     name: "Scennex Abuja",
//     address: "Central Area, Garki",
//     city: "Abuja",
//     phone: "+234 816 777 9090",
//     hours: "Mon – Sat: 9am – 7pm",
//   },
// ];

// export default function FindAStorePage() {
//   const [query, setQuery] = useState("");

//   const filteredStores = STORES.filter((store) =>
//     `${store.name} ${store.city}`.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <main className="max-w-7xl mx-auto px-4 py-10">
//       {/* Header */}
//       <header className="mb-10">
//         <h1 className="text-3xl font-bold mb-2">Find a Store</h1>
//         <p className="text-gray-600">Locate a Scennex store near you.</p>
//       </header>

//       {/* Search + Map */}
//       <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left: Search + Stores */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Search */}
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search by city or store name"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-dark-900"
//             />
//           </div>

//           {/* Store List */}
//           <div className="space-y-4 max-h-130 overflow-y-auto pr-2">
//             {filteredStores.length === 0 && (
//               <p className="text-gray-500 text-sm">
//                 No stores found for your search.
//               </p>
//             )}

//             {filteredStores.map((store) => (
//               <article
//                 key={store.id}
//                 className="border rounded-xl p-4 hover:shadow-md transition"
//               >
//                 <h3 className="font-semibold text-dark-900 mb-2">
//                   {store.name}
//                 </h3>

//                 <div className="space-y-1 text-sm text-gray-600">
//                   <p className="flex items-start gap-2">
//                     <MapPin size={14} className="mt-0.5" />
//                     {store.address}, {store.city}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Phone size={14} />
//                     {store.phone}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Clock size={14} />
//                     {store.hours}
//                   </p>
//                 </div>

//                 <button
//                   className="mt-4 text-sm font-semibold text-dark-900
//                   hover:underline"
//                 >
//                   View on Map
//                 </button>
//               </article>
//             ))}
//           </div>
//         </div>

//         {/* Right: Map Placeholder */}
//         <div className="lg:col-span-2">
//           <div
//             className="w-full h-130 rounded-xl border
//             flex items-center justify-center bg-gray-100 text-gray-500"
//           >
//             Map integration goes here
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Phone, Clock, Search } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Store = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lng: number;
  lat: number;
};

const STORES: Store[] = [
  {
    id: "1",
    name: "Verence Flagship Store",
    address: "1289 Sunset Boulevard, Los Angeles CA 90026",
    phone: "+234 812 345 6789",
    hours: "Mon – Sat: 9am – 8pm",
    lng: -118.271,
    lat: 34.083,
  },
  {
    id: "2",
    name: "Verence Mall Outlet",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    phone: "+234 809 555 1122",
    hours: "Daily: 10am – 9pm",
    lng: -89.6501,
    lat: 39.7817,
  },
  {
    id: "3",
    name: "Verence Store, Austin",
    address: "4512 Maplewood Drive, Austin, TX 78745",
    phone: "+234 816 777 9090",
    hours: "Mon – Sat: 9am – 7pm",
    lng: -97.7891,
    lat: 30.2234,
  },
  {
    id: "4",
    name: "Verence Store, Charlotte",
    address: "9037 Brookstone Lane, Charlotte, NC 28210",
    phone: "+234 816 777 9090",
    hours: "Mon – Sat: 9am – 7pm",
    lng: -80.8323,
    lat: 35.2072,
  },
  {
    id: "5",
    name: "Verence Store, San Diego",
    address: "2156 Harbor View Road, San Diego, CA 92101",
    phone: "+234 816 777 9090",
    hours: "Mon – Sat: 9am – 7pm",
    lng: -117.168,
    lat: 32.7136,
  },
  {
    id: "6",
    name: "Verence Store, London",
    address: "221B Baker Street, London, NW1 6XE",
    phone: "+234 816 777 9090",
    hours: "Mon – Sat: 9am – 7pm",
    lng: -0.1585,
    lat: 51.5237,
  },
];

export default function FindAStorePage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const [query, setQuery] = useState("");
  const [activeStore, setActiveStore] = useState<Store | null>(null);

  const filteredStores = STORES.filter((store) =>
    `${store.name} ${store.address}`.toLowerCase().includes(query.toLowerCase())
  );

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [3.4219, 6.4281],
      zoom: 10,
    });

    mapInstance.current.addControl(new mapboxgl.NavigationControl());

    // Add markers
    STORES.forEach((store) => {
      const marker = new mapboxgl.Marker({ color: "#111" })
        .setLngLat([store.lng, store.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${store.name}</strong><br/>${store.address}`
          )
        )
        .addTo(mapInstance.current!);

      marker.getElement().addEventListener("click", () => {
        setActiveStore(store);
      });
    });
  }, []);

  // Fly to store
  const flyToStore = (store: Store) => {
    setActiveStore(store);
    mapInstance.current?.flyTo({
      center: [store.lng, store.lat],
      zoom: 14,
      speed: 1.2,
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Find a Store</h1>
        <p className="text-gray-600">Locate a Verence store near you.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Store List */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or store name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-dark-900"
            />
          </div>

          <div className="space-y-6 max-h-130 overflow-y-auto pr-2">
            {filteredStores.map((store) => (
              <article
                key={store.id}
                className={`border rounded-xl p-4 cursor-pointer transition
                ${
                  activeStore?.id === store.id
                    ? "border-dark-900 shadow-md"
                    : ""
                }`}
                onClick={() => flyToStore(store)}
              >
                <h3 className="font-semibold mb-2">{store.name}</h3>

                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex  gap-2 max-w-[75%]">
                    <MapPin size={14} className="mt-1" />{" "}
                    <span>{store.address}</span>
                  </p>
                  <p className="flex gap-2">
                    <Phone size={14} /> <span>{store.phone}</span>
                  </p>
                  <p className="flex gap-2">
                    <Clock size={14} /> <span>{store.hours}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <div
            ref={mapRef}
            className="w-full h-130 rounded-xl overflow-hidden border"
          />
        </div>
      </section>
    </main>
  );
}
