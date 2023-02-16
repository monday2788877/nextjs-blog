import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useWebSocket from "react-use-websocket";
import { useAppDispatch, usePrevious } from "../hooks";
import { NumericFormat } from "react-number-format";
import Child from "./child";
import { io } from "socket.io-client";
const socket = io("ws://10.21.0.143:3000", {
  reconnectionDelayMax: 10000,
});

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
const columnsGroup: any[] = [
  {
    id: "stockSymbol",
    label: "CK",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
  {
    id: "exchange",
    label: "Sàn CK",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
  {
    id: "ceiling",
    label: "Trần",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
  {
    id: "refPrice",
    label: "TC",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
  {
    id: "floor",
    label: "Sàn",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },

  {
    id: "bid_0",
    label: "Bên mua",
    minWidth: 74,
    align: "right",
    //rowSpan: 2,
    colSpan: 6,
    className: "table-header-place-order",
  },
  {
    id: "matched_0",
    label: "Khớp lệnh",
    minWidth: 74,
    align: "right",
    //rowSpan: 2,
    colSpan: 4,
    className: "table-header-place-order",
  },
  {
    id: "asked_0",
    label: "Bên bán",
    minWidth: 74,
    align: "right",
    //rowSpan: 2,
    colSpan: 6,
    className: "table-header-place-order",
  },
  {
    id: "nmTotalTradedQty",
    label: "Tổng KL",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
  {
    id: "highest",
    label: "Cao",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
  {
    id: "lowest",
    label: "Thấp",
    minWidth: 74,
    align: "right",
    rowSpan: 2,
    className: "table-header-place-order",
  },
];
const columns: Column[] = [
  { id: "best3Bid", label: "Giá 3", minWidth: 74, align: "right" },
  { id: "best3BidVol", label: "KL 3", minWidth: 74, align: "right" },
  { id: "best2Bid", label: "Giá 2", minWidth: 74, align: "right" },
  { id: "best2BidVol", label: "KL 2", minWidth: 74, align: "right" },
  { id: "best1Bid", label: "Giá 1", minWidth: 74, align: "right" },
  { id: "best1BidVol", label: "KL 1", minWidth: 74, align: "right" },

  { id: "matchedPrice", label: "Giá", minWidth: 74, align: "right" },
  { id: "matchedVolume", label: "KL", minWidth: 74, align: "right" },
  { id: "priceChange", label: "+/-", minWidth: 74, align: "right" },
  { id: "priceChangePercent", label: "+/- (%)", minWidth: 74, align: "right" },

  { id: "best1Offer", label: "Giá 1", minWidth: 74, align: "right" },
  { id: "best1OfferVol", label: "KL 1", minWidth: 74, align: "right" },
  { id: "best2Offer", label: "Giá 2", minWidth: 74, align: "right" },
  { id: "best2OfferVol", label: "KL 2", minWidth: 74, align: "right" },
  { id: "best3Offer", label: "Giá 3", minWidth: 74, align: "right" },
  { id: "best3OfferVol", label: "KL 3", minWidth: 74, align: "right" },
];

function ColumnGroupingTable() {
  const [stocksList, setStocksList] = React.useState({
    SHS: {
      "stockNo": "hnx:6604",
      "ceiling": 9200,
      "floor": 7600,
      "refPrice": 8400,
      "stockSymbol": "SHS",
      "stockType": "s",
      "exchange": "hnx",
      "lastMatchedPrice": 8400,
      "matchedPrice": 8400,
      "matchedVolume": 200,
      "priceChange": "0.00",
      "priceChangePercent": "0.0",
      "highest": 8600,
      "avgPrice": 8468.07,
      "lowest": 8300,
      "nmTotalTradedQty": 4694000,
      "best1Bid": 8400,
      "best1BidVol": 103400,
      "best2Bid": 8300,
      "best2BidVol": 1122800,
      "best3Bid": 8200,
      "best3BidVol": 1085700,
      "best4Bid": 8100,
      "best4BidVol": 768400,
      "best5Bid": 8000,
      "best5BidVol": 938800,
      "best6Bid": 7900,
      "best6BidVol": 353700,
      "best7Bid": 7800,
      "best7BidVol": 292800,
      "best8Bid": 7700,
      "best8BidVol": 195100,
      "best9Bid": 7600,
      "best9BidVol": 364800,
      "best10Bid": 0,
      "best10BidVol": 0,
      "best1Offer": 8500,
      "best1OfferVol": 1007900,
      "best2Offer": 8600,
      "best2OfferVol": 1547300,
      "best3Offer": 8700,
      "best3OfferVol": 1418200,
      "best4Offer": 8800,
      "best4OfferVol": 1161300,
      "best5Offer": 8900,
      "best5OfferVol": 1034100,
      "best6Offer": 9000,
      "best6OfferVol": 1437200,
      "best7Offer": 9100,
      "best7OfferVol": 540900,
      "best8Offer": 9200,
      "best8OfferVol": 1377500,
      "best9Offer": 0,
      "best9OfferVol": 0,
      "best10Offer": 0,
      "best10OfferVol": 0,
      "buyForeignQtty": 87525,
      "buyForeignValue": 743062500,
      "sellForeignQtty": 11200,
      "sellForeignValue": 95200000,
      "caStatus": "",
      "tradingStatus": null,
      "tradingUnit": "100",
      "remainForeignQtty": 344327157,
      "currentBidQty": 5225500,
      "currentOfferQty": 9524400,
      "session": "LO",
      "oddSession": "LO",
      "__typename": "StockRealtime"
  },
  });
  // let duplicate = { ...stocksList };

  const prevStocksList: any = usePrevious({
    SHS: {
      "stockNo": "hnx:6604",
      "ceiling": 9200,
      "floor": 7600,
      "refPrice": 8400,
      "stockSymbol": "SHS",
      "stockType": "s",
      "exchange": "hnx",
      "lastMatchedPrice": 8400,
      "matchedPrice": 8400,
      "matchedVolume": 200,
      "priceChange": "0.00",
      "priceChangePercent": "0.0",
      "highest": 8600,
      "avgPrice": 8468.07,
      "lowest": 8300,
      "nmTotalTradedQty": 4694000,
      "best1Bid": 8400,
      "best1BidVol": 103400,
      "best2Bid": 8300,
      "best2BidVol": 1122800,
      "best3Bid": 8200,
      "best3BidVol": 1085700,
      "best4Bid": 8100,
      "best4BidVol": 768400,
      "best5Bid": 8000,
      "best5BidVol": 938800,
      "best6Bid": 7900,
      "best6BidVol": 353700,
      "best7Bid": 7800,
      "best7BidVol": 292800,
      "best8Bid": 7700,
      "best8BidVol": 195100,
      "best9Bid": 7600,
      "best9BidVol": 364800,
      "best10Bid": 0,
      "best10BidVol": 0,
      "best1Offer": 8500,
      "best1OfferVol": 1007900,
      "best2Offer": 8600,
      "best2OfferVol": 1547300,
      "best3Offer": 8700,
      "best3OfferVol": 1418200,
      "best4Offer": 8800,
      "best4OfferVol": 1161300,
      "best5Offer": 8900,
      "best5OfferVol": 1034100,
      "best6Offer": 9000,
      "best6OfferVol": 1437200,
      "best7Offer": 9100,
      "best7OfferVol": 540900,
      "best8Offer": 9200,
      "best8OfferVol": 1377500,
      "best9Offer": 0,
      "best9OfferVol": 0,
      "best10Offer": 0,
      "best10OfferVol": 0,
      "buyForeignQtty": 87525,
      "buyForeignValue": 743062500,
      "sellForeignQtty": 11200,
      "sellForeignValue": 95200000,
      "caStatus": "",
      "tradingStatus": null,
      "tradingUnit": "100",
      "remainForeignQtty": 344327157,
      "currentBidQty": 5225500,
      "currentOfferQty": 9524400,
      "session": "LO",
      "oddSession": "LO",
      "__typename": "StockRealtime"
  },
  });

  const [rows, setRows] = React.useState([
    {
      "stockNo": "hnx:6604",
      "ceiling": 9200,
      "floor": 7600,
      "refPrice": 8400,
      "stockSymbol": "SHS",
      "stockType": "s",
      "exchange": "hnx",
      "lastMatchedPrice": 8400,
      "matchedPrice": 8400,
      "matchedVolume": 200,
      "priceChange": "0.00",
      "priceChangePercent": "0.0",
      "highest": 8600,
      "avgPrice": 8468.07,
      "lowest": 8300,
      "nmTotalTradedQty": 4694000,
      "best1Bid": 8400,
      "best1BidVol": 103400,
      "best2Bid": 8300,
      "best2BidVol": 1122800,
      "best3Bid": 8200,
      "best3BidVol": 1085700,
      "best4Bid": 8100,
      "best4BidVol": 768400,
      "best5Bid": 8000,
      "best5BidVol": 938800,
      "best6Bid": 7900,
      "best6BidVol": 353700,
      "best7Bid": 7800,
      "best7BidVol": 292800,
      "best8Bid": 7700,
      "best8BidVol": 195100,
      "best9Bid": 7600,
      "best9BidVol": 364800,
      "best10Bid": 0,
      "best10BidVol": 0,
      "best1Offer": 8500,
      "best1OfferVol": 1007900,
      "best2Offer": 8600,
      "best2OfferVol": 1547300,
      "best3Offer": 8700,
      "best3OfferVol": 1418200,
      "best4Offer": 8800,
      "best4OfferVol": 1161300,
      "best5Offer": 8900,
      "best5OfferVol": 1034100,
      "best6Offer": 9000,
      "best6OfferVol": 1437200,
      "best7Offer": 9100,
      "best7OfferVol": 540900,
      "best8Offer": 9200,
      "best8OfferVol": 1377500,
      "best9Offer": 0,
      "best9OfferVol": 0,
      "best10Offer": 0,
      "best10OfferVol": 0,
      "buyForeignQtty": 87525,
      "buyForeignValue": 743062500,
      "sellForeignQtty": 11200,
      "sellForeignValue": 95200000,
      "caStatus": "",
      "tradingStatus": null,
      "tradingUnit": "100",
      "remainForeignQtty": 344327157,
      "currentBidQty": 5225500,
      "currentOfferQty": 9524400,
      "session": "LO",
      "oddSession": "LO",
      "__typename": "StockRealtime"
  },
  ]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.emit("message", {
        type: "sub",
        topic: "stockRealtimeByList",
        variables: ["SHS"],
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("message", (data) => {
      console.log(data);
      if(data["MsgType"] as any){
      stocksList["SHS"]["best1Bid"] = data["BestBidPrice1"] as any;
      stocksList["SHS"]["best1BidVol"] = data["BestBidQtty1"] as any;
      stocksList["SHS"]["best2Bid"] = data["BestBidPrice2"] as any;
      stocksList["SHS"]["best2BidVol"] = data["BestBidQtty2"] as any;
      stocksList["SHS"]["best3Bid"] = data["BestBidPrice3"] as any;
      stocksList["SHS"]["best3BidVol"] = data["BestBidQtty3"] as any;

      stocksList["SHS"]["best1Offer"] = data["BestOfferPrice1"] as any;
      stocksList["SHS"]["best1OfferVol"] = data["BestOfferQtty1"] as any;
      stocksList["SHS"]["best2Offer"] = data["BestOfferPrice2"] as any;
      stocksList["SHS"]["best2OfferVol"] = data["BestOfferQtty2"] as any;
      stocksList["SHS"]["best3Offer"] = data["BestOfferPrice3"] as any;
      stocksList["SHS"]["best3OfferVol"] = data["BestOfferQtty3"] as any;
      setStocksList({
        ...stocksList,
      });
    }else{
      stocksList["SHS"]["matchedVolume"] =data["MatchQtty"] as any;
      stocksList["SHS"]["matchedPrice"] = data["MatchPrice"] as any;

      stocksList["SHS"]["nmTotalTradedQty"] = data["TotalVolumeTraded"] as any;
      stocksList["SHS"]["highest"] = data["HighestPrice"] as any;

      stocksList["SHS"]["lowest"] = data["LowestPrice"] as any;

      stocksList["SHS"]["priceChange"] =data["priceChange"] as any;
      stocksList["SHS"]["priceChangePercent"] = data["priceChangePercent"] as any;
     // stocksList["SHS"]["priceChange"] = data["BestOfferQtty3"] as any;
    }
    setStocksList({
      ...stocksList,
    });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const processMessages = (event: { data: string }) => {
    //prevStocksListRef.current = stocksList as any;

    const response = event.data;
    const myArray = response.split("|");
    const stockNo = myArray[1] as keyof typeof stocksList;
    if (stocksList[stockNo]) {
      if (myArray[43] as any)
        stocksList[stockNo]["matchedVolume"] = myArray[43] as any;

      stocksList[stockNo]["matchedPrice"] = myArray[42] as any;
      stocksList[stockNo]["priceChange"] = myArray[52] as any;
      stocksList[stockNo]["priceChangePercent"] = myArray[53] as any;
      stocksList[stockNo]["best1Bid"] = myArray[2] as any;
      stocksList[stockNo]["best1BidVol"] = myArray[3] as any;
      stocksList[stockNo]["best2Bid"] = myArray[4] as any;
      stocksList[stockNo]["best2BidVol"] = myArray[5] as any;
      stocksList[stockNo]["best3Bid"] = myArray[6] as any;
      stocksList[stockNo]["best3BidVol"] = myArray[7] as any;
      stocksList[stockNo]["best1Offer"] = myArray[22] as any;
      stocksList[stockNo]["best1OfferVol"] = myArray[23] as any;
      stocksList[stockNo]["best2Offer"] = myArray[24] as any;
      stocksList[stockNo]["best2OfferVol"] = myArray[25] as any;
      stocksList[stockNo]["best3Offer"] = myArray[26] as any;
      stocksList[stockNo]["best3OfferVol"] = myArray[27] as any;

      stocksList[stockNo]["nmTotalTradedQty"] = myArray[54] as any;
      stocksList[stockNo]["highest"] = myArray[44] as any;

      stocksList[stockNo]["lowest"] = myArray[46] as any;

      setStocksList({
        ...stocksList,
      });
    }
  };
  const formatThousand = [
    "best1BidVol",
    "best2BidVol",
    "best3BidVol",
    "best1OfferVol",
    "best2OfferVol",
    "best3OfferVol",
    "matchedVolume",
  ];
  const Bid_Asked_Columns = {
    best1Bid: "best1Bid",
    best1BidVol: "best1Bid",
    best2Bid: "best2Bid",
    best2BidVol: "best2Bid",
    best3Bid: "best3Bid",
    best3BidVol: "best3Bid",
    best1Offer: "best1Offer",
    best1OfferVol: "best1Offer",
    best2Offer: "best2Offer",
    best2OfferVol: "best2Offer",
    best3Offer: "best3Offer",
    best3OfferVol: "best3Offer",
  };
  const Matched_Columns = {
    matchedPrice: "matchedPrice",
    matchedVolume: "matchedVolume",
    priceChange: "priceChange",
    priceChangePercent: "priceChangePercent",
  };

  return (
    <Paper sx={{ width: "100%", background: "#020210" }}>
      <TableContainer sx={{ maxHeight: 1040 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsGroup.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  colSpan={column.colSpan}
                  rowSpan={column.rowSpan}
                  className={column.className}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  height={5}
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 15,
                    minWidth: column.minWidth,
                    background: "#020210",
                    color: "#c1c1c1",
                    border: "0 solid",
                    fontSize: ".75rem",
                    lineHeight: "1rem",
                    padding: 6,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => {
              const Symbol = row["stockSymbol"] as keyof typeof stocksList;
              const dataSymbol = stocksList[Symbol] as any;
              const colorHighlight =
                parseFloat(dataSymbol["priceChange"]) == 0
                  ? "#fdff12"
                  : parseFloat(dataSymbol["priceChange"]) < 0
                  ? "#ff0017"
                  : "#0bdf39";
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell
                    style={{
                      color: colorHighlight,
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                    }}
                  >
                    {Symbol}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#c1c1c1",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                    }}
                  >
                    {"HNX"}
                  </TableCell>

                  <TableCell
                    style={{
                      color: "#f23aff",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                    }}
                  >
                    <NumericFormat
                      displayType="text"
                      value={(dataSymbol.ceiling / 1000).toFixed(2)}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fdff12",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                    }}
                  >
                    <NumericFormat
                      displayType="text"
                      value={(dataSymbol.refPrice / 1000).toFixed(2)}
                    />
                  </TableCell>

                  <TableCell
                    style={{
                      color: "#00c9ff",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                    }}
                  >
                    <NumericFormat
                      displayType="text"
                      value={(dataSymbol.floor / 1000).toFixed(2)}
                    />
                  </TableCell>

                  {columns.map((column: any) => {
                    //const value = row[column.id] as any;
                    // const Symbol = row["stockSymbol"] as keyof typeof stocksList;
                    // const obj = stocksList[Symbol] as any;
                    let color = "";
                    const ColumnNameBid_Asked =
                      column.id as keyof typeof Bid_Asked_Columns;
                    const ColumnNameMatched_Columns =
                      column.id as keyof typeof Matched_Columns;
                    if (Bid_Asked_Columns[ColumnNameBid_Asked]) {
                      color =
                        parseFloat(
                          dataSymbol[Bid_Asked_Columns[ColumnNameBid_Asked]]
                        ) == parseFloat(dataSymbol.refPrice)
                          ? "#fdff12"
                          : parseFloat(
                              dataSymbol[Bid_Asked_Columns[ColumnNameBid_Asked]]
                            ) == parseFloat(dataSymbol.ceiling)
                          ? "#f23aff"
                          : parseFloat(
                              dataSymbol[Bid_Asked_Columns[ColumnNameBid_Asked]]
                            ) == parseFloat(dataSymbol.floor)
                          ? "#00c9ff"
                          : parseFloat(
                              dataSymbol[Bid_Asked_Columns[ColumnNameBid_Asked]]
                            ) < parseFloat(dataSymbol.refPrice)
                          ? "#ff0017"
                          : "#0bdf39";
                    }
                    if (Matched_Columns[ColumnNameMatched_Columns]) {
                      color =
                        parseFloat(dataSymbol["matchedPrice"]) ==
                        parseFloat(dataSymbol.refPrice)
                          ? "#fdff12"
                          : parseFloat(dataSymbol["matchedPrice"]) ==
                            parseFloat(dataSymbol.ceiling)
                          ? "#f23aff"
                          : parseFloat(dataSymbol["matchedPrice"]) ==
                            parseFloat(dataSymbol.floor)
                          ? "#00c9ff"
                          : parseFloat(dataSymbol["matchedPrice"]) ==
                            parseFloat(dataSymbol.refPrice)
                          ? "#ff0017"
                          : "#0bdf39";
                    }
                    const oldData = prevStocksList as any;
                    let isFlash = false;
                    let type = "";
                    if (oldData) {
                      isFlash =
                        oldData[Symbol][column.id] != dataSymbol[column.id];
                    }
                    if (color == "#fdff12") type = "ref";
                    else if (color == "#00c9ff") type = "floor";
                    else if (color == "#f23aff") type = "ceil";
                    else if (color == "#ff0017") type = "down";
                    else if (color == "#0bdf39") type = "up";

                    const valueCell = dataSymbol[column.id];

                    let formatValue = "";
                    if (formatThousand.includes(column.id)) {
                      if (column.id == "matchedVolume")
                        formatValue = (valueCell * 10).toLocaleString("en");
                      else
                        formatValue =
                          parseFloat(valueCell).toLocaleString("en");
                    } else {
                      if (column.id == "priceChangePercent")
                        formatValue =
                          parseFloat(valueCell as any).toFixed(2) + "%";
                          else      if (column.id == "priceChange")
                          formatValue =
                            parseFloat(valueCell as any).toFixed(2) ;
                      else formatValue = ((valueCell as any) / 1000).toFixed(2);
                    }

                    return (
                      // <TableCell
                      //   key={column.id}
                      //   align={column.align}
                      //   style={{ color: color, border: "0 solid",animation:isFlash?"invalid 1s":"none" }}
                      // //  className={isFlash ? "invalid" : ""}
                      // >
                      //   {formatThousand.includes(column.id)
                      //     ? column.id == "matchedVolume"
                      //       ? (obj[column.id] * 10).toLocaleString("en")
                      //       : parseFloat(obj[column.id]).toLocaleString("en")
                      //     : column.id == "priceChangePercent"
                      //     ? parseFloat(obj[column.id] as any).toFixed(2)
                      //     : ((obj[column.id] as any) / 1000).toFixed(2)}
                      // </TableCell>
                      <Child
                        keyCell={dataSymbol["stockNo"]}
                        id={column.id}
                        align={column.align}
                        value={formatValue}
                        color={color}
                        isFlash={isFlash}
                        type={type}
                      />
                    );
                  })}
                  <TableCell
                    style={{
                      color: "#dfe1e3",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                      textAlign: "right",
                    }}
                  >
                    {parseFloat(dataSymbol.nmTotalTradedQty).toLocaleString(
                      "en"
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#0bdf39",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                      textAlign: "right",
                    }}
                  >
                    {(parseFloat(dataSymbol.highest) / 1000).toFixed(2)}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#ff0017",
                      border: "0 solid",
                      fontSize: ".75rem",
                      lineHeight: "1rem",
                      padding: 6,
                      textAlign: "right",
                    }}
                  >
                    {(parseFloat(dataSymbol.lowest) / 1000).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ColumnGroupingTable;
