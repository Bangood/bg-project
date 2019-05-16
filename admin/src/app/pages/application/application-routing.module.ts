import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { AdminGuard } from '../../admin-guard.service';
import { NotifyComponent } from './notify/notify.component';
import { VersionComponent } from './version/version.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { InvitePosterComponent } from './invite-poster/invite-poster.component';

const routes: Routes = [
    {
        path: '',
        component: ApplicationComponent,
        children: [
            {
                path: 'notify',
                component: NotifyComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'version',
                component: VersionComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'bulletin',
                component: BulletinComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'invite-poster',
                component: InvitePosterComponent,
                canActivate: [AdminGuard],
            },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplicationRoutingModule { }
