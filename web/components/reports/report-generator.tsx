"use client"

import { useState } from "react"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const reportTypes = [
  {
    id: "clients",
    name: "Rapport Clients",
    description: "Analyse de la base clients, segmentation et statistiques",
  },
  {
    id: "projects",
    name: "Rapport Projets",
    description: "État des projets en cours, retards, budgets",
  },
  {
    id: "sales",
    name: "Rapport Ventes",
    description: "Performance des ventes, pipeline et prévisions",
  },
]

export function ReportGenerator({ onGenerate }: { onGenerate: (reportType: string) => void }) {
  const [reportType, setReportType] = useState<string>("clients")
  const [dateRange, setDateRange] = useState<"month" | "quarter" | "year" | "custom">("month")
  const [dateFrom, setDateFrom] = useState<Date>(new Date())
  const [dateTo, setDateTo] = useState<Date>(new Date())
  const [open, setOpen] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState(reportTypes[0])

  const handleGenerate = () => {
    onGenerate(reportType)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Générateur de rapports</CardTitle>
        <CardDescription>Créez des rapports personnalisés en fonction de vos besoins</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Type de rapport</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {selectedReportType.name}
                <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Rechercher un type de rapport..." />
                <CommandList>
                  <CommandEmpty>Aucun type de rapport trouvé.</CommandEmpty>
                  <CommandGroup>
                    {reportTypes.map((type) => (
                      <CommandItem
                        key={type.id}
                        value={type.name}
                        onSelect={() => {
                          setSelectedReportType(type)
                          setReportType(type.id)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedReportType.id === type.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{type.name}</span>
                          <span className="text-xs text-muted-foreground">{type.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Période</Label>
          <RadioGroup
            defaultValue="month"
            value={dateRange}
            onValueChange={(value) => setDateRange(value as any)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="month" />
              <Label htmlFor="month">Mois en cours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quarter" id="quarter" />
              <Label htmlFor="quarter">Trimestre en cours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="year" id="year" />
              <Label htmlFor="year">Année en cours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Période personnalisée</Label>
            </div>
          </RadioGroup>
        </div>

        {dateRange === "custom" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateFrom, "d MMMM yyyy", { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(date) => date && setDateFrom(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Date de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateTo, "d MMMM yyyy", { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={(date) => date && setDateTo(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleGenerate}>
          Générer le rapport
        </Button>
      </CardFooter>
    </Card>
  )
}
