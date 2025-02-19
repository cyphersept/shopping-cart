import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export function ReviewStars({
  count,
  avg,
  classes,
}: {
  count: number;
  avg: number;
  classes?: string;
}) {
  const base = Math.floor(avg);
  const rounded =
    avg % 1 > 0.75 ? base + 1 : avg % 1 > 0.25 ? base + 0.5 : base;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rounded > i + 1) stars.push(<FaStar key={i} />);
    else if (rounded > i) stars.push(<FaRegStarHalfStroke key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }

  return (
    <div className={classes}>
      <div className=" inline-flex">{stars}</div>
      <span className="font-bold ml-2 mr-6">{avg}</span>
      {count === 0 ? <span>No reviews</span> : <span>{count} Reviews</span>}
    </div>
  );
}
