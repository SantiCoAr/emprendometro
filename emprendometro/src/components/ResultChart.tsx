import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { ScoreByDimension } from "../utils/score";
import { getColor, dimensionLabels } from "../utils/score";

interface Props {
  data: ScoreByDimension[];
}

export default function ResultChart({ data }: Props) {
  return (
    /* Contenedor fijo para pruebas */
    <div style={{ width: 700, height: 420}}>
      <BarChart
        layout="vertical"
        width={700}
        height={420}
        data={data}
        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        barSize={26}
      >
        <XAxis type="number" domain={[0, 20]} hide />
        <YAxis
          type="category"
          dataKey="dimension"
          width={150}
          tickFormatter={(d) =>
            dimensionLabels[d as keyof typeof dimensionLabels]
          }
        />
        <Tooltip
          formatter={(v: number) => [`${v}/20`, "Puntaje"]}
          labelFormatter={(l) =>
            dimensionLabels[l as keyof typeof dimensionLabels]
          }
        />
        <Bar dataKey="value">
          {data.map((d) => (
            <Cell key={d.dimension} fill={getColor(d.value)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
