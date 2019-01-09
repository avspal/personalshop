import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRouteModule } from "../app.routemodule";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "../auth/auth-guard.service";

@NgModule({
    declarations : [
        HeaderComponent,
        HomeComponent
    ],
    imports : [
        SharedModule,
        AppRouteModule
    ],
    exports : [
        AppRouteModule,
        HeaderComponent
    ],
    providers : [ShoppingListService,RecipeService, DataStorageService, AuthService]
})
export class CoreModule{

}