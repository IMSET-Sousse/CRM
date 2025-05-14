"use client"

import { useState } from "react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ArrowRight, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This would normally come from a database
const initialData = {
  stages: {
    prospect: {
      id: "prospect",
      title: "Prospect",
      opportunityIds: ["1", "2", "3"],
    },
    qualification: {
      id: "qualification",
      title: "Qualification",
      opportunityIds: ["4", "5"],
    },
    proposition: {
      id: "proposition",
      title: "Proposition",
      opportunityIds: ["6", "7"],
    },
    negotiation: {
      id: "negotiation",
      title: "Négociation",
      opportunityIds: ["8"],
    },
    closed: {
      id: "closed",
      title: "Clôturé",
      opportunityIds: ["9", "10"],
    },
  },
  stageOrder: ["prospect", "qualification", "proposition", "negotiation", "closed"],
  opportunities: {
    "1": {
      id: "1",
      title: "Refonte site web",
      client: "Acme Inc",
      value: 15000,
      probability: 20,
      contact: {
        name: "Jean Dupont",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "2": {
      id: "2",
      title: "Application mobile",
      client: "Globex Corporation",
      value: 25000,
      probability: 30,
      contact: {
        name: "Marie Martin",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "3": {
      id: "3",
      title: "Intégration CRM",
      client: "Stark Industries",
      value: 8000,
      probability: 40,
      contact: {
        name: "Pierre Leroy",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "4": {
      id: "4",
      title: "Maintenance annuelle",
      client: "Wayne Enterprises",
      value: 12000,
      probability: 60,
      contact: {
        name: "Sophie Bernard",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "5": {
      id: "5",
      title: "Formation équipe",
      client: "Umbrella Corporation",
      value: 5000,
      probability: 70,
      contact: {
        name: "Thomas Dubois",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "6": {
      id: "6",
      title: "Développement API",
      client: "Cyberdyne Systems",
      value: 18000,
      probability: 80,
      contact: {
        name: "Julie Moreau",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "7": {
      id: "7",
      title: "Audit sécurité",
      client: "Oscorp Industries",
      value: 7500,
      probability: 75,
      contact: {
        name: "Nicolas Petit",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "8": {
      id: "8",
      title: "Plateforme e-commerce",
      client: "LexCorp",
      value: 30000,
      probability: 90,
      contact: {
        name: "Camille Roux",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    "9": {
      id: "9",
      title: "Système de réservation",
      client: "Massive Dynamic",
      value: 22000,
      probability: 100,
      contact: {
        name: "Alexandre Blanc",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "won",
    },
    "10": {
      id: "10",
      title: "Application interne",
      client: "Soylent Corp",
      value: 14000,
      probability: 0,
      contact: {
        name: "Émilie Durand",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "lost",
    },
  },
}

export function OpportunitiesPipeline() {
  const [data, setData] = useState(initialData)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or if the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const sourceStage = data.stages[source.droppableId]
    const destinationStage = data.stages[destination.droppableId]

    // If moving within the same stage
    if (sourceStage === destinationStage) {
      const newOpportunityIds = Array.from(sourceStage.opportunityIds)
      newOpportunityIds.splice(source.index, 1)
      newOpportunityIds.splice(destination.index, 0, draggableId)

      const newStage = {
        ...sourceStage,
        opportunityIds: newOpportunityIds,
      }

      const newData = {
        ...data,
        stages: {
          ...data.stages,
          [newStage.id]: newStage,
        },
      }

      setData(newData)
      return
    }

    // Moving from one stage to another
    const sourceOpportunityIds = Array.from(sourceStage.opportunityIds)
    sourceOpportunityIds.splice(source.index, 1)
    const newSourceStage = {
      ...sourceStage,
      opportunityIds: sourceOpportunityIds,
    }

    const destinationOpportunityIds = Array.from(destinationStage.opportunityIds)
    destinationOpportunityIds.splice(destination.index, 0, draggableId)
    const newDestinationStage = {
      ...destinationStage,
      opportunityIds: destinationOpportunityIds,
    }

    const newData = {
      ...data,
      stages: {
        ...data.stages,
        [newSourceStage.id]: newSourceStage,
        [newDestinationStage.id]: newDestinationStage,
      },
    }

    setData(newData)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {data.stageOrder.map((stageId) => {
          const stage = data.stages[stageId]
          const opportunities = stage.opportunityIds.map((opportunityId) => data.opportunities[opportunityId])

          return (
            <div key={stage.id} className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {stage.title} <span className="ml-1 text-muted-foreground">({stage.opportunityIds.length})</span>
                </h3>
                <Badge variant="outline">
                  {opportunities
                    .reduce((sum, opp) => sum + opp.value, 0)
                    .toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                </Badge>
              </div>
              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-1 flex-col gap-2 rounded-lg border border-dashed p-2"
                  >
                    {opportunities.map((opportunity, index) => (
                      <Draggable key={opportunity.id} draggableId={opportunity.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <CardHeader className="p-3 pb-0">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant={
                                    opportunity.status === "won"
                                      ? "default"
                                      : opportunity.status === "lost"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className="px-1.5 py-0 text-xs"
                                >
                                  {opportunity.probability}%
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-6 w-6 p-0">
                                      <MoreHorizontal className="h-3 w-3" />
                                      <span className="sr-only">Menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/opportunites/${opportunity.id}`}>Voir les détails</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Marquer comme gagnée</DropdownMenuItem>
                                    <DropdownMenuItem>Marquer comme perdue</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <CardTitle className="text-sm font-medium">{opportunity.title}</CardTitle>
                              <CardDescription className="text-xs">{opportunity.client}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-3 pt-2">
                              <div className="text-sm font-medium">
                                {opportunity.value.toLocaleString("fr-FR", {
                                  style: "currency",
                                  currency: "EUR",
                                  minimumFractionDigits: 0,
                                })}
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-3 pt-0">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={opportunity.contact.avatar || "/placeholder.svg"}
                                    alt={opportunity.contact.name}
                                  />
                                  <AvatarFallback className="text-[10px]">
                                    {opportunity.contact.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{opportunity.contact.name}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                                <Link href={`/opportunites/${opportunity.id}`}>
                                  <ArrowRight className="h-3 w-3" />
                                  <span className="sr-only">Voir l&apos;opportunité</span>
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {opportunities.length === 0 && (
                      <div className="flex h-24 items-center justify-center rounded-md border border-dashed p-2 text-center text-sm text-muted-foreground">
                        Déposez les opportunités ici
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
