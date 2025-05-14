import { Progress } from "@/components/ui/progress"

const pipelineStages = [
  {
    name: "Prospect",
    count: 12,
    value: 15000,
    color: "bg-blue-500",
  },
  {
    name: "Qualification",
    count: 8,
    value: 12500,
    color: "bg-indigo-500",
  },
  {
    name: "Proposition",
    count: 5,
    value: 8500,
    color: "bg-violet-500",
  },
  {
    name: "Négociation",
    count: 3,
    value: 6500,
    color: "bg-purple-500",
  },
  {
    name: "Clôturé",
    count: 2,
    value: 4500,
    color: "bg-green-500",
  },
]

export function SalesPipeline() {
  const totalValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {pipelineStages.map((stage, index) => (
          <div
            key={index}
            className={`${stage.color} h-full`}
            style={{ width: `${(stage.value / totalValue) * 100}%` }}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pipelineStages.map((stage, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                <span className="text-sm font-medium">{stage.name}</span>
              </div>
              <span className="text-sm font-medium">{stage.count}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{((stage.value / totalValue) * 100).toFixed(1)}%</span>
              <span className="font-medium">
                {stage.value.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
            <Progress value={(stage.value / totalValue) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
