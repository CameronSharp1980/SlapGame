// var health = 100;
// var name = 'Imp'; //Before refactoring to Entity object
// var hits = 0;

function Entity(health, name, type) {
    this.name = name,
        this.health = health,
        this.hits = 0,
        this.type = type,
        this.items = []
}

var enemy = new Entity(100, 'Imp', 'demon');
var player = new Entity(100, 'DoomGuy', 'human');
var playerArmorLevel = 0;
var playerBerserk = 0;
// var demon = new Entity(150, 'Entity');
// var baronOfHell = new Entity(250, 'Baron of Hell');

// Items instantiated as key names inside a pojo
function Item(name, modifier, description) { //Instantiate individual Items
    this.name = name,
        this.modifier = modifier,
        this.description = description
}

var itemsList = { //Store each individual item inside an object 
    berserkStrength: new Item('Berserk Strength', 50, 'Multiply punch damage by 100'),
    medKit: new Item('Med kit', 25, 'Restores 25 health'),
    armor: new Item('Armor', -0.25, 'Reduces damage by 25%'),
    helmet: new Item('Helmet', -0.25, 'Reduces damage by 25%')
}

function giveItem(item, target) {
    for (var i = 0; i < target.items.length; i++) {
        var targetItem = target.items[i].name;
        if (targetItem == item.name) {
            return;
        }
    }
    if (item.name == 'Armor' && target.name == 'DoomGuy' || item.name == 'Helmet' && target.name == 'DoomGuy') {
        playerArmorLevel++;
    }
    if (item.name == 'Berserk Strength' && target.name == 'Imp') {
        playerBerserk = 1;
    }
    target.items.push(item)
    document.getElementsByClassName(`item-pickup`)[0].play();
    update();
}
function heal(target) {
    target.health += 25
    document.getElementsByClassName(`item-pickup`)[0].play();
    if (target.health > 100) {
        target.health = 100
    }
    update();

}

// giveItem(itemsList.berserkStrength, target)
// giveItem(items.armor, target)
// giveItem(items.medKit, target)
// console.log(`Items on ${target.name}: ${target.items[0].name}`)

function addMods(attack, target) {
    var modRunningTotal = 1;
    var finalTotal = 1;
    for (var i = 0; i < target.items.length; i++) {
        var item = target.items[i];
        if (item.name == 'Armor') {
            modRunningTotal += item.modifier;
        }
        if (item.name == 'Helmet') {
            modRunningTotal += item.modifier;
        }
        if (item.name == 'Berserk Strength' && attack == 'punchy') {
            finalTotal += item.modifier - 1;
        }
    }
    finalTotal = finalTotal * modRunningTotal;
    console.log(modRunningTotal)
    return finalTotal;
}

function punch(target) {
    target.health -= 1 * addMods('punchy', target);
    target.health = Math.floor(target.health);
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    if (target.type == 'demon') {
        document.getElementsByClassName(`${player.name}-punch`)[0].play();
        document.getElementsByClassName(`${target.name}-pain`)[0].play();
    }
    if (target.type == 'human') {
        document.getElementsByClassName(`${enemy.name}-attack`)[0].play();
        document.getElementsByClassName(`${target.name}-pain`)[0].play();
    }
    update()
}

function shotgun(target) {
    target.health -= 10 * addMods('shotty', target); // ******* Start here finishing the addmod parameters
    target.health = Math.floor(target.health);
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    if (target.type == 'demon') {
        document.getElementsByClassName(`${player.name}-shotgun`)[0].play();
        document.getElementsByClassName(`${target.name}-pain`)[0].play();
    }
    if (target.type == 'human') {
        document.getElementsByClassName(`${enemy.name}-soul`)[0].play();
        document.getElementsByClassName(`${target.name}-pain`)[0].play();
    }
    update()
}

function rocket(target) {
    target.health -= 20 * addMods('rockety', target);
    target.health = Math.floor(target.health);
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    if (target.type == 'demon') {
        document.getElementsByClassName(`${player.name}-explode`)[0].play();
        document.getElementsByClassName(`${target.name}-pain`)[0].play();
    }
    if (target.type == 'human') {
        document.getElementsByClassName(`${enemy.name}-fireball`)[0].play();
        document.getElementsByClassName(`${target.name}-pain`)[0].play();
    }
    update()
}

function update() {
    document.getElementsByClassName("enemy-name")[0].innerHTML = `Name: ${enemy.name}<br>`;
    document.getElementsByClassName("enemy-hits")[0].innerText = `Hits: ${enemy.hits}`;
    document.getElementsByClassName("enemy-health-bar")[0].style.width = `${enemy.health}%`;
    document.getElementsByClassName("enemy-health-bar")[0].innerText = `${enemy.health}%`;
    document.getElementsByClassName("player-name")[0].innerHTML = `Name: ${player.name}<br>`;
    document.getElementsByClassName("player-hits")[0].innerText = `Hits: ${player.hits}`;
    document.getElementsByClassName("player-hits-box")[0].innerText = `${player.hits}`;
    document.getElementsByClassName("player-health-box")[0].innerText = `${player.health}`;
    if (playerArmorLevel == 1) {
        document.getElementsByClassName("armor-1")[0].style.display = "block";
    } else if (playerArmorLevel > 1) {
        document.getElementsByClassName("armor-2")[0].style.display = "block";
    }
    if (playerBerserk == 1) {
        document.getElementsByClassName("berserk-img")[0].style.display = "block";
    }
    if (player.health <= 0) {
        document.getElementsByClassName("DoomGuy-death")[0].play();
        // document.getElementsByClassName("actionbar")[0].style.display = "none";
        document.getElementsByClassName("actionbar")[0].innerHTML = `
            <h1>Imp Wins!</h1>
        `;
    }
    if (enemy.health <= 0) {
        document.getElementsByClassName("Imp-death")[0].play();
        // document.getElementsByClassName("actionbar")[0].style.display = "none";
        document.getElementsByClassName("actionbar")[0].innerHTML = `
        <h1>DoomGuy Wins!</h1>
    `;
    }
}
update();