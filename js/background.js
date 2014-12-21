/** @license
  NetflixCaffeine | MIT License
  Copyright 2014 Jonas Tranberg

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  of the Software, and to permit persons to whom the Software is furnished to do
  so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 */

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