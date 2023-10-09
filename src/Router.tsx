import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import Coins from "./routes/Coins";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Coins/>,
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
    ]
  },

], {
  basename : process.env.PUBLIC_URL
})

export default router