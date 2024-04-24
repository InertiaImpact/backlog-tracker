export async function appList() {
    const response = await fetch("https://store.steampowered.com/api/appdetails?appids=1328670", {    
        method: 'GET',    
        withCredentials: true,    
        crossorigin: true,    
        mode: 'no-cors',       
      });
    const details = await response.json();
    console.log(details);
}