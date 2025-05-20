"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd"
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
import { useToast } from "@/components/ui/use-toast"
import { 
  fetchOpportunities, 
  updateOpportunityStage, 
  transformApiDataToPipeline, 
  type PipelineData, 
  type Opportunity,
  markOpportunityAsWon,
  markOpportunityAsLost,
  deleteOpportunity
} from "@/lib/opportunities"

type ErrorWithMessage = {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function OpportunitiesPipeline() {
  const [data, setData] = useState<PipelineData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const loadOpportunities = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const opportunities = await fetchOpportunities()
      const pipelineData = transformApiDataToPipeline(opportunities)
      setData(pipelineData)
      setError(null)
    } catch (err) {
      const errorWithMessage = toErrorWithMessage(err)
      setError(errorWithMessage.message)
      console.error(err)
      toast({
        title: "Erreur",
        description: "Impossible de charger les opportunités",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadOpportunities()
  }, [])

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (!data) return

    const { destination, source, draggableId } = result

    // If there's no destination or if the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const sourceStage = data.stages[source.droppableId]
    const destinationStage = data.stages[destination.droppableId]

    // Optimistically update the UI
    const newData = { ...data }
    const sourceOpportunityIds = Array.from(sourceStage.opportunityIds)
    sourceOpportunityIds.splice(source.index, 1)
    newData.stages[source.droppableId] = {
      ...sourceStage,
      opportunityIds: sourceOpportunityIds,
    }

    const destinationOpportunityIds = Array.from(destinationStage.opportunityIds)
    destinationOpportunityIds.splice(destination.index, 0, draggableId)
    newData.stages[destination.droppableId] = {
      ...destinationStage,
      opportunityIds: destinationOpportunityIds,
    }

    setData(newData)

    try {
      // Update the backend
      await updateOpportunityStage(parseInt(draggableId), destination.droppableId)
      toast({
        title: "Succès",
        description: "L'opportunité a été déplacée avec succès",
      })
    } catch (err) {
      // Revert the UI if the update fails
      setData(data)
      console.error(err)
      toast({
        title: "Erreur",
        description: "Impossible de déplacer l'opportunité",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsWon = async (id: number): Promise<void> => {
    try {
      await markOpportunityAsWon(id)
      await loadOpportunities()
      toast({
        title: "Succès",
        description: "L'opportunité a été marquée comme gagnée",
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Erreur",
        description: "Impossible de marquer l'opportunité comme gagnée",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsLost = async (id: number): Promise<void> => {
    try {
      await markOpportunityAsLost(id)
      await loadOpportunities()
      toast({
        title: "Succès",
        description: "L'opportunité a été marquée comme perdue",
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Erreur",
        description: "Impossible de marquer l'opportunité comme perdue",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette opportunité ?")) {
      return
    }

    try {
      await deleteOpportunity(id)
      await loadOpportunities()
      toast({
        title: "Succès",
        description: "L'opportunité a été supprimée",
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'opportunité",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-lg font-medium">Chargement...</div>
          <div className="text-sm text-muted-foreground">Veuillez patienter pendant le chargement des opportunités</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-lg font-medium text-destructive">Erreur</div>
          <div className="text-sm text-muted-foreground">{error}</div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => void loadOpportunities()}
          >
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {data.stageOrder.map((stageId: string) => {
          const stage = data.stages[stageId]
          const opportunities = stage.opportunityIds.map((opportunityId: string) => data.opportunities[opportunityId])

          return (
            <div key={stage.id} className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {stage.title} <span className="ml-1 text-muted-foreground">({stage.opportunityIds.length})</span>
                </h3>
                <Badge variant="outline">
                  {opportunities
                    .reduce((sum: number, opp: Opportunity) => sum + opp.montant, 0)
                    .toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                </Badge>
              </div>
              <Droppable droppableId={stage.id}>
                {(provided: DroppableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-1 flex-col gap-2 rounded-lg border border-dashed p-2"
                  >
                    {opportunities.map((opportunity: Opportunity, index: number) => (
                      <Draggable key={opportunity.id} draggableId={opportunity.id.toString()} index={index}>
                        {(provided: DraggableProvided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <CardHeader className="p-3 pb-0">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="outline"
                                  className="px-1.5 py-0 text-xs"
                                >
                                  {opportunity.probabilite}%
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
                                    <DropdownMenuItem asChild>
                                      <Link href={`/opportunites/${opportunity.id}/modifier`}>Modifier</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => void handleMarkAsWon(opportunity.id)}>
                                      Marquer comme gagnée
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => void handleMarkAsLost(opportunity.id)}>
                                      Marquer comme perdue
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      className="text-destructive"
                                      onClick={() => void handleDelete(opportunity.id)}
                                    >
                                      Supprimer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <CardTitle className="text-sm font-medium">{opportunity.nom}</CardTitle>
                              <CardDescription className="text-xs">{opportunity.client_nom}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-3 pt-2">
                              <div className="text-sm font-medium">
                                {opportunity.montant.toLocaleString("fr-FR", {
                                  style: "currency",
                                  currency: "EUR",
                                  minimumFractionDigits: 0,
                                })}
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-3 pt-0">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-[10px]">
                                    {opportunity.client_nom
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{opportunity.client_nom}</span>
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
