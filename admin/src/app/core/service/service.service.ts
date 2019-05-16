import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class ServiceService extends BaseService {
    data = [];
    list() {
        return this.get('/services')
            .then($res => {
                this.data = [];
                $res.forEach($services => {
                    const data = {
                        Name: $services.Name,
                        Host: '',
                        Port: '',
                    };
                    const children = [];
                    $services.Nodes.forEach($service => {
                        const url = $service.Url;
                        const tempArr = url.split(':');
                        const childrenData = {
                            Name: $service.Name,
                            Host: tempArr[0],
                            Port: tempArr[1]
                        };
                        children.push({ data: childrenData });
                    });
                    data.Port = `有 ${$services.Nodes.length} 个活跃服务`;
                    this.data.push({ data, children });
                });
                return this.data;
            });
    }
}
