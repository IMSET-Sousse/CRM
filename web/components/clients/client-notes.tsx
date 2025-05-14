"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// This would normally come from a database
const getClientNotes = (clientId: string) => {
  return [
    {
      id: "1",
      content:
        "Appel téléphonique concernant le projet de refonte du site web. Le client souhaite ajouter une fonctionnalité de blog.",
      createdAt: "2023-05-15T10:30:00",
      author: {
        name: "Sophie Bernard",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      content:
        "Réunion de suivi pour l'application mobile. Le client est satisfait de l'avancement mais souhaite quelques ajustements sur l'interface utilisateur.",
      createdAt: "2023-04-28T14:15:00",
      author: {
        name: "Thomas Dubois",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      content:
        "Discussion sur l'intégration CRM. Tous les objectifs ont été atteints et le client est très satisfait du résultat final.",
      createdAt: "2023-02-28T11:00:00",
      author: {
        name: "Sophie Bernard",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ]
}

export function ClientNotes({ clientId }: { clientId: string }) {
  const notes = getClientNotes(clientId)
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (!newNote.trim()) return

    // In a real app, you would add the note to the database
    alert("Note ajoutée: " + newNote)
    setNewNote("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Notes ({notes.length})</h3>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Ajouter une note</CardTitle>
          <CardDescription>Ajoutez une note concernant ce client</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Saisissez votre note ici..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddNote} disabled={!newNote.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {notes.map((note) => {
          const date = new Date(note.createdAt)
          const formattedDate = format(date, "d MMMM yyyy 'à' HH:mm", { locale: fr })

          return (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                    <AvatarFallback>
                      {note.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">{note.author.name}</CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {formattedDate}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{note.content}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
