import styled from "styled-components";
import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import React from "react";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CoinsList = styled.ul`
  padding: 0 20px;
`

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;

  a {
    transition: color .2s ease-in;
    display: flex;
    padding: 20px;
    align-items: center;
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface IRouterProps {
}

function Coins() {
  /*
  const [coins, setCoins] = useState<ICoin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      const json = await response.json()
      setCoins(json.slice(0, 100))
      setLoading(false)
    })()
  }, [])
  */

  const {isLoading, data} = useQuery<ICoin[]>(["allCoins"], fetchCoins,{
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  })
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom(prev => !prev)

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>토글 모드</button>
      </Header>
      {isLoading ?
        <Loader>"로딩중...."</Loader> :
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{name:coin.name, icon:`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="logo"/>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>}
    </Container>
  )
}

export default Coins