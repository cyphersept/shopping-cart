export function ReviewStars({ count, avg }: { count: number; avg: number }) {
  const fullStars = Math.floor(count);
  const halfStars = count % 1 >= 0.5 ? 1 : 0;
  const remainder = 5 - fullStars - halfStars;
  return (
    <div>
      <div></div>
      <span>{avg} Reviews</span>
    </div>
  );
}
