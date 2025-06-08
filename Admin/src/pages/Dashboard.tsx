import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.slice(1).map((value, idx) => {
                  const to = `/dashboard/${pathnames
                    .slice(1, idx + 2)
                    .join("/")}`;
                  const isLast = idx === pathnames.slice(1).length - 1;
                  return [
                    <BreadcrumbSeparator key={`sep-${to}`} />,
                    <BreadcrumbItem key={to}>
                      {isLast ? (
                        <BreadcrumbPage>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={to}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>,
                  ];
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-0 pt-0 sm:p-4 sm:pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
