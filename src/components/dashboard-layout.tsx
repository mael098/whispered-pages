import { Sidebar } from "./sideber";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 md:ml-64">
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}