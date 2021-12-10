// --- Display Screen Width --- //
const displayWidth = document.getElementById("width")
displayWidth.textContent = `w: ${window.innerWidth} + h: ${window.innerHeight}`
console.log(window.innerWidth)

// --- BUTTONS --- //
const startBtn = document.getElementById("btn-start")
const stopBtn = document.getElementById("btn-stop")

// --- Display --- //
const displaySantaHouseTarget = document.getElementById("santa-home-target")
const displaySantaCalories = document.getElementById("santa-calories")
const displayTotalMilkCookies = document.getElementById("total-milk-cookies") 
const displayTotalCarrotsTea = document.getElementById("total-carrots-tea")
const displayHomesPerSecond = document.getElementById("homes-per-second")
const displayHomesVisited = document.getElementById("homes-visited") 
const displayHomesRemaining = document.getElementById("homes-remaining")
const displayTimeMs = document.getElementById("time-ms")

// --- Variables --- //

const milkCookies = 15
const carrotsTea = -10
let houseMilkCookies = 0
let houseCarrotsTea = 0
let totalMilkCookiesHouses = 0
let totalCarrotsTeaHouses = 0

let timeMs = 0
let homesPerSecond = 0

let homesVisitedEvery5or10secs = []
let homesVisited = 0
let homesRemaining = 0

let santaCalories = 0

function runSimulation() {
    
    // Santa inputs the total number of homes to be visited
    // store input.value as santaHouseTarget
    // e.g. 1,000,000 homes
    
    const santaHouseTarget = displaySantaHouseTarget.value
    console.log(santaHouseTarget)
    
    // If total nightly calorie intake < 5000, Santa can visit 10 homes/second
    // Else 5 homes per second when >= 5000 cal
    
    if (santaCalories < 5000) {
        homesPerSecond = 10
        foodDrinkPerSecond(homesPerSecond)
        } else {
            homesPerSecond = 5
            foodDrinkPerSecond(homesPerSecond)
            }

    // Every second, loop math random 10 or 5 times and get 
    // e.g. [1,2,1,2,1,2,1,2,1,2] or [1,2,1,2,1]
    // Math random 1 or 2. If 1, milk/cookies. If 2, carrots/tea
    
    function getRandomNum(min, max) {
    return Math.floor( Math.random() * (max - min) + min)
    }

    function foodDrinkPerSecond (second) {
        for (let i = 0; i < second; i++) {
            let randomNum = getRandomNum(1, 3)
            homesVisitedEvery5or10secs.push(randomNum)   
        } 
    }

    // for homesVisitedEvery5or10secs, accumulate totals for m/c and c/t
    const accumulateFoodDrink = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
        let MilkCookiesPerSec = accumulateFoodDrink(homesVisitedEvery5or10secs, 1)
        let CarrotsTeaPerSec = accumulateFoodDrink(homesVisitedEvery5or10secs, 2)


    // For every 1, add 15 calories
    houseMilkCookies = MilkCookiesPerSec * milkCookies
    // For every 2, subtract 10 from calories
    houseCarrotsTea = CarrotsTeaPerSec * carrotsTea

    // recalcualte total calories
    santaCalories += (houseMilkCookies + houseCarrotsTea)

    // tot up total houses leave milk/cookies or carrot/tea
    totalMilkCookiesHouses += MilkCookiesPerSec
    totalCarrotsTeaHouses += CarrotsTeaPerSec
    
    // when he gets to his target, show how many seconds passed
    // add 1s to timeMs
    timeMs += 1

    // add 10 or 5 to houses visited total
    homesVisited += homesPerSecond
    // subtract house visited from 1,000,000 to give houses remaining
    homesRemaining = santaHouseTarget - homesVisited
    
    // clear array in loop, as homes visited per second must start from empty each second
    homesVisitedEvery5or10secs = []    
    
     console.log(`
        santaCalories: ${santaCalories}
        houseMilkCookies: ${houseMilkCookies},
        houseCarrotsTea: ${houseCarrotsTea},
        timeMs: ${timeMs},
        homesVisited: ${homesVisited},
        homesRemaining: ${homesRemaining},
        totalMilkCookiesHouses: ${totalMilkCookiesHouses}
        totalCarrotsTeaHouses: ${totalCarrotsTeaHouses}
        `)
        
        // display running totals in HTML
        // Dashboard display:

            // - nightly calorie target
            // - total nightly calories accumulated so far
            // - total number of homes who have left him milk & cookies
            // - total number of homes who have left him carrots & tea
            // - current delivery speed as a number of homes per second
            // - number of homes visited so far
            // - number of homes remaining.
            
        displaySantaCalories.textContent = santaCalories
        displayTotalMilkCookies.textContent = totalMilkCookiesHouses
        displayTotalCarrotsTea.textContent = totalCarrotsTeaHouses
        displayHomesPerSecond.textContent = homesPerSecond
        displayHomesVisited.textContent = homesVisited
        displayHomesRemaining.textContent = homesRemaining
        displayTimeMs.textContent = timeMs
    
    // if no homes remaining, clear interval and 'pause' timer
    if ( homesRemaining <= 0 ) {
        clearInterval(timer)
    }
    
} //end of runSimulation fn


// Dashboard updates once per second. 

let timer

startBtn.addEventListener('click', function() {
    timer = setInterval(runSimulation, 1000)
})

// clearInterval will in fact 'pause' the simulation. When press start again it should pick up where left off.

stopBtn.addEventListener("click", function() {
    clearInterval(timer)
})