import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeModule } from 'angular2-tree-component';
import { RestyModule } from '../resty/module';
import { ConfigModule } from '../config/module';
import { FormModule } from '../form/module';
import { ExplorerComponent } from './explorer.component';
import { FileService } from './file.service';

@NgModule({
    imports: [
        TreeModule,
        RestyModule,
        FormModule,
    ],
    declarations: [
        ExplorerComponent
    ],
    exports: [
        ExplorerComponent
    ],
    providers: [
        FileService
    ]
})
export class ExplorerModule {
}
