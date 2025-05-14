import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentClients } from "@/components/dashboard/recent-clients"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"
import { SalesPipeline } from "@/components/dashboard/sales-pipeline"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord CRM. Voici un aperçu de vos activités.
          </p>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DashboardStats />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Pipeline de vente</CardTitle>
                  <CardDescription>Aperçu de vos opportunités de vente actuelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesPipeline />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Tâches à venir</CardTitle>
                  <CardDescription>Vos prochaines tâches planifiées</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingTasks />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Clients récents</CardTitle>
                  <CardDescription>Les derniers clients ajoutés à votre CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentClients />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Les dernières actions effectuées dans le système</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">{/* Activity feed will go here */}</CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytiques</CardTitle>
                <CardDescription>Visualisez les performances de votre entreprise</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">{/* Analytics content will go here */}</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports</CardTitle>
                <CardDescription>Générez et consultez vos rapports personnalisés</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">{/* Reports content will go here */}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
