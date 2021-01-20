import { NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: 'red',
    bgsPosition: POSITION.bottomCenter,
    bgsSize: 40,
    bgsType: SPINNER.threeStrings, // background spinner type
    fgsType: SPINNER.threeStrings, // foreground spinner type,
    fgsColor: '#ffdd15',
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 5, // progress bar thickness
    pbColor: '#ffdd15',
    overlayColor: '#000'
};