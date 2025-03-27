import { cn } from "@/lib/utilis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideIcon as LucideIcon } from "lucide-react";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: typeof LucideIcon;
    description?: string;
    className?: string;
}

export function DashboardCard({
    title,
    value,
    icon: Icon,
    description,
    className,
}: DashboardCardProps) {
    return (
        <Card className={cn("", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}