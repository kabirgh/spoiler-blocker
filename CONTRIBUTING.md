# Contributing

## Development Workflow
Fork the repo and clone to your local machine. Run `npm install` to install all required dependencies.<br>
You can then run several commands: 
* `npm run start` launches webpack-dev-server for the UI component only at `http://localhost:8080/panel.html`. Any changes made to files will be watched - refresh the page to see changes.
* `npm run dev` bundles and copies files to `/dist`. You can load this folder [as an unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) into Chrome. If you make any changes to the source code, press <kbd>Ctrl+R</kbd> on the `chrome://extensions` page to reload the extension. 
You can also load it as a [temporary add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) into Firefox. The extension can be reloaded from `about:debugging`.
* `npm run dist` bundles a production build into `/dist`. It strips all console.* statements and minifies output files.

When you're ready to submit your changes, make a pull request to the `master` branch.


## Where to contribute

### Performance
* [Reducing bundle size](https://lacke.mn/reduce-your-bundle-js-file-size/) by importing Blueprint components individually
* Reducing lag between button click and popup showing
* Reducing lag between page content load and overlay appearing. Consider splitting common dependencies of fb.js and tw.js into a file loaded in the background

### Testing
* Creating a test suite

### Refactoring
* Refactoring components to [manage local state with MobX](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#) instead of React.setState
* Refactoring Toast component to follow React idioms

### Miscellaneous
* Implementing `TODO`s marked in codebase
* Fixing code style violations


## Coding conventions
* ES2015 where possible
* Use [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.i9p9osxfp)
* Postfix arrays with `Arr` (eg. `stringArr = ["Targaryen", "GoT"]`)
* Use semicolons `;`
* Tabs for indentation
* `"` over `'`
* `jsonObject[property]` over `jsonObject.property`

`.eslintrc.json` helps lint this coding style.