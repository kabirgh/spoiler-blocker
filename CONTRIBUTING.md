# Contributing

### Development Workflow
Fork the repo and clone to your local machine. Run `npm install` to install all required dependencies.<br>
You can then run several commands: 
* `npm run dev` bundles and copies files to `/dist_chrome`. You can load this folder [as an unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) into Chrome.
* `npm run start` launches webpack-dev-server for the UI component only at `http://localhost:8080/panel.html`. Any changes made to files in the `/src/ui` folder will be reflected at the address upon refresh - no rebuild is required.

When you're ready to submit your changes, make a pull request to the `master` branch.

### Where to contribute
* Creating a test suite (with Selenium?)
* Reducing lag between page load and overlay appearing. Consider:
	- Splitting common dependencies of fb.js and tw.js into a file loaded in the background
	- Profiling extension in browser
* Refactoring components to [manage local state with MobX](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#) instead of React.setState
* Porting firefox build (see WebExtension)
* Fixing code style violations

### Coding conventions
* ES2015 where possible
* Use [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.i9p9osxfp)
* Postfix arrays with `Arr` (eg. `stringArr = ["Targaryen", "GoT"]`)
* Use semicolons `;`
* Tabs for indentation
* `"` over `'`
* `jsonObject[property]` over `jsonObject.property`

`.eslintrc.json` helps lint this coding style.