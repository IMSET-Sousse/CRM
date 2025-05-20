"use client"

import { useState } from "react"
import { format, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { Clock, Edit, MoreHorizontal, Trash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// dummy data ( fetching from tasks api)
const allTasks = [
  {
    id: "1",
    title: "Appel avec Acme Inc",
    description: "Discuter de la refonte du site web",
    date: "2023-05-15T14:00:00",
    priority: "Haute",
    completed: false,
    assignedTo: {
      name: "Sophie Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "2",
    title: "Préparer la proposition pour Globex",
    description: "Finaliser le devis et la présentation",
    date: "2023-05-16T10:00:00",
    priority: "Moyenne",
    completed: false,
    assignedTo: {
      name: "Thomas Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "3",
    title: "Réunion d'équipe hebdomadaire",
    description: "Faire le point sur les projets en cours",
    date: "2023-05-18T09:30:00",
    priority: "Normale",
    completed: false,
    assignedTo: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "4",
    title: "Suivre le paiement de Wayne Enterprises",
    description: "Relancer pour la facture en retard",
    date: "2023-05-19T15:00:00",
    priority: "Haute",
    completed: false,
    assignedTo: {
      name: "Marie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "5",
    title: "Mise à jour du CRM",
    description: "Mettre à jour les informations clients",
    date: "2023-05-15T11:00:00",
    priority: "Basse",
    completed: true,
    assignedTo: {
      name: "Pierre Leroy",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
]

export function TasksList({ selectedDate }: { selectedDate?: Date }) {
  const [tasks, setTasks] = useState(allTasks)

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const filteredTasks = selectedDate
    ? tasks.filter((task) => {
        const taskDate = new Date(task.date)
        return isSameDay(taskDate, selectedDate)
      })
    : tasks

  if (filteredTasks.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center text-center text-muted-foreground">
        Aucune tâche pour cette journée
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-start justify-between rounded-lg border p-3 transition-colors ${
            task.completed ? "bg-muted/50" : "hover:bg-accent"
          }`}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="mt-1"
            />
            <div>
              <label
                htmlFor={`task-${task.id}`}
                className={`font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}
              >
                {task.title}
              </label>
              <p className={`text-sm ${task.completed ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
                {task.description}
              </p>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {format(new Date(task.date), "d MMM yyyy 'à' HH:mm", {
                      locale: fr,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                    <AvatarFallback className="text-[10px]">
                      {task.assignedTo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{task.assignedTo.name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                task.priority === "Haute"
                  ? "destructive"
                  : task.priority === "Moyenne"
                    ? "default"
                    : task.priority === "Normale"
                      ? "secondary"
                      : "outline"
              }
            >
              {task.priority}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
