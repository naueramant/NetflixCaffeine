var NetflixMode;

//run at start up
checkforNetflix();

//Raise event when an update to a tab occurs
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) 
{
  checkforNetflix();
});

//Raise event when a tab is closed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) 
{
  checkforNetflix();
});

function checkforNetflix()
{
  chrome.tabs.getAllInWindow(null, function(tabs)
  {
    for (var i = 0; i < tabs.length; i++) 
    {
      if(tabs[i].url.indexOf("WiPlayer?") > -1)
      {
        if(!NetflixMode)
        {
          chrome.power.requestKeepAwake('display');
          NetflixMode = true;
          //console.log("Netflix power mode: ON");
        }
        return;
      }         
    }
    if(NetflixMode)
    {
      chrome.power.releaseKeepAwake();
      NetflixMode = false;
      //console.log("Netflix power mode: OFF");   
    }
  });
}