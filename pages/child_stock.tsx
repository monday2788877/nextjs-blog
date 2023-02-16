import { memo, useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";

const formatThousand = [
  "best1BidVol",
  "best2BidVol",
  "best3BidVol",
  "best1OfferVol",
  "best2OfferVol",
  "best3OfferVol",
  "matchedVolume",
];
const Child = ({ keyCell, id, value, color, align, isFlash, type }: any) => {
  const [page, setPage] = useState(false);
  useEffect(() => {
    //  console.log("text: " + key);
  }, [id]);

  useEffect(() => {
    setPage(true);

    setTimeout(function () {
      setPage(false);
    }, 1000);
  }, [value]);

  useEffect(() => {
    //  console.log("handleChange: " + color);
  }, [color]);

//   const formatValue = formatThousand.includes(id)
//     ? id == "matchedVolume"
//       ? (value * 10).toLocaleString("en")
//       : parseFloat(value).toLocaleString("en")
//     : id == "priceChangePercent"
//     ? parseFloat(value as any).toFixed(2) + "%"
//     : ((value as any) / 1000).toFixed(2);
  return (
    <TableCell
      className={page ? `color-light-text-${type}` : ``}
      id={keyCell + id}
      key={id}
      align={align}
      style={{
        color: color,
        border: "0 solid",
        fontSize: ".75rem",
        lineHeight: "1rem",
        padding: 6,
        textAlign: "right",
        // animation: isFlash ? "invalid 1s" : "none",
      }}
      height={5}
    >
      {value}
    </TableCell>
  );
};

export default memo(Child);
