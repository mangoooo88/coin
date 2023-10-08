import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import App from "./App";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/:coinId",
    element: <Coin/>,
    children: [
      {
        path: "price",
        element: <Price/>
      },
      {
        path: "chart",
        element: <Chart/>,
      },
    ]
  },
], {
  basename : process.env.PUBLIC_URL
})

export default router