


import { useEffect, useRef, useState } from "react";

const BANNER_IMAGES = [
  "174ada0f-2c81-4fdd-b88c-269eda1a4f0e.jpg",
  "1d94384b-d92f-4142-9924-1a17c0a1e5ef.jpg",
  "3dabf63b-4bec-40c8-a903-b884a1fb5101.jpg",
  "4d5d253d-066e-4d9f-a369-17287bcf0dd3.jpg",
  "6bdd6c32-4ba0-43e0-90df-9a7c8de15ac8.jpg",
  "b315d73e-4add-4c27-a58b-eba534d5a00b.jpg",
  "b5c0b21e-67b3-4080-8330-716741b02456.jpg",
  "fff4a456-c1ec-4649-8fd4-3fe04100ff09.jpg",
];

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIdx((i) => (i + 1) % BANNER_IMAGES.length);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [idx]);

  return (
    <section
      className="w-full flex items-center justify-center relative"
      style={{ minHeight: 0, padding: 0, position: 'relative', overflow: 'hidden' }}
    >
      {/* Blurred stretched background of current image */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `center/cover no-repeat url(/banner/${BANNER_IMAGES[idx]})`,
          filter: 'blur(24px) brightness(0.85)',
          transform: 'scale(1.08)',
          width: '100%',
          height: '100%',
          transition: 'background 0.7s cubic-bezier(.4,0,.2,1)',
        }}
      />
      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden shadow-lg z-10"
        style={{ aspectRatio: "4/3", background: "transparent", minHeight: 0, height: "auto" }}
      >
        <div
          className="absolute inset-0 flex h-full w-full"
          style={{
            transition: "transform 0.7s cubic-bezier(.4,0,.2,1)",
            transform: `translateX(-${idx * 100}%)`,
            minHeight: 0,
            height: "100%",
          }}
        >
          {BANNER_IMAGES.map((img) => (
            <div
              key={img}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
              style={{ minWidth: "100%", minHeight: 0, height: "100%" }}
            >
              <img
                src={`/banner/${img}`}
                alt="Showroom banner"
                className="w-full h-full object-cover"
                style={{ maxHeight: "100%", maxWidth: "100%", background: "transparent", position: 'relative', zIndex: 2 }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Optionally, add indicators or arrows here */}
    </section>
  );
};

export default Hero;
