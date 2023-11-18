// ==UserScript==
// @name         Animepahe · Pahe · Kwik
// @namespace    https://PHCorner.net/
// @version      0.0.1
// @downloadURL
// @updateURL
// @description  animepahe auto script. use mouse scroll click to open multiple anime links.
// @author       Arjien Ysilven
// @match        https://pahe.win/*
// @match        https://kwik.cx/f/*
// @match        https://kwik.cx/d/*
// @match        https://animepahe.ru/*
// @match        https://animepahe.org/*
// @match        https://animepahe.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animepahe.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let settings = load_settings();
    let enable·script = settings['Enable·Script'] ? true : false;

    let url_link = window.location.href;
    console.clear();
    switch (true) {
        case /animepahe\.(ru|org|com)\/?$/.test(url_link):
            menu(1);
            break;
        case /animepahe\.(ru|org|com)(\/\?page=\d+)?$/.test(url_link):
            menu(1);
            break;
        case /animepahe\.(ru|org|com)\/play\/.+\/.+/.test(url_link):
            menu(1);
            if(enable·script){
                script();
            }else{
             console.log('script disabled');
            }
            break;
        case /animepahe\.(ru|org|com)\/anime\/.+/.test(url_link):
            menu(2);
            break;
        case /pahe\.win\/.+/.test(url_link):
            pahe_win();
            break;
        case /kwik\.cx\/f\/.+/.test(url_link):
            kwik_cx();
            break;
        case /kwik\.cx\/d\/.+/.test(url_link): {
            let new_url_link = url_link.replace('/d/', '/f/');
            window.location = new_url_link;
            break;
        }
        default:
            console.log('no matches found for url_link');
    }

    function script(){
        let settings = load_settings();
        let res = settings['Resolution·Value'];
        let sub·dub = settings['Subtitle·Dubbed'] ? true : false;
        let res·checker = settings['Resolution·Checker'] ? true : false;
        let all·links = settings['All·Links'] ? true : false;
        let enable·script = settings['Enable·Script'] ? true : false;

        let links = [];
        let links_res;
        console.log ('res value: '+res);

        let expand_menu = document.getElementById('downloadMenu');
        if (expand_menu.getAttribute('aria-expanded') == 'false') {
            expand_menu.click();
        }

        let menu = document.getElementById('pickDownload');
        let entry = menu.getElementsByTagName('a');
        for (let i = 0; i < entry.length; i++) {
            let link = entry[i].href;
            let content = entry[i].textContent;
            links.push(i + 1 +' · '+ link +' · '+ content);
        }

        function get_links_condition(links, condition) {
            return links.filter(link => condition(link));
        }

        let sub_text_array = [" eng"];
        let dub_text_array_eng = [" eng"];
        function link_contains_text(link, include) {
            if (sub·dub){
                return sub_text_array.some(text => link.includes(text)) ^ !include;
            }else{
                return dub_text_array_eng.some(text => link.includes(text)) ^ !include;
            }
        }

        function get_links_filter(links, filter) {
            return links.filter(link => link.includes(filter)).map(link => link.split(' · ')[1]);
        }

        function get_links_res(links, resolution) {
            if (resolution.length > 0){
                for (let i = 0; i < links.length; i++) {
                    let link = links[i].split(' · ')[1];
                    if (resolution.includes(link)) {
                        res = i + 1;
                        break;
                    }
                }
            }
            return res;
        }

        let sub_links = get_links_condition(links, link => link_contains_text(link, false));
        let dub_links = get_links_condition(links, link => link_contains_text(link, true));

        let resolutions = {1: '360p', 2: '720p', 3: '1080p'};
        let res_checker = (sub·dub ? sub_links : dub_links).some(link => link.includes(resolutions[res]));

        if (res > 3){
            play();
        }else{
            if (res·checker){
                if (res_checker){
                    console.log('res·checker: '+res+' · '+resolutions[res]+' · found.');
                    play();
                }else{
                    console.log('res·checker: '+res+' · '+resolutions[res]+' · not found.');
                    console.log('5 seconds reload();')
                    setInterval(() => window.location.reload(), 5000);
                }
            }else{
                play();
            }
        }

        function play(){
            let entry;
            if (!(all·links)){
                if (sub·dub){
                    entry = sub_links.length;
                }else{
                    entry = dub_links.length;
                }
            }else{
                entry = links.length;
            }
            if (!(all·links)){
                if (sub·dub){
                    console.log ('sub links length: '+ sub_links.length);
                    let sub_links_720p = get_links_filter(sub_links, '720p');
                    let sub_links_1080p = get_links_filter(sub_links, '1080p');
                    auto_resolution(sub_links, sub_links_720p, sub_links_1080p);
                    console.log ("auto·res.sub");
                }else{
                    let dub_links_720p = get_links_filter(dub_links, '720p');
                    let dub_links_1080p = get_links_filter(dub_links, '1080p');
                    auto_resolution(dub_links, dub_links_720p, dub_links_720p);
                    console.log ("auto·res.dub");
                }
            }else{
                if (res > entry){
                    res = entry;
                }
            }

            function auto_resolution(sub·dub·links, link·720p, link·1080p) {
                if (entry == 1 || res <= 0){
                    res = 1;
                }
                if (res == 2 & entry == 2){
                    if (link·720p.length > 0){
                        res = get_links_res(sub·dub·links, link·720p);
                    }else{
                        if (link·1080p.length > 0){
                            res = get_links_res(sub·dub·links, link·1080p);
                        }else{
                            res = 1
                        }
                    }
                }
                if (res == 3 & entry == 2){
                    res = 2;
                }
                if (res > entry){
                    res = entry;
                }
            }

            function get_links_entry(links, res) {
                let link = links.filter(link => link.startsWith(res + ' · ')).map(link => link.split(' · ')[1]);
                return link.length > 0 ? link[0] : null;
            }

            let link_res;
            const sub_count = sub_links.length;
            if (!(all·links)){
                if (sub·dub){
                    link_res = get_links_entry(sub_links, res);
                }else{
                    link_res = get_links_entry(dub_links, res + sub_count);
                }
            }else{
                link_res = get_links_entry(links, res);
            }

            if (link_res == null){
                console.log('var res = value? · '+ res+ ' · not found.');
                let dropdown = document.getElementById('pickDownload');
                let drop_item = dropdown.getElementsByTagName('a');

                for (let i = 0; i < drop_item.length; i++) {
                    drop_item[i].style.backgroundColor = '';
                    drop_item[i].style.color = '';
                }
            }else{
                let exact_link = links.find(link => link.includes(link_res));
                let link_number = exact_link.split(' · ')[0];
                let dropdown = document.getElementById('pickDownload');
                let drop_item = dropdown.getElementsByTagName('a');

                for (let i = 0; i < drop_item.length; i++) {
                    drop_item[i].style.backgroundColor = '';
                    drop_item[i].style.color = '';
                }

                let download = dropdown.getElementsByTagName('a')[link_number-1];
                download.style.backgroundColor = '#505050';
                download.style.color = 'white';

                console.log(exact_link);

                if (enable·script){
                    window.location = link_res;
                }else{
                    console.log('enable script: no');
                }
            }
        }
    }

    function menu(type){
        var li = document.createElement("li");
        li.className = "nav-item";

        var a = document.createElement("a");
        a.className = "nav-link";
        a.textContent = "menu";
        a.title = "Animepahe · Pahe · Kwik";

        a.addEventListener("click", function(event) {
            event.preventDefault();
            open_menu();
        });

        li.appendChild(a);
        var navbar = document.querySelector(".navbar-nav.mr-auto.main-nav");

        navbar.appendChild(li);
        create_menu();

        var mediaQuery = window.matchMedia("(max-width: 1100px)");
        function togglePadding(e) {
            var menu = document.getElementById('settings_menu');
            if (e.matches) {
                menu.style.paddingLeft = '10px';
            } else {
                menu.style.paddingLeft = '0px';
            }
        }
        togglePadding(mediaQuery);
        mediaQuery.addListener(togglePadding);

        let initialSettings = load_settings();
        let expand·menu = initialSettings['Expand·Menu'] ? true : false;
        if (expand·menu){
            open_menu();
        }

        document.addEventListener('visibilitychange', function() {
            let settings = load_settings();
            let menu = document.getElementById('settings_menu');
            if (document.hidden){

            }else{
                menu.remove();
                create_menu();

                let initialSettings = load_settings();
                let expand·menu = initialSettings['Expand·Menu'] ? true : false;
                if (expand·menu){
                    open_menu();
                }
            }
        });

        function create_menu() {
            let menu = document.createElement('div');
            let enable_script = document.createElement('button');
            let minus = document.createElement('button');
            let input = document.createElement('input');
            let plus = document.createElement('button');
            let test_entry = document.createElement('button');
            let subtitle_dubbed = document.createElement('button');
            let resolution_checker = document.createElement('button');
            let all_links = document.createElement('button');
            let expand_menu = document.createElement('button');

            menu.id = 'settings_menu';
            menu.style.display = 'none';
            menu.style.backgroundColor = '#000';
            menu.style.color = '#fff';
            menu.style.minHeight = '10px';
            menu.style.transition = 'all 0.3s ease'

            function settings(element, json_value, yes, no) {
                let settings = load_settings();
                element.innerText = settings[json_value] ? yes : no;

                element.onclick = function() {
                    let settings_ = load_settings();
                    if (settings_[json_value] === false) {
                        settings_[json_value] = true;
                        element.innerText = yes;
                    } else {
                        settings_[json_value] = false;
                        element.innerText = no;
                    }
                    save_settings(settings_);
                };
            }

            settings(enable_script, 'Enable·Script', 'Enable Script · Yes', 'Enable Script · No');
            settings(subtitle_dubbed, 'Subtitle·Dubbed', 'Subtitle · English', 'Dubbed · English');
            settings(resolution_checker, 'Resolution·Checker', 'Resolution Checker · Yes', 'Resolution Checker · No');
            settings(all_links, 'All·Links', 'All Links · Yes', 'All Links · No');
            settings(expand_menu, 'Expand·Menu', 'Expand Menu · Yes', 'Expand Menu · No');

            minus.innerText = '-';
            minus.style.width = '35px';
            plus.innerText = '+';
            plus.style.width = '35px';
            test_entry.innerText = '↻ Test Entry';
            input.readOnly = true;
            let initialSettings = load_settings();
            input.value = initialSettings['Resolution·Value'];
            input.id = 'id_input';
            input.style.border = 'none';
            input.style.background = '#252525';
            input.style.color = '#FFF';
            input.style.width = '35px';
            input.style.height = '35px';
            input.style.textAlign = 'center';
            input.style.fontSize = '12px';
            input.style.margin = '2px 2px 0px -3px';

            menu.appendChild(enable_script);
            menu.appendChild(minus);
            menu.appendChild(input);
            menu.appendChild(plus);
            menu.appendChild(test_entry);
            menu.appendChild(subtitle_dubbed);
            menu.appendChild(resolution_checker);
            menu.appendChild(all_links);
            menu.appendChild(expand_menu);

            minus.addEventListener('click', function() {
                let initialSettings = load_settings();
                let currentValue = Number(input.value);
                if (currentValue > 1) {
                    currentValue -= 1;
                    input.value = currentValue;
                    initialSettings['Resolution·Value'] = currentValue;
                    save_settings(initialSettings);
                } else {
                    input.value = 1;
                    initialSettings['Resolution·Value'] = 1;
                    save_settings(initialSettings);
                }
                if (!initialSettings['All·Links']){
                    if (currentValue > 3) {
                        if (menu.contains(resolution_checker)){
                            menu.removeChild(resolution_checker);
                        }
                    } else {
                        menu.insertBefore(resolution_checker, menu.children[6]);
                    }
                }
            });

            plus.addEventListener('click', function() {
                let initialSettings = load_settings();
                let currentValue = Number(input.value);
                if (currentValue < 15) {
                    currentValue++;
                    input.value = currentValue;
                    initialSettings['Resolution·Value'] = currentValue;
                    save_settings(initialSettings);
                }

                if (!initialSettings['All·Links']){
                    if (currentValue > 3) {
                        if (menu.contains(resolution_checker)){
                            menu.removeChild(resolution_checker);
                        }
                    } else {
                        menu.insertBefore(resolution_checker, menu.children[6]);
                    }
                }
            });

            all_links.addEventListener('click', function() {
                let initialSettings = load_settings();
                if (initialSettings['All·Links']){
                    menu.removeChild(subtitle_dubbed);
                    if (menu.contains(resolution_checker)){
                        menu.removeChild(resolution_checker);
                    }
                }else{
                    menu.insertBefore(subtitle_dubbed, menu.children[5]);
                    if (Number(input.value) > 3) {
                        if (menu.contains(resolution_checker)){
                            menu.removeChild(resolution_checker);
                        }
                    } else {
                        menu.insertBefore(resolution_checker, menu.children[6]);
                    }
                }
            });

            test_entry.addEventListener('click', function() {
                if (/animepahe\.(ru|org|com)\/play\/.+\/.+/.test(url_link)){
                    script();
                    setTimeout(function() {
                        var menu = document.getElementById('downloadMenu');
                        if (menu.getAttribute('aria-expanded') == 'false') {
                            menu.click();
                        }
                    }, 0);
                }else{
                    console.log('test entry: only available at animepahe.(ru|org|com)/play/xxx');
                }
            });

            if (!initialSettings['Resolution·Value'] > 3){
                menu.insertBefore(resolution_checker, menu.children[6]);
            }

            let all·links = initialSettings['All·Links'] ? true : false;
            if (all·links){
                menu.removeChild(subtitle_dubbed);
                if (menu.contains(resolution_checker)){
                    menu.removeChild(resolution_checker);
                }
            }else{
                menu.insertBefore(subtitle_dubbed, menu.children[5]);
                if (!initialSettings['Resolution·Value'] > 3){
                    menu.insertBefore(resolution_checker, menu.children[6]);
                }
            }

            if (Number(input.value) > 3) {
                if (menu.contains(resolution_checker)){
                    menu.removeChild(resolution_checker);
                }
            } else {
                if (!initialSettings['Resolution·Value'] > 3){
                    menu.insertBefore(resolution_checker, menu.children[6]);
                }
            }

            let main = document.querySelector('.content-wrapper');
            if (type == 1){
                menu.className = 'latest-release';
                main.insertBefore(menu, main.firstChild);
            }else if (type == 2){
                menu.style.position = 'relative';
                menu.style.maxWidth = '1100px';
                menu.style.margin = '0 auto';
                main.insertBefore(menu, main.children[3]);
            }

            let buttons = [enable_script, minus, plus, test_entry, subtitle_dubbed, resolution_checker, all_links, expand_menu];
            for (let button of buttons) {
                button.style.backgroundColor = '#000';
                button.style.color = '#fff';
                button.style.border = '1px solid #353535';
                button.style.borderRadius = '0px';
                button.style.margin = '0px 5px 5px 0px';
                button.style.padding = '0px 10px 0px 10px';
                button.style.cursor = 'pointer';
                button.style.transition = 'all 0.3s ease';
                button.style.cursor = 'default';
                button.classname = 'episode-list row';
                button.style.fontSize = '12px';
                button.style.height = '35px';
                button.onmouseover = function() {
                    this.style.backgroundColor = '#353535';
                };
                button.onmouseout = function() {
                    this.style.backgroundColor = '#000';
                };
            }
        }

        function open_menu() {
            let menu = document.getElementById('settings_menu');
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }

        function add_element(menuId, elementId, position){
            let menu = document.getElementById(menuId);
            let element = document.getElementById(elementId);
            menu.insertBefore(element, menu.children[position]);
        }
    }

    function load_settings() {
        let settings = localStorage.getItem('settings');
        if (settings) {
            return JSON.parse(settings);
        } else {
            console.log('loading default values');
            settings = {
                'Enable·Script': true,
                'Resolution·Value': 2,
                'Subtitle·Dubbed': true,
                'Resolution·Checker': false,
                'All·Links': false,
                'Expand·Menu': false,
            };
            localStorage.setItem('settings', JSON.stringify(settings));
            return settings;
        }
    }

    function save_settings(settings) {
        console.log('saving settings: ', settings);
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    function pahe_win() {
        const content = document.querySelector('script').textContent;
        const link = content.match(/https?:\/\/[^'"]+/);
        if (link) {
            window.location = link[0];
        } else {
            setInterval(() => window.location.reload(), 3000);
        }
    }

    function kwik_cx() {
        const form = document.querySelector('form');
        if (form) {
            form.submit();
        } else {
            setInterval(() => window.location.reload(), 3000);
        }
    }
})();