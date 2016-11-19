# Spoiler Blocker
An open-source browser extension that removes Facebook and Twitter posts that contain user-defined 'spoiler' words. For example, a post containing the words 'GoT' and 'Daenerys' may be a spoiler for Game of Thrones. If any of these words are defined as 'spoiler' words, the post will be hidden.<br>
You can also find and submit lists at the [companion website](https://salty-earth-11606.herokuapp.com).<br>
See [this YouTube video](https://youtu.be/dFOZCkYJdOM) for a demonstration.


## Installation
**Chrome:**<br>
To install from source, clone this repo and follow the instructions [here](https://developer.chrome.com/extensions/getstarted#unpacked). When prompted to select the extension directory, choose the `chrome_dist` folder.<br>
**Firefox:**<br>
Not available yet.


## Features
1. Create your own lists of spoiler tags
2. Option to overlay posts/tweets with a white box or remove them from the newsfeed entirely
3. Submit spoiler lists to a community website (lists moderated by admins)
4. Download lists from website simply by typing a code into the extension/add-on panel
5. Rating system for online lists


## In the pipeline
<!-- TODO -->
1. Facebook post/tweet only hidden if tag (eg. 'westworld') is surrounded by spaces (eg. ' westworld ')



### Acknowledgements
This project makes use of
* [React](https://facebook.github.io/react/)
* [MobX](https://mobxjs.github.io/mobx/)
* [Material-UI](http://www.material-ui.com/#/)
* [Mutation Summary](https://github.com/rafaelw/mutation-summary)
* [jQuery](https://jquery.com/)