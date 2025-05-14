"use client"

import React from "react"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight, ListTodo, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TasksHeader } from "@/components/tasks/tasks-header"
import { TasksList } from "@/components/tasks/tasks-list"

export default function TasksPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { locale: fr })
  const endDate = endOfWeek(monthEnd, { locale: fr })

  const rows = []
  let days = []
  let day = startDate

  const formatDay = (date: Date) => {
    return format(date, "d", { locale: fr })
  }

  const formatMonth = (date: Date) => {
    return format(date, "MMMM yyyy", { locale: fr })
  }

  const onDateClick = (day: Date) => {
    setSelectedDate(day)
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // Generate calendar rows
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(day)
      day = addDays(day, 1)
    }
    rows.push(days)
    days = []
  }

  return (
    <div className="flex flex-col">
      <TasksHeader />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tâches</h2>
            <p className="text-muted-foreground">Gérez vos tâches et activités</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une tâche
          </Button>
        </div>

        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="list">
              <ListTodo className="mr-2 h-4 w-4" />
              Liste
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{formatMonth(currentDate)}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Mois précédent</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Mois suivant</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <div key={day} className="py-2 text-sm font-medium">
                      {day}
                    </div>
                  ))}

                  {rows.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                      {row.map((day, dayIndex) => (
                        <div
                          key={`day-${dayIndex}`}
                          className={`
                            flex h-12 cursor-pointer items-center justify-center rounded-md p-2 text-sm
                            ${!isSameMonth(day, monthStart) ? "text-muted-foreground" : ""}
                            ${isSameDay(day, selectedDate) ? "bg-primary text-primary-foreground" : ""}
                            ${!isSameDay(day, selectedDate) && isSameMonth(day, monthStart) ? "hover:bg-accent" : ""}
                          `}
                          onClick={() => onDateClick(day)}
                        >
                          {formatDay(day)}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tâches du {format(selectedDate, "d MMMM yyyy", { locale: fr })}</CardTitle>
                <CardDescription>Vos tâches planifiées pour cette journée</CardDescription>
              </CardHeader>
              <CardContent>
                <TasksList selectedDate={selectedDate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les tâches</CardTitle>
                <CardDescription>Liste complète de vos tâches</CardDescription>
              </CardHeader>
              <CardContent>
                <TasksList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
