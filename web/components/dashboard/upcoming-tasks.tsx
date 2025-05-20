import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"


// dummy data ( fetching from tasks api)
const upcomingTasks = [
  {
    id: "1",
    title: "Appel avec Acme Inc",
    date: "Aujourd'hui, 14:00",
    priority: "Haute",
    completed: false,
  },
  {
    id: "2",
    title: "Préparer la proposition pour Globex",
    date: "Demain, 10:00",
    priority: "Moyenne",
    completed: false,
  },
  {
    id: "3",
    title: "Réunion d'équipe hebdomadaire",
    date: "Jeudi, 09:30",
    priority: "Normale",
    completed: false,
  },
  {
    id: "4",
    title: "Suivre le paiement de Wayne Enterprises",
    date: "Vendredi, 15:00",
    priority: "Haute",
    completed: false,
  },
]

export function UpcomingTasks() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent"
          >
            <div className="flex items-center gap-3">
              <Checkbox id={`task-${task.id}`} />
              <div>
                <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                  {task.title}
                </label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{task.date}</span>
                </div>
              </div>
            </div>
            <Badge
              variant={
                task.priority === "Haute" ? "destructive" : task.priority === "Moyenne" ? "default" : "secondary"
              }
            >
              {task.priority}
            </Badge>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/taches">
          Voir toutes les tâches
          <Calendar className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
