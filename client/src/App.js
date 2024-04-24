import React, { useState } from 'react';
import './App.css';

function App() {
  const [appId, setAppId] = useState('');
  const [steamId, setSteamId] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [gameName, setGameName] = useState('');
  const [playerSteamId, setPlayerSteamId] = useState('');
  const [ownedGames, setOwnedGames] = useState([]);

  const handleAppIdChange = (event) => {
    setAppId(event.target.value);
  };

  const handleSteamIdChange = (event) => {
    setSteamId(event.target.value);
  };

  const fetchAchievements = async () => {
    if (appId && steamId) {
      try {
        const url = `http://localhost:3001/api/getPlayerAchievements?appid=${appId}&steamid=${steamId}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.playerstats && data.playerstats.achievements) {
          setAchievements(data.playerstats.achievements);
          setGameName(data.playerstats.gameName);
          setPlayerSteamId(data.playerstats.steamID);
        } else {
          console.log("No achievements found or incorrect data structure.");
          setAchievements([]);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setAchievements([]);
      }
    } else {
      console.log("Please enter both an App ID and a Steam ID.");
    }
  };

  const fetchOwnedGames = async () => {
    if (steamId) {
      try {
        const url = `http://localhost:3001/api/getOwnedGames?steamid=${steamId}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched owned games:', data); // Log fetched data for debugging
        if (Array.isArray(data) && data.length > 0) { // Check if data is an array and not empty
          setOwnedGames(data);
        } else {
          console.log("No owned games found or incorrect data structure.");
          setOwnedGames([]);
        }
      } catch (error) {
        console.error('Error fetching owned games:', error);
        setOwnedGames([]);
      }
    } else {
      console.log("Please enter a Steam ID.");
    }
  };
  

  
  const handleSearch = async () => {
    if (appId && steamId) {
      try {
        await Promise.all([fetchAchievements(), fetchOwnedGames()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.log("Please enter both an App ID and a Steam ID.");
    }
  };

  const renderAchievementsTable = () => {
    if (achievements.length > 0) {
      return (
        <div>
          <h2>{gameName} Achievements for Steam ID: {playerSteamId}</h2>
          <table>
            <thead>
              <tr>
                <th>Achievement Name</th>
                <th>Achieved</th>
                <th>Unlock Time</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((achievement, index) => (
                <tr key={index}>
                  <td>{achievement.apiname}</td>
                  <td>{achievement.achieved ? 'Yes' : 'No'}</td>
                  <td>{achievement.unlocktime ? new Date(achievement.unlocktime * 1000).toLocaleString() : 'Not Unlocked'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return <p>No achievements found or search not yet performed.</p>;
  };

  const renderOwnedGamesList = () => {
    if (ownedGames.length > 0) {
      return (
        <div>
          <h2>Owned Games for Steam ID: {playerSteamId}</h2>
          <ul>
            {ownedGames.map((game, index) => (
              <li key={index}>
                <div>
                  <strong>App ID:</strong> {game.appid}
                </div>
                <div>
                  <strong>Name:</strong> {game.name}
                </div>
                <div>
                  <strong>Playtime Forever:</strong> {game.playtime_forever}
                </div>
                <div>
                  <strong>Windows Playtime:</strong> {game.playtime_windows_forever}
                </div>
                <div>
                  <strong>Mac Playtime:</strong> {game.playtime_mac_forever}
                </div>
                <div>
                  <strong>Linux Playtime:</strong> {game.playtime_linux_forever}
                </div>
                <div>
                  <strong>Deck Playtime:</strong> {game.playtime_deck_forever}
                </div>
                <div>
                  <strong>Last Played Time:</strong> {new Date(game.rtime_last_played * 1000).toLocaleString()}
                </div>
                <div>
                  <strong>Disconnected Playtime:</strong> {game.playtime_disconnected}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <p>No owned games found or search not yet performed.</p>;
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          id="appId"
          placeholder="Type App ID"
          value={appId}
          onChange={handleAppIdChange}
        />
        <input
          type="text"
          id="steamId"
          placeholder="Type Steam ID"
          value={steamId}
          onChange={handleSteamIdChange}
        />
        <button onClick={handleSearch}>Search</button>
        {renderAchievementsTable()}
        {renderOwnedGamesList()}
      </header>
    </div>
  );
}

export default App;
