import { cn } from "#lib/utils";

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function PageIndicator({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PageIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-[3px]",
        className
      )}
    >
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === currentPage;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onPageChange?.(index)}
            aria-label={`Page ${index + 1}`}
            className={cn(
              "h-[7px] w-[13px]",
              "border border-[#806b42]",
              isActive
                ? "bg-[#65451d]"
                : "bg-[#b9a475]"
            )}
          />
        );
      })}
    </div>
  );
}