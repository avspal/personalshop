import { Component} from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { AuthService } from 'src/app/auth/auth.service';
@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
    //styleUrls:[""]
})
export class HeaderComponent{
    constructor(private dataStorage: DataStorageService,
                private authService: AuthService){}

    onSaveData(){
        this.dataStorage.storeRecipes().subscribe(
            (response)=>console.log(response)
        );
    }

    onFetchData(){
        this.dataStorage.fetchRecipes();
    }

    onLogout(){
        this.authService.logOut();
    }
}
