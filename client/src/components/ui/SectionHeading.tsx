import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export function SectionHeading({
  title,
  description,
  align = "center",
  className,
  titleClassName,
  as: HeadingTag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <HeadingTag
        id={id}
        className={cn(
          "font-bold text-yellow-500",
          HeadingTag === "h1" && "text-5xl md:text-6xl",
          HeadingTag === "h2" && "text-4xl md:text-5xl",
          HeadingTag === "h3" && "text-3xl",
          titleClassName
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <p className="mt-4 text-lg text-gray-300">{description}</p>
      )}
    </header>
  );
}
