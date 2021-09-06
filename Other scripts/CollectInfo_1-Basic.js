// Collects info from YouTube when the following page is open:
// - https://studio.youtube.com/channel/XYZABC123/monetization/memberships
// and the "SEE ALL" under "Your members" window has been expanded.
//
// Returns:
// Image URL: https://yt3.ggpht.com/....
// Username: Ash Byrns
// Sponsor tier: Supporter
// Total time on lvl: 10 months
// Total time as mem: 10 months
// Last update: Re-joined • 8 months ago
//
// -- Currently only works for the first page. I don't have > 20 members, and can't see the other pages, unfortunately.

Array.from(document.querySelector("ytcp-error-section.ytsp-sponsors-dialog").parentElement.children).forEach(e => {
  if (e.nodeName !== "DIV") return;
  console.log("Image URL: " + e.querySelector(".sponsor-info-avatar img").src);
  console.log("Username: " + e.querySelector(".sponsor-info-name").textContent.trim());
  console.log("Sponsor tier: " + e.querySelector(".sponsor-current_tier").textContent.trim());
  let time = e.getElementsByClassName("sponsor-total-time");
  console.log("Total time on lvl: " + time[0].textContent.trim());
  console.log("Total time as mem: " + time[1].textContent.trim());
  console.log("Last update: " + e.querySelector(".sponsor-last-update").textContent.trim());
})