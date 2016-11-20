# Contributing

### Development Workflow
Fork the repo and clone to your local machine. Run `npm install` to install all required dependencies.<br>
You can then run several commands: 
* `npm run dev` bundles and copies files to `dist_chrome`. You can load this folder [as an unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) into Chrome.
* `npm run start` launches webpack-dev-server for the UI component only at `http://localhost:8080/panel.html`. Any changes made to files in the `src/ui` folder will be reflected at the address upon refresh - no rebuild is required.

When you're ready to submit your changes, make a pull request to the `master` branch.

### Where to contribute
* Creating a test suite
* Reducing lag between page load and overlay appearing. Consider:
	- Splitting common dependencies of fb.js and tw.js into a file loaded in the background
	- Profiling extension in browser
* Porting firefox build
* Fixing code style violations

### Coding style
* Use ES2015 where possible
* Postfix arrays with `Arr` (eg. `stringArr = ["Targaryen", "GoT"]`)
* Use semicolons `;`
* Tabs for indentation
* `"` over `'`
* `jsonObject[property]` over `jsonObject.property`

`.eslintrc.json` helps lint this coding style.