import Link from "next/link"
import { ArrowLeft, Building, Mail, Phone, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ClientProjects } from "@/components/clients/client-projects"
import { ClientContacts } from "@/components/clients/client-contacts"
import { ClientNotes } from "@/components/clients/client-notes"

// This would normally come from a database
const getClientById = (id: string) => {
  
  // dummy data ( fetching from api)
  return {
    id,
    name: "Acme Inc",
    email: "contact@acme.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de Paris, 75001 Paris, France",
    status: "Active",
    industry: "Technologie",
    website: "https://acme.com",
    createdAt: "12 janvier 2023",
  }
}

export default function ClientDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const client = getClientById(params.id)

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Link
            href="/clients"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Retour aux clients
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{client.industry}</Badge>
            <Badge
              variant={client.status === "Active" ? "default" : client.status === "Inactif" ? "secondary" : "outline"}
            >
              {client.status}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline">Modifier</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un projet
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
            <CardDescription>Détails du client</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{client.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${client.email}`} className="text-sm text-primary hover:underline">
                {client.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${client.phone}`} className="text-sm text-primary hover:underline">
                {client.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {client.website}
              </a>
            </div>
            <div className="pt-4 text-sm text-muted-foreground">Client depuis: {client.createdAt}</div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="projects" className="mt-4">
              <ClientProjects clientId={params.id} />
            </TabsContent>
            <TabsContent value="contacts" className="mt-4">
              <ClientContacts clientId={params.id} />
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <ClientNotes clientId={params.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
