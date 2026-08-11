type Status = "success" | "processing" | "error" | "info";

type StatusBadgeProps = {
  status: Status;
  children: React.ReactNode;
};

export function StatusBadge({
  status,
  children,
}: StatusBadgeProps) {
  const variants = {
    success: "bg-green-100 text-green-800",
    processing: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${variants[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />

      {children}
    </span>
  );
}