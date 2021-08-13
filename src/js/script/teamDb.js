import idb from './idb.js';
// Create database
const teamDb = idb.open('team', 1, upgDb => {
    const favTeamObjStore = upgDb.createObjectStore('fav-team', {
        keyPath: 'id'
    }) 
});

const teamSquadDb = idb.open('team-squad', 1, upgDb => {
    const favTeamSquadObjStore = upgDb.createObjectStore('fav-team-squad', {
        keyPath: 'team_id'
    }) 
});

// Team DB
function saveFavTeam(team, teamName){
    teamDb
        .then(db => {
            const tx = db.transaction('fav-team', 'readwrite');
            const store = tx.objectStore('fav-team');

            store.add(team);
            return tx.complete;
        })
        .then(_ => {
            console.log(`${teamName} berhasil ditambahan ke favorit`);
            console.log(`Team Id : ${team.id}`)
        })
}

function getTeam(id){

    return new Promise((resolve, reject) => {
        teamDb
            .then(db => {
                const tx = db.transaction('fav-team', 'readonly');
                const store = tx.objectStore('fav-team');
                
                resolve(store.get(id));
            })
    })
}

function getAllFavTeam(){
    return new Promise((resolve, reject) => {
        teamDb
            .then(db => {
                const tx = db.transaction('fav-team', 'readonly');
                const store = tx.objectStore('fav-team');

                return store.getAll();
            })
            .then(favTeam => {
                resolve(favTeam);
            })
    })
}

function deleteFavTeam(id){
    teamDb
        .then(db => {
            const tx = db.transaction('fav-team', 'readwrite');
            const store = tx.objectStore('fav-team');

            store.delete(id);
            return tx.complete;
        })
        .then(_ => {
            console.log(`team berhasil dihapus`);
        })

}

// Squad DB
function saveFavTeamSquad(teamSquadList){
    teamSquadDb
        .then(db => {
            const tx = db.transaction('fav-team-squad', 'readwrite');
            const store = tx.objectStore('fav-team-squad');

            store.add(teamSquadList);
            return tx.complete;
        })
}

function getTeamSquad(teamId){
    return new Promise((resolve, reject) => {
        teamSquadDb
        .then(db => {
            const tx = db.transaction('fav-team-squad', 'readonly');
            const store = tx.objectStore('fav-team-squad');

            return store.get(teamId);
        })
        .then(data => {
            resolve(data);
        })
    })
}

function deleteFavTeamSquad(team_id){
    teamSquadDb
        .then(db => {
            const tx = db.transaction('fav-team-squad', 'readwrite');
            const store = tx.objectStore('fav-team-squad');

            store.delete(team_id);
            return tx.complete;
        })
        .then(_ => {
            console.log(`team squad berhasil dihapus`);
        })
}
export {saveFavTeam, getAllFavTeam, deleteFavTeam, getTeam, saveFavTeamSquad, getTeamSquad, deleteFavTeamSquad};