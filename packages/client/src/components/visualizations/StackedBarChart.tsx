import {
  stack,
  union,
  index,
  scaleBand,
  groupSort,
  sum,
  max,
  scaleLinear,
  scaleOrdinal,
  schemeSpectral,
  create,
  axisBottom,
  axisLeft,
} from "d3";
import { getDisplayDimensions } from "../../utils";

interface DataPoint {
  x: { label: string };
  y: {
    label: string;
    value: number;
  };
}
interface IStackedBarChart {
  data: DataPoint[];
  width?: number;
//   height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

// Define the return type: either an SVGElement or null
function StackedBarChart({
  data,
  width = 928,
  marginTop = 10,
  marginRight = 10,
  marginBottom = 20,
  marginLeft = 40,
}: IStackedBarChart): SVGSVGElement | null {
  const yKeys = Array.from(union(data.map(({ y }) => y.label)));

  const { width: _width, height: _height } = getDisplayDimensions({
    aspectRatio: "16:9",
    width: width,
  });
  // Group data by state -> age
  const indexed = index(
    data,
    (d) => d.x.label,
    (d) => d.y.label
  );

  // Generate the stacked series
  const series = stack<DataPoint>()
    .keys(yKeys)
    .value(({ y: { label: yLabel, value: yValue } }, key) =>
      yLabel === key ? yValue : 0
    )(data);

  // x-scale by state, sorted by total descending
  const x = scaleBand()
    .domain(
      groupSort(
        data,
        (D) => -sum(D, (d) => d.y.value),
        (d) => d.x.label
      )
    )
    .range([marginLeft, _width - marginRight])
    .padding(0.1);

  // y-scale for population values
  const y = scaleLinear()
    .domain([0, max(series, (d) => max(d, (d) => d[1])) ?? 0])
    .rangeRound([_height - marginBottom, marginTop]);

  // color scale by age group
  const color = scaleOrdinal<string, string>()
    .domain(series.map((d) => d.key))
    .range(schemeSpectral[yKeys.length])
    .unknown("#ccc");

  // Format numbers for tooltip
  const formatValue = (x: number): string =>
    isNaN(x) ? "N/A" : x.toLocaleString("en");

  // Create the SVG container
  const svg = create("svg")
    .attr("width", _width)
    .attr("height", _height)
    .attr("viewBox", `0 0 ${_width} ${_height}`)
    .attr("style", "max-width: 100%; height: auto;");

  svg
    .append("g")
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    .data((D) =>
      D.map((d) => {
        (d as any).key = D.key;
        return d;
      })
    )
    .join("rect")
    // .attr("x", (d) => x(d.data[0])!)
    .attr("y", (d) => y(d[1]))
    .attr("height", (d) => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .append("title")
    .text((d: any) => {
      const groupName = d.key;
      const state = d.data[0];
      const group = d.data[1] as Map<string, DataPoint>;
      const pop = group.get(groupName)?.y.value ?? 0;
      return `${state} ${groupName}\n${formatValue(pop)}`;
    });

  // Append X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${_height - marginBottom})`)
    .call(axisBottom(x).tickSizeOuter(0))
    .call((g) => g.selectAll(".domain").remove());

  // Append Y Axis
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(axisLeft(y).ticks(null, "s"))
    .call((g) => g.selectAll(".domain").remove());

  // Return SVG element with attached color scale
  const svgNode = svg.node();

  return !!svgNode ?( Object.assign(svgNode, { scales: { color } }) as SVGSVGElement) : null; 
}

export default StackedBarChart;
