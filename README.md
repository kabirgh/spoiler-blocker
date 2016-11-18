# Spoiler Blocker
An open-source browser extension that removes Facebook and Twitter posts that contain user-defined 'spoiler' words. For example, a post containing the words 'GoT' and 'Daenerys' may be a spoiler for Game of Thrones. If any of these words are defined as 'spoiler' words, the post will be hidden.<br>
You can also find and submit lists at [our website](https://salty-earth-11606.herokuapp.com).<br>
See [this YouTube video](https://youtu.be/dFOZCkYJdOM) for a demonstration.

## Installation
**Chrome**<br>
To install from source, clone this repo and follow the instructions [here](https://developer.chrome.com/extensions/getstarted#unpacked). When prompted to select the extension directory, choose the `src/chrome_dist` folder.<br>
**Firefox**<br>
Not available yet.


## Features
1. Allow users to create their own lists of spoiler tags
2. Option to overlay posts/tweets with a white rectangle or remove them from the newsfeed entirely
3. Community submitted spoiler lists available online (lists moderated by admins)
4. Download lists from website by simply typing a code into the extension/add-on panel
5. Rate online lists to give other users an indication of their usefulness

## Goals
1. Improve UI
2. Add option for case-sensitivity
3. Make overlay/remove option list specific

## License
[MIT license](https://github.com/kabir-plod/spoiler-blocker/blob/master/LICENSE.md)
