let modInfo = {
	name: "Click n Win",
	id: "mymod",
	author: "Samed",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "This game sucks update"	,
}

let changelog = `<h1>Changelog:</h1><br>
      <br><br>
        <h3>v0.3</h3><br>
      - Added a new row of achievements.<br>
      - Added new content.<br>
      - Added auto-win.<br>
      - Fixed bugs. (How surprising)<br>
      <br><br>
        <h3>v0.21</h3><br>
      - Added sacrifice.<br>
      <br><br>
         <h3>v0.2</h3><br>
		- Rebalanced the whole game.<br>
		- Fixed a lot of bugs.<br>
		 <br><br>
         <h3>v0.1</h3><br>
		- Added the 3rd layer.<br>
		- Added 10 milestones. (Rest are not yet implemented)<br>
		- 15th achievement is possible now.<br>
		- Fixed some bugs.<br>
		 <br><br>
         <h3>v0.03</h3><br>
		- Implemented all 7 challenges.<br>
		- Redesigned tab layouts.<br>
		- Changed and rebalanced the third row of achievements. (Last one is not possible)<br>
         <br><br>
         <h3>v0.02</h3><br>
		- Added 3 more upgrades.<br>
		- Added one more milestone.<br>
		- Added one more challenge. (They all work now)<br>
		<br><br>
		<h3>v0.01</h3><br>
		- Added the main 9 upgrades.<br>
		- Added 4 win milestones.<br>
		- Added magical field, a place where you can buy items.<br>
		- Added 3 challenges. (2nd one may not be doable at the moment)<br>
		- Added two and a half rows of achievements.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
let PP = false

function canGenPoints() {
  let PP = localStorage.getItem('PP') === 'true';
  if (player.w.points >= 1 || PP) {
    localStorage.setItem('PP', 'true');
    return true;
  }
  return false;
}
// Calculate points/sec!

function challengeEffect(){
  let Effect = new Decimal(1)
  if (inChallenge('m', 21)) {
    Effect = format(Effect.mul(Math.sin(getResetGain('w').add(player.w.points))))
    return "<h5>You are currently inside the Placeholder 1. <br> If you win right now, your point production will be multiplied by </h5>" + Effect
  }
  if (inChallenge('m', 31)) {
    return "<h5>You are currently inside the Endless Void</h5>" + "You have " + player.w.points + " wins and you will gain " + getResetGain('w') + " wins on reset"
  }
  else{
    return false
  }
}

function calculateAch32Reward() {
  let reward = new Decimal(1)
  if (hasAchievement('A', 31)) reward = reward.add(0.5)
  if (hasAchievement('A', 32)) reward = reward.add(0.5)
  if (hasAchievement('A', 33)) reward = reward.add(0.5)
  if (hasAchievement('A', 34)) reward = reward.add(0.5)
  if (hasAchievement('A', 35)) reward = reward.add(0.5)
  return reward
}

function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
  if (hasUpgrade('h',31)) gain = gain.mul(upgradeEffect('h',31))
  if (hasUpgrade('h',33)) gain = gain.mul(upgradeEffect('h',33))
  if (hasAchievement('A',14)) gain = gain.mul(1.1)
	if (hasMilestone('h',1)) gain = gain.mul(2)
  if (hasAchievement('A',32)) gain = gain.mul(calculateAch32Reward())
	if (hasAchievement('A',33)) {
	if(inChallenge("m",13) ||inChallenge("m",12) ||inChallenge("m",11) ||inChallenge("m",21) ||inChallenge("m",22) ||inChallenge("m",23) ||inChallenge("m",31)){
		gain = gain.mul(2)}}
	if (hasAchievement('A',34)) {
	if(inChallenge("m",13) ||inChallenge("m",12) ||inChallenge("m",11) ||inChallenge("m",21) ||inChallenge("m",22) ||inChallenge("m",23) ||inChallenge("m",31)){
		gain = gain.mul(2)}}
	if (hasUpgrade('w', 14)) gain = gain.times(upgradeEffect('w',14))
	if (hasUpgrade('w', 11)) gain = gain.times(upgradeEffect('w',11))
	if (hasUpgrade('w', 21)) gain = gain.times(upgradeEffect('w',21))
	if (hasUpgrade('w', 31)) gain = gain.mul(8)
	if (hasUpgrade('w', 12)) gain = gain.times(upgradeEffect('w', 12))
	if (hasUpgrade('w', 22)) gain = gain.times(upgradeEffect('w', 22))
	if (hasUpgrade('w', 32)) gain = gain.times(upgradeEffect('w', 32))
	if (hasAchievement('A',23)) gain = gain.times(achievementEffect('A',23))
	if (getBuyableAmount('m', 22) > 0) gain = gain.times(buyableEffect('m', 22))
	if (hasChallenge("m",21)) gain = gain.pow(1.08)
	if (inChallenge("m",21)) gain = gain.pow(0.1)
	if (inChallenge("m",21)) gain = gain.mul(player.w.points.sin(player.w.points)).add(1)
  if (inChallenge("m", 13)) {
      const upgrades = [
          "11", "12", "13", "14", "21", "22", "23", "24", 
          "31", "32", "33", "34", "41", "42", "43", "44"
      ];
  
      upgrades.forEach(upgrade => {
          if (hasUpgrade("w", upgrade)) {
              gain = gain.div(100);
          }
      });
  }
	if (inChallenge("m",22)) {
		if (player.w.points == 0) {
			gain = gain.mul(1).add(1)
		} else {
			gain = gain.divide(player.w.points.pow(10).add(1))
		}
	}
  if (inChallenge("m",33)) {
    gain = gain.pow(0.01)
  }
  if (hasUpgrade('h', 22)) gain = gain.pow(temp.h.effect.pow(0.3))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
  challengeEffect
  
]
// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function calculatetimeplayed() {
	if (player.timePlayed > 7200) {
		return (player.timePlayed / 999999) + 3
	} else {
		return (player.timePlayed / 3600) + 1	
	}
}
let isWKeyHeld = false;
let holdInterval = null;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        if (!isWKeyHeld) {
            // If "W" is not currently held, start holding it down
            isWKeyHeld = true;
            startHoldingW();
        } else {
            // If "W" is already being held, stop holding it down
            isWKeyHeld = false;
            stopHoldingW();
        }
    }
});

function startHoldingW() {

    // Start a repeating action while "W" is held down
    holdInterval = setInterval(() => {
        if (!isWKeyHeld) {
            clearInterval(holdInterval);
            holdInterval = null;
            return;
        }
        // Perform action while holding down "W"

    }, 1000);
}

function stopHoldingW() {

    // Perform cleanup or final actions
    if (holdInterval) {
        clearInterval(holdInterval);
        holdInterval = null;
    }
}










