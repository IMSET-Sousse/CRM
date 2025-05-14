"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsHeader } from "@/components/reports/reports-header"
import { ReportGenerator } from "@/components/reports/report-generator"
import { ClientsReport } from "@/components/reports/clients-report"
import { ProjectsReport } from "@/components/reports/projects-report"
import { SalesReport } from "@/components/reports/sales-report"

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<string | null>(null)

  return (
    <div className="flex flex-col">
      <ReportsHeader />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rapports</h2>
          <p className="text-muted-foreground">Générez et consultez des rapports personnalisés</p>
        </div>

        <Tabs defaultValue="generator">
          <TabsList>
            <TabsTrigger value="generator">Générateur</TabsTrigger>
            <TabsTrigger value="saved">Rapports sauvegardés</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-4">
            <ReportGenerator onGenerate={setActiveReport} />

            {activeReport && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeReport === "clients"
                      ? "Rapport Clients"
                      : activeReport === "projects"
                        ? "Rapport Projets"
                        : "Rapport Ventes"}
                  </CardTitle>
                  <CardDescription>
                    {activeReport === "clients"
                      ? "Analyse de la base clients"
                      : activeReport === "projects"
                        ? "État des projets en cours"
                        : "Performance des ventes"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeReport === "clients" ? (
                    <ClientsReport />
                  ) : activeReport === "projects" ? (
                    <ProjectsReport />
                  ) : (
                    <SalesReport />
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="saved">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Clients par secteur</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Dernière mise à jour: 15 mai 2023</div>
                  <div className="mt-4 h-[200px] w-full bg-muted/30" />
                  <Button variant="outline" className="mt-4 w-full">
                    Voir le rapport
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Projets par statut</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Dernière mise à jour: 10 mai 2023</div>
                  <div className="mt-4 h-[200px] w-full bg-muted/30" />
                  <Button variant="outline" className="mt-4 w-full">
                    Voir le rapport
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Ventes trimestrielles</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Dernière mise à jour: 1 mai 2023</div>
                  <div className="mt-4 h-[200px] w-full bg-muted/30" />
                  <Button variant="outline" className="mt-4 w-full">
                    Voir le rapport
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
