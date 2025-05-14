import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const recentClients = [
  {
    id: "1",
    name: "Acme Inc",
    email: "contact@acme.com",
    status: "Active",
    lastContact: "Il y a 2 jours",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Globex Corporation",
    email: "info@globex.com",
    status: "Active",
    lastContact: "Il y a 5 jours",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Stark Industries",
    email: "contact@stark.com",
    status: "Inactif",
    lastContact: "Il y a 2 semaines",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Wayne Enterprises",
    email: "info@wayne.com",
    status: "Active",
    lastContact: "Hier",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentClients() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {recentClients.map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-muted-foreground">{client.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/clients/${client.id}`}>
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Voir le client</span>
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/clients">
          Voir tous les clients
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
