### Animepahe Auto Download Script

> Introducing a JavaScript automation script designed for animepahe.(ru·org·com). This script doesn't function as a batch downloader but excels in automating multiple links with its rich feature set. It seamlessly integrates with any browser that supports Tampermonkey, including popular options like Chrome, Firefox, Safari, and Brave. For mobile users, a browser like Kiwi Browser, which supports Chrome extensions for Tampermonkey, is recommended.

#### Status: Currently Working v.0.1.3

#### Prerequisites
 - Use Google Chrome or any browser of your choice that supports the Tampermonkey extension.
 - Google Chrome Javascript Extension : [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)


```
Usage:

- [menu]                   located at the top of webpage 'animepahe' paths supported /play/ /anime/ /page?=xxx.
- [enable script]          enable/disable script 'animepahe' site only.
- [resolution entry]       1 · 360p, 2 · 720p, 3 · 1080p. min (1) max (15). by entry order.
- [test entry]             test 'resolution entry' and will highlight the value in entry.
- [subtitle·english]       switch to subtitle english · dubbed english only. 
- [resolution checker]     lock to selected 'resolution entry' 1 to 3 only.
- [all links]              unlock all links (by absolute order of resolution entry value).

How to use:
open anime links in animepahe.(ru·org·com)/anime/ or /play/ using mouse scroll click/normal click to open multiple links.

```
#### Install Tampermonkey Script from Url
- open tampermonkey script locate 'utilities' import from url.
```
https://raw.githubusercontent.com/Ysilven/animepahe-auto-download-script/main/Animepahe%20%C2%B7%20Pahe%20%C2%B7%20Kwik.js
```


#### Default Settings
[Enable Script · Yes]  [Resolution Entry: 2] [Test Entry] [Subtitle · English] [Resolution Checker · No] [All Links · No] [Expand Menu · No]

```
Features:
- [automation]             automate multiple download links simultaneously.
- [auto resolution]        fallback feature for anime with limited resolution selections.
- [complete bypass]        completely bypass waiting time --removed
- [page expire]            fix 'page expire' token issue.
- [reload 5 seconds]       'resolution checker · yes'. useful for updating anime/live anime updates when resolution value ex.'720p' is not yet available.

```

The settings will be saved locally and sync across all tabs. Feel free to modify the source code and submit bug/reports.

Author: [Arjien-PHC](https://phcorner.net/members/arjien.1773652/) intended for all users.
