let lastAutomateTime = 0;
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
      name: "Boosting to the Max!",
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
      tooltip: "Win 100 times. <h5>Reward: You get a high five from me :)<h5>",
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
      name: "Spending Spree",
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
      name: "Holding w or holding m, that is the question",
      tooltip() {
        return `Reach 10k wins.<br>
                <h5>Reward: Multiply point production based on how many achievements you've unlocked in this row.<h5>` + "Currently: x" + format(calculateAch32Reward())
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
      name: "Developer forgot that",
      tooltip: "Buy true empowerer in Endless Void.<h5>Reward: Aliensar<h5>",
      done() {
        return player.h.points.gte(1000)
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
      name: "I have no upgrades and I must win",
      tooltip: "Reach 2000 wins in Placeholder 2 without buying any upgrades.<h5>Reward: Aliensar<h5>",
      done() {
        return player.h.points.gte(1000)
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
      tooltip: "Perform a heavenly reset without buying any items except sharp shard.<h5>Reward: Aliensar<h5>",
      done() {
        return player.h.points.gte(1000)
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
      tooltip: "Perform a heavenly reset while your booster is sacrificed.<h5>Reward: Aliensar<h5>",
      done() {
        return player.h.points.gte(1000)
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
      tooltip: "Reach 50k wins with only accelerators.<h5>Reward: Aliensar<h5>",
      done() {
        return player.h.points.gte(1000)
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
        return player.h.points.gte(100)
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
      toggles: [["w","auto"]
      ],
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
        if (hasMilestone('h',2)) {
          return "Each second, gain 10% of the magical shard you would gain by resetting."
        }
        else return "Each second, gain 100% of the magical shard you would gain by resetting."
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
  if (resettingLayer == "w" || resettingLayer == "m" || hasMilestone('h',3)) keep.push("milestones"),
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
        if (!inChallenge("m",13) && !inChallenge("m",12) && !inChallenge("m",11) && !inChallenge("m",21) && !inChallenge("m",22) && !inChallenge("m",23) && !inChallenge("m",31)) {if (hasChallenge("m", 12) == 1) mult = mult.divide(challengeEffect("m",12))}
        if (inChallenge('m',23)  && hasUpgrade('w', 11)) mult = mult.divide(chleffect23)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (inChallenge('m',23)) exp=exp.div(50)
        if (inChallenge('m',31)) exp=exp.div(1.2)
        return exp

    },
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Win the game!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
      Firstbox: {
          title: "Strange Yet Familliar...",
          body() { return "You find yourself in middle of nothingness. You are filled with a strange yet familliar feeling. In front of you there is a button, glowing in the darkness. 'Click n Win' it says. You hesitate but can't help yourself from clicking it. A weird text appears in the sky, you feel like you've accomplished something. Finally, you decide to keep clicking this button until you figure out a way to escape this place." },
          
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
              function() {if(hasUpgrade('h', 13)) return 'Once you buy an upgrade from the forth row, other upgrades in that row will become significantly more expensive.' },
              { "color": "grey", "font-size": "13px"}],
            "blank",
            "prestige-button",
            "blank",
            "clickables",
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
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {          
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
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999")
                
              } else {
                return new Decimal(1)
              }
            },          
            style() {
               if (hasUpgrade('w',11)) return {background: "#ECF8F9"}
              },
            effect() {
              effect = new Decimal(buyableEffect('m', 11).mul(2))
              return format(effect)
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
               }
            },
            
        13: {
            title: "Divisor",
            description: "Makes it easier to win. (Based on how many points you have)",
            cost: new Decimal(5),
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
             }
        },
        
        14: {
          title: "Empowerer",
          description: "Empowers your production based on your magical shards.",
          cost: new Decimal(15),
          effect() {
            let effect = new Decimal(player.m.points)
            effect = effect.add(3)
            effect = effect.log10(effect)
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
               }
        },
        23: {
            title: "Super Divisor",
            description: "What, you want even easier wins? Sure, you can have it.",
            cost() {
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
             }
        },
        24: {
          title: "Mighty Empowerer",
          description: "Empowers your accelerators based on your wins.",
          cost() {
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
               }
        },
        33: {
            title: "Ultra Divisor",
            description: "Winning has never been this easy before.",
            cost: new Decimal(500),
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
             }
        },
        34: {
          title: "True Empowerer",
          description: "Empowers your divisors based on your points.",
          cost: new Decimal(1500),
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
        title: "blah",
        body() { return "I'll write something here when I'm not lazy" },
    },
    
},
    tabFormat: {
      "Shop": {
          content: [
            
            ["infobox", "lore"],
            "main-display",
            "prestige-button",
            "blank",
            "resource-display",
            "buyables",
            "blank",     
            
          ],

      },
    
      "Challenges": {
          content: [
            ["display-text",
            function() {
            if(hasChallenge('m', 31)) {
              return 'Challenges may be too hard if attempted too early.<br>Lower rows are harder than higher rows.<br>Endless Void goal scaling gets stronger after 600 wins.<br>'
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
      if (hasMilestone('h',2)) {
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
    if (hasMilestone('h', 9)) keptChallenges[12] = challengeCompletions('m', 12);
    if (hasMilestone('h', 9)) keptChallenges[13] = challengeCompletions('m', 13);
    if (hasMilestone('h', 9)) keptChallenges[22] = challengeCompletions('m', 12);
    if (hasMilestone('h', 9)) keptChallenges[23] = challengeCompletions('m', 23);
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
    challenges: {
      11: {
        name: "Desperation",
        challengeDescription: "You can not buy any boosters.",
        canComplete: function() {return player.w.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "Boosters effect the magical shard gain with heavily reduced effect.",
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
        {return `Win requirement scales absurdly fast but booster weakens this scaling.<br>
        Goal: Reach 50 wins to complete the challenge.<br>
        Reward: Your booster continues to decrease win requirement outside of this challenge with reduced effect.<br>
        Currently: ${format(challengeEffect(this.layer,this.id))}÷`
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
          if (hasMilestone('h',8)) power = power.sub(4)
          if (hasMilestone('h',11)) power = power.sub(3)
          let calc = new Decimal(base.add(power.mul(x)))
          if(calc.gte(600)){
            power = power.add(50)
            calc = new Decimal(base.add(power.mul(x)))
          } 
          let goal = calc
          
          return goal
          
         },
        canComplete() {
        var sc = tmp[this.layer].challenges[this.id]
         
        let threshold = player.w.points.gte(sc.goal) // add any currency here
        return threshold 
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
          if(hasUpgrade('h', 12)) {
            if (hasMilestone('h',8)) {
              return `
          Goal: ${format(this.goal())} wins<br>
          Completions: ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          Reward: The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper <br>
          and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
          `
            } else {
              if (hasAchievement('A',31)) {
                return `
          Goal: ${format(this.goal())} wins<br>
          Completions: ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          Reward: The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper <br>
          and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
          `
              } else{
              return `
          Goal: ${format(this.goal())} wins<br>
          Completions: ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          Reward: The 'pointless' and ? shard items are cheaper and 'pointless' shard is stronger based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper <br>
          and adding ${format(chlcomp.div(100))} power to 'Pointless Shard'
          `}
            }
          }
          else {if (hasMilestone('h',8)) {
            return `
          Goal: ${format(this.goal())} wins<br>
          Completions: ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          Reward: The 'pointless' and ? shard items are cheaper based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper
          `
            } else {
              if (hasAchievement('A',31)) {
                return `
          Goal: ${format(this.goal())} wins<br>
          Completions: ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          Reward: The 'pointless' and ? shard items are cheaper based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper
          `
              } else{
              return `
          Goal: ${format(this.goal())} wins<br>
          Completions: ${format(chlcomp)} <br>
          Reward for first completion: Unlock a new item in the shop. <br>
          Reward: The 'pointless' and ? shard items are cheaper based on completions.<br>
          Currently: ${format(this.rewardEffect())}x cheaper
          `}
            }
         
        }} else {
          return `Goal: Only <p9>god</p9> knows.`
        }
        },
        rewardDescription: "idk",
        completionLimit: 100,
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
        "color":"white"},

        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          
          }
        

      },
        
      },
      
    buyables: {
        11: {
            purchaseLimit: new Decimal(999),
            title: "Powered Shard",
          cost(x) {
            if (x.lt(5)) {
              let PowerI = new Decimal(2)
              let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              if (getBuyableAmount('m',61) > 0) {
                Calculation = Calculation.divide(buyableEffect('m',61))
                return Calculation
              } else {
                return Calculation 
              }
              
            }
            else {
              let PowerI = new Decimal(2.1)
              let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              if (getBuyableAmount('m',61) > 0) {
                Calculation = Calculation.divide(buyableEffect('m',61))
                return Calculation
              } else {
                return Calculation 
              }
            }
          },
          display() {
            if(getBuyableAmount(this.layer,this.id) == 999){
              return `Triples your first booster power for each purchase.<br>
                      x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
                      <h2>Maximum Amount Reached</h2>
                      <br> ${format(getBuyableAmount('m',11))} /999 Bought`
            }
            else return `Triples your first booster power for each purchase.<br>
                        x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
                        <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
                        <br> ${format(getBuyableAmount('m',11))} /999 Bought`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (getBuyableAmount(this.layer,this.id) == 999) {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#6A3076"}
            }
            if (this.canAfford()||getBuyableAmount("m",11) == 999) return {
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
          },
          buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect() {
            let PowerI = new Decimal(3)
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
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                if (getBuyableAmount('m',61) > 0) {
                  Calculation = Calculation.divide(buyableEffect('m',61))
                  return Calculation
                } else {
                  return Calculation 
                }
            },
            display() {
            if (hasUpgrade('w',42)) {
              if(getBuyableAmount(this.layer,this.id) == 15){
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(8))}) </b><br>
              <h2>Maximum Amount Reached</h2>
              <br> ${format(getBuyableAmount('m',12))} /15 Bought`
              }
              else {
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(8))}) </b><br>
              <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
              <br> ${format(getBuyableAmount('m',12))} /15 Bought`
              }
            } else {
              if(getBuyableAmount(this.layer,this.id) == 15){
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(11))}) </b><br>
              <h2>Maximum Amount Reached</h2>
              <br> ${format(getBuyableAmount('m',12))} /15 Bought`
              }
              else {
                return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(11))}) </b><br>
              <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
              <br> ${format(getBuyableAmount('m',12))} /15 Bought`
              }
            }
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            style() {
            if (getBuyableAmount(this.layer,this.id) == 15) {
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
            if (this.canAfford()||getBuyableAmount("m",12) == 15) return {
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
          <br> ${format(getBuyableAmount('m',21))} /3 Bought`
              } else {
                return `Makes your super upgrades 3 wins cheaper.<br>
              ${format(tmp[this.layer].buyables[this.id].effect)} Wins Cheaper</b><br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',21))} /3 Bought`
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
            purchaseLimit: 999,
            title: "Shard of the Void",
            cost(x) {
              let Calculation = new Decimal("e15")
              if (x < 30) {
                let PowerI = new Decimal(5)
                Calculation = new Decimal("e15").mul(Decimal.pow(PowerI, x.pow(1)))
              } else {
                let PowerI = new Decimal(6)
                Calculation = new Decimal("e15").mul(Decimal.pow(PowerI, x.pow(1)))
              }
              if (getBuyableAmount('m',61) > 0) {
                Calculation = Calculation.divide(buyableEffect('m',61))
                return Calculation
              } else {
                return Calculation 
              }
          },
            display() {
              return `Wins provide a boost to the point production.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} to Point Production</b><br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',22))} /999 Bought`
            },
            canAfford() {
              return player.m.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",62) == 999) return {
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
            },
            buy() {
              player.m.points = player.m.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
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
            purchaseLimit: new Decimal(200),
            title: "'Point'less Shard",
            cost() {
              let cost = new Decimal("1e12")
              let scale = new Decimal(100)
              scale = scale.pow(getBuyableAmount(this.layer, this.id))
              cost = cost.mul(scale)

              if(hasAchievement('A', 21)){
                cost = cost.div(10)
              }
              if (challengeCompletions(this.layer,31) > 0) {
                cost = cost.divide(challengeEffect(this.layer, 31))
                return cost
              } else {
                return cost
              }
              
            },
            display() {
              if (hasUpgrade('h', 12)) {
                return `Makes items that cost magical shard ${format(this.effect().root(getBuyableAmount(this.layer, this.id)))}x cheaper.<br>
                    x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                    <br> ${format(getBuyableAmount('m',61))} /200 Bought`
                  }
              else {
                if (hasAchievement('A', 24)) {
                  return `Makes items that cost magical shard 1.3x cheaper.<br>
                    x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                    <br> ${format(getBuyableAmount('m',61))} /200 Bought`
                  }
                  else return `Makes items that cost magical shard 1.1x cheaper.<br>
                    x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
                    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                    <br> ${format(getBuyableAmount('m',61))} /200 Bought`
                }
              },
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",61) == 200) return {
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
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
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
            purchaseLimit: new Decimal(200),
            title: "? Shard",
            cost() {
              let cost = new Decimal("1e12")
              let scale = new Decimal(160)
              scale = scale.pow(getBuyableAmount(this.layer, this.id))
              cost = cost.mul(scale)
              if (challengeCompletions(this.layer,31) > 0) {
                cost = cost.divide(challengeEffect(this.layer, 31))
                return cost
              } else {
                return cost
              }
              
            },
            display() {
              if (hasUpgrade('w', 44)) {
                return `Boosts magical shard gain by 2.3x.<br>
                x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
                <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                <br> ${format(getBuyableAmount('m',62))} /200 Bought`
              }
              else {return `Doubles magical shard gain.<br>
                x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
                <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
                <br> ${format(getBuyableAmount('m',62))} /200 Bought`
            }},
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",62) == 200) return {
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
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
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
            purchaseLimit: 10,
            title: "Angelic Shard",
            cost(x) {
              let basecost = new Decimal("1e15")
              let scale = new Decimal("1e50")
              scale = scale.pow(x)
              basecost = basecost.mul(scale)
              return basecost
            },
            display() {
              return `Strengthens super divisor based on how many heavenly milestones you have.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} Divisor Power</b><br>
          <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
          <br> ${format(getBuyableAmount('m',63))} /10 Bought`
            },
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",63) == 10) return {
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
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
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
        if (hasMilestone('h',5)) return true
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
    exponent: 0.75,// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        mult = mult.mul(1)
        if (hasUpgrade('w',43)) mult = mult.mul(upgradeEffect('w',43))
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
    if(player.h.points.gte(10001) ) return `which is raising magical shard gain up to ^${format(temp.h.effect)} <span style="color: #ff0000">(CAPPED)</span>`
    if(player.h.points.gte(40)  && player.h.points.lte(10000)) return `which is raising magical shard gain up to ^${format(temp.h.effect)} <span style="color: #ff0000">(SOFTCAPPED)</span>`
    else return `which is raising magical shard gain up to ^${format(temp.h.effect)}`
    }, 
    automate(){const now = Date.now();
      const delay = 500; 
  
      if (now - lastAutomateTime >= delay) {
          if (player.h.auto && hasMilestone(this.layer, 4)) {
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
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 3,
    infoboxes: {
      Heaven: {
          title: "heaven stuff",
          body() { return "heaven stuff" },
          
      },
    },
    tabFormat: {
      "Heaven's Gates": {
          content: [
            
            ["infobox", "Heaven"],
            "main-display",
            "prestige-button",
            "blank",
            ["resource-display", ""],
            "blank",   
            "milestones",
            
            
          ],

      },

      "Holy Upgrades":{
        content: [
          ["display-text",
            function() { return "Buying a holy upgrade will reveal another upgrade in the next column. <br> Also buying a holy upgrade increases other upgrades in their row to increase in cost."},
            { "color": "grey", "font-size": "13px"}],
          "blank",
          "upgrades"
        ],
        unlocked() {
          if (hasAchievement('A', 35)) return true
          else return false
        },
      },
    
      "Ancient Tree": {
        unlocked: false,
          content: [
            
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
        description: "Unlock a new effect for pure energy.",
        cost() {
          let cost = new Decimal(50)
          if (hasUpgrade(this.layer, 21) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
          if (hasUpgrade(this.layer, 23) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
          return cost
        },
        fullDisplay(){
          if(hasUpgrade(this.layer,this.id)) {
            return 'Unlock a new effect for pure energy.'
          }
          if(!hasUpgrade(this.layer,this.id)) {
            return 'Unlock a new effect for pure energy.<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
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
          description: "Unlock a new heavenly milestone.<br>(Which will be located below the 100 pure energy milestone)",
          cost() {
            let cost = new Decimal(50)
            if (hasUpgrade(this.layer, 21) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
            if (hasUpgrade(this.layer, 22) && !hasUpgrade(this.layer,this.id)) cost = cost.add(25)
            return cost
          },
          fullDisplay(){
            if(hasUpgrade(this.layer,this.id)) {
              return 'Unlock a new heavenly milestone.<br>(Which will be located below the 100 pure energy milestone)'
            }
            if(!hasUpgrade(this.layer,this.id)) {
              return 'Unlock a new heavenly milestone.<br>(Which will be located below the 100 pure energy milestone)<br>' + '<br>Cost: ' + this.cost() + ' Pure Energy'
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
              "background-color": "#bf8f8f" ,
              "margin-right": "40px",
              }
            }
          },
          unlocked() {
           if (hasUpgrade(this.layer, 13)) return true
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
    effectDescription: "Improve the fifth win milestone from 10% to 100%.",
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
    effectDescription: "Keep win milestones on heavenly resets.",
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
    effectDescription: "You can automatically buy items.",
    done() { return player.h.total.gte(4) },
    toggles: [["h","auto"]
    ],
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
    requirementDescription: "15 Total Pure Energy",
    effectDescription: `Endless Void scaling is reduced by 5.<br>
    Goal formula for x completions: 70+(x.29) => 70+(x.25)
    `,
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
  8: {
    requirementDescription: "20 Total Pure Energy",
    effectDescription: `Pure energy's effect on magical shard gain is slightly better.`,
    done() { return player.h.total.gte(20) },
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
    requirementDescription: "25 Total Pure Energy",
    effectDescription: "You start every heavenly reset with the first 6 challenges completed.",
    done() { return player.h.total.gte(25) },
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
    requirementDescription: "30 Total Pure Energy",
    effectDescription: "Unlock sacrifice. (not implemented)",
    done() { return player.h.total.gte(30) },
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
    requirementDescription: "100 Total Pure Energy",
    effectDescription: "Endless Void scaling is reduced further. <br> Goal formula for x completions: 70+(x.25) => 70+(x.22)",
    done() { return player.h.total.gte(200) },
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
    requirementDescription: "3000 Total Pure Energy",
    effectDescription: "Unlock the Ancient Tree",
    done() { return player.h.total.gte(3000) },
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


})




