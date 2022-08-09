// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:8080/WDSIT_API/',
  //api: 'http://wdc.woden.services:8080/WDSIT/',
  apiIq09:'http://172.16.30.25:8083/WDSIT_API_IQ09/',
  apiAPIS: 'https://wdc.woden.services/api/inventory',
  //apiAPIS:'http://127.0.0.1:8000/api/inventory',
  apiSapU:'http://127.0.0.1:8000/api/',
  //api:'http://172.16.30.68:8081/WDSIT_API/',
  //api: 'http://172.16.30.21:8080/WDSIT_API/',
  //api: 'http://172.16.30.68:8085/WODEN_APPS/',
  apiSap:'http://104.46.108.200:5000/',
  URLAPI: 'http://172.16.30.68/WmsWdApi/',
  URLAPII: 'http://172.16.30.68:8082/',
  baseUrl: 'http://127.0.0.1:8887'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
