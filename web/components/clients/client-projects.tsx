import Link from "next/link"
import { ArrowRight, Clock, FileCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// This would normally come from a database
const getClientProjects = (clientId: string) => {
  return [
    {
      id: "1",
      name: "Refonte du site web",
      description: "Modernisation complète du site web corporate",
      status: "En cours",
      progress: 65,
      startDate: "15 janvier 2023",
      endDate: "30 juin 2023",
    },
    {
      id: "2",
      name: "Application mobile",
      description: "Développement d'une application mobile iOS et Android",
      status: "En attente",
      progress: 25,
      startDate: "1 mars 2023",
      endDate: "15 septembre 2023",
    },
    {
      id: "3",
      name: "Intégration CRM",
      description: "Intégration du système CRM avec les outils existants",
      status: "Terminé",
      progress: 100,
      startDate: "10 novembre 2022",
      endDate: "28 février 2023",
    },
  ]
}

export function ClientProjects({ clientId }: { clientId: string }) {
  const projects = getClientProjects(clientId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projets ({projects.length})</h3>
        <Button size="sm">Ajouter un projet</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    project.status === "En cours"
                      ? "default"
                      : project.status === "En attente"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {project.status}
                </Badge>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/projets/${project.id}`}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Voir le projet</span>
                  </Link>
                </Button>
              </div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progression</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{project.startDate}</span>
              </div>
              <div className="flex items-center">
                <FileCheck className="mr-1 h-3 w-3" />
                <span>{project.endDate}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
