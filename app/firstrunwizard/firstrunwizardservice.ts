/**
 * Created by cshampur on 10/29/16.
 */


import { Injectable } from "@angular/core";
import { NetworkService } from "../components/utils/networkservice";

@Injectable()
export class FirstRunWizardService {
    public setting:any;
    public aciSetting:any;

    constructor(private networkService:NetworkService) {
        this.setting = {networkInfraType: '', vlans: '', vxlans: '', fwdMode: '', arpMode: ''};
        this.aciSetting = {
            key: '',
            enforcePolicies: 'yes',
            includeCommonTenant: 'no',
            name: '',
            nodeBindings: '',
            pathBindings: '',
            physicalDomain: ''
        };
    }

    getNetworkSettings() {
        this.networkService.getSettings()
            .then((result) => {
                    this.setting = result;
                }
            )
    }

    getAciSettings() {
        this.networkService.getAciSettings()
            .then((result) => {
                this.aciSetting = result
            })
    }

    updateSettings():Promise<any> {
        var component = this;
        this.networkService.updateSettings(this.setting)
            .then((result) => {
                if(result['networkInfraType'] === 'aci')
                    component.networkService.setAciMode(true);
                else
                    component.networkService.setAciMode(false);
            });
        return this.networkService.updateAciSettings(this.aciSetting);
    }
}