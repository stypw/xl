import { Routes } from "@angular/router";


export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "start" },
    { path: "start", loadChildren: () => import("./start/start.module").then(m => m.StartModule) },
    { path: "theme", loadChildren: () => import("./theme/theme.module").then(m => m.ThemeModule) },
    { path: "components", loadChildren: () => import("./components/components.module").then(m => m.ComponentsModule) },
    { path: "**", pathMatch: "full", redirectTo: "start" }
]