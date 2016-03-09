var race = 0,
    food = 0,
    foodDoubled = false,
    ring1 = 0,
    ring2 = 0,
    neck = 0,
    cloak = 0,
    trinket1 = 0,
    trinket2 = 0,
    weapon1 = 0,
    weapon2 = 0,
    gear = 0,
    gems = 0,
    RATING = 66,
    TIGER_STRIKES = 35 * RATING,
    WINDFLURRY = 15 * RATING,
    specialModifier = 1.05,
    totalMultistrike = 0,
    totalEnchants = 0,
    ratingNeeded,
    summary = document.getElementById("summary");
   

function calculate() {
    
    totalEnchants = 0;
    if (weapon1 > 0) {
        totalEnchants += 500;
    }
    
    if (weapon2 > 0) {
        totalEnchants += 500;
    }
    
    totalEnchants += cloak;
    totalEnchants += neck;
    totalEnchants += ring1;
    totalEnchants += ring2;
    
    totalMultistrike = 0;
    totalMultistrike = ((totalEnchants + food + gear + gems + trinket1 + trinket2) * specialModifier) + TIGER_STRIKES + WINDFLURRY;
    ratingNeeded = ((RATING * 100) - (((totalEnchants + food + gems + trinket1 + trinket2) * specialModifier) + TIGER_STRIKES + WINDFLURRY)) / specialModifier;
    
    summary.innerHTML = "Total Enchants: " + ((totalEnchants / RATING) * specialModifier).toFixed(2) + "%<br />Food rating: " + ((food / RATING) * specialModifier).toFixed(2) +
        "%<br />Gear: " + ((gear / RATING) * specialModifier).toFixed(2) + "%<br />" + "Gems: " + ((gems / RATING) * specialModifier).toFixed(2) + "%<br />" +
        "Trinkets: " + (((trinket1 + trinket2) / RATING) * specialModifier).toFixed(2) + "%<br />Windflurry: 15%<br />Tiger Strikes: 35%<br />" +
        "==================<br />TOTAL: " + (totalMultistrike / RATING).toFixed(2) + "%<br /><br />" +
        "Gear rating needed to hit 100%: " + ratingNeeded.toFixed(0);
}

/*******************
 *     Setters     *
 *******************/

function setRace(value) {
    if (race !== value) {
        race = value;
        if (race === 0 && foodDoubled === true) {
            food /= 2;
            foodDoubled = false;
        }
        if (race === 1 && foodDoubled === false) {
            food *= 2;
            foodDoubled = true;
        }
        calculate();
    }
}

function setFood(value) {
    if (food !== value) {
        food = value;
        if (race > 0) {
            food *= 2;
            foodDoubled = true;
        }
        calculate();
    }
}

function setRing1(value) {
    if (ring1 !== value) {
        ring1 = value;
        calculate();
    }
}

function setRing2(value) {
    if (ring2 !== value) {
        ring2 = value;
        calculate();
    }
}

function setNeck(value) {
    if (neck !== value) {
        neck = value;
        calculate();
    }
}

function setCloak(value) {
    if (cloak !== value) {
        cloak = value;
        calculate();
    }
}

function setTrinket1(value) {
    if (trinket1 !== value) {
        trinket1 = Number(value);
        calculate();
    }
}

function setTrinket2(value) {
    if (trinket2 !== value) {
        trinket2 = Number(value);
        calculate();
    }
}

function setGems(value) {
    if (gems !== value) {
        gems = Number(value);
        calculate();
    }
}

function setWeapon1(value) {
    if (weapon1 !== value) {
        weapon1 = value;
        calculate();
    }
}

function setWeapon2(value) {
    if (weapon2 !== value) {
        weapon2 = value;
        calculate();
    }
}
    
function setGear(value) {
    if (gear !== value) {
        gear = Number(value);
        calculate();
    }
}

/* setupUpdater will be called once, on page load.
 */
 
function setupUpdater() {
    document.getElementById("trinket1").value = '';
    document.getElementById("trinket2").value = '';
    document.getElementById("gems").value = '';
    document.getElementById("gear").value = '';
    
    var input1 = document.getElementById("trinket1"),
        input2 = document.getElementById("trinket2"),
        input3 = document.getElementById("gear"),
        input4 = document.getElementById("gems"),
        oldText1 = input1.value,
        oldText2 = input2.value,
        oldText3 = input3.value,
        oldText4 = input4.value,
        timeout = null;

 
    /* handleChange is called 50ms after the user stops 
       typing. */
    function handleChange() {
        var newText1 = input1.value,
            newText2 = input2.value,
            newText3 = input3.value,
            newText4 = input4.value;
        if (newText1 === oldText1) {
            if (newText2 === oldText2) {
                if (newText3 === oldText3) {
                    if (newText4 === oldText4) {
                        return;
                    } else { oldText4 = newText4; }
                } else { oldText3 = newText3; }
            } else {
                oldText2 = newText2;
            }
        } else { oldText1 = newText1; }
        setTrinket1(newText1);
        setTrinket2(newText2);
        setGear(newText3);
        setGems(newText4);
    }

    /* eventHandler is called on keyboard and mouse events.
       If there is a pending timeout, it cancels it.
       It sets a timeout to call handleChange in 50ms. */
    function eventHandler() {
        if (timeout) { clearTimeout(timeout); }
        timeout = setTimeout(handleChange, 150);
    }
 
    input1.onkeydown = input1.onkeyup = input1.onclick = eventHandler;
    input2.onkeydown = input2.onkeyup = input2.onclick = eventHandler;
    input3.onkeydown = input3.onkeyup = input3.onclick = eventHandler;
    input4.onkeydown = input4.onkeyup = input4.onclick = eventHandler;
}
 
setupUpdater();
