// var health = 100;
// var name = 'Imp'; //Before refactoring to Entity object
// var hits = 0;

function Entity(health, name) {
    this.name = name,
        this.health = health,
        this.hits = 0
    this.items = []
}

var enemy = new Entity(100, 'Imp');
var player = new Entity(100, 'DoomGuy');
// var demon = new Entity(150, 'Entity');
// var baronOfHell = new Entity(250, 'Baron of Hell');S

// Items instantiated as key names inside a pojo
function Item(name, modifier, description) { //Instantiate individual Items
    this.name = name,
        this.modifier = modifier,
        this.description = description
}

var itemsList = { //Store each individual item inside an object 
    berserkStrength: new Item('Berserk Strength', 50, 'Multiply punch damage by 100'),
    medKit: new Item('Med kit', 25, 'Restores 25 health'),
    armor: new Item('Armor', 0.5, 'Reduces damage by half')
}

function giveItem(item, target) {
        for (var i = 0; i < target.items.length; i++) {
            var targetItem = target.items[i].name;
            if (targetItem == item.name) {
                return;
            }
        }
    target.items.push(item)
}
function heal(target) {
    target.health += 25
    if (target.health > 100) {
        target.health = 100
    }
    update(target)
    console.log(enemy.health)
}

// giveItem(itemsList.berserkStrength, target)
// giveItem(items.armor, target)
// giveItem(items.medKit, target)
// console.log(`Items on ${target.name}: ${target.items[0].name}`)

function addMods(attack, target) {
    var modRunningTotal = 1
    for (var i = 0; i < target.items.length; i++) {
        var item = target.items[i];
        if (attack == 'punchy') {
            if (item.name == 'Berserk Strength') {
                modRunningTotal *= item.modifier
            }
        }
        if (item.name == 'Armor') {
            modRunningTotal *= item.modifier
        }
    }
    console.log(modRunningTotal)
    return modRunningTotal
}

function punch(target) {
    target.health -= 1 * addMods('punchy', target);
    target.health = Math.floor(target.health);
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    update()
}

function shotgun(target) {
    target.health -= 10 * addMods('shotty', target); // ******* Start here finishing the addmod parameters
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    update()
}

function rocket(target) {
    target.health -= 20 * addMods('rockety', target);
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
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
}
update();