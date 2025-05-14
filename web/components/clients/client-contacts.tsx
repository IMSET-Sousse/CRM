import { Mail, Phone, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// This would normally come from a database
const getClientContacts = (clientId: string) => {
  return [
    {
      id: "1",
      name: "Jean Dupont",
      title: "Directeur Général",
      email: "jean.dupont@acme.com",
      phone: "+33 6 12 34 56 78",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Marie Martin",
      title: "Directrice Marketing",
      email: "marie.martin@acme.com",
      phone: "+33 6 23 45 67 89",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Pierre Leroy",
      title: "Responsable IT",
      email: "pierre.leroy@acme.com",
      phone: "+33 6 34 56 78 90",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]
}

export function ClientContacts({ clientId }: { clientId: string }) {
  const contacts = getClientContacts(clientId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Contacts ({contacts.length})</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un contact
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{contact.name}</CardTitle>
                <CardDescription>{contact.title}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="text-sm text-primary hover:underline">
                  {contact.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
