### Animepahe Auto Download Script

> This is a JavaScript automation script for animepahe.(ru|org|com), not a batch downloader. It’s compatible with any Tampermonkey-supported browser (e.g., Chrome, Firefox, Safari, Brave) on all devices. For mobile, use a browser like Kiwi Browser that supports Chrome extensions for Tampermonkey.

> automate multiple download links simultaneously.


#### Prerequisites
 - Use Google Chrome or any browser of your choice that supports the Tampermonkey extension.
 - Google Chrome Javascript Extension : [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)


```
Usage:

- [menu]                   located at the top webpage of 'animepahe' paths supported /play/ /anime/ /page?=xxx.
- [enable script]          enable/disable script 'animepahe' site only.
- [resolution entry]       1 · 360p, 2 · 720p, 3 · 1080p. min value (1) max value (15). absolute by entry order.
- [test entry]             test 'resolution entry' and will highlight the value in entry.
- [subtitle·english]       switch to subtitle english · dubbed english only. 
- [resolution checker]     lock to selected 'resolution entry' 1 to 3 only.
- [all links]              unlock all links (by absolute order of resolution entry value).

Info:
open anime links in animepahe.(ru|org|com)/anime/ or /play/ using mouse scroll click/normal click to open multiple links.

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

- [auto resolution]        fallback feature for anime with limited resolution selections.
- [bypass]                 bypass waiting time.
- [page expire]            fix 'page expire' token issue.
- [reload 5 seconds]       will reload 'resolution checker' (enabled), if entry resolution is not 'yet' available.

```

The settings will be saved locally and sync across all tabs. Feel free to modify the source code and submit bug/reports.

created by: [Arjien PHC](https://phcorner.net/members/arjien.1773652/) intended for PHCorner users and public users.
