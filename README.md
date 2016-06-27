# Spoiler Blocker
Spoiler blocker is an open-source browser extension that removes Facebook and Twitter posts that contain spoilers on the TV shows you're currently watching.

## Installation
The extension can be installed from the Firefox Add-ons library and Chrome Web Store.
To install from source, clone this repo and follow the instructions at  https://developer.chrome.com/extensions/getstarted#unpacked. When prompted to select the extension, choose the 'chrome' folder.
Note: The addon is not yet working in firefox.

## License
This project is MIT licensed.

## Minimum Viable Product
Blocks Facebook and Twitter posts that contain user-defined 'spoiler' words. For example, a post containing the words 'GoT' and 'Daenerys' may be a spoiler for Game of Thrones. If any of these words are defined as 'spoiler' words, the post will be hidden. See https://youtu.be/7K_C84e6hlI for a video demonstration.

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
</ol>

## Features for next sprint
<ol>
  <li>
    Improve UI
  </li>
  <li>
    Reduce lag time for loading addon panel (when button on toolbar is clicked)
  </li>
  <li>
    Have a curated website of (possibly community-submitted) spoiler lists for common TV shows. Users can select these rather than creating their own
  </li>
  <li>
    Allow users to submit lists of spoilers to a public community portal for anyone's use
  </li>
</ol>

## Level of achievement
Project Gemini

## Audience
This project caters to all people who watch TV shows (and don't want them spoiled).
