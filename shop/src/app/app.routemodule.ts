import { NgModule } from "@angular/core";
import { RouterModule,Routes, PreloadAllModules } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";


const routes:Routes=[
    {path: '',component: HomeComponent},
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    {path: 'shoppinglist', component: ShoppingListComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})]
})
export class AppRouteModule{}