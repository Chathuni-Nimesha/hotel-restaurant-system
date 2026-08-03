import type { ImageProps } from "next/image";
import Image from "next/image";
import { cn } from "@/lib/cn";

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
} & (
  | {
      fill: true;
      width?: never;
      height?: never;
    }
  | {
      fill?: false;
      width: number;
      height: number;
    }
);

function isDataUrl(src: string): boolean {
  return src.startsWith("data:");
}

function isExternalUrl(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill,
  width,
  height,
}: OptimizedImageProps) {
  if (isDataUrl(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    );
  }

  const sharedProps: Pick<
    ImageProps,
    "src" | "alt" | "className" | "priority" | "sizes"
  > = {
    src,
    alt,
    className: cn(className),
    priority,
    sizes,
  };

  if (fill) {
    return <Image {...sharedProps} fill unoptimized={isExternalUrl(src)} />;
  }

  return (
    <Image
      {...sharedProps}
      width={width}
      height={height}
      unoptimized={isExternalUrl(src)}
    />
  );
}
