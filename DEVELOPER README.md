##Installation
1. Run copy_files.py

2.Chrome: To install from source, clone this repo and follow the instructions [here](https://developer.chrome.com/extensions/getstarted#unpacked). When prompted to select the extension, choose the 'chrome' folder.<br>
Firefox: Open a terminal, cd into the `/firefox` folder, then run `jpm run`. This will open the add-on in a new firefox window. Note: jpm can be installed using the package manager npm (bundled with [Node.js](https://nodejs.org/)).

##Project structure
To prevent code duplication, js logic files have been separated. copy_files.py combines these files in the right order to generate javascript files that are used for both sites in both browsers. 
The root folder contains 3 files pertaining to the spoiler-blocking logic. utils-common contains methods used across facebook and twitter. fb-common contains methods used only for facebook and tw-common methods only for twitter. All files have methods that are used both in the firefox and chrome versions of the extension.
`firefox/data` and `chrome` contain browser-specific files for both facebook and twitter (fb-ff, fb-tw, fb-chr\*, tw-chr\*).

##Notes
\* fb-chr and tw-chr have not been factored out of fb.js and twitter.js yet.