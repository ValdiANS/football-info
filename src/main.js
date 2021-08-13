
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'jquery/dist/jquery.min.js';

import './style/style.css';
import './style/home.css';

import './js/component/navbar.js';
import './js/component/homeContent.js';
import './js/component/competitionsCardItem.js';
import './js/component/competitionsCardList.js';
import './js/component/matchCard.js';
import './js/component/teamCardList.js';
import './js/component/teamCardItem.js';
import './js/component/teamCard.js';
import './js/component/squadTable.js';
import './js/component/standingsCompetitionsList.js';
import './js/component/standingsTable.js';
import './js/component/FavTeamCard.js';
import './js/component/favTeamCardList.js';

import './js/API/getCompetitionsData.js';
import './js/API/getTeamData.js';
import './js/API/getPlayerData.js';
import './js/API/getStandingsData.js';

import './js/script/nav.js';
import './js/script/idb.js';
import './js/script/teamDb.js';

if('serviceWorker' in navigator){
    window.addEventListener('load', function(event){
        navigator.serviceWorker
            .register('/workbox-sw.js')
            .then(registration => {
                console.log(`SW Registered: `, registration);
            })
            .catch(regisErr => {
                console.log(`SW registration failed: `, regisErr);
            })
    });
}

if('Notification' in window){
    Notification.requestPermission()
        .then(result => {
            if(result === 'denied'){
                console.log("Fitur notifikasi tidak diizinkan.");
                return;
            } else if(result === 'default'){
                console.error("Pengguna menutup kotak dialog permintaan izin.");
                return;
            }

            console.log("Fitur notifikasi diizinkan.");

            if(("PushManager" in window)){
                navigator.serviceWorker.getRegistration()
                    .then(regis => {
                        regis.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: base64ToUint8Array("BJJroH9ko7RQBJFBjsJLptT8roHkBiJyh-8XTq6CK4ifJGzhQm1Uh568lhuEbMbgf-lUNf79RlQGHZQQ5tB2PSA")
                        })
                        .then(subs => {
                            console.log('Berhasil subscribe dengan endpoint: ', subs.endpoint);
                            console.log('Berhasil subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('p256dh')))));
                            console.log('Berhasil subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('auth')))));
                        })
                    })
            }
        })
}

function base64ToUint8Array(base64String){
    const padd = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padd)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArr = new Uint8Array(rawData.length);

    for(let i = 0; i < rawData.length; ++i){
        outputArr[i] = rawData.charCodeAt(i);
    }

    return outputArr;
}