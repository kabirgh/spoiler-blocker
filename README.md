# Spoiler Blocker
Spoiler blocker is an open-source browser extension that removes Facebook and Twitter posts that contain spoilers on the TV shows you're currently watching.

## Installation
The extension can be installed from the Firefox Add-ons library and Chrome Web Store (coming soon!)<br>
To install from source, clone this repo and follow the instructions [here](https://developer.chrome.com/extensions/getstarted#unpacked). When prompted to select the extension, choose the 'chrome' folder.<br>
Alternatively, open a bash terminal, cd into the `/firefox` folder, then run `jpm run`. This will open the add-on in a new firefox window. Note: jpm can be installed using the package manager npm (bundled with [Node.js](https://nodejs.org/)).

## License
This project is MIT licensed.

## Minimum Viable Product
Blocks Facebook and Twitter posts that contain user-defined 'spoiler' words. For example, a post containing the words 'GoT' and 'Daenerys' may be a spoiler for Game of Thrones. If any of these words are defined as 'spoiler' words, the post will be hidden.<br>
You can also find and submit lists at [our website](https://salty-earth-11606.herokuapp.com).<br>
See [this YouTube video](https://youtu.be/dFOZCkYJdOM) for a demonstration.

## Features / User stories
<ol>
  <li>
    Blocks posts using pre-defined lists of words that indicate the posts may spoil the TV show
  </li>
  <li>
    Allow users to create their own lists of spoiler tags
  </li>
  <li>
    Option to overlay posts/tweets with a white rectangle or remove them from the newsfeed entirely
  </li>
  <li>
    Community submitted spoiler lists available online (Lists moderated by admins)
  </li>
  <li>
    Download lists from website by simply typing a code into the  extension/add-on panel
  </li>
  <li>
    Rate online lists to give other users an indication of their usefulness
  </li>
</ol>

## Things we might look into in the future
<ol>
  <li>
    Improve UI
  </li>
  <li>
    Explore further uses of the add-on as a keyword censor
  </li>
</ol>

## Level of achievement
Project Gemini

## Audience
This project caters to all people who watch TV shows (and don't want them spoiled).
