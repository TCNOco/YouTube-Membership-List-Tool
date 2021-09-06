# YouTube Membership List Tool

You probably want a way to collect a list of all members of your YouTube channel, to include in a video. Much like people do Patreon supporter lists, etc... But how do you do that?

I searched the internet top-to-bottom and found almost nothing.

I did find this [YouTube Help article](https://support.google.com/youtube/answer/9315687?hl=en) which has a couple of integrations listed. Under "FX Factory" you'll find that it can `Generate lists of members, import into editing tools like After Effects, Photoshop, InDesign, etc., or export to txt, csv, or json.`, but upon clicking "Learn more" you're taken to FX Factory's homepage... where no more info is to be found.

This simple JS script, when copied and pasted into your browser's developer console, grabs a list of all members, details and categories.

### How do you use it?

1. Copy the script from the JS file above.

2. Open the Developer Console in your browser with `Ctrl+Shift+I`, `F12` or another hotkey.

3. Head to the `Console` tab.
 
4. Go to your **YouTube Creator Studio**, **Channel monetization**, **Memberships** and then click `SEE ALL` under "Your Members". Upon doing so a list of supporters will show, as such:
<img src="https://i.imgur.com/pLwRhlt.png" alt="drawing" width="600" align="center" />

5. Open the console, past the command and edit some of the lines at the top. Those lines include: 
  -  **MODE:** 
     - **each** - Downloads a CSV file for each membership tier
     -  **combined** - Downloads 1 CSV file with all tiers in it (not seperated)
     -  **justusernames** - Downloads a TXT file for each membership tier, 1 username on each line.
     -  **justusernameswrapquotes** - Downloads a TXT file for each membership tier, 1 username on each line. Usernames surrounded by `s for Adobe software use
    - **REPLACING USERNAMES:**
       - **caseSensitive:** true or false (for replacing usernames)
       - **replaceNames:** Object that stores original usernames (keys) and what to replace them with if found (values).
           Example: `replaceNames["ash byrns"] = "Mish";` will replace "Ash Byrns" with "Mish" whenever found. Useful for users who don't want their name public. Edit and save your own scripts.

6. Hit Enter, and downloads will begin after usernames and data is collected.
<img src="https://i.imgur.com/BRQvZyZ.png" alt="drawing" width="600" align="center" />

7. Enjoy your data!
<img src="https://i.imgur.com/ZrgRuuQ.png" alt="drawing" width="600" align="center" />


### Limitations:
I only have a handful of members, so I can't program in multiple page collection, as I don't have >20 members - which is the smallest amount for pagination to kick in. Eventually I do want to fix this, though I need to get there first. This script should therefore work to 100 members, as that's the largest amount you can show on 1 page of the list. This is likely higher than a lot will need, but is still a limitation.

### Where is this project going?
Hopefully I can get some sort of integration with WebView2 in C#, or something along those lines to automate the process somewhat. I still can't get it to import into Premiere Pro or After Effects... I may have to use PIL in Python to just generate images and slides I will use in my projects... Super annoying. I JUST want a list of all my 