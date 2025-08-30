import Loader from "@/components/dashboard/loader";

export default function Loading() {
  return (
    <div className="w-full grid place-content-center h-full">
      <Loader size={36} />
    </div>
  );
}
