// ==UserScript==
// @name         Animepahe · Pahe · Kwik
// @namespace    https://PHCorner.net/
// @version      0.1.4
// @downloadURL  https://raw.githubusercontent.com/Ysilven/animepahe-auto-download-script/main/Animepahe%20%C2%B7%20Pahe%20%C2%B7%20Kwik.js
// @updateURL    https://raw.githubusercontent.com/Ysilven/animepahe-auto-download-script/main/Animepahe%20%C2%B7%20Pahe%20%C2%B7%20Kwik.js
// @description  animepahe auto script. use mouse scroll click to open multiple anime links.
// @author       Arjien Ysilven
// @match        https://pahe.win/*
// @match        https://kwik.si/f/*
// @match        https://kwik.si/d/*
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
    let enable_script = settings['Enable·Script'] ? true : false;
    let url_link = window.location.href;
    switch (true) {
        case /animepahe\.(ru|org|com)\/?$/.test(url_link):
        case /animepahe\.(ru|org|com)(\/\?page=\d+)?$/.test(url_link):
            menu(1);
            break;
        case /animepahe\.(ru|org|com)\/play\/.+\/.+/.test(url_link):
            menu(1);
            if(enable_script){
                script();
            } else {
                console.log('script disabled');
            }
            break;
        case /animepahe\.(ru|org|com)\/anime\/.+/.test(url_link):
            menu(2);
            break;
        case /pahe\.win\/.+/.test(url_link):
            pahe_win();
            break;
        case /kwik\.(si|cx)\/f\/.+/.test(url_link):
        kwik_si();
        break;
    case /kwik\.(si|cx)\/d\/.+/.test(url_link): {
        let newUrlLink = url_link.replace('/d/', '/f/');
        window.location = newUrlLink;
        break;
    }
        default:
            console.log('no matches found for url_link');
    }

    function clear_selection() {
        let a = document.getElementById('pickDownload');
        let b = a.getElementsByTagName('a');
        for (let i = 0; i < b.length; i++) {
            b[i].style.backgroundColor = '';
            b[i].style.color = '';
        }
    }

    function script(){
        console.log('Animepahe · Pahe · Kwik', 'v0.1.1');

        let settings = load_settings();
        let index = settings['Resolution·Value'];
        let sub_dub = settings['Subtitle·Dubbed'] ? true : false;
        let resolution_checker = settings['Resolution·Checker'] ? true : false;
        let all_links = settings['All·Links'] ? true : false;
        let enable_script = settings['Enable·Script'] ? true : false;

        let expand_menu = document.getElementById('downloadMenu');
        if (expand_menu.getAttribute('aria-expanded') == 'false') {
            expand_menu.click();
        }

        let a = document.getElementById('pickDownload');
        let b = a.querySelectorAll('a');
        let links = Array.from(b).map((link, index) => {
            return {
                index: index + 1,
                href: link.href,
                text: link.textContent
            };
        });

        console.log('resolution·index:', index);

        let text = ['eng'];
        let sub = links.filter(link => {
            return !text.some(text => link.text.includes(text));
        });

        let dub = links.filter(link => {
            return text.some(text => link.text.includes(text));
        });

        let resolutions = {1: '360p', 2: '720p', 3: '1080p'};
        let res_checker = (sub_dub ? sub : dub).some(link => link.text.includes(resolutions[index]));
        if (resolution_checker){
            if (index > 3 || all_links) {
                play();
            }else{
                if (res_checker){
                    console.log(`resolution·checker: ${resolutions[index]} · found.`);
                    play();
                }else{
                    console.log(`resolution·checker: ${resolutions[index]} · not found.`);
                    console.log('5 seconds reload.');
                    clear_selection();
                    setTimeout(() => window.location.reload(), 5000);
                }
            }
        }else{
            play();
        }

        function play(){
            function filter(array, resolution) {
                return array.filter(link => link.text.includes(resolution));
            }

            let count = sub_dub ? sub.length : dub.length;
            if (!all_links) {
                let type = sub_dub ? sub : dub;
                let _720p = filter(type, '720p');
                let _1080p = filter(type, '1080p');

                if (count == 1 || index <= 0) {
                    index = 1;
                }
                if (index == 2 & count == 2) {
                    if (_720p.length > 0) {
                        index = _720p[0].index;
                    } else {
                        if (_1080p.length > 0) {
                            index = _1080p[0].index;
                        } else {
                            index = 1;
                        }
                    }
                }
                if (index == 3 & count == 2) {
                    index = 2;
                }
                if (index > count) {
                    index = count;
                }
            } else {
                if (index > links.length) {
                    index = links.length;
                }
            }

            let index_link, info;
            let type = sub_dub ? sub : dub;
            let data = !all_links ? type : links;
            if (data.length > 0) {
                index_link = data[index-1].href;
                info = data[index-1].index +' · '+ data[index-1].href +' · '+ data[index-1].text;
                console.log(!all_links ? 'auto·resolution: ' + (sub_dub ? 'sub · count: ' + sub.length : 'dub · count: ' + dub.length) : 'all·links · count: ' + links.length);
            } else {
                index_link = null;
            }

            if (index_link == null){
                console.log('resolution = value? · '+ index + ' · not found.');
                clear_selection();
            }else{
                clear_selection();
                let a = document.getElementById('pickDownload');
                let select = a.getElementsByTagName('a')[info[0]-1];
                select.style.backgroundColor = '#505050';
                select.style.color = 'white';
                console.log(info);

                if (enable_script){
                    window.location = index_link;
                }else{
                    console.log('enable script: no');
                }
            }
        }
    }

    function menu(type){
        let li = Object.assign(document.createElement('li'), {className: 'nav-item'}),
            a = Object.assign(li.appendChild(document.createElement('a')), {
                className: 'nav-link',
                textContent: 'menu',
                title: 'Menu',
                onclick: function(e) {
                    e.preventDefault();
                    open_menu();
                }
            });

        document.querySelector('.navbar-nav.mr-auto.main-nav').appendChild(li);
        create_menu();

        var media = window.matchMedia("(max-width: 1100px)");
        function toggle(e) {
            var menu = document.getElementById('settings_menu');
            if (e.matches) {
                menu.style.paddingLeft = '10px';
            } else {
                menu.style.paddingLeft = '0px';
            }
        }
        toggle(media);
        media.addListener(toggle);

        let initialSettings = load_settings();
        if (initialSettings['Expand·Menu']) {
            open_menu();
        }

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                document.getElementById('settings_menu').remove();
                create_menu();
                if (load_settings()['Expand·Menu']) {
                    open_menu();
                }
                toggle(media);
                media.addListener(toggle);
            }
        });

        function create_menu() {
            let initialSettings = load_settings();
            let menu = document.createElement('div');
            let enable_script = document.createElement('button');
            let minus = document.createElement('button');
            let input = document.createElement('input');
            let plus = document.createElement('button');
            let test_entry = document.createElement('button');
            let info = document.createElement('input');
            let subtitle_dubbed = document.createElement('button');
            let resolution_checker = document.createElement('button');
            let all_links = document.createElement('button');
            let expand_menu = document.createElement('button');

            function settings(element, json_value, yes, no) {
                let settings = load_settings();
                element.innerText = settings[json_value] ? yes : no;
                element.onclick = function() {
                    let settings_ = load_settings();
                    settings_[json_value] = !settings_[json_value];
                    element.innerText = settings_[json_value] ? yes : no;
                    save_settings(settings_);
                };
            }

            settings(enable_script, 'Enable·Script', 'Enable Script · Yes', 'Enable Script · No');
            settings(subtitle_dubbed, 'Subtitle·Dubbed', 'Sub · English', 'Dub · English');
            settings(resolution_checker, 'Resolution·Checker', 'Resolution Checker · Yes', 'Resolution Checker · No');
            settings(all_links, 'All·Links', 'All Links · Yes', 'All Links · No');
            settings(expand_menu, 'Expand·Menu', 'Expand Menu · Yes', 'Expand Menu · No');

            minus.innerText = '-';
            minus.style.width = '35px';
            plus.innerText = '+';
            plus.style.width = '35px';
            test_entry.innerText = '↻ Test Entry';
            input.readOnly = true;
            input.value = initialSettings['Resolution·Value'];
            input.id = 'id_input';
            input.style.border = 'none';
            input.style.background = '#202020';
            input.style.borderRadius = '2px';
            input.style.color = '#FFF';
            input.style.width = '35px';
            input.style.height = '35px';
            input.style.textAlign = 'center';
            input.style.fontSize = '12px';
            input.style.margin = '2px 2px 0px -3px';

            info.readOnly = true;
            function info_input(){
                let settings = load_settings();
                if (!settings['All·Links']){
                    menu.insertBefore(info, menu.children[5]);
                }
                switch (settings['Resolution·Value']) {
                    case 1:
                        info.value = '360p';
                        break;
                    case 2:
                        info.value = '720p';
                        break;
                    case 3:
                        info.value = '1080p';
                        break;
                    default:
                        info.value = '';
                        if(menu.contains(info)){
                            menu.removeChild(info);
                        }
                        if(menu.contains(resolution_checker)){
                            menu.removeChild(resolution_checker);
                        }
                        break;
                }
            }
            info.id = 'info_input';
            info.style.border = 'none';
            info.style.background = '#151515';
            info.style.borderRadius = '2px';
            info.style.color = '#FFF';
            info.style.width = '50px';
            info.style.height = '35px';
            info.style.textAlign = 'center';
            info.style.fontSize = '12px';
            info.style.margin = '0px 5px 0px 0px';

            menu.id = 'settings_menu';
            menu.style.display = 'none';
            menu.style.backgroundColor = '#000';
            menu.style.color = '#fff';
            menu.style.minHeight = '10px';
            menu.style.transition = 'all 0.3s ease'

            menu.appendChild(enable_script);
            menu.appendChild(minus);
            menu.appendChild(input);
            menu.appendChild(plus);
            menu.appendChild(test_entry);
            menu.appendChild(info);
            menu.appendChild(subtitle_dubbed);
            menu.appendChild(resolution_checker);
            menu.appendChild(all_links);
            menu.appendChild(expand_menu);

            minus.addEventListener('click', function() {
                let initialSettings = load_settings();
                let currentValue = Number(input.value);
                if (currentValue > 1) {
                    input.value = --currentValue;
                    initialSettings['Resolution·Value'] = currentValue;
                    save_settings(initialSettings);
                }
                update_display();
            });

            plus.addEventListener('click', function() {
                let initialSettings = load_settings();
                let currentValue = Number(input.value);
                if (currentValue < 15) {
                    input.value = ++currentValue;
                    initialSettings['Resolution·Value'] = currentValue;
                    save_settings(initialSettings);
                }
                update_display();
            });

            resolution_checker.addEventListener('click', () => {
                let initialSettings = load_settings();
                if (initialSettings['Resolution·Checker']? info.style.backgroundColor = '#202020' : info.style.backgroundColor = '#101010');
            });

            all_links.addEventListener('click', () => {
                update_display();
            });

            test_entry.addEventListener('click', () => {
                if (/animepahe\.(ru|org|com)\/play\/.+\/.+/.test(url_link)) {
                    script();
                    setTimeout(() => document.getElementById('downloadMenu').click(), 0);
                } else {
                    console.log('test entry: only available at animepahe.(ru|org|com)/play/xxx');
                }
            });

            function update_display(){
                let initialSettings = load_settings();
                if (initialSettings['Resolution·Checker']? info.style.backgroundColor = '#202020' : info.style.backgroundColor = '#101010');
                if (!initialSettings['Resolution·Value'] > 3){
                    menu.insertBefore(resolution_checker, menu.children[6]);
                }
                if (initialSettings['All·Links']) {
                    if (menu.contains(info)) {
                        menu.removeChild(info);
                        menu.removeChild(subtitle_dubbed);
                        menu.removeChild(resolution_checker);
                    }
                } else {
                    menu.insertBefore(subtitle_dubbed, menu.children[5]);
                    if (Number(input.value) <= 3) {
                        menu.insertBefore(resolution_checker, menu.children[6]);
                    } else if (menu.contains(resolution_checker)) {
                        menu.removeChild(resolution_checker);
                    }
                }
                info_input();
            }
            update_display();

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
                button.style.backgroundColor = '#101010';
                button.style.color = '#fff';
                button.style.border = 'none';
                button.style.borderRadius = '2px';
                button.style.margin = '0px 5px 5px 0px';
                button.style.padding = '0px 10px 0px 10px';
                button.style.cursor = 'pointer';
                button.style.transition = 'all 0.3s ease';
                button.style.cursor = 'default';
                button.style.fontSize = '12px';
                button.style.height = '35px';
                button.onmouseover = function() {
                    this.style.backgroundColor = '#252525';
                };
                button.onmouseout = function() {
                    this.style.backgroundColor = '#101010';
                };
                button.onmousedown = function() {
                    this.style.backgroundColor = '#1a1a1a';
                };
                button.onmouseup = function() {
                    this.style.backgroundColor = '#252525';
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
        console.log('saving settings');
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

    function kwik_si() {
        const form = document.querySelector('form');
        if (form) {
            form.submit();
        } else {
            setInterval(() => window.location.reload(), 3000);
        }
    }
})();
