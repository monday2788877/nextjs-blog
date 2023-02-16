import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import io from 'socket.io-client';


export default function Post() {
  const [data, setData] = useState(null) as any;
  const [isLoading, setLoading] = useState(false);
  const socket = io("wss://pricestream-iboard.ssi.com.vn/realtime", {
    reconnectionDelayMax: 10000,
  });
  
  
  socket.on("connect", () => {
    console.log("dawdw");
    socket.send({
      type: "sub",
      topic: "stockRealtimeByList",
      variables: [
        "hose:2928"
      ]
    });
  });
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://simpledb-7a56.restdb.io/rest/historical-data-1673507667204?sort=symbol&max=20`,
      {
        headers: {
          "x-apikey": "63bfb4be969f06502871adca",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="tickers">
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th className="num">Price</th>
            <th className="num">Change</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((tic: any) => (
              <tr
                key={tic._id}
                className={
                  tic.isChanged
                    ? tic["net chg"] > 0
                      ? "up"
                      : "down"
                    : "passive"
                }
              >
                <td>{tic.symbol}</td>
                <td>{tic.name}</td>
                <td className="num">{tic.Volume.toFixed(2) || 0.0}</td>
                <td className="num">
                  {tic["Volume"] ? tic["Volume"].toFixed(2) : 0.0}
                </td>
              </tr>
            )) as any
          }
        </tbody>
      </table>
    </div>
  );
}
