// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fbConfig: {
    apiKey: "AIzaSyAHr66-p3N0j8pje5v175EBswzi2BGOfPA",
    authDomain: "butter-webhook-demo.firebaseapp.com",
    databaseURL: "https://butter-webhook-demo.firebaseio.com",
    projectId: "butter-webhook-demo",
    storageBucket: "butter-webhook-demo.appspot.com",
    messagingSenderId: "407718121253"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
