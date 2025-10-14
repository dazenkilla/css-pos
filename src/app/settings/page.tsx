import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your store settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="Nova POS" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Coffee St, Jakarta" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <CardDescription>
            Define roles and manage what users can see and do. (UI Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Administrator</h4>
                    <p className="text-sm text-muted-foreground">Full access to all features.</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Cashier</h4>
                    <p className="text-sm text-muted-foreground">Access to Sales and History modules only.</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Shift Management</CardTitle>
          <CardDescription>
            Manage cashier shifts. (UI Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">Shift management interface will be here.</p>
           <Button className="mt-4">Start New Shift</Button>
        </CardContent>
      </Card>

    </div>
  )
}
