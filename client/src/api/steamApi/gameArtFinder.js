export function artSearch() {
    const appId = document.getElementById('appId').value;
    const url = "https://steamcdn-a.akamaihd.net/steam/apps/" + appId +"/library_600x900_2x.jpg";
    const gameArt = document.getElementById('url');
    gameArt.src = url;
}