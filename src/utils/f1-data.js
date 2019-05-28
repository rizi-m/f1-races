import { getRequest } from './http-requests';

function getData(url, storeKey, onload) {
    const storedData = JSON.parse(localStorage.getItem(storeKey));
    if(storedData) {
        onload(storedData);
    } else {
        getRequest(url, (data) => {
            localStorage.setItem(storeKey, JSON.stringify(data));
            onload(data);
        });
    }
}

function getNewDataIfNeeded(url, storeKey, check, onload) {
    const storedData = JSON.parse(localStorage.getItem(storeKey));
    if (!storedData || check(storedData)) {
        getRequest(url, (data) => {
            localStorage.setItem(storeKey, JSON.stringify(data));
            onload(data);
        });
    } else {
        onload(storedData);
    }
}


export function latestStadings(url, storeKey, onload) {
    const nextRaceData = JSON.parse(localStorage.getItem('next-race'));
    let nextRaceSeason;
    let nextRaceRound;
    if (nextRaceData) {
        nextRaceSeason = nextRaceData.MRData.RaceTable.Races[0].season;
        nextRaceRound = nextRaceData.MRData.RaceTable.Races[0].round;
    }
    getNewDataIfNeeded(
        url,
        storeKey,
        (data) => nextRaceData && data.MRData.StandingsTable.season == nextRaceSeason && (parseInt(data.MRData.StandingsTable.round) + 1) < nextRaceRound,
        onload
    );
}

export function raceSchedule(year, onload) {
    getData(`http://ergast.com/api/f1/${year}.json`, `race-schedule-${year}`, onload);
}

export function qualifyingResults(year, race, onload) {
    getData(
        `http://ergast.com/api/f1/${year}/${race}/qualifying.json`, 
        `qualifying-results-${year}-${race}`, 
        onload
    );
}

export function raceResults(year, race, onload) {
    getData(
        `http://ergast.com/api/f1/${year}/${race}/results.json`, 
        `race-results-${year}-${race}`, 
        onload
    );
}

export function nextRace(onload) {
    getNewDataIfNeeded(
        'http://ergast.com/api/f1/current/next.json',
        'next-race',
        (data) => (new Date(data.MRData.RaceTable.Races[0].date)) < Date.now(),
        onload
    );
}

export function latestDriversStadings(onload) {
    latestStadings('http://ergast.com/api/f1/current/last/driverStandings.json', 'latest-driver-standings', onload);
}

export function latestConstructorStandings(onload) {
    latestStadings('http://ergast.com/api/f1/current/last/constructorStandings.json', 'latest-constructor-standings', onload);
}