let lastAutomateTime = 0;
let autoitembuy = false;
let sacrificeclicked = 0;
addLayer("A", {
  row: "side",
  name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  points: new Decimal(0),
  color: "#54626F",
  layerShown: true,
  type: "none",
  tooltip() {
    return "Achievements"
  },

  achievements: {
    11: {
        name: "You Win!",
        tooltip: "Win the game. <br> <h5>Reward: Start producing points.<h5>",
        done() {
          return player.w.points.gte(1)
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
    12: {
      name: "Boosting to the max!",
      tooltip: "Buy a super booster. <br> <h5>Reward: Divisor is slightly stronger.<h5>",
      done() {
        return hasUpgrade("w",21)
      },
      style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "10px",
            "margin": "0.5px"
          }
        },
  },
    13: {
        name: "Nice",
        tooltip: "Win 69 times. <br> <h5>Reward: Super Divisor is 6.9% stronger.<h5>",
        done() {
          return player.w.points.gte(69)
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
    14: {
      name: "What is the point?",
      tooltip: "Reach 1 million points. <h5>Reward: Your base point generation is 1.1x stronger.<h5>",
      done() {
        return player.points.gte(1000000)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
  },
    15: {
      name: "100 is a lot",
      tooltip: "Win 100 times. <h5>Reward: Feeling of accomplishment.<h5>",
      done() {
        return player.w.points.gte(100)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    21: {
      name: "Spending spree",
      tooltip: "Buy five different types of item from the shop. <h5>Reward: Pointless Shard is 10x cheaper.<h5>",
      done() {
        if (getBuyableAmount("m",11) > 0 && getBuyableAmount("m",12) > 0 && getBuyableAmount("m",21) > 0 && getBuyableAmount("m",61) > 0 && getBuyableAmount("m",62) > 0)
        return player.points.gte(0)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    22: {
      name: "Hey, when does these upgrades end?",
      tooltip: "Buy an ultra accelerator. <h5>Reward: Super Booster quintuples instead of quadrupling.<h5>",
      done() {
        return hasUpgrade("w",32)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    23: {
        name: "There is no turning back",
        tooltip() {
          return `Play for 1 hour.<br>
                  <h5>Reward: You gain a small boost to point generation based on time played.<h5>` + "Currently: x" + format(calculatetimeplayed())
        },
        done() {
          if (player.timePlayed > 3600)
          return true
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
        effect() {
          return calculatetimeplayed()
        }
    },
    24: {
      name: "I am BETTER!",
      tooltip: "Make the accelerator stronger than super and ultra accelerators. <h5>Reward: Pointless Shard is stronger. (1.1x => 1.3x)<h5>",
      done() {
        if (getBuyableAmount('m', 12) > 10)
        return player.points.gte(0)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px",
        }
      },
    },
    25: {
      name: "Hmmm maybe this will work",
      tooltip() {
        return `Beat challenge 'Desperation'<br>
                <h5>Reward: You gain 2 times more magical shards.<h5>` 
      },
      done() {
        if (challengeCompletions("m",11) > 0)
        return player.w.points.gte(0)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    31: {
      name: "Who needs boosters?",
      tooltip: "Reach 1000 wins without any boosters. <h5>Reward: Endless Void's goal scales slightly weaker. <h5>",
      done() {
          if (!hasUpgrade("w",11)){
            if(!hasUpgrade("w",21)) {
              if(!hasUpgrade("w",31)) {
                return player.w.points.gte(1000)
              }
            }
          }

      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    32: {
      name: "Can't hold all of these wins",
      tooltip() {
        return `Reach 10k wins.<br>
                <h5>Reward: Multiply base point production based on how many achievements you've achieved in this row.<h5>` + "Currently: x" + format(calculateAch32Reward())
      },
      done() {
        
        return player.w.points.gte(10000)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    33: {
      name: "Who is desperate now?",
      tooltip() {
        return `Reach 666 wins in 'Desperation'<br>
                <h5>Reward: Your base point production is doubled in challenges.<h5>` 
      },
      done() {
        if (inChallenge('m',11)) {
          return player.w.points.gte(666)
        } else {
          return player.w.points.gte("e9999999")
        }
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    34: {
      name: "Nothing can hold me back",
      tooltip() {
        return `Reach 6666 wins in 'Placeholder 2'<br>
                <h5>Reward: Your base point production is doubled in challenges. (I know, it's really original.)<h5>` 
      },
      done() {
        if (inChallenge('m',22)) {
          return player.w.points.gte(6666)
        } else {
          return player.w.points.gte("e9999999")
        }
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    35: {
      name: "Made in Heaven",
      tooltip: "Perform a heavenly reset. <h5>Reward: Unlock holy upgrades.<h5>",
      done() {
        return player.h.points.gte(1)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    }, 
    41: {
      name: "GG EZ",
      tooltip: "Reach 100k wins.<h5>Reward: Sacrifice formula is slightly stronger.<br>(x+1)^2.2 => (x+1)^2.4<h5>",
      done() {
        return player.w.points.gte("1e5")
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    42: {
      name: "Not so challenging",
      tooltip: "Beat every challenge at least once.<h5>Reward: Make the item autobuyer faster.<br>(Buying an item every 500ms => 100ms)<h5>",
      done() {
        if(hasChallenge('m',11) && hasChallenge('m',12) && hasChallenge('m',13) && hasChallenge('m',21) && hasChallenge('m',22) && hasChallenge('m',23) && hasChallenge('m',31) && hasChallenge('m',32) && hasChallenge('m',33)) {
          return true
        }
        
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    43: {
      name: "Items are useless",
      tooltip: "Beat Placeholder 4 without buying any items except sharp shard.<h5>Reward: You start every heavenly reset with placeholder 4 completed.<h5>",
      done() {
        if (getBuyableAmount('m', 11).eq(0) && getBuyableAmount('m', 12).eq(0) && getBuyableAmount('m', 22).eq(0) && getBuyableAmount('m', 61).eq(0) && getBuyableAmount('m', 62).eq(0) && getBuyableAmount('m', 63).eq(0) && hasChallenge('m',32)) {
          return player.w.points.gte(0)
        }
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    44: {
      name: "I'm still standing",
      tooltip: "Beat Endless Void 14 times while at least 11 upgrade is sacrificed.<h5>Reward: Powered shard is stronger. <br>(For every purchase<br> 3x => 3.05x)<h5>",
      done() {
        let sacrifice = new Decimal(0)
                for (let row = 1; row <= 3; row++) {
                  for (let col = 1; col <= 4; col++) {
                      sacrifice = sacrifice.add(getClickableState('h', row * 10 + col));
                  }
              }
        if (sacrifice >= 11 && challengeCompletions('m', 31) >= 14 && inChallenge('h',11)) return true
        
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    45: {
      name: "This shouldn't be possible",
      tooltip: "Reach 380 wins while every booster, accelerator and empowerer is sacrificed and inside Appalment.<h5>Reward: You can bulk buy 2 items at once.<br>(Item autobuyer is also effected by this.)<h5>",
      done() {
        let sacrifice = new Decimal(0);
        const clickableStates = [11, 12, 14, 21, 22, 24, 31, 32, 34];
        clickableStates.forEach(state => {
            if (getClickableState('h', state)) {
                sacrifice = sacrifice.add(1);
            }
        });
        if (sacrifice.gte(9) && inChallenge('h',11) && inChallenge('m',13) && player.w.points.gte(380)) return true
       
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    55: {
      name: "Nah, I'd win",
      tooltip: "Defeat Angel 1.<h5>Reward: Aliensar<h5>",
      done() {
        return player.h.points.gte("1e2000")
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
      unlocked: false,
    },
},
  tabFormat: {
    "Normal Achievements": {
        content: [
          ["achievements","12345678"]


        ],
    },
    },
  }
),

addLayer("w", {
clickables: {
    11: {
        display() {if(getClickableState(this.layer,11) == "off") return "Auto-Win is OFF"
        if(getClickableState(this.layer,11) == "on")return "Auto-Win is ON"
          },
        unlocked() {return false},
        canClick() {return false},
        onClick() {
        if (player.w.autowin = false) {
          return player.w.autowin = true, setClickableState(this.layer,this.id,"on")}
         else {
          return player.w.autowin = false, setClickableState(this.layer,this.id,"off")
        }
        
        },
        style() {
          return {
            "width":"100px",
            "height": " 10px",
            "border-radius": "20px", 
          }
        },

    }
},
displayRow: 2,
automate() {
  if (player.w.auto && hasMilestone("w", 3)) {
    for (let tier = 1; tier <= 3; tier++) {
      for (let num = 1; num <= 4; num++) {
        let upgradeID = tier * 10 + num;
        if (!hasUpgrade('w', upgradeID)) {
          buyUpgrade('w', upgradeID);
        }
      }
    }
  }
  return false;
},
canBuyMax() {
  if(hasMilestone(this.layer,4)) return true
},
nodeStyle() {
  return {
  background: "radial-gradient(circle, #ffd700, #ff8c00)",
  'box-shadow': "0 0 15px #ffd700, 0 0 30px #ff8c00",
  animation: "shine 5s infinite"
  }
},
milestones: {
    1: {
        requirementDescription: "Win the game 200 times",
        effectDescription: "You start with the second row of upgrades available for purchase.",
        done() {
        if (hasMilestone("h",1)) {
          return true
        } else {
          return player.w.points.gte(200) }
        },
        style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 
    },
    2: {
      requirementDescription: "Win the game 600 times",
      effectDescription: "Make the ultra accelerator upgrade 50 wins cheaper.",
      done() { return player.w.points.gte(600) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 

    },
    3: {
      requirementDescription: "Win the game 700 times",
      effectDescription: "You unlock an autobuyer for the first three rows of win upgrades.",
      done() { return player.w.points.gte(700) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 

    },
    4: {
      requirementDescription: "Win the game 850 times",
      effectDescription: "Unlock the ability to max win.",
      done() { return player.w.points.gte(850) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 

    },
    5: {
      requirementDescription: "Win the game 10000 times",
      effectDescription() {
        if (hasMilestone('h',3)) {
          return "Each second, gain 100% of the magical shard you would gain by resetting."
        }
        else return "Each second, gain 10% of the magical shard you would gain by resetting."
      },
      done() { return player.w.points.gte(10000) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 
    }
},

doReset(resettingLayer) {
  // Stage 1, almost always needed, makes resetting this layer not delete your progress
  if (layers[resettingLayer].row <= this.row) return;

  // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
  let keptMilestones = [];
  if (resettingLayer == "w"|| resettingLayer == "m") keptMilestones.push(1)
    let keptUpgrades = [];
  if (hasUpgrade(this.layer, 41)) keptUpgrades.push(41)
  if (hasUpgrade(this.layer, 42)) keptUpgrades.push(42)
  if (hasUpgrade(this.layer, 43)) keptUpgrades.push(43)
  if (hasUpgrade(this.layer, 44)) keptUpgrades.push(44)


  // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
  let keep = [];
  if (resettingLayer == "w" || resettingLayer == "m" || hasMilestone('h',2)) keep.push("milestones"),
  
  keep.push("best")
  // Stage 4, do the actual data reset
  layerDataReset(this.layer, keep);

  // Stage 5, add back in the specific subfeatures you saved earlier
  player.w.upgrades.push(keptUpgrades)
  if (resettingLayer == "m" && hasUpgrade(this.layer, 41)) player[this.layer].upgrades.push(41)
  if (resettingLayer == "m" && hasUpgrade(this.layer, 42)) player[this.layer].upgrades.push(42)
  if (resettingLayer == "m" && hasUpgrade(this.layer, 43)) player[this.layer].upgrades.push(43)
  if (resettingLayer == "m" && hasUpgrade(this.layer, 44)) player[this.layer].upgrades.push(44)

  
},


    name: "win", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        auto(){
          if (hasMilestone('w',3)) return true
          else return false
        },
        autowin(){
          if (hasAchievement('A',15) && getClickableState(this.layer,11) == "on") return true
          else return false
        },
		points: new Decimal(0),
    }},
    color: "#FFC436",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "wins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6,// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        let chleffect23 = new Decimal(upgradeEffect('w', 11))
        chleffect23 = chleffect23.pow(4.75)
        if (hasUpgrade('w', 13)) mult = mult.divide(upgradeEffect('w', 13))
        if (hasUpgrade('w', 23)) mult = mult.divide(upgradeEffect('w', 23))
        if (hasUpgrade('w', 33)) mult = mult.divide(upgradeEffect('w', 33))
        if (hasChallenge('m',23) && hasUpgrade('w', 11)) mult = mult.divide(challengeEffect('m',23))
        if (!inChallenge("m",13) && !inChallenge("m",12) && !inChallenge("m",11) && !inChallenge("m",21) && !inChallenge("m",22) && !inChallenge("m",23) && !inChallenge("m",31) && !inChallenge("m",32) && !inChallenge("m",33)) {if (hasChallenge("m", 12) == 1) mult = mult.divide(challengeEffect("m",12))}
        if (inChallenge('m',23)  && hasUpgrade('w', 11)) mult = mult.divide(chleffect23)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (inChallenge('m',23)) exp=exp.div(50)
        if (inChallenge('m',31)) exp=exp.div(1.2)
        if (inChallenge("m", 32)) {
          const upgrades = [
              "11", "12", "13", "14", "21", "22", "23", "24", 
              "31", "32", "33", "34", "41", "42", "43", "44"
          ];
        
          upgrades.forEach(upgrade => {
              if (hasUpgrade("w", upgrade)) {
                  exp = exp.div(2);
              }
          });
        }
        return exp

    },
    autoPrestige() {
      if (isWKeyHeld == true) return true
      else return false
    },
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: 'W: Win the game!', onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
      Firstbox: {
          title: "Strange Yet Familliar...",
          body() { return "You find yourself in a dark place, filled with a strange yet familiar feeling. In front of you, there is a button glowing in the darkness. 'Click n Win,' it says. You hesitate but can't help yourself from clicking it. Weird text appears in the sky, giving you a sense of accomplishment. Finally, you decide to keep clicking the button until you figure out a way to escape this place." },
          
      },
      EndlessVoid: {
        title: "Endless Void",
        body() { return "You are currently travelling through the endless void. Boosters and accelerators are disabled. Winning requirement increases rapidly. Maybe if you travel enough you'll find a way out of this place." },
        unlocked() { 
          if (inChallenge('m',31)) {
            return true
          } else {
            return false
          }
        },
        style: {"border-color": "purple","color": "grey"},
        titleStyle: {"border-color": "purple","color": "black"},
        bodyStyle: {"border-color": "purple"}
    },
    },
    tabFormat: {
      "Upgrades": {
          content: [
            ["infobox",["Firstbox"]],
            ["infobox",["EndlessVoid"]],
            "blank",
            "main-display",
            ["display-text",
              function() {if(isWKeyHeld == true) return 'Auto-win is enabled' 
                else return 'Auto-win is disabled'
              },
              { "color": "white", "font-size": "14px"}],
            ["display-text",
              function() {if(hasUpgrade('h', 13)) return 'Once you buy an upgrade from the fourth row, other upgrades in that row will become significantly more expensive.' },
              { "color": "grey", "font-size": "13px"}],
            "blank",
            "prestige-button",
            "blank",
            ["toggle",
              function() {if(hasMilestone(this.layer,3)) return ["w","auto"]}],
            "blank",
            "upgrades",

          ],

      },
      "Win Milestones": {
          content: [
            "main-display",
            "blank",
            "milestones"
          ],
          unlocked() {
            if (hasMilestone("w",1)) {
              return true
            }
            else {
              return false
            }
          }
        
      },
      
  },
    
    upgrades: {
        11: {
            title: "Booster",
            description () {
                if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)||inChallenge("m",32)) {          
                  return "This upgrade cannot be bought inside of this challenge."
                } else {
                  if (getBuyableAmount('m',11).gt(0) ) { 
                    return "Boosts your point production by " + format(upgradeEffect(this.layer,this.id)) + "x"
                    
                } else {
                    return "Doubles your point gain." 
                }
                }

            },
            cost() {
              if(inChallenge('h', 11) && getClickableState('h',11) == 1) {
                return new Decimal("1ee308")
              }
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)||inChallenge("m",32)) {
                return new Decimal("e999")
                
              } else {
                return new Decimal(1)
              }
            },          
            style() {
               if (hasUpgrade('w',11)) return {background: "#ECF8F9"}
               if(inChallenge('h', 11) && getClickableState('h',11) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
              },
            effect() {
              effect = new Decimal(buyableEffect('m', 11).mul(2))
              return effect
            },   
        },
        12: {
            title: "Accelerator",
            description () {
              if (inChallenge("m", 12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Provides a boost based on how many wins you have." 
            }
            },
            cost() {
              if(inChallenge('h', 11) && getClickableState('h',12) == 1) {
                return new Decimal("1ee308")
              }
              if (inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999")
                
              } else {
                return new Decimal(3)
              }
            },
            effect() {
              if (getBuyableAmount("m",12).gt(0)) {
                if (hasUpgrade('w',42)) return player[this.layer].points.add(1).pow(getBuyableAmount("m",12).divide(8).add(0.5)).mul(upgradeEffect(this.layer,24))
                else return player[this.layer].points.add(1).pow(getBuyableAmount("m",12).divide(11).add(0.5)).mul(upgradeEffect(this.layer,24))
                
              } else {
                return player[this.layer].points.add(1).pow(0.5).mul(upgradeEffect(this.layer,24))
              }
                
            },
            effectDisplay() {
              if (inChallenge("m",12)||inChallenge("m",31)) {
                return "No effect"
              } else {
                return format(upgradeEffect(this.layer, this.id))+"x" // Add formatting to the effect 
              }
            },
            style() {
                if (hasUpgrade('w',12)) return {background: "#068DA9"}
                if(inChallenge('h', 11) && getClickableState('h',12) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
               }
            },
            
        13: {
            title: "Divisor",
            description: "Makes it easier to win. (Based on how many points you have)",
            cost(){
              if(inChallenge('h', 11) && getClickableState('h',13) == 1) {
                return new Decimal("1ee308")
              }
              else return new Decimal(5)
            
            },
            effect() {
              effect = new Decimal(player.points.add(1))
              effect = effect.sqrt(effect)
              effect = effect.sqrt(effect)
              effect = effect.log10(effect)
              if (hasAchievement('A',12)){
                effect = effect.add(1.2)
                effect = effect.add(upgradeEffect(this.layer,34))
              }
              else{
                effect = effect.add(1)
                effect = effect.add(upgradeEffect(this.layer,34))
              }
              return effect
              
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷"},
            style() {
              if (hasUpgrade('w',13)) return {background: "#E55807"}
              if(inChallenge('h', 11) && getClickableState('h',13) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
             }
        },
        
        14: {
          title: "Empowerer",
          description: "Empowers your production based on your magical shards.",
          cost(){
            if(inChallenge('h', 11) && getClickableState('h',14) == 1) {
              return new Decimal("1ee308")
            }
            else return new Decimal(15)
          
          },
          effect() {
            let effect = new Decimal(player.m.points)
            effect = effect.add(10)
            effect = effect.log10(effect)
            if(hasUpgrade('h',41)) effect = effect.pow(player.m.points.add("1e25").log("1e25", player.m.points))
            return effect
          },
          effectDisplay(){ return format(upgradeEffect(this.layer, this.id)) + "x"},
          unlocked() {
          
            if (hasChallenge("m",13)) {
               return true
              } else {
               return false
            }
         },
         style() {
          if (hasUpgrade('w',14)) return {background: "#7E1717"}
          if(inChallenge('h', 11) && getClickableState('h',14) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
         }
         
         
        },
        21: {
            title: "Super Booster",
            description () {
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                if(hasAchievement('A', 22)){
                return "Quintuples your point gain." 
                }
                else return "Quadruples your point gain." 
            }
            },
            cost() { 
              if(inChallenge('h', 11) && getClickableState('h',21) == 1) {
                return new Decimal("1ee308")
              }
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999")
              }
              
              else {
                if (getBuyableAmount('m',21) > 0 ) {
                  return new Decimal(10).minus(buyableEffect('m',21))
              } else {
                  return new Decimal(10)  
              }
              }
            },
            unlocked() {
              if (hasMilestone(this.layer, 1)||hasMilestone("h", 1)) {
                return true
              } else {
                if (hasUpgrade("w",13)) {
                  return true
                  
                } else {
                  return false
                }
              }
                
            },
            style() {
                if (hasUpgrade('w',21)) return {background: "#ECF8F9"}
                if(inChallenge('h', 11) && getClickableState('h',21) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
            },
            effect() {
              let Effect = new Decimal(4)
              if (hasAchievement('A', 22)) {
                return Effect = Effect.add(1)
              }
              else return Effect
            }
            
        },
        22: {
            title: "Super Accelerator",
            description () {
              if (inChallenge("m", 12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Accelerator but simply better." 
            }
            },
            cost() {
              if(inChallenge('h', 11) && getClickableState('h',22) == 1) {
                return new Decimal("1ee308")
              }
              if (inChallenge("m", 12)||inChallenge("m",31)) {
                return new Decimal("e999")
              } else {
                if (getBuyableAmount('m',21) > 0 ) {
                  return new Decimal(20).minus(buyableEffect('m',21))
              } else {
                  return new Decimal(20)  
              }
              }
                
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.9).mul(upgradeEffect(this.layer,24))
            },
            effectDisplay() {
              if (inChallenge("m",12)||inChallenge("m",31)) {
                return "No effect"
              } else {
                return format(upgradeEffect(this.layer, this.id))+"x" // Add formatting to the effect 
              }
            },
            unlocked() {
              if (hasMilestone(this.layer, 1)||hasMilestone("h", 1)) {
                return true
              } else {
                if (hasUpgrade("w",21)) {
                  return true
                  
                } else {
                  return false
                }
              }
                
            },
            style() {
                if (hasUpgrade('w',22)) return {background: "#068DA9"}
                if(inChallenge('h', 11) && getClickableState('h',22) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
               }
        },
        23: {
            title: "Super Divisor",
            description: "What, you want even easier wins? Sure, you can have it.",
            cost() {
              if(inChallenge('h', 11) && getClickableState('h',23) == 1) {
                return new Decimal("1ee308")
              }
                if (getBuyableAmount('m',21) > 0 ) {
                    return new Decimal(55).minus(buyableEffect('m',21))
                } else {
                    return new Decimal(55)  
                }
            },
            effect() {
              let effect = new Decimal(player.points.add(1))
              effect = effect.log10(effect)
              effect = effect.add(1)
              effect = effect.add(upgradeEffect(this.layer, 34))
              if (hasAchievement('A', 13)) effect = effect.mul(1.069)
              let bybeff63 = new Decimal(buyableEffect('m', 63))
              if (getBuyableAmount('m', 63) > 0) effect = effect.mul(bybeff63)
              return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷" },
            unlocked() {
              if (hasMilestone(this.layer, 1)||hasMilestone("h", 1)) {
                return true
              } else {
                if (hasUpgrade("w",22)) {
                  return true
                  
                } else {
                  return false
                }
              }
                
            },
            style() {
              if (hasUpgrade('w',23)) return {background: "#E55807"}
              if(inChallenge('h', 11) && getClickableState('h',23) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
             }
        },
        24: {
          title: "Mighty Empowerer",
          description: "Empowers your accelerators based on your wins.",
          cost() {
            if(inChallenge('h', 11) && getClickableState('h',24) == 1) {
              return new Decimal("1ee308")
            }
            return new Decimal(80)
          },
          effect() {
            if (hasUpgrade(this.layer,this.id)) {
              return (player.w.points).pow(0.3).add(1)
            }
            else {
              return new Decimal(1)
            }
          },

          effectDisplay() { return "" + format((player.w.points).pow(0.3).add(1)) + "x"},
          unlocked() {
            if (hasChallenge("m",13)) {
               return true
              } else {
               return false
            }
         },
         style() {
          if (hasUpgrade('w',24)) return {background: "#7E1717"}
          if(inChallenge('h', 11) && getClickableState('h',24) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
         }
        
        },
        31: {
            title: "Ultra Booster",
            description () {
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Octuples your point gain." 
            }
            },
            cost() {
              if(inChallenge('h', 11) && getClickableState('h',31) == 1) {
                return new Decimal("1ee308")
              }
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999")
                
              } else {
                return new Decimal(70)
              }
            },
            unlocked() {
              if (hasMilestone("h", 1)) {
                return true
              } else {
                if (hasUpgrade('w', 23)) {
                  return true
                } else {
                  return false
                } 
              }
                
            },
            style() {
                if (hasUpgrade('w',31)) return {background: "#ECF8F9"}
                if(inChallenge('h', 11) && getClickableState('h',31) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
               }
        },
        32: {
            title: "Ultra Accelerator",
            description () {
              if (inChallenge("m", 12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Other accelerators are jealous of this one." 
            }
            },
            cost() {
              if(inChallenge('h', 11) && getClickableState('h',32) == 1) {
                return new Decimal("1ee308")
              }
              if (inChallenge("m", 12)||inChallenge("m",31)) {
                return new Decimal("e999")
              } else {
                if (hasMilestone("w",2)) {
                  return new Decimal(150)
              } else {
                  return new Decimal(200)  
              }
              }
                
            },
            effect() {
                return player[this.layer].points.add(1).pow(1.45).mul(upgradeEffect(this.layer,24))
            },
            effectDisplay() {
              if (inChallenge("m",12)||inChallenge("m",31)) {
                return "No effect"
              } else {
                return format(upgradeEffect(this.layer, this.id))+"x" // Add formatting to the effect 
              }
            },
            unlocked() {
              if (hasMilestone("h", 1)) {
                return true
              } else {
                if (hasUpgrade('w', 31)) {
                  return true
                } else {
                  return false
                } 
              }
                
            },
            style() {
                if (hasUpgrade('w',32)) return {background: "#068DA9"}
                if(inChallenge('h', 11) && getClickableState('h',32) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
               }
        },
        33: {
            title: "Ultra Divisor",
            description: "Winning has never been this easy before.",
            cost(){
              if(inChallenge('h', 11) && getClickableState('h',33) == 1) {
                return new Decimal("1ee308")
              }
              else return new Decimal(500)
            
            },
            effect() {
                effect = new Decimal(player.points.add(1).pow(1.1))
                effect = effect.log10(effect).add(1.5)
                effect = effect.add(upgradeEffect(this.layer, 34))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷" },
            unlocked() {
              if (hasMilestone("h", 1)) {
                return true
              } else {
                if (hasUpgrade('w', 32)) {
                  return true
                } else {
                  return false
                } 
              }
                
            },
            style() {
              if (hasUpgrade('w',33)) return {background: "#E55807"}
              if(inChallenge('h', 11) && getClickableState('h',33) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
             }
        },
        34: {
          title: "True Empowerer",
          description: "Empowers your divisors based on your points.",
          cost(){
            if(inChallenge('h', 11) && getClickableState('h',34) == 1) {
              return new Decimal("1ee308")
            }
            else return new Decimal(1500)
          
          },
          effect() {
            if (hasUpgrade(this.layer,this.id)) {
              let effect = new Decimal(player.points)
              effect = effect.pow(0.2)
              return effect
            }
            else {
              return new Decimal(0)
            }
          },
          effectDisplay() { return "Adding +" + format(upgradeEffect(this.layer, this.id)) + " power to your divisors."},
          unlocked() {
            if (hasChallenge("m",13)) {
              if (hasMilestone("h",1)){
              return true}
              else{
                if(hasUpgrade(this.layer,33)) {
                  return true
                }
                else {
                  return false
                }
              }

            }
         },
         style() {
          if (hasUpgrade('w',34)) return {background: "#7E1717"}
          if(inChallenge('h', 11) && getClickableState('h',34) == 1) return {"background": "black", "color": "white",  "text-decoration": "line-through"}
         }

        },
        41: {
          title: "Amplifier",
          description: "Increases the cap of the reward of Dismay and makes its reward stronger.",
          cost() {
            cost = new Decimal(5000)
            if (hasUpgrade(this.layer, 42)) cost = cost.mul(10)
            if (hasUpgrade(this.layer, 43)) cost = cost.mul(10)
            if (hasUpgrade(this.layer, 44)) cost = cost.mul(10)
            if (hasChallenge('m',32)) cost = cost.div(5)
            return cost
          },
          effect () {
            
          },

          unlocked() {
            return hasUpgrade('h', 13);
          },

          
          style() {
            if (hasUpgrade('w',41)) return {background: "radial-gradient(circle, rgba(255,174,66,1) 0%, rgba(126,138,24,1) 46%, rgba(157,73,0,1) 100%)"}
          }

          },
        42: {
          title: "Enhancer",
          description: "Makes energized shard have an stronger effect on accelerator.",
          cost() {
            cost = new Decimal(5000)
            if (hasUpgrade(this.layer, 41)) cost = cost.mul(10)
            if (hasUpgrade(this.layer, 43)) cost = cost.mul(10)
            if (hasUpgrade(this.layer, 44)) cost = cost.mul(10)
            if (hasChallenge('m',32)) cost = cost.div(5)
            return cost
          },
          effect () {
          },
          unlocked() {
            return hasUpgrade('h', 13);
          },

          style() {
            if (hasUpgrade('w',42)) return {background: "radial-gradient(circle, rgba(255,174,66,1) 0%, rgba(126,138,24,1) 46%, rgba(157,73,0,1) 100%)"}
          }

          },
        43: {
          title: "Transcender",
          description: 'Boosts pure energy gain based on your points.',
          cost() {
            cost = new Decimal(5000)
            if (hasUpgrade(this.layer, 42)) cost = cost.mul(10)
            if (hasUpgrade(this.layer, 41)) cost = cost.mul(10)
            if (hasUpgrade(this.layer, 44)) cost = cost.mul(10)
            if (hasChallenge('m',32)) cost = cost.div(5)
            return cost
          },
          effect () {
            let effect = new Decimal(1)
            let alicik = new Decimal(player.points.add(1))
            alicik = alicik.log10(alicik).div(308)
            alicik = alicik.pow(2)
            effect = effect.add(alicik)
            return effect
          },

          effectDisplay() {
            return format(upgradeEffect(this.layer, this.id)) + 'x'
          },

          unlocked() {
            return hasUpgrade('h', 13);
          },

          
          style() {
            if (hasUpgrade('w',43)) return {background: "radial-gradient(circle, rgba(255,174,66,1) 0%, rgba(126,138,24,1) 46%, rgba(157,73,0,1) 100%)"}
          }

          },
        44: {
            title: "Catalyst",
            description: "Boosts ? shard's effect. (2x => 2.3x)",
            cost() {
              cost = new Decimal(5000)
              if (hasUpgrade(this.layer, 42)) cost = cost.mul(10)
              if (hasUpgrade(this.layer, 43)) cost = cost.mul(10)
              if (hasUpgrade(this.layer, 41)) cost = cost.mul(10)
              if (hasChallenge('m',32)) cost = cost.div(5)
              return cost
            },
            effect () {
              
            },

            unlocked() {
              return hasUpgrade('h', 13);
            },

            
            style() {
              if (hasUpgrade('w',44)) return {background: "radial-gradient(circle, rgba(255,174,66,1) 0%, rgba(126,138,24,1) 46%, rgba(157,73,0,1) 100%)"}
            }

            },
        
        
        
        
        
        
    },
   
})

addLayer("m", {
  infoboxes: {
    lore: {
        title: "Mysterious Shop",
        body() { return "As you accumulate more wins, you notice a figure in the distance wearing a purple hat. 'Ahh... a customer. It's been a long time since I had one.' they say in a low voice. They offer you magical shards in exchange for your wins. The shards seem interesting and catch your attention. The man explains that these magical shards can be used to buy items from their shop. Despite their odd appearance and accent, you decide to befriend the man, appreciating the company in this strange place." },
    },
    lore1: {
        title: "Challenges?",
        body() { return "You tell the man that you don't remember how you ended up in this place, nor anything about your life before arriving here. You ask if there's any way to escape, and he mentions something about 'challenges.' Intrigued, you decide to learn more. As you venture further from the center —the place where you spawned— you notice strange rules taking effect, preventing you from progressing. The man warns you about the dangers ahead, but your curiosity and desire for freedom drive you to try these challenges yourself. Despite the man's caution, you resolve to face the challenges head-on, hoping they hold the key to your escape." }
    }
    
},
    tabFormat: {
      "Item Shop": {
          content: [
            
            ["infobox", "lore"],
            "main-display",
            "prestige-button",
            "blank",
            "resource-display",
            "clickables",
            "blank",
            "buyables",
            "blank",     
            
          ],

      },
    
      "Challenges": {
          content: [
            ["infobox", "lore1"],
            ["display-text",
            function() {
            if(hasChallenge('m', 31)) {
              return 'Challenges may be too hard if attempted too early.<br>Lower rows are harder than higher rows.<br>Endless Void goal scaling gets stronger after 20 completions.<br>'
            }
            return 'Challenges may be too hard if attempted too early.<br>Lower rows are harder than higher rows.<br>'
            },
            { "color": "grey", "font-size": "13px"} 
            
            ],
            
            "blank",
            "challenges",
            "blank"
          ],

        
      },
      
},
    name: "magical field", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    passiveGeneration() {
      if (hasMilestone('h',3)) {
        return hasMilestone('w',5) ? 1 : 0
      } else {
        if(hasMilestone('w',5)) return hasMilestone('w',5) ? 0.1 : 0
      }
      },
    color: "#5941A9",
    resetDescription:`Reset your wins and upgrades for<br>`,
    requires : new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "magical shards", // Name of prestige currency
    baseResource: "wins", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      exponent = new Decimal(1)
      if (hasChallenge(this.layer,22)){exponent=exponent.add(1)}
      return exponent
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1.5)
        if (getBuyableAmount("m",62) > 0); mult = mult.mul(buyableEffect("m",62))
        if (challengeCompletions("m", 11) == 1) mult = mult.mul(challengeEffect("m",11))
        if (hasAchievement("A",25)) mult = mult.mul(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        exp = exp.mul(temp.h.effect)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    displayrow: 0,
    layerShown(){
        return true
    },
    roundUpCost: true,
    hotkeys: [
      {key: "m", description: "M: Reset your wins for magical shards.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  doReset(resettingLayer) {
    if (layers[resettingLayer].row <= layers[this.layer].row) return; // just necessary boilerplate
    
    let keptChallenges = {};
    if (hasMilestone('h', 5)) keptChallenges[11] = challengeCompletions('m', 11);
    if (hasMilestone('h', 6)) keptChallenges[21] = challengeCompletions('m', 21);
    if (hasMilestone('h', 12)) keptChallenges[13] = challengeCompletions('m', 13);
    if (hasAchievement('A', 43)) keptChallenges[32] = challengeCompletions('m', 32);
    let keptBuyables = {};
    if (hasMilestone('h', 1)) keptBuyables[21] = getBuyableAmount('m', 21);

    layerDataReset(this.layer, keptChallenges);
    layerDataReset(this.layer, keptBuyables);

    for (const [id, completions] of Object.entries(keptChallenges)) {
      player[this.layer].challenges[id] = completions;
    }
    for (const [id, amount] of Object.entries(keptBuyables)) {
      setBuyableAmount('m', id, amount);   
  }     
  },
  nodeStyle() {
    if (player.m.unlocked == false) return {
      background: "rgb(191, 143, 143)",
      color: "rgba(0, 0, 0, 0.5)",
      border: "2px solid #008000",
    }
    else return {
    background: "radial-gradient(circle, #7b42f5, #4b0082)",
    'box-shadow': "0 0 15px #7b42f5, 0 0 30px #4b0082",
    animation: "sparkle 5s infinite"
    }
  },
  clickables: {
  
    11: {
        display() {
        if(autoitembuy == false) return "Auto-Buy is OFF"
        if(autoitembuy == true) return "Auto-Buy is ON"
        },
        unlocked() {if(hasMilestone('h',4)) return true},
        canClick() {if(hasMilestone('h',4)) return true},
        onClick() {
          if(autoitembuy == false) return autoitembuy = true
          if(autoitembuy == true) return autoitembuy = false
        },
        style() {
          if(autoitembuy == false) {
            return {
            "width":"100px",
            "min-height": " 40px",
            "font-size": "11px",
            "color": "#908e91",
            "text-shadow": "2px 2px black",
            "box-shadow": "none",
            "border-radius": "20px", 
            }
          }
          else return {
            "width":"100px",
            "min-height": " 40px",
            "font-size": "11px",
            "color": "white",
            "text-shadow": "2px 2px black",
            "box-shadow": "none",
            "border-radius": "20px", 
          }

        
        },

    }
},
    challenges: {
      11: {
        name: "Desperation",
        challengeDescription: "You can not buy any boosters.",
        canComplete: function() {return player.w.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "Boosters effect the magical shard gain with heavily reduced effect.",
        fullDisplay() {
          return 'You can not buy any boosters.<br><br><span style="color:grey; text-shadow:2px 2px black">Goal: </span>Reach 100 wins to complete the challenge.<br><span style="color:gold; text-shadow:2px 2px black">Reward: </span>Boosters effect the magical shard gain with heavily reduced effect.<br>Currently: ' + format(this.rewardEffect()) + 'x'
        
        },
        rewardEffect() {
          let effect = new Decimal(1)
          if (hasUpgrade("w",11)) effect = effect.mul(upgradeEffect("w",11))
          if (hasUpgrade("w",21)) effect = effect.mul(upgradeEffect('w',21))
          if (hasUpgrade("w",31)) effect = effect.mul(8) // Upgradelerin effectleri yok diye böyle yaptım ileride değiştirmen gerekebilir.
          effect = effect.pow(0.1)
          return effect
        },
        rewardDisplay() {
          return format(challengeEffect(this.layer,"11")) + "x"
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-bottom": "20px",
        "margin-right": "15px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
        
        
    },
      12: {
        name: "Dismay",
        challengeDescription: "You can not buy any boosters or accelerators.",
        canComplete: function() {return player.w.points.gte(55)},
        goalDescription: "Reach 55 wins to complete the challenge.",
        rewardDescription: "Magical shards make winning easier. (Only works outside of challenges.)",
        fullDisplay() {
          return this.challengeDescription + '<br><br><span style="color:grey; text-shadow:2px 2px black">Goal: </span>' + this.goalDescription + '<br><span style="color:gold; text-shadow:2px 2px black">Reward: </span>' + this.rewardDescription +'<br>Currently: ' + this.rewardDisplay()
        
        },
        rewardEffect() {
          let effect = new Decimal(1)
          let upgeffect41 = new Decimal(player.m.points)
          if(hasUpgrade('w',41)) {
            upgeffect41 = upgeffect41.pow(0.85)
            effect = effect.add(upgeffect41)
            if (effect.lt("1e20")) {
              return effect
            } else {
              effect = new Decimal("1e20")
              effect = new Decimal("1e20")
              return effect
            }
          }
          else {
            upgeffect41 = upgeffect41.sqrt(upgeffect41)
            effect = effect.add(upgeffect41)
          if (effect.lt(50000000)) {
            return effect
          } else {
            effect = new Decimal(50000000)
            return effect
          }
          }
          

        },
        rewardDisplay() {
        if(hasUpgrade('w',41)) {
          if (challengeEffect(this.layer,"12").gte("1e20")) {
            return format(challengeEffect(this.layer,"12")) + "÷ (Capped)"
          } else {
            return format(challengeEffect(this.layer,"12")) + "÷"
          }
        }
          else {
            if (challengeEffect(this.layer,"12").gt(49999999)) {
              return format(challengeEffect(this.layer,"12")) + "÷ (Capped)"
            } else {
              return format(challengeEffect(this.layer,"12")) + "÷"
            }
          }

        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-bottom": "20px",
        "margin-right": "15px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      13: {
        name: "Appallment",
        challengeDescription: "Buying an upgrade divides your point production by 100.",
        canComplete: function() {return player.w.points.gte(560)},
        goalDescription: "Reach 560 wins to complete the challenge.",
        rewardDescription: "Unlock new upgrades.",
        fullDisplay() {
          return this.challengeDescription + '<br><br><span style="color:grey; text-shadow:2px 2px black">Goal: </span>' + this.goalDescription + '<br><span style="color:gold; text-shadow:2px 2px black">Reward: </span>' + this.rewardDescription
        
        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-bottom": "20px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      21: {
        name: "Placeholder 1",
        challengeDescription: "Point production is raised to the power of 0.1. On top of that, your wins multiply your production based on their value in sine function.",
        canComplete: function() {
          if (hasMilestone('h',4)) {
            return player.w.points.gte(85)}
          else {
            return player.w.points.gte(85)}  
          },
        goalDescription(){
          if (hasMilestone('h',4)) {
            return "Reach 85 wins to complete the challenge."}
          else {
            return "Reach 85 wins to complete the challenge."
          }
        }, 
        rewardDescription: "Point generation is raised to the power of 1.08",
        fullDisplay() {
          return this.challengeDescription + '<br><br><span style="color:grey; text-shadow:2px 2px black">Goal: </span>' + this.goalDescription() + '<br><span style="color:gold; text-shadow:2px 2px black">Reward: </span>' + this.rewardDescription
        
        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-bottom": "20px",
        "margin-right": "15px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      22: {
        name: "Placeholder 2",
        challengeDescription: "Your wins divide point production immensely.",
        canComplete: function() {
          if (hasMilestone('h',4)) {
            return player.w.points.gte(1730)}  
          else {
            return player.w.points.gte(1730)}  
          },
          goalDescription(){
            if (hasMilestone('h',4)) {
              return "Reach 1730 wins to complete the challenge."
            }
            else {
              return "Reach 1730 wins to complete the challenge."
            }
          }, 
        rewardDescription: "Improve the magical shard gain formula.<br>(I don't know the formula lol, but it works trust me.)",
        fullDisplay() {
          return this.challengeDescription + '<br><br><span style="color:grey; text-shadow:2px 2px black">Goal: </span>' + this.goalDescription() + '<br><span style="color:gold; text-shadow:2px 2px black">Reward: </span>' + this.rewardDescription
        
        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-bottom": "20px",
        "margin-right": "15px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      23: {
        name: "Placeholder 3",
        canComplete: function() {return player.w.points.gte(50)},
        fullDisplay()
        {
        
        if (this.rewardEffect().gte("1e400")) {
          return `Win requirement scales absurdly fast but booster weakens this scaling.<br>
          <br><span style="color:grey; text-shadow:2px 2px black">Goal: </span> Reach 50 wins to complete the challenge.<br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> Your booster continues to decrease win requirement outside of this challenge with reduced effect.<br>
          Currently: ${format(challengeEffect(this.layer,this.id))}÷ (Capped)`
        } else {
          return `Win requirement scales absurdly fast but booster weakens this scaling.<br>
          <br><span style="color:grey; text-shadow:2px 2px black">Goal: </span> Reach 50 wins to complete the challenge.<br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> Your booster continues to decrease win requirement outside of this challenge with reduced effect.<br>
          Currently: ${format(challengeEffect(this.layer,this.id))}÷`  
        }  
        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        rewardEffect() {
          let effect = new Decimal(1)
          let basedeffect = new Decimal(upgradeEffect('w', 11))
          basedeffect = basedeffect.pow(0.95)
          effect = effect.add(basedeffect)
          if (effect.gte("1e400")) effect = new Decimal("1e400")
          return effect
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-bottom": "20px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
        
      },
      31: {
        name: "Endless Void",
        challengeDescription: "",
        goal() {
          let x = new Decimal(challengeCompletions(this.layer, this.id))
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
          let goal = calc
          
          return goal
          
         },
         canComplete() {
          if(inChallenge(this.layer, this.id)) {
            if(hasMilestone('h',11)) {
              let x = new Decimal(challengeCompletions(this.layer, this.id))
              let base = new Decimal(70)
              let power = new Decimal(30)
              let numCompletions = 0
              if (hasAchievement('A', 31)) power = power.sub(1)
              if (hasMilestone('h',7)) power = power.sub(4)
              if (hasMilestone('h',10)) power = power.sub(3)
                if (hasMilestone('h',14)) power = power.sub(7)
              let calc = new Decimal(base.add(power.mul(x)))
              if(x.gte(20)){
                power = power.mul(x.div(10))
                calc = calc.add(power.mul(x.sub(19)))
              } 
              while (player.w.points.gte(calc)) {
                numCompletions += 1;
                
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
              
              return numCompletions;    
            }
          
          else {
            var sc = tmp[this.layer].challenges[this.id]
            let threshold = player.w.points.gte(sc.goal) // add any currency here
            return threshold 
          }
      }
      else return 0
          },
        rewardEffect() {
          let effect = new Decimal(200)
          let chlcomp = new Decimal(challengeCompletions(this.layer,this.id))
          effect = effect.pow(chlcomp)
          return effect
        },
        fullDisplay()
        {
        let chlcomp = new Decimal(challengeCompletions(this.layer,this.id))
        if (chlcomp.gt(0) || player.h.total.gte(1)) {
          if(hasMilestone('h',11)) {
            if(hasUpgrade('h', 12)) {
              if (hasMilestone('h',8)) {
                return `
            <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins next at ${format(nextEndVoidGoal())}<br>
            <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} + ${this.canComplete()}<br>
            <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
            Currently: ${format(this.rewardEffect())}x cheaper <br>
            and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
            `
              } else {
                if (hasAchievement('A',31)) {
                  return `
            <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins next at ${format(nextEndVoidGoal())}<br>
            <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} + ${this.canComplete()} <br>
            <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
            Currently: ${format(this.rewardEffect())}x cheaper <br>
            and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
            `
                } else{
                return `
            <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins next at ${format(nextEndVoidGoal())}<br>
            <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} + ${this.canComplete()} <br>
            <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
            Currently: ${format(this.rewardEffect())}x cheaper <br>
            and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
            `}
              }
            }
            else {if (hasMilestone('h',8)) {
              return `
            <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins next at ${format(nextEndVoidGoal())}<br>
            <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} + ${this.canComplete()} <br>
            Reward for first completion: Unlock a new item in the shop. <br>
            <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper based on completions.<br>
            Currently: ${format(this.rewardEffect())}x cheaper
            `
              } else {
                if (hasAchievement('A',31)) {
                  return `
            <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins next at ${format(nextEndVoidGoal())}<br>
            <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} + ${this.canComplete()} <br>
            Reward for first completion: Unlock a new item in the shop. <br>
            <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper based on completions.<br>
            Currently: ${format(this.rewardEffect())}x cheaper
            `
                } else{
                return `
            <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins next at ${format(nextEndVoidGoal())}<br>
            <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} + ${this.canComplete()} <br>
            Reward for first completion: Unlock a new item in the shop. <br>
            <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper based on completions.<br>
            Currently: ${format(this.rewardEffect())}x cheaper
            `}
              }
           
          }}
          else {

          }
          if(hasUpgrade('h', 12)) {
            if (hasMilestone('h',8)) {
              return `
          <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins<br>
          <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} <br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper <br>
          and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
          `
            } else {
              if (hasAchievement('A',31)) {
                return `
          <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins<br>
          <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} <br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper <br>
          and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
          `
              } else{
              return `
          <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins<br>
          <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} <br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper <br>
          and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
          `}
            }
          }
          else {if (hasMilestone('h',8)) {
            return `
          <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins<br>
          <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper
          `
            } else {
              if (hasAchievement('A',31)) {
                return `
          <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins<br>
          <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper
          `
              } else{
              return `
          <span style="color:grey; text-shadow:2px 2px black">Goal: </span> ${format(this.goal())} wins<br>
          <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          <span style="color:gold; text-shadow:2px 2px black">Reward: </span> The 'pointless' and ? shard items are cheaper based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper
          `}
            }
         
        }} else {
          return `<span style="color:grey; text-shadow:2px 2px black">Goal: unknown.`
        }
        },
        rewardDescription: "idk",
        completionLimit: 99999999999999999999,
        unlocked() {
          if (hasChallenge(this.layer, 23)) {
            return true
            
          } else {
            return false
          }
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "text-shadow": "0px 0px 10px white",
        "margin-right": "15px",
        "color":"white"},

      },
      32: {
        name: "Placeholder 4",
        canComplete: function() {return player.w.points.gte(160)},
        fullDisplay()
        {return `Your booster is disabled. Also each bought upgrade raises winning requirement up to the power of 2.<br>
        <br><span style="color:grey; text-shadow:2px 2px black">Goal: </span> Reach 160 wins to complete the challenge.<br>
        <span style="color:gold; text-shadow:2px 2px black">Reward: </span>Fourth row upgrades are 5x cheaper.<br>
        `
        },
        unlocked() {
          if (hasUpgrade('h', 21)) {
            return true
            
          } else {
            return false
          }
          
        },
        rewardEffect() {
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "margin-right": "15px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},
      
        
      },
      33: {
        name: "Placeholder 5",
        goal() {
          let x = new Decimal(challengeCompletions(this.layer, this.id))
          let base = new Decimal(18400)
          let power = new Decimal(1)
          power = power.add(x.div(10))
          let goal = new Decimal(base.pow(power))
          return goal
          
        },
        marked: false,
        completionLimit: 5,
        canComplete() {
        var sc = tmp[this.layer].challenges[this.id]
         
        let threshold = player.w.points.gte(sc.goal) // add any currency here
        return threshold 
        },
        fullDisplay(){
        let chlcomp = new Decimal(challengeCompletions(this.layer,this.id))

        if(maxedChallenge(this.layer,this.id))  { 
        {return `Point generation is raised to the power of 0.01. <br>
        <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${chlcomp} / 5 <br>
        <span style="color:gold; text-shadow:2px 2px black">Reward: </span> Angelic shard is cheaper based on completions.<br>
        Currently: ${format(this.rewardEffect())}x cheaper`}
        }
          
        else {
        {return `Point generation is raised to the power of 0.01. <br>
        <br><span style="color:grey; text-shadow:2px 2px black">Goal: </span> Reach ${format(this.goal())} wins to complete the challenge.<br>
        <span style="color:#9b5bc2; text-shadow:2px 2px black">Completions: </span> ${chlcomp} / 5 <br>
        <span style="color:gold; text-shadow:2px 2px black">Reward: </span> Angelic shard is cheaper based on completions.<br>
        Currently: ${format(this.rewardEffect())}x cheaper`}
        }
        
        },
        unlocked() {
          if (hasUpgrade('h', 21)) {
            return true
            
          } else {
            return false
          }
          
        },
        rewardEffect() {
          let chlcomp = new Decimal(challengeCompletions(this.layer,this.id))
          let x = new Decimal("1e30").mul(chlcomp)
          x = x.pow(chlcomp.add(1))
          return x
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},

        
      },
        
      },
      
    buyables: {
          11: {
            purchaseLimit: new Decimal(999999999),
            title: "Powered Shard",
            nextCost: null,
            cost(x) {
              let PowerI, Calculation, nextCalculation;
              if (x.lt(5)) {
                PowerI = new Decimal(2);
                Calculation = new Decimal(1).mul(PowerI.pow(x));
                nextCalculation = new Decimal(1).mul(PowerI.pow(x.add(1)));
                if (getBuyableAmount('m', 61).gt(0)) {
                  Calculation = Calculation.divide(buyableEffect('m', 61));
                  nextCalculation = nextCalculation.divide(buyableEffect('m', 61));
                }
              } else {
                PowerI = new Decimal(2.1);
                Calculation = new Decimal(1).mul(PowerI.pow(x));
                nextCalculation = new Decimal(1).mul(PowerI.pow(x.add(1)));
                if (getBuyableAmount('m', 61).gt(0)) {
                  Calculation = Calculation.divide(buyableEffect('m', 61));
                  nextCalculation = nextCalculation.divide(buyableEffect('m', 61));
                }
              }
              this.nextCost = nextCalculation; // Store the next cost
              return Calculation;
            },
          display() {
            if (hasAchievement('A', 44)) {
              if(getBuyableAmount(this.layer,this.id) == this.purchaseLimit){
                return `Multiplies your booster power by 3.05 for each purchase.<br>
                        x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
                        <h2>Maximum Amount Reached</h2>
                        <br> ${format(getBuyableAmount('m',11))} Bought`
              }
              else return `Multiplies your booster power by 3.05 for each purchase.<br>
                          x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
                          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
                          <br> ${format(getBuyableAmount('m',11))} Bought`
            }
            else {
              if(getBuyableAmount(this.layer,this.id) == this.purchaseLimit){
                return `Triples your booster power for each purchase.<br>
                        x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
                        <h2>Maximum Amount Reached</h2>
                        <br> ${format(getBuyableAmount('m',11))} Bought`
              }
              else return `Triples your booster power for each purchase.<br>
                          x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
                          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
                          <br> ${format(getBuyableAmount('m',11))} / Bought`
            }
            
          },
          canAfford() {
            let currentAmount = getBuyableAmount(this.layer, this.id);
            let canAfford = new Decimal(0);
        
            if (player[this.layer].points.gte(this.cost())) {
                // Check if player can buy 1 item
                canAfford = new Decimal(1);
        
                // Check if player can afford 2 items and not exceed the limit
                if (player[this.layer].points.gte(this.nextCost) &&
                    hasAchievement('A', 45) &&
                    currentAmount.lt(this.purchaseLimit.sub(1))) {
                    canAfford = canAfford.add(1);
                }
            }
        
            return canAfford;
        },
          style() {
                if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit)) {
                  return {
                    "width": "250px",
                    "height": " 125px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#6A3076"}
                  } else{
                if (this.canAfford().gte(1)||getBuyableAmount("m",12).eq(this.purchaseLimit)) return {
                  "width": "250px",
                  "height": " 125px",
                  "border-radius": "10px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "#5941A9"}
                if (this.canAfford().lt(1)) return {
                  "pointer-events": "none",
                  "width": "250px",
                  "height": " 125px",
                  "border-radius": "10px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "#77567F"
                }
              }
              },
              buy() {
                let currentAmount = getBuyableAmount(this.layer, this.id);
                let afford = this.canAfford();
            
                if (afford.eq(1)) {
                    player[this.layer].points = player[this.layer].points.sub(this.cost());
                    setBuyableAmount(this.layer, this.id, currentAmount.add(1));
                } else if (afford.eq(2)) {
                    player[this.layer].points = player[this.layer].points.sub(this.nextCost);
                    setBuyableAmount(this.layer, this.id, currentAmount.add(2));
                }
            },
          effect() {
            let PowerI = new Decimal(3)
            if(hasAchievement('A', 44)) PowerI = PowerI.add(0.05)
            let Exp = new Decimal(getBuyableAmount(this.layer, this.id))
            PowerI = PowerI.pow(Exp)
            return PowerI;
          },
          unlocked() {
            return true
          }
        },

        12: {
            title: "Energized Shard",
            purchaseLimit: new Decimal(15),   
            cost(x) {
                let PowerI = new Decimal(2)
                let Calculation = new Decimal(1).mul(PowerI.pow(x))
                nextCalculation = new Decimal(1).mul(PowerI.pow(x.add(1)));
                if (getBuyableAmount('m', 61).gt(0)) {
                  Calculation = Calculation.divide(buyableEffect('m', 61));
                  nextCalculation = nextCalculation.divide(buyableEffect('m', 61));
                }
                this.nextCost = nextCalculation; // Store the next cost
                return Calculation;
                
            },
            display() {
            if (hasUpgrade('w',42)) {
              if(getBuyableAmount(this.layer,this.id) == 15){
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(8))}) </b><br>
              <h2>Maximum Amount Reached</h2>
              <br> ${format(getBuyableAmount('m',12))} / 15 Bought`
              }
              else {
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(8))}) </b><br>
              <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
              <br> ${format(getBuyableAmount('m',12))} / 15 Bought`
              }
            } else {
              if(getBuyableAmount(this.layer,this.id) == 15){
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(11))}) </b><br>
              <h2>Maximum Amount Reached</h2>
              <br> ${format(getBuyableAmount('m',12))} / 15 Bought`
              }
              else {
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(11))}) </b><br>
              <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
              <br> ${format(getBuyableAmount('m',12))} / 15 Bought`
              }
            }
            },
            canAfford() {
              let currentAmount = getBuyableAmount(this.layer, this.id);
              let canAfford = new Decimal(0);
          
              if (player[this.layer].points.gte(this.cost())) {
                  // Check if player can buy 1 item
                  canAfford = new Decimal(1);
          
                  // Check if player can afford 2 items and not exceed the limit
                  if (player[this.layer].points.gte(this.nextCost) &&
                      hasAchievement('A', 45) &&
                      currentAmount.lt(this.purchaseLimit.sub(1))) {
                      canAfford = canAfford.add(1);
                  }
              }
          
              return canAfford;
          },
            style() {
                  if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit)) {
                    return {
                      "width": "250px",
                      "height": " 125px",
                      "border-radius": "10px",
                      "border": "0px",
                      "margin": "5px",
                      "text-shadow": "0px 0px 10px #000000",
                      "color": "#FFFFFF",
                      "background-color": "#6A3076"}
                    } else{
                  if (this.canAfford().gte(1)||getBuyableAmount("m",12).eq(this.purchaseLimit)) return {
                    "width": "250px",
                    "height": " 125px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#5941A9"}
                  if (this.canAfford().lt(1)) return {
                    "pointer-events": "none",
                    "width": "250px",
                    "height": " 125px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#77567F"
                  }
                }
                },
                buy() {
                  let currentAmount = getBuyableAmount(this.layer, this.id);
                  let afford = this.canAfford();
              
                  if (afford.eq(1)) {
                      player[this.layer].points = player[this.layer].points.sub(this.cost());
                      setBuyableAmount(this.layer, this.id, currentAmount.add(1));
                  } else if (afford.eq(2)) {
                      player[this.layer].points = player[this.layer].points.sub(this.nextCost);
                      setBuyableAmount(this.layer, this.id, currentAmount.add(2));
                  }
              },
            effect(x) {
              if (hasUpgrade('w',42)) {
              let PowerI = new Decimal(2)
              let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              return Effect
              }
              else {
              let PowerI = new Decimal(2)
              let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              return Effect
              }
              
            },
            unlocked() {
              return true
            }
          },
          21: {
            purchaseLimit: 3,
            title: "Sharp Shard",
            cost(x) {

              let PowerI = new Decimal(2)
              let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              return Calculation;
            },
            display() {
              if (getBuyableAmount(this.layer,this.id) == 3) {
                return `Makes your super upgrades 3 wins cheaper.<br>
              ${format(tmp[this.layer].buyables[this.id].effect)} Wins Cheaper</b><br>
          <h2>Maximum Amount Reached</h2>
          <br> ${format(getBuyableAmount('m',21))} / 3 Bought`
              } else {
                return `Makes your super upgrades 3 wins cheaper.<br>
              ${format(tmp[this.layer].buyables[this.id].effect)} Wins Cheaper</b><br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',21))} / 3 Bought`
              }
              
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            style() {
            if (getBuyableAmount(this.layer,this.id) == 3) {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#6A3076"}
            } else {
              if (this.canAfford()||getBuyableAmount("m",21) == 3) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#5941A9"}
              if (!this.canAfford()) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#77567F"
              }
            }
            },
            buy() {
            
              player[this.layer].points = player[this.layer].points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {        let PowerI = new Decimal(3)
              let Effect = new Decimal(0).add(x).mul(3)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          22: {
            purchaseLimit: new Decimal(100),
            title: "Shard of the Void",
            nextCost: null,
            cost() {
              let Calculation = new Decimal("e15");
              let x = new Decimal(getBuyableAmount(this.layer, this.id));
              let y = new Decimal("1e15");
              Calculation = Calculation.mul(y.pow(x));
              let nextCalculation = Calculation.mul(y);
          
              if (getBuyableAmount('m', 61).gt(0)) {
                Calculation = Calculation.divide(buyableEffect('m', 61));
                nextCalculation = nextCalculation.divide(buyableEffect('m', 61));
              }
          
              this.nextCost = nextCalculation; // Store the next cost
              return Calculation;
            },          
            display() {
              if (getBuyableAmount(this.layer,this.id) >= 100) {
                return `Wins provide a boost to the point production.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} to Point Production</b><br>
          <h2>Maximum Amount Reached</h2>
          <br> ${format(getBuyableAmount('m',22))} / 100 Bought`
              } else {
                return `Wins provide a boost to the point production.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} to Point Production</b><br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',22))} / 100 Bought`
              }
              
            },
            
            canAfford() {
              let currentAmount = getBuyableAmount(this.layer, this.id);
              let canAfford = new Decimal(0);
          
              if (player[this.layer].points.gte(this.cost())) {
                  // Check if player can buy 1 item
                  canAfford = new Decimal(1);
          
                  // Check if player can afford 2 items and not exceed the limit
                  if (player[this.layer].points.gte(this.nextCost) &&
                      hasAchievement('A', 45) &&
                      currentAmount.lt(this.purchaseLimit.sub(1))) {
                      canAfford = canAfford.add(1);
                  }
              }
          
              return canAfford;
          },
            style() {
                  if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit)) {
                    return {
                      "width": "250px",
                      "height": " 125px",
                      "border-radius": "10px",
                      "border": "0px",
                      "margin": "5px",
                      "text-shadow": "0px 0px 10px #000000",
                      "color": "#FFFFFF",
                      "background-color": "#6A3076"}
                    } else{
                  if (this.canAfford().gte(1)||getBuyableAmount("m",12).eq(this.purchaseLimit)) return {
                    "width": "250px",
                    "height": " 125px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#5941A9"}
                  if (this.canAfford().lt(1)) return {
                    "pointer-events": "none",
                    "width": "250px",
                    "height": " 125px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#77567F"
                  }
                }
                },
                buy() {
                  let currentAmount = getBuyableAmount(this.layer, this.id);
                  let afford = this.canAfford();
              
                  if (afford.eq(1)) {
                      player[this.layer].points = player[this.layer].points.sub(this.cost());
                      setBuyableAmount(this.layer, this.id, currentAmount.add(1));
                  } else if (afford.eq(2)) {
                      player[this.layer].points = player[this.layer].points.sub(this.nextCost);
                      setBuyableAmount(this.layer, this.id, currentAmount.add(2));
                  }
              },
            effect(x) {
              let Effect = new Decimal(1).add(Math.log(player.w.points + 10)*(Math.pow(1.5,x)))
              return Effect;
            },
            unlocked() {
              if (challengeCompletions('m',31) > 0) {
                return true
              } else {
                return false
              }
              
            }
          },
          61: {
            purchaseLimit() {
              let limit = new Decimal(200)
              if (hasUpgrade('h',43)) limit = new Decimal(100000)
              return limit
            },
            title: "'Point'less Shard",
            nextCost: null,
            cost() {
              let cost = new Decimal("1e12");
              let scale = new Decimal(100);
              let currentAmount = getBuyableAmount(this.layer, this.id);
              
              scale = scale.pow(currentAmount);
              cost = cost.mul(scale);
              if(currentAmount.gte(200)) cost = cost.mul(Decimal.pow("1e5",currentAmount.sub(199)))

              if (hasAchievement('A', 21)) {
                cost = cost.div(10);
              }
              if (challengeCompletions(this.layer, 31) > 0) {
                cost = cost.divide(challengeEffect(this.layer, 31));
              }

              // Calculate the next cost
              let nextCost = new Decimal("1e12");
              let nextScale = new Decimal(100);
                
              nextScale = nextScale.pow(currentAmount.add(1));
              nextCost = nextCost.mul(nextScale);
              if(currentAmount.gte(200)) nextCost = nextCost.mul(Decimal.pow("1e5",currentAmount.sub(199)))

              if (hasAchievement('A', 21)) {
                nextCost = nextCost.div(10);
              }
              if (challengeCompletions(this.layer, 31) > 0) {
                nextCost = nextCost.divide(challengeEffect(this.layer, 31));
              }

              this.nextCost = nextCost; // Store the next cost
              return cost;
            },
            display() {
              if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit()) ) {
                return `Makes items that cost magical shard ${format(this.effect().root(getBuyableAmount(this.layer, this.id)))}x cheaper.<br>
                      x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                      <h2>Maximum Amount Reached</h2>
                      <br> ${format(getBuyableAmount(this.layer, this.id))} / ` + format(this.purchaseLimit()) + ' Bought'
              }
              else {
                if (hasUpgrade('h', 12)) {
                  return `Makes items that cost magical shard ${format(this.effect().root(getBuyableAmount(this.layer, this.id)))}x cheaper.<br>
                      x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                      <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                      <br> ${format(getBuyableAmount(this.layer, this.id))} / ` + format(this.purchaseLimit()) + ' Bought'
                    }
                else {
                  if (hasAchievement('A', 24)) {
                    return `Makes items that cost magical shard 1.3x cheaper.<br>
                      x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                      <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                      <br> ${format(getBuyableAmount(this.layer, this.id))} / ` + format(this.purchaseLimit()) + ' Bought'
                    }
                    else return `Makes items that cost magical shard 1.1x cheaper.<br>
                      x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                      <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                      <br> ${format(getBuyableAmount(this.layer, this.id))} / ` + format(this.purchaseLimit()) + ' Bought'
                  }
              }
              
              },
              style() {
                if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit())) {
                  return {
                    "width": "250px",
                    "height": " 125px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#6A3076"}
                  } else{
                if (this.canAfford().gte(1)||getBuyableAmount("m",12).eq(this.purchaseLimit())) return {
                  "width": "250px",
                  "height": " 125px",
                  "border-radius": "10px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "#5941A9"}
                if (this.canAfford().lt(1)) return {
                  "pointer-events": "none",
                  "width": "250px",
                  "height": " 125px",
                  "border-radius": "10px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "#77567F"
                }
              }
              },
                canAfford() {
                  let currentAmount = getBuyableAmount(this.layer, this.id);
                  let canAfford = new Decimal(0);
              
                  if (player.points.gte(this.cost())) {
                      // Check if player can buy 1 item
                      canAfford = new Decimal(1);
              
                      // Check if player can afford 2 items and not exceed the limit
                      if (player.points.gte(this.nextCost) &&
                          hasAchievement('A', 45) &&
                          currentAmount.lt(this.purchaseLimit().sub(1))) {
                          canAfford = canAfford.add(1);
                      }
                  }
                  return canAfford;
                },
                buy() {
                  let currentAmount = getBuyableAmount(this.layer, this.id);
                  let afford = this.canAfford();
              
                  if (afford.eq(1)) {
                      player.points = player.points.sub(this.cost());
                      setBuyableAmount(this.layer, this.id, currentAmount.add(1));
                  } else if (afford.eq(2)) {
                      player.points = player.points.sub(this.nextCost);
                      setBuyableAmount(this.layer, this.id, currentAmount.add(2));
                  }
                },
            effect(x) {
              let Effect = new Decimal(1.1)
              if (hasAchievement('A', 24)) Effect = new Decimal(1.3)
              let holyupgradeeffect = new Decimal(challengeCompletions('m', 31))
              holyupgradeeffect = holyupgradeeffect.div(100)
              if (hasUpgrade('h', 12))Effect = Effect.add(holyupgradeeffect)
              Effect = Effect.pow(x)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          62: {
            purchaseLimit() {
              let limit = new Decimal(200)
              if (hasUpgrade('h',43)) limit = new Decimal(100000)
              return limit
            },
            title: "? Shard",
            cost() {
              let cost = new Decimal("1e12");
              let scale = new Decimal(160);
              let currentAmount = getBuyableAmount(this.layer, this.id);


              scale = scale.pow(currentAmount);
              cost = cost.mul(scale);
              if(currentAmount.gte(200)) cost = cost.mul(Decimal.pow("1e6",currentAmount.sub(199)))
          
              if (challengeCompletions(this.layer, 31) > 0) {
                cost = cost.divide(challengeEffect(this.layer, 31));
              }
          
              // Calculate the next cost
              let nextCost = new Decimal("1e12");
              let nextScale = new Decimal(160);


              nextScale = nextScale.pow(currentAmount.add(1));
              nextCost = nextCost.mul(nextScale);
              if(currentAmount.gte(200)) nextCost = nextCost.mul(Decimal.pow("1e6",currentAmount.sub(199)))
          
              if (challengeCompletions(this.layer, 31) > 0) {
                nextCost = nextCost.divide(challengeEffect(this.layer, 31));
              }
          
              this.nextCost = nextCost; // Store the next cost
              return cost;
            },
            display() {
              if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit()) ) {
                if (hasUpgrade('w', 44)) {
                  return `Boosts magical shard gain by 2.3x.<br>
                  x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
                  <h2>Maximum Amount Reached</h2>
                  <br> ${format(getBuyableAmount('m',62))} / ` + format(this.purchaseLimit()) + ' Bought'
                }
                else {return `Doubles magical shard gain.<br>
                  x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
                  <h2>Maximum Amount Reached</h2>
                  <br> ${format(getBuyableAmount('m',62))} / ` + format(this.purchaseLimit()) + ' Bought'
              }
              }
              else {
              if (hasUpgrade('w', 44)) {
                return `Boosts magical shard gain by 2.3x.<br>
                x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
                <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                <br> ${format(getBuyableAmount('m',62))} / ` + format(this.purchaseLimit()) + ' Bought'
              }
              else {return `Doubles magical shard gain.<br>
                x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
                <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                <br> ${format(getBuyableAmount('m',62))} / ` + format(this.purchaseLimit()) + ' Bought'
            }}},
            style() {
              if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit())) {
                return {
                  "width": "250px",
                  "height": " 125px",
                  "border-radius": "10px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "#6A3076"}
                } else{
              if (this.canAfford().gte(1)||getBuyableAmount("m",12).eq(this.purchaseLimit())) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#5941A9"}
              if (this.canAfford().lt(1)) return {
                "pointer-events": "none",
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#77567F"
              }
            }
            },
              canAfford() {
                let currentAmount = getBuyableAmount(this.layer, this.id);
                let canAfford = new Decimal(0);
            
                if (player.points.gte(this.cost())) {
                    // Check if player can buy 1 item
                    canAfford = new Decimal(1);
            
                    // Check if player can afford 2 items and not exceed the limit
                    if (player.points.gte(this.nextCost) &&
                        hasAchievement('A', 45) &&
                        currentAmount.lt(this.purchaseLimit().sub(1))) {
                        canAfford = canAfford.add(1);
                    }
                }
                return canAfford;
              },
              buy() {
                let currentAmount = getBuyableAmount(this.layer, this.id);
                let afford = this.canAfford();
            
                if (afford.eq(1)) {
                    player.points = player.points.sub(this.cost());
                    setBuyableAmount(this.layer, this.id, currentAmount.add(1));
                } else if (afford.eq(2)) {
                    player.points = player.points.sub(this.nextCost);
                    setBuyableAmount(this.layer, this.id, currentAmount.add(2));
                }
              },
            effect(x) {
              let Effect = new Decimal(2)
              if(hasUpgrade('w', 44)) {
              Effect = Effect.add(0.3)
              }
              Effect = Effect.pow(x)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          63: {
            purchaseLimit() {
              let limit = new Decimal(350)
              return limit
            },
            title: "Angelic Shard",
            nextCost: null,
            cost(x) {
              let chlcomp = new Decimal(challengeCompletions(this.layer,33))
              let chleff33 = new Decimal("1e30").mul(chlcomp)
              chleff33 = chleff33.pow(chlcomp.add(1))
              let basecost = new Decimal("1e15");
              let scale = new Decimal("1e50");
              scale = scale.pow(x);
              basecost = basecost.mul(scale);

              let nextX = x.add(1); // Calculate next x for next cost
              let nextBasecost = new Decimal("1e15");
              let nextScale = new Decimal("1e50");
              nextScale = nextScale.pow(nextX);
              nextBasecost = nextBasecost.mul(nextScale);

              if (hasChallenge('m', 33)) {
                basecost = basecost.div(chleff33);
                nextBasecost = nextBasecost.div(chleff33);
              }

              if(hasUpgrade('h', 42))
                basecost = basecost.div(upgradeEffect('h', 42));
                nextBasecost = nextBasecost.div(upgradeEffect('h', 42));

              this.nextCost = nextBasecost; // Store the next cost
              return basecost;
            },
            display() {
              if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit())) {
                return `Strengthens super divisor based on how many heavenly milestones you have.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} Super Divisor Power</b><br>
              <h2>Maximum Amount Reached</h2>
              <br> ${format(getBuyableAmount('m',63))} / ` + this.purchaseLimit() + ' Bought'
              } else {
                return `Strengthens super divisor based on how many heavenly milestones you have.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} Super Divisor Power</b><br>
              <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
              <br> ${format(getBuyableAmount('m',63))} / ` + this.purchaseLimit() + ' Bought'
              
            }
           },
           style() {
            if (getBuyableAmount(this.layer,this.id).eq(this.purchaseLimit())) {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#6A3076"}
              } else{
            if (this.canAfford().gte(1)||getBuyableAmount("m",12).eq(this.purchaseLimit())) return {
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#5941A9"}
            if (this.canAfford().lt(1)) return {
              "pointer-events": "none",
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#77567F"
            }
          }
          },
            canAfford() {
              let currentAmount = getBuyableAmount(this.layer, this.id);
              let canAfford = new Decimal(0);
          
              if (player.points.gte(this.cost())) {
                  // Check if player can buy 1 item
                  canAfford = new Decimal(1);
          
                  // Check if player can afford 2 items and not exceed the limit
                  if (player.points.gte(this.nextCost) &&
                      hasAchievement('A', 45) &&
                      currentAmount.lt(this.purchaseLimit().sub(1))) {
                      canAfford = canAfford.add(1);
                  }
              }
              return canAfford;
            },
            buy() {
              let currentAmount = getBuyableAmount(this.layer, this.id);
              let afford = this.canAfford();
          
              if (afford.eq(1)) {
                  player.points = player.points.sub(this.cost());
                  setBuyableAmount(this.layer, this.id, currentAmount.add(1));
              } else if (afford.eq(2)) {
                  player.points = player.points.sub(this.nextCost);
                  setBuyableAmount(this.layer, this.id, currentAmount.add(2));
              }
            },
            effect(x) {
              let Effect = new Decimal(3)
              if (hasMilestone('h', 2)) Effect = Effect.add(3)
              if (hasMilestone('h', 3)) Effect = Effect.add(3)
              if (hasMilestone('h', 4)) Effect = Effect.add(3)
              if (hasMilestone('h', 5)) Effect = Effect.add(3)
              if (hasMilestone('h', 6)) Effect = Effect.add(2)
              if (hasMilestone('h', 7)) Effect = Effect.add(2)
              if (hasMilestone('h', 8)) Effect = Effect.add(2)
              if (hasMilestone('h', 9)) Effect = Effect.add(2)
              if (hasMilestone('h', 10)) Effect = Effect.add(2)
              if (hasMilestone('h', 11)) Effect = Effect.add(2)
              if (hasMilestone('h', 12)) Effect = Effect.add(2)
              if (hasMilestone('h', 13)) Effect = Effect.add(2)
              if (hasMilestone('h', 14)) Effect = Effect.add(2)
              if (hasMilestone('h', 15)) Effect = Effect.add(2)
              Effect = Effect.pow(x)
              Effect = Effect.pow(1.1)
              return Effect;
            },
            unlocked() {
              if (hasUpgrade('h', 11)) return true
              else return false
            }
          },
          
          
    },
})
addLayer("h", {

  name: "heaven", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
      total: true,
      auto(){
        if (hasMilestone('h',4)) return true
        else return false
      },
    points: new Decimal(0),
    }},
    resetDescription:`Accept the angel's offer and gain <br>`,
    auto: false,
    color: "#B31312",
    requires: new Decimal(30000), // Can be a function that takes requirement increases into account
    resource: "pure energy", // Name of prestige currency
    baseResource: "wins", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.05,// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        mult = mult.mul(1)
        if (hasUpgrade('w',43)) mult = mult.mul(upgradeEffect('w',43)) 

        let sacrifice = new Decimal(0)
        for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 4; col++) {
        sacrifice = sacrifice.add(getClickableState(this.layer, row * 10 + col));  //Sacrifice calculation
        }}
        let sacrificepower = new Decimal(2.2)
        if (hasAchievement('A', 41)) sacrificepower = sacrificepower.add(0.2)
        if (hasMilestone('h', 13)) sacrificepower = sacrificepower.add(0.5)
        sacrifice = sacrifice.add(1).pow(sacrificepower)
        if (inChallenge('h',11)) mult = mult.mul(sacrifice)

        if (hasUpgrade(this.layer,32)) mult = mult.mul(upgradeEffect(this.layer, 32))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp

    },
    effect(){
      let effect = new Decimal(1)
      let plyhpnts = new Decimal(player.h.points)
      let scale = new Decimal(plyhpnts.div(100))
      if (player.h.points.gte(40) && player.h.points.lte(10000)) scale = new Decimal(plyhpnts.div(5000)).add(0.4)
      if (hasMilestone(this.layer, 8)) scale = scale.add(0.02)
      effect = effect.add(scale)
      effect = effect.sqrt(effect)
      if (player.h.points.gte(10001)) effect = new Decimal(1.86)
      return effect
    },
    effectDescription() {
    if(hasUpgrade('h',22)) {
      if(player.h.points.gte(10001) ) return `which is raising magical shard gain up to ^${format(temp.h.effect)} <span style="color: #ff0000">(CAPPED)</span><br>and raising point production up to ^${format(temp.h.effect.pow(0.3))} <span style="color: #ff0000">(CAPPED)</span>`
      if(player.h.points.gte(40)  && player.h.points.lte(10000)) return `which is raising magical shard gain up to ^${format(temp.h.effect)} <span style="color: #ff0000">(SOFTCAPPED)</span><br>and raising point production up to ^${format(temp.h.effect.pow(0.3))} <span style="color: #ff0000">(SOFTCAPPED)</span> `
      else return `which is raising magical shard gain up to ^${format(temp.h.effect)}<br>and raising point production up to ^${format(temp.h.effect.pow(0.3))}`
    }
    else {
      if(player.h.points.gte(10001) ) return `which is raising magical shard gain up to ^${format(temp.h.effect)} <span style="color: #ff0000">(CAPPED)</span>`
      if(player.h.points.gte(40)  && player.h.points.lte(10000)) return `which is raising magical shard gain up to ^${format(temp.h.effect)} <span style="color: #ff0000">(SOFTCAPPED)</span>`
      else return `which is raising magical shard gain up to ^${format(temp.h.effect)}`
    }}, 
    automate(){const now = Date.now();
      let delay = 500;
      if(hasAchievement('A',42)) {delay = 50}
  
      if (now - lastAutomateTime >= delay) {
          if (autoitembuy == true && hasMilestone(this.layer, 4)) {
            if (canBuyBuyable('m', 11)) { buyBuyable('m', 11); }
            if (canBuyBuyable('m', 12)) { buyBuyable('m', 12); }
            if (canBuyBuyable('m', 22)) { buyBuyable('m', 22); }
            if (canBuyBuyable('m', 61)) { buyBuyable('m', 61); }
            if (canBuyBuyable('m', 62)) { buyBuyable('m', 62); }
            if (canBuyBuyable('m', 63)) { buyBuyable('m', 63); }
          }
          lastAutomateTime = now;
      }
    },
    componentStyles: {
      "prestige-button"() { return {'height':'150px','width':'300px',"border-radius":"10px"} }
    },
    nodeStyle() {
      if (player.h.unlocked == false) return {
        background: "rgb(191, 143, 143)",
        color: "rgba(0, 0, 0, 0.5)",
        border: "2px solid #008000",
      }
      else return {
      background: "radial-gradient(circle, #ff4500, #8b0000)",
      'box-shadow': "0 0 15px #ff4500, 0 0 30px #8b0000",
      animation: "divineGlow 5s infinite"
      }
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 3,
    infoboxes: {
      Heaven: {
          title: "Heaven, Yeah Literally",
          body() { return "As you progress through the endless void, you finally see a new place in the distance. At first, you can't believe your eyes, but there it is: the Gates of Heaven. As you approach the gates, a voice speaks to you: 'Human, welcome. You have finally arrived. I offer you the power of angels, the energy that created us, in exchange for your wins.' This offer of pure energy catches your attention, and you decide to accept it. Also you realize that this winning stuff is actually getting really fun, you almost don't want to escape this place. " },
          
      },
      Heaven1: {
        title: "More Upgrades",
        body() { return "You notice that the pure energy can also be used to buy something called 'holy upgrades.' These upgrades are said to be super powerful and can supposedly help you earn even more wins. The prospect of winning more intrigues you, and you find yourself immediately purchasing a holy upgrade." }
      },
      Heaven2: {
        title: "Ways Of Getting Stronger",
        body() {return "The voice you heard earlier speaks to you again, this time about sacrifice. 'Upgrades can be sacrificed' it says. At first, you are shocked. 'Sacrifice upgrades?' you think, growing suspicious of this place. Doubts creep in, but a strange compulsion within you urges you to continue. You realize that sacrificing upgrades might be a way to achieve even greater power. Driven by this inner voice, you decide to push forward, determined to win more, no matter the cost."}
      }
    },
    tabFormat: {
      "Gates of Heaven": {
          content: [
            
            ["infobox", "Heaven"],
            "main-display",
            "prestige-button",
            "blank",
            ["resource-display", ""],
            "blank",
            ["display-text",
              function() { return "Heavenly Milestones"},
              { "color": "white", "font-size": "26px", "text-shadow": "0px 2px 3px rgb(179, 19, 18)", "text-decoration":"underline", "color": "rgb(179, 19, 18)"}],
            "blank",
            "milestones",
            
            
          ],

      },

      "Holy Upgrades":{
        content: [
          ["infobox", "Heaven1"],
          ["display-text",
            function() {return 'You have ' + format(player.h.points) +  ' pure energy.'}
          ],
          "blank",
          ["display-text",
            function() { return "Buying a holy upgrade will reveal another upgrade in the next column. <br> Also buying a holy upgrade increases other upgrades in their row to increase in cost."},
            { "color": "grey", "font-size": "13px"}],
          "blank",
          ["upgrades", "123456"],
          ["display-text",
            function() {if(hasUpgrade('h',31)&&hasUpgrade('h',32)&&hasUpgrade('h',33)) {
              if(!hasAchievement('A',43)||!hasAchievement('A',44)||!hasAchievement('A',42)||!hasAchievement('A',45))return 'Complete 20 achievements and buy every holy upgrade to reveal the next upgrade'}
              else return ""
            }, { "color": "#cf343b", "font-size": "16px"}
            
          ],
          
        ],
        unlocked() {
          if (hasAchievement('A', 35)) return true
          else return false
        },
      },
      "Sacrifice": {
        unlocked() {
          if (hasMilestone('h', 9)) return true
          else return false
          },
          content: [
            ["infobox", "Heaven2"],
              ["display-text",
              function() { return 'Sacrificed upgrades can not be bought in the next heavenly reset.<br>Below you can choose the upgrades you desire to be sacrificed and click the sacrifice button to start a new heavenly reset.<br>Respec button resets the sacrifices and (if you currently have any sacrificed upgrades) performs a heavenly reset without any rewards.<br><br>' },
              { "color": "grey", "font-size": "13px"}],
              "blank",
            ["display-text",
              function() { 
                let sacrifice = new Decimal(0)
                for (let row = 1; row <= 3; row++) {
                  for (let col = 1; col <= 4; col++) {
                      sacrifice = sacrifice.add(getClickableState(this.layer, row * 10 + col));
                  }
              }

              let sacrificeeffect = new Decimal(sacrifice.add(1).pow(2.2))
              if (hasAchievement('A', 41)) sacrificeeffect = new Decimal(sacrifice.add(1).pow(2.4))
              if (hasMilestone('h', 13)) sacrificeeffect = new Decimal(sacrifice.add(1).pow(2.9))
               if(inChallenge(this.layer, 11)) return 'Sacrificed upgrades are boosting pure energy gain by ' + format(sacrificeeffect) + 'x.'
                else return 'You have selected ' + sacrifice + ' upgrades for sacrifice.<br>Upon a heavenly reset this would grant a ' + format(sacrificeeffect) + 'x boost to pure energy gain.'

              },
              { "color": "white", "font-size": "16px"}],
              
              "blank",
            "clickables",
            
          ],

        
      },
      
      
},

upgrades: {
  11: {
    title: "",
    description: "Unlock a new item in the shop.",
    cost() {
      let cost = new Decimal(1)
      if (hasUpgrade(this.layer, 12) && !hasUpgrade(this.layer,this.id)) cost = cost.add(1)
      if (hasUpgrade(this.layer, 13) && !hasUpgrade(this.layer,this.id)) cost = cost.add(1)
      return cost
    },
    effect() {
    },
    fullDisplay(){
      if(hasUpgrade(this.layer,this.id)) {
        return 'Unlock a new item in the shop.'
      }
      if(!hasUpgrade(this.layer,this.id)) {
        return 'Unlock a new item in the shop.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
      }
    },
    style() {
      if(player.h.points >= this.cost() && !hasUpgrade(this.layer, this.id)) {
      return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background-color": "rgb(179, 19, 18)",
        "margin-right": "40px",
        }
      }
      if(hasUpgrade(this.layer, this.id)){
      return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
        "margin-right": "40px",
      }
      
      }
      if (player.h.points < this.cost) {
        return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background-color": "#bf8f8f",
        "margin-right": "40px",
        }
      }
    },
    unlocked() {
      return true
    }
    },
  12: {
    title: "",
    description: "Unlock a new reward for Endless Void.",
    cost() {
      let cost = new Decimal(1)
      if (hasUpgrade(this.layer, 11) && !hasUpgrade(this.layer,this.id)) cost = cost.add(1)
      if (hasUpgrade(this.layer, 13) && !hasUpgrade(this.layer,this.id)) cost = cost.add(1)
      return cost
    },
    fullDisplay(){
      if(hasUpgrade(this.layer,this.id)) {
        return 'Unlock a new reward for Endless Void.'
      }
      if(!hasUpgrade(this.layer,this.id)) {
        return 'Unlock a new reward for Endless Void.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
      }
    },
    effect() {
    },
    style() {
      if(player.h.points >= this.cost() && !hasUpgrade(this.layer, this.id)) {
      return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background-color": "rgb(179, 19, 18)",
        "margin-right": "40px",
        }
      }
      if(hasUpgrade(this.layer, this.id)){
      return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
        "margin-right": "40px",
      }
      
      }
      else {
        return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background-color": "#bf8f8f",
        "margin-right": "40px",
        }
      }
    },
    unlocked() {
      return true
    }
    },
  13: {
      title: "",
      description: "Unlock a new row of upgrades.",
      cost() {
        let cost = new Decimal(1)
        if (hasUpgrade(this.layer, 11) && !hasUpgrade(this.layer,this.id)) cost = cost.add(1)
        if (hasUpgrade(this.layer, 12) && !hasUpgrade(this.layer,this.id)) cost = cost.add(1)
        return cost
      },
      fullDisplay(){
        if(hasUpgrade(this.layer,this.id)) {
          return 'Unlock a new row of upgrades.'
        }
        if(!hasUpgrade(this.layer,this.id)) {
          return 'Unlock a new row of upgrades.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
        }
      },
      effect() {
      },
      style() {
        if(player.h.points >= this.cost() && !hasUpgrade(this.layer, this.id)) {
        return {
          "width": "170px",
          "height": " 150px",
          "border-radius": "35px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#FFFFFF",
          "background-color": "rgb(179, 19, 18)",
          
          }
        }
        if(hasUpgrade(this.layer, this.id)){
        return {
          "width": "170px",
          "height": " 150px",
          "border-radius": "35px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#FFFFFF",
          "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
          
        }
        
        }
        else {
          return {
          "width": "170px",
          "height": " 150px",
          "border-radius": "35px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#FFFFFF",
          "background-color": "#bf8f8f" ,
          
          }
        }
      },
      unlocked() {
        return true
      }
      },
  21: {
        title: "",
        description: "Unlock 2 new challenges.",
        cost() {
          let cost = new Decimal(50)
          if (hasUpgrade(this.layer, 22) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
          if (hasUpgrade(this.layer, 23) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
          return cost
        },
        fullDisplay(){
          if(hasUpgrade(this.layer,this.id)) {
            return 'Unlock 2 new challenges.'
          }
          if(!hasUpgrade(this.layer,this.id)) {
            return 'Unlock 2 new challenges.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
          }
        },
        effect() {
        },
        style() {
          if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
          return {
            "width": "170px",
            "height": " 150px",
            "border-radius": "35px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background-color": "rgb(179, 19, 18)",
            "margin-right": "40px",
            }
          }
          if(hasUpgrade(this.layer, this.id)){
          return {
            "width": "170px",
            "height": " 150px",
            "border-radius": "35px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
            "margin-right": "40px",
          }
          
          }
          else {
            return {
            "width": "170px",
            "height": " 150px",
            "border-radius": "35px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background-color": "#bf8f8f" ,
            "margin-right": "40px",
            }
          }
        },
        unlocked() {
         if (hasUpgrade(this.layer, 11)) return true
         else return false
        }
  },  
  22: {
        title: "",
        description: "Unlock a new pure energy effect.",
        cost() {
          let cost = new Decimal(50)
          if (hasUpgrade(this.layer, 21) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
          if (hasUpgrade(this.layer, 23) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
          return cost
        },
        fullDisplay(){
          if(hasUpgrade(this.layer,this.id)) {
            return 'Unlock a new pure energy effect.'
          }
          if(!hasUpgrade(this.layer,this.id)) {
            return 'Unlock a new pure energy effect.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
          }
        },
        effect() {
        },
        style() {
          if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
          return {
            "width": "170px",
            "height": " 150px",
            "border-radius": "35px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background-color": "rgb(179, 19, 18)",
            "margin-right": "40px",
            }
          }
          if(hasUpgrade(this.layer, this.id)){
          return {
            "width": "170px",
            "height": " 150px",
            "border-radius": "35px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
            "margin-right": "40px",
          }
          
          }
          else {
            return {
            "width": "170px",
            "height": " 150px",
            "border-radius": "35px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background-color": "#bf8f8f" ,
            "margin-right": "40px",
            }
          }
        },
        unlocked() {
         if (hasUpgrade(this.layer, 12)) return true
         else return false
        }
  },
  23: {
          title: "",
          description: "Unlock new heavenly milestones.<br>(Which will be located below the 100 pure energy milestone)",
          cost() {
            let cost = new Decimal(50)
            if (hasUpgrade(this.layer, 21) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
            if (hasUpgrade(this.layer, 22) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
            return cost
          },
          fullDisplay(){
            if(hasUpgrade(this.layer,this.id)) {
              return 'Unlock new heavenly milestones.'
            }
            if(!hasUpgrade(this.layer,this.id)) {
              return 'Unlock new heavenly milestones.<br>(Which will be located below the 100 pure energy milestone)<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
            }
          },
          effect() {
          },
          style() {
            if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
            return {
              "width": "170px",
              "height": " 150px",
              "border-radius": "35px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "rgb(179, 19, 18)",
              
              }
            }
            if(hasUpgrade(this.layer, this.id)){
            return {
              "width": "170px",
              "height": " 150px",
              "border-radius": "35px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
              
            }
            
            }
            else {
              return {
              "width": "170px",
              "height": " 150px",
              "border-radius": "35px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#bf8f8f" ,
              
              }
            }
          },
          unlocked() {
           if (hasUpgrade(this.layer, 13)) return true
           else return false
          }
  },
  31: {
            title: "",
            description: "Your base point production is boosted based on how many heavenly milestones you have.",
            cost() {
              let cost = new Decimal(150)
              if (hasUpgrade(this.layer, 32) && !hasUpgrade(this.layer,this.id)) cost = cost.add(50)
              if (hasUpgrade(this.layer, 33) && !hasUpgrade(this.layer,this.id)) cost = cost.add(50)
              return cost
            },
            fullDisplay(){
              if(hasUpgrade(this.layer,this.id)) {
                
                return 'Your base point production is boosted based on how many heavenly milestones you have.<br><br> Currently: ' + this.effect() +'x' 
              }
              if(!hasUpgrade(this.layer,this.id)) {
                return 'Your base point production is boosted based on how many heavenly milestones you have.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy' + '<br><br> Currently: ' + this.effect() +'x' 
              }
            },
            effect() {
              let milestones = new Decimal(1)
                for (let i = 1; i <= 15; i++) {
                  if (hasMilestone(this.layer, i)) {
                      milestones = milestones.add(10);
                  }
              }
              return milestones
            },
            style() {
              if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
              return {
                "width": "170px",
                "height": " 150px",
                "border-radius": "35px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "rgb(179, 19, 18)",
                "margin-right": "40px",
                }
              }
              if(hasUpgrade(this.layer, this.id)){
              return {
                "width": "170px",
                "height": " 150px",
                "border-radius": "35px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
                "margin-right": "40px",
              }
              
              }
              else {
                return {
                "width": "170px",
                "height": " 150px",
                "border-radius": "35px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#bf8f8f" ,
                "margin-right": "40px",
                }
              }
            },
            unlocked() {
             if (hasUpgrade(this.layer, 21)) return true
             else return false
            }
  },        
  32: {
            title: "",
            description: "Unique challenge completions boost pure energy gain." ,
            cost() {
              let cost = new Decimal(150)
              if (hasUpgrade(this.layer, 31) && !hasUpgrade(this.layer,this.id)) cost = cost.add(50)
              if (hasUpgrade(this.layer, 33) && !hasUpgrade(this.layer,this.id)) cost = cost.add(50)
              return cost
            },
            fullDisplay(){
              if(hasUpgrade(this.layer,this.id)) {
                return 'Unique challenge completions boost pure energy gain.<br><br> Currently: ' + format(this.effect()) +'x' 
              }
              if(!hasUpgrade(this.layer,this.id)) {
                return 'Unique challenge completions boost pure energy gain.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'+ '<br><br> Currently: ' + format(this.effect()) +'x' 
              }
            },
            effect() {

              let challenges = new Decimal(1);

              const challengeNumbers = [11, 12, 13, 21, 22, 23, 31, 32, 33];
              
              challengeNumbers.forEach(number => {
                  if (hasChallenge('m', number)) {
                      challenges = challenges.mul(1.1);
                  }
              });
                return challenges
            },
            style() {
              if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
              return {
                "width": "170px",
                "height": " 150px",
                "border-radius": "35px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "rgb(179, 19, 18)",
                "margin-right": "40px",
                }
              }
              if(hasUpgrade(this.layer, this.id)){
              return {
                "width": "170px",
                "height": " 150px",
                "border-radius": "35px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
                "margin-right": "40px",
              }
              
              }
              else {
                return {
                "width": "170px",
                "height": " 150px",
                "border-radius": "35px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#bf8f8f" ,
                "margin-right": "40px",
                }
              }
            },
            unlocked() {
             if (hasUpgrade(this.layer, 22)) return true
             else return false
            }
  },
  33: {
              title: "",
              description: "Your base point production is boosted based on how many achievements you have completed." ,
              cost() {
                let cost = new Decimal(150)
                if (hasUpgrade(this.layer, 31) && !hasUpgrade(this.layer,this.id)) cost = cost.add(50)
                if (hasUpgrade(this.layer, 32) && !hasUpgrade(this.layer,this.id)) cost = cost.add(50)
                return cost
              },
              fullDisplay(){
                if(hasUpgrade(this.layer,this.id)) {
                  return 'Your base point production is boosted based on how many achievements you have completed.<br><br> Currently: ' + format(this.effect()) +'x' 
                }
                if(!hasUpgrade(this.layer,this.id)) {
                  return 'Your base point production is boosted based on how many achievements you have completed.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'+ '<br><br> Currently: ' + format(this.effect()) +'x' 
                }
              },
              effect() {

                let achievements = new Decimal(1);
  
                const achievementNumbers = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45];
                
                achievementNumbers.forEach(number => {
                    if (hasAchievement('A', number)) {
                        achievements = achievements.mul(1.35);
                    }
                });
                  return achievements
              },
              style() {
                if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
                return {
                  "width": "170px",
                  "height": " 150px",
                  "border-radius": "35px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "rgb(179, 19, 18)",
                  
                  }
                }
                if(hasUpgrade(this.layer, this.id)){
                return {
                  "width": "170px",
                  "height": " 150px",
                  "border-radius": "35px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
                  
                }
                
                }
                else {
                  return {
                  "width": "170px",
                  "height": " 150px",
                  "border-radius": "35px",
                  "border": "0px",
                  "margin": "5px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#FFFFFF",
                  "background-color": "#bf8f8f" ,
                  
                  }
                }
              },
              unlocked() {
               if (hasUpgrade(this.layer, 23)) return true
               else return false
              }
  },
  41: {
                title: "",
                description: "",
                cost() {
                  let cost = new Decimal(500000)
                  if (hasUpgrade(this.layer, 42) && !hasUpgrade(this.layer,this.id)) cost = cost.add(250000)
                  if (hasUpgrade(this.layer, 43) && !hasUpgrade(this.layer,this.id)) cost = cost.add(250000)
                  return cost
                },
                fullDisplay(){
                  if(hasUpgrade(this.layer,this.id)) {        
                    return 'Empowerer uses a better formula.'
                  }
                  if(!hasUpgrade(this.layer,this.id)) {
                    return 'Empowerer uses a better formula.<br>' + '<br>Cost: ' + format(this.cost()) + ' Pure Energy'
                  }
                },
                effect() {
                  let milestones = new Decimal(1)
                    for (let i = 1; i <= 15; i++) {
                      if (hasMilestone(this.layer, i)) {
                          milestones = milestones.add(10);
                      }
                  }
                  return milestones
                },
                style() {
                  if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
                  return {
                    "width": "170px",
                    "height": " 150px",
                    "border-radius": "35px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "rgb(179, 19, 18)",
                    "margin-right": "40px",
                    }
                  }
                  if(hasUpgrade(this.layer, this.id)){
                  return {
                    "width": "170px",
                    "height": " 150px",
                    "border-radius": "35px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
                    "margin-right": "40px",
                  }
                  
                  }
                  else {
                    return {
                    "width": "170px",
                    "height": " 150px",
                    "border-radius": "35px",
                    "border": "0px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#FFFFFF",
                    "background-color": "#bf8f8f" ,
                    "margin-right": "40px",
                    }
                  }
                },
                unlocked() {
                 if (hasUpgrade(this.layer, 31)&&hasAchievement('A',45)&&hasAchievement('A',44)&&hasAchievement('A',43)&&hasAchievement('A',42)&&hasAchievement('A',41)) return false
                 else return false
                }
  },
  42: {
    title: "",
    description: "",
    cost() {
      let cost = new Decimal(500000)
      if (hasUpgrade(this.layer, 41) && !hasUpgrade(this.layer,this.id)) cost = cost.add(250000)
      if (hasUpgrade(this.layer, 43) && !hasUpgrade(this.layer,this.id)) cost = cost.add(250000)
      return cost
    },
    fullDisplay(){
      if(hasUpgrade(this.layer,this.id)) {        
        return 'Angelic Shard is cheaper based on your wins.<br>'+'<br>Currently: ' + format(this.effect()) + 'x cheaper'
      }
      if(!hasUpgrade(this.layer,this.id)) {
        return 'Angelic Shard is cheaper based on your wins.<br>' +'<br>Currently: ' + format(this.effect()) + 'x cheaper<br><br>Cost: ' + format(this.cost()) + ' Pure Energy'
      }
    },
    effect() {
      let effect = new Decimal("10")
      x = player.w.points.div(1000).add(1)
      effect = effect.pow(x)
      return effect
    },
    style() {
      if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
      return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background-color": "rgb(179, 19, 18)",
        "margin-right": "40px",
        }
      }
      if(hasUpgrade(this.layer, this.id)){
      return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",
        "margin-right": "40px",
      }
      
      }
      else {
        return {
        "width": "170px",
        "height": " 150px",
        "border-radius": "35px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#FFFFFF",
        "background-color": "#bf8f8f" ,
        "margin-right": "40px",
        }
      }
    },
    unlocked() {
     if (hasUpgrade(this.layer, 32)&&hasAchievement('A',45)&&hasAchievement('A',44)&&hasAchievement('A',43)&&hasAchievement('A',42)&&hasAchievement('A',41)) return false
     else return false
    }
},
43: {
  title: "",
  description: "",
  cost() {
    let cost = new Decimal(500000)
    if (hasUpgrade(this.layer, 41) && !hasUpgrade(this.layer,this.id)) cost = cost.add(250000)
    if (hasUpgrade(this.layer, 42) && !hasUpgrade(this.layer,this.id)) cost = cost.add(250000)
    return cost
  },
  fullDisplay(){
    if(hasUpgrade(this.layer,this.id)) {        
      return 'Cap of ? and pointless shard are increased to 100,000.<br>'
    }
    if(!hasUpgrade(this.layer,this.id)) {
      return 'Cap of ? and pointless shard are increased to 100,000.<br>(Their cost scaling gets stronger after buying 200 times.)<br>' +'<br>Cost: ' + format(this.cost()) + ' Pure Energy'
    }
  },
  effect() {
    let effect = new Decimal("1e30")
    x = player.w.points.add(1).log(5, player.w.points)
    effect = effect.pow(x)
    return effect
  },
  style() {
    if(player.h.points.gte(this.cost()) && !hasUpgrade(this.layer, this.id)) {
    return {
      "width": "170px",
      "height": " 150px",
      "border-radius": "35px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#FFFFFF",
      "background-color": "rgb(179, 19, 18)",

      }
    }
    if(hasUpgrade(this.layer, this.id)){
    return {
      "width": "170px",
      "height": " 150px",
      "border-radius": "35px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#FFFFFF",
      "background": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(74,22,22,1) 35%, rgba(198,25,34,1) 100%)",

    }
    
    }
    else {
      return {
      "width": "170px",
      "height": " 150px",
      "border-radius": "35px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#FFFFFF",
      "background-color": "#bf8f8f" ,
      "margin-right": "40px",
      }
    }
  },
  unlocked() {
   if (hasUpgrade(this.layer, 33)&&hasAchievement('A',45)&&hasAchievement('A',44)&&hasAchievement('A',43)&&hasAchievement('A',42)&&hasAchievement('A',41)) return false
   else return false
  }
}, 
},

milestones: {
  1: {
      requirementDescription: "1 Total Pure Energy",
      effectDescription: "You start every heavenly reset with all 3 rows of upgrades available to purchase except for the ones unlocked via challenges, sharp shard item maxed out and permanently gain a 2x boost to base point production.",
      done() { return player.h.total.gte(1) },
      style(){
      if (hasMilestone(this.layer,this.id)) {
        return {"width": "450px",
        "height": " 105px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "white",
        "background-color": "#B31312"
      }
      }
       else {
        return {"width": "450px",
        "height": " 105px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "white"}
        
      }
    } 
  },
  2: {
    requirementDescription: "2 Total Pure Energy",
    effectDescription: "Keep win milestones on heavenly resets.",
    done() { return player.h.total.gte(2) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  3: {
    requirementDescription: "3 Total Pure Energy",
    effectDescription: "Improve the fifth win milestone from 10% to 100%.",
    done() { return player.h.total.gte(3) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  4: {
    requirementDescription: "4 Total Pure Energy",
    effectDescription() {
      if(hasAchievement('A',42)) return "Unlock the item autobuyer which works every 100ms."
      else return "Unlock the item autobuyer which works every 500ms."
    },
    done() { return player.h.total.gte(4) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  5: {
    requirementDescription: "5 Total Pure Energy",
    effectDescription: "You start every heavenly reset with 'Desperation' completed.",
    done() { return player.h.total.gte(5) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  6: {
    requirementDescription: "7 Total Pure Energy",
    effectDescription: "You start every heavenly reset with Placeholder 1 completed.",
    done() { return player.h.total.gte(7) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  7: {
    requirementDescription: "10 Total Pure Energy",
    effectDescription: `Endless Void scaling is reduced by 4.<br>
    Goal formula for x completions: 70+(x.29) => 70+(x.25)
    `,
    done() { return player.h.total.gte(10) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  8: {
    requirementDescription: "12 Total Pure Energy",
    effectDescription: `Pure energy's effect on magical shard gain is slightly better.`,
    done() { return player.h.total.gte(12) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  9: {
    requirementDescription: "15 Total Pure Energy",
    effectDescription: "Unlock sacrifice.",
    done() { return player.h.total.gte(15) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  10: {
    requirementDescription: "100 Total Pure Energy",
    effectDescription: "Endless Void scaling is reduced further.<br>Goal formula for x completions: 70+(x.25) => 70+(x.22)",
    done() { return player.h.total.gte(100) },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  11: {
    requirementDescription: "300 Total Pure Energy",
    effectDescription: "You can bulk complete Endless Void.",
    done() {if(hasUpgrade(this.layer, 23)) return player.h.total.gte(300)
      else return false
     },
    unlocked() {
      if(hasUpgrade(this.layer, 23)) return true
    },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  12: {
    requirementDescription: "500 Total Pure Energy",
    effectDescription: "You start heavenly resets with Appallment completed.",
    done() { return player.h.total.gte(500) },
    unlocked() {
      if(hasUpgrade(this.layer, 23)) return true
    },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  13: {
    requirementDescription: "1000 Total Pure Energy",
    effectDescription: "Sacrifice formula is better.",
    done() { return player.h.total.gte(1000) },
    unlocked() {
      if(hasUpgrade(this.layer, 23)) return true
    },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  14: {
    requirementDescription: "2000 Total Pure Energy",
    effectDescription: "Endless Void scaling is reduced even further.<br>Goal formula for x completions: 70+(x.22) => 70+(x.15)",
    done() { return player.h.total.gte(2000) },
    unlocked() {
      if(hasUpgrade(this.layer, 23)) return true
    },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },
  15: {
    requirementDescription: "1e10 Total Pure Energy",
    effectDescription: "Unlock the Tree of Life",
    done() { return player.h.total.gte("1e10") },
    unlocked() {
      if(hasUpgrade(this.layer, 23)) return true
    },
    style(){
    if (hasMilestone(this.layer,this.id)) {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
      "background-color": "#B31312"
    }
    }
     else {
      return {"width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white"}
      
      }
    }  
  },

},
clickables: {
  11: {
    display() {return "<h3>Booster<h/3>"},
    canClick() {
      return true
    }, 
    onClick(){
      if (inChallenge(this.layer, 11)) {
        alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
        return false
      } 
      else {
        if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
        else setClickableState(this.layer, this.id, 1)      
      }
    },
    style() {
      if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1",
    }
  }
},
21: {
  display() {return "<h3>Super Booster<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
    if (inChallenge(this.layer, 11)) {
      alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
      return false
    } 
    else {
      if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
      else setClickableState(this.layer, this.id, 1)      
    }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
31: {
  display() {return "<h3>Ultra Booster<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
    if (inChallenge(this.layer, 11)) {
      alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
      return false
    } 
    else {
      if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
      else setClickableState(this.layer, this.id, 1)      
    }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
12: {
  display() {return "<h3>Accelerator<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
      if (inChallenge(this.layer, 11)) {
        alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
        return false
      } 
      else {
        if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
        else setClickableState(this.layer, this.id, 1)      
      }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
22: {
  display() {return "<h3>Super Accelerator<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
      if (inChallenge(this.layer, 11)) {
        alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
        return false
      } 
      else {
        if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
        else setClickableState(this.layer, this.id, 1)      
      }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
32: {
  display() {return "<h3>Ultra Accelerator<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
      if (inChallenge(this.layer, 11)) {
        alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
        return false
      } 
      else {
        if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
        else setClickableState(this.layer, this.id, 1)      
      }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
14: {
  display() {return "<h3>Empowerer<h/3>"},
  canClick() {
    return true
  },

  onClick(){
      if (inChallenge(this.layer, 11)) {
        alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
        return false
      } 
      else {
        if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
        else setClickableState(this.layer, this.id, 1)      
      }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1",
      "margin-right": "0px"
    }
    else return {
      "margin-right": "0px"
    }
  }
},
24: {
  display() {return "<h3>Mighty Empowerer<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
    if (inChallenge(this.layer, 11)) {
      alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
      return false
    } 
    else {
      if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
      else setClickableState(this.layer, this.id, 1)      
    }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1",
      "margin-right": "0px"
    }
    else return {
      "margin-right": "0px"
    }
  }
},
34: {
  display() {return "<h3>True Empowerer<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
    if (inChallenge(this.layer, 11)) {
      alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
      return false
    } 
    else {
      if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
      else setClickableState(this.layer, this.id, 1)      
    }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1",
      "margin-right": "0px"
    }
    else return {
      "margin-right": "0px"
    }
  }
},
13: {
  display() {return "<h3>Divisor<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
    if (inChallenge(this.layer, 11)) {
      alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
      return false
    } 
    else {
      if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
      else setClickableState(this.layer, this.id, 1)      
    }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1",
      "margin-right": "0px"
    }
    else return {
      "margin-right": "0px"
    }
  }
},
23: {
  display() {return "<h3>Super Divisor<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
    if (inChallenge(this.layer, 11)) {
      alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
      return false
    } 
    else {
      if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
      else setClickableState(this.layer, this.id, 1)      
    }
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
33: {
  display() {return "<h3>Ultra Divisor<h/3>"},
  canClick() {
    return true
  },
  
  onClick(){
      if (inChallenge(this.layer, 11)) {
        alert("You need to respec your sacrifices or complete your current heavenly reset in order to do this!")
        return false
      } 
      else {
        if (getClickableState(this.layer, this.id) == 1) setClickableState(this.layer, this.id, 0)
        else setClickableState(this.layer, this.id, 1)      
      }
      
    },
    style() {
    if (getClickableState(this.layer, this.id) == 1) return {
      "background-color": "#f5c1c1"
    }
  }
},
41: {
  display() {return '<h2>RESPEC<h/2>'},
  style() {
    if (sacrificeclicked == 3) {
      return {
        "width": "150px",
        "min-height": " 80px",
        "border-radius": "15px",
        "border": "2px solid rgb(179, 19, 18)",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #121111",
        "color": "#121111",
        "background-color":"#FFFFFF",
        "margin-top": "50px",
        
    }
    } if (sacrificeclicked == 2) {
      return {
        "width": "150px",
        "min-height": " 80px",
        "border-radius": "15px",
        "border": "2px solid rgb(179, 19, 18)",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #FFFFFF",
        "color": "#FFFFFF",
        "background-color":"#121111",
        "margin-top": "50px",
        
    }
    }
    else return {
      "width": "150px",
        "min-height": " 80px",
        "border-radius": "15px",
        "border": "2px solid rgb(179, 19, 18)",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #FFFFFF",
        "color": "#FFFFFF",
        "background-color":"#121111",
        "margin-top": "50px",
    }
  
  },
  canClick() {
    return true
  },
  onClick(){
    setClickableState(this.layer, 11, 0)
    setClickableState(this.layer, 12, 0)
    setClickableState(this.layer, 13, 0)
    setClickableState(this.layer, 14, 0)
    setClickableState(this.layer, 21, 0)
    setClickableState(this.layer, 22, 0)
    setClickableState(this.layer, 23, 0)
    setClickableState(this.layer, 24, 0)
    setClickableState(this.layer, 31, 0)
    setClickableState(this.layer, 32, 0)
    setClickableState(this.layer, 33, 0)
    setClickableState(this.layer, 34, 0)
    sacrificeclicked = 3;

      // Set a timeout to reset the clicked status after 2 seconds
      setTimeout(() => {
        sacrificeclicked = 2;
      }, 2300);
    if (inChallenge(this.layer, 11)) startChallenge(this.layer, 11)
    
    else return false
  }
},
42: {
  display() {return '<h2>SACRIFICE<h/2>'},
  style() {
    if(sacrificeclicked == 1) {
      return {
      "width": "150px",
      "min-height": " 80px",
      "border-radius": "15px",
      "border": "2px solid #121111",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #121111",
      "color": "#121111",
      "background-color":"rgb(179, 19, 18)",
      "margin-left": "40px",
      "margin-top": "50px",
      }
    }
    else return {
      "width": "150px",
      "min-height": " 80px",
      "border-radius": "15px",
      "border": "2px solid rgb(179, 19, 18)",
      "margin": "5px",
      "text-shadow": "0px 0px 10px rgb(179, 19, 18)",
      "color": "rgb(179, 19, 18)",
      "background-color":"#121111",
      "margin-left": "40px",
      "margin-top": "50px",
      
  }
    
  },
  canClick() {
    return true
  },
  onClick() {
    if (!inChallenge(this.layer, 11)) {
      startChallenge(this.layer, 11);

      // Change the clicked status
      sacrificeclicked = 1;

      // Set a timeout to reset the clicked status after 2 seconds
      setTimeout(() => {
        sacrificeclicked = 0;
      }, 2300);
    } else {
      return false;
    }
  }
}

},

challenges: {
  11: {
    name: "Sacrifice",
    canComplete: function() {return player.h.points.gte("1e999999999999999999")},
    
    
}, 
}
}
)
addLayer("t", {
  startData() { return {                  
    unlocked:false,            
    points: new Decimal(0),  
    total: new Decimal(0)        
    }
    },
    symbol:"T",
    color: "#1f522f",            
    resource: "sacred leaves",
    row: 3,
    baseResource: "pure energy",                                 
    displayRow: 4,         
    baseAmount() { return player.h.total},  
    requires() {
      if (hasMilestone('h',15)) return new Decimal("1e10")
      else return new Decimal("1e10")
    },             
    type: "normal",                         
    exponent: 0.5,                          
    gainMult() {                            
        return new Decimal(1)               
    },
    gainExp() {                             
        return new Decimal(1)
    },

    nodeStyle() {
      if (!hasMilestone('h',15)) return {
        background: "rgb(191, 143, 143)",
        color: "rgba(0, 0, 0, 0.5)",
        border: "2px solid #008000",
      }
      else return {
        background: "#006400",
        color: "#fff",
        border: "2px solid #008000",
        'box-shadow': "0 0 15px #228b22",
        animation: "leafGlow 7s infinite"
      }
      
      
    },
    layerShown() {
      if(hasUpgrade('h',23) && player.t.total.gte(0)) {return true}
    },
    tooltip() {
      return player.t.points + ' sacred leaves'
    },
    tooltipLocked(){
      return "Obtain the 15th heavenly milestone to unlock"
    },
    buyables: {
      11: {
        cost(x) {
        let cost = new Decimal("")
        
        },
        display() { return "Blah" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        style() {
        return {
            "width": "150px",
            "height": " 60px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#FFFFFF",
            "background-color": "#77567F"
          }
        }
        },
    },
    }
)




