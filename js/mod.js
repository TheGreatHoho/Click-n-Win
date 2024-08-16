let modInfo = {
	name: "Click n Win",
	id: "clicknwin",
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
	num: "0.41",
	name: "This update sucks update"	,
}

let changelog = `<h1>Changelog:</h1><br>
      <br><br>
      <h3>v0.41</h3><br>
      - Added an auto-win button for mobile users.<br>
      <br><br>
        <h3>v0.4</h3><br>
      - Improved QoL.<br>
      - Improved visuals.<br>
      - Added infoboxes. <br>
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
    return "<h5>You are currently inside the Endless Void</h5>" + "You have " + format(player.w.points) + " wins and you will have " + format(player.w.points.add(getResetGain('w'))) + " wins on reset"
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
	if(inChallenge("m",13) ||inChallenge("m",12) ||inChallenge("m",11) ||inChallenge("m",21) ||inChallenge("m",22) ||inChallenge("m",23) ||inChallenge("m",31)||inChallenge("m",32)||inChallenge("m",33)){
		gain = gain.mul(2)}}
	if (hasAchievement('A',34)) {
	if(inChallenge("m",13) ||inChallenge("m",12) ||inChallenge("m",11) ||inChallenge("m",21) ||inChallenge("m",22) ||inChallenge("m",23) ||inChallenge("m",31)||inChallenge("m",32)||inChallenge("m",33)){
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
var isWKeyHeld = false;
var holdInterval = null;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        // Toggle the isWKeyHeld state
        isWKeyHeld = !isWKeyHeld;
        if (isWKeyHeld) {
            startHoldingW();
        } else {
            stopHoldingW();
        }
        // Synchronize with autowinbutton
        autowinbutton = isWKeyHeld;
        // Save the state in localStorage to keep it consistent after a refresh
        localStorage.setItem('isWKeyHeld', isWKeyHeld);
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


var isShiftHeld = false;
var shiftHoldInterval = null;

// Retrieve the Shift state from localStorage when the page loads
window.addEventListener('load', () => {
    const storedShiftState = localStorage.getItem('isShiftHeld');
    if (storedShiftState === 'true') {
        isShiftHeld = true;
        startHoldingShift();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        if (!isShiftHeld) {
            // If "Shift" is not currently held, start holding it down
            isShiftHeld = true;
            startHoldingShift();
        } else {
            // If "Shift" is already being held, stop holding it down
            isShiftHeld = false;
            stopHoldingShift();
        }
        // Save the Shift state to localStorage
        localStorage.setItem('isShiftHeld', isShiftHeld);
    }
});

function startHoldingShift() {
    // Start a repeating action while "Shift" is held down
    shiftHoldInterval = setInterval(() => {
        if (!isShiftHeld) {
            clearInterval(shiftHoldInterval);
            shiftHoldInterval = null;
            return;
        }
        // Perform action while holding down "Shift"
        console.log("Holding Shift...");

    }, 1000);
}

function stopHoldingShift() {
    // Add any cleanup or actions to perform when stopping the hold
    if (shiftHoldInterval !== null) {
        clearInterval(shiftHoldInterval);
        shiftHoldInterval = null;
    }
}

function nextEndVoidGoal() {
     
  let x = new Decimal(challengeCompletions('m', 31)).add(1)
  let base = new Decimal(70)
  let power = new Decimal(30)

  if (hasAchievement('A', 31)) power = power.sub(1)
  if (hasMilestone('h',7)) power = power.sub(4)
  if (hasMilestone('h',10)) power = power.sub(3)
    if (hasMilestone('h',14)) power = power.sub(7)
  let calc = new Decimal(base.add(power.mul(x)))
  if(x.gte(20)){
    power = power.mul(x.div(10))
    calc = calc.add(power.mul(x.sub(19)))
  } 
  if(!inChallenge('m', 31)) {return calc }
  while (player.w.points.gte(calc)) {

    
    // Update x and recalculate goal for the next bulk completion
    x = x.add(1);
    base = new Decimal(70);
    power = new Decimal(30);
    
    if (hasAchievement('A', 31)) power = power.sub(1);
    if (hasMilestone('h', 7)) power = power.sub(4);
    if (hasMilestone('h', 10)) power = power.sub(3);
    if (hasMilestone('h', 14)) power = power.sub(7);
    
    calc = new Decimal(base.add(power.mul(x)));
    if (x.gte(20)) {
        power = power.mul(x.div(10));
        calc = calc.add(power.mul(x.sub(19)));
    }
}
return calc
  
}










