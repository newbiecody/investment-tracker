import axios from "axios";

const FINNHUB_API_URI_BASE = "https://finnhub.io/api/v1/";
const constructFinnhubUrl = (resourceUrl: string) =>
  FINNHUB_API_URI_BASE +
  resourceUrl +
  `token=${import.meta.env.VITE_FINNHUB_API_KEY}`;

export type TNewsArticle = {
  category: string;
  datetime: number; // Time in UNIX timestamp
  id: string;
  image: string; // Image uri
  related: string;
  source: string;
  summary: string;
  url: string; // URL to original article
  headline: string;
};
type TGetMarketNewsParams = {
  category: string;
  minId: string;
};
export const getMarketNews = async (
  urlParams?: Partial<TGetMarketNewsParams>
) => {
  const urlParamsString = urlParams
    ? new URLSearchParams(Object.entries(urlParams)).toString()
    : "";
  const uri = `/news?${urlParamsString}`;

  const { data } = await axios.get<TNewsArticle[]>(constructFinnhubUrl(uri));

  return data;
};
