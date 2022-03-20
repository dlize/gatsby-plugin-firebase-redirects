Firebase Redirects in Gatsby
---

If you want to host your Gatsby output with Firebase Hosting, you can use the `firebase.json`
file to have redirects processed server side. This plugin adds redirects to that file for you
every time the Gatsby site is built.

## Use

1. Add the Firebase hosting configuration to your project using `firebase init`
2. Add `"gatsby-plugin-firebase-redirects"` to the end of your plugins array in `gatsby-config.json`.
3. Add the following environment variable to the environment where you want to build and deploy the project for Firebase: `IS_FIREBASE_BUILD=true`. Redirects will only be added to `firebase.json` if this variable is set to true. This is to avoid updating the file when running `gatsby build` locally and possibly committing hardcoded redirects to the repository.

## Notes

The plugin doesn't accept any addition configuration currently.

It will add redirects to the `firebase.json` file like this:

```json
{
  "hosting": {
    ...
    "redirects": [
      {
        "source": "XXX",
        "destination": "YYY",
        "type": 123
      }
      ...
    ]
  }
}
```

This pattern receives the following replacements:

* `XXX` -> `fromPath` (including leading and trailing slashes, if any)
* `YYY` -> `toPath` (including leading and trailing slashes, if any)
* `123` -> Either 302 or 301 if `isPermanent` is `false` or `true` respectively

## Get Help
If you notice any bugs or errors, or if you need any help with setting up Firebase or redirects for your Gatsby project, [get in touch with dlize](https://on.dlize.de/contact-b704e0).
