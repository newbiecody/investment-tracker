import { useQuery } from "@tanstack/react-query";
import { getMarketNews } from "./finnhub";
export const getMarketNewsKey = () => {
  return ["finnhub", "market-news"];
};
export const useGetMarketNews = () =>
  useQuery(getMarketNewsKey(), () => getMarketNews(), {
    staleTime: Infinity,
  });
