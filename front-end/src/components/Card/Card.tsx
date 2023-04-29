export interface CardProps {
  title: string;
  value: string;
  height?: string;
  width?: string;
}

function Card({ title, value, height = "32", width = "full" }: CardProps) {
  return (
    <div
      className={`whitespace-nowrap h-${height} w-${width} p-6 flex flex-col gap-y-6 text-[#242424] bg-white rounded-xl`}
    >
      <div className="flex text-sm font-medium">{title}</div>
      <div className="flex gap-x-2 items-baseline">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}

export default Card;
