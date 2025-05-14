import { ArrowUpRight, Users, Briefcase, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clients totaux</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground">+5 depuis le mois dernier</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+4.1%</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">34</div>
          <p className="text-xs text-muted-foreground">+2 depuis la semaine dernière</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+6.2%</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Opportunités</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€42,500</div>
          <p className="text-xs text-muted-foreground">Pipeline de vente actuel</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+12.5%</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tâches à faire</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">5 tâches en retard</p>
          <div className="mt-4 flex items-center text-xs text-yellow-500">
            <span>Cette semaine</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
