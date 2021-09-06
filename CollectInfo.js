// Collects info from YouTube when the following page is open:
// - https://studio.youtube.com/channel/XYZABC123/monetization/memberships
// and the "SEE ALL" under "Your members" window has been expanded.
// (Made to run in browser console)
//
// -- Currently only works for the first page. I don't have > 20 members, and can't see the other pages, unfortunately.

// ------------------
// Variables
// ------------------

// CHANGE MODE FOR DOWNLOADS:
// 'each' - Downloads a CSV file for each membership tier
// 'combined' - Downloads 1 CSV file with all tiers in it (not seperated)
// 'justusernames' - Downloads a TXT file for each membership tier, 1 username on each line.
// 'justusernameswrapquotes' - Downloads a TXT file for each membership tier, 1 username on each line. Usernames surrounded by `s for Adobe software use
var mode = 'each';

// REPLACE USERNAMES [censor, nicknames etc] HERE:
// If case sensitive turned OFF (default): original names MUST be ALL LOWERCASE!
// caseSensitive = <true/false>
var caseSensitive = false;
// replacemanes["original name"] = "modified name";
var replaceNames = {};
replaceNames["ash byrns"] = "Mish"; // (Example)



// ------------------
// Functions
// ------------------

// Creates and then downloads a file. In this case: Downloads a CSV for each tier.-
// See https://stackoverflow.com/a/33542499/5165437
function save(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}




// ------------------
// Main code
// ------------------

// Membership object. Will store: Tier > [user1, user2, ...]
var m = {};

Array.from(document.querySelector("ytcp-error-section.ytsp-sponsors-dialog").parentElement.children).forEach(e => {
  if (e.nodeName !== "DIV") return;
  
  // Collect user info
  let u = {};
  u.tier = e.querySelector(".sponsor-current_tier").textContent.trim();
  u.image = e.querySelector(".sponsor-info-avatar img").src;
  u.username = e.querySelector(".sponsor-info-name").textContent.trim();
  let time = e.getElementsByClassName("sponsor-total-time");
  u.totTimeLvl = time[0].textContent.trim();
  u.totTime = time[1].textContent.trim();
  u.lastUpdate = e.querySelector(".sponsor-last-update").textContent.trim().replace('•', '-'); // Replace not required, just stops Excel making it "â€¢"
  
  // Replace username if necessary
  let user = u.username;
  if (!caseSensitive) user = user.toLowerCase();
  if (user in replaceNames){
	u.username = replaceNames[user]
  }
  
  
  // Add to overall membership object
  if (!(u.tier in m)) { m[u.tier] = []}
  m[u.tier].push(u)
});


let text = "";
let lines = [];
let keys = Object.keys(m);

if (mode === 'combined'){
  lines = ["Username, Image URL, Sponsor tier, Total time on lvl, Total time as mem, Last update"]; // Init with headers
  // Foreach tier
  keys.forEach(k => {
	// Foreach member
    m[k].forEach(u => {
		lines.push([u.username, u.image, u.tier, u.totTimeLvl, u.totTime, u.lastUpdate].join(','))
	});	
  });
  
  // Join everything together, and save
  save("combined.csv", lines.join('\n'))
}

else if (mode === 'each'){
  // Foreach tier
  keys.forEach(k => {
    lines = ["Username, Image URL, Total time on lvl, Total time as mem, Last update"]; // Init with headers
	
	// Foreach member
    m[k].forEach(u => {
		lines.push([u.username, u.image, u.totTimeLvl, u.totTime, u.lastUpdate].join(','))
	});
	
    // Join everything in tier together, and save
    save(k + ".csv", lines.join('\n'))
  });
}

else if (mode === "justusernames" || mode === "justusernameswrapquotes"){
  // Foreach tier
  keys.forEach(k => {	
    // Foreach member
    m[k].forEach(u => {
      lines.push(u.username);
    });
	
    // Join everything in tier together, and save
    if (mode === "justusernameswrapquotes") save(k + ".txt", '`' + lines.join('\n') + '`');
    else save(k + ".txt", lines.join('\n'));
  });
}

