import { useMemo } from "react";
import { useGetMarketNews } from "../api/useFinnhub";
import Spinner from "../components/Spinner";
import { removeStopwords } from "stopword";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { convertUnixTimestampToHumanReadable } from "../utils";
import WordCloud from "../components/visualization/WordCloud";

function News() {
  const {
    data,
    isLoading: isLoadingMarketNews,
    isError: isErrorMarketNews,
  } = useGetMarketNews();

  const redirectToArticle = (url: string) => {
    window.open(url, "_blank");
  };

  const words = useMemo(() => {
    const wordList = removeStopwords(
      (!(isLoadingMarketNews || isErrorMarketNews)
        ? data.map((article) => article.summary.split(" "))
        : []
      ).flat()
    ) as string[];

    const wordsCount = wordList.reduce((acc, currentValue) => {
      if (!acc[currentValue]) {
        acc[currentValue] = 0;
      }
      acc[currentValue] += 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(wordsCount).map(([text, count]) => ({
      text: text,
      count: count,
    }));
  }, [data]);
  return (
    <>
      {/* <WordCloud width={2560} height={2000} words={words} /> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoadingMarketNews && <Spinner />}
        {isErrorMarketNews && "Failed to load page"}
        {!(isLoadingMarketNews || isErrorMarketNews) &&
          data.map(
            ({
              category,
              datetime,
              id,
              image,
              related,
              source,
              summary,
              url,
              headline,
            }) => (
              <Card
                className="w-[375px] hover:cursor-pointer hover:shadow-xl group"
                key={id}
                onClick={() => {
                  redirectToArticle(url);
                }}
              >
                <img src={image} />
                <CardHeader>
                  <CardTitle className="group-hover:underline">
                    {headline}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{summary}</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <div>{convertUnixTimestampToHumanReadable(datetime)}</div>
                    <div>Source: {source}</div>
                  </div>
                </CardFooter>
              </Card>
            )
          )}
      </div>
    </>
  );
}

export default News;
