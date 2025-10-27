import { useEffect, useRef, useState } from "react";

type ImageLazyProps = {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
};
export const ImageLazy = ({
  alt,
  className,
  src,
  height = 200,
  width = 200,
}: ImageLazyProps) => {
  const [visible, setVisible] = useState(false);

  const [currentSrc, setCurrentSrc] = useState<string>("/placeholder.jpg");
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (src !== "") {
              setCurrentSrc(src);
            }
            observer.disconnect();
            setVisible(true);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 300px 0px",
        threshold: 0.1,
      }
    );
    observer.observe(imgEl);

    return () => observer.disconnect();
  }, [src]);
  return (
    <img
      src={currentSrc}
      fetchPriority="high"
      height={height}
      width={width}
      alt={alt}
      ref={imgRef}
      onError={() => setCurrentSrc("/placeholder.jpg")}
      className={`${className} ${
        visible ? "opacity-100" : "opacity-0"
      } transition-size  object-cover object-center `}
    />
  );
};
