// var health = 100;
// var name = 'Imp'; //Before refactoring to Demon object
// var hits = 0;

function Demon(health, name) {
    this.name = name,
        this.health = health,
        this.hits = 0
    this.items = []
}

var target = new Demon(100, 'Imp');
// var demon = new Demon(150, 'Demon');
// var baronOfHell = new Demon(250, 'Baron of Hell');S

// Items instantiated as key names inside a pojo
function item(name, modifier, description) { //Instantiate individual items
    this.name = name,
        this.modifier = modifier,
        this.description = description
}

var itemsList = { //Store each individual item inside an object 
    berserkStrength: new item('Berserk Strength', 50, 'Multiply punch damage by 100'),
    medKit: new item('Med kit', 25, 'Restores 25 health'),
    armor: new item('Armor', 0.5, 'Reduces damage by half')
}

function giveItem(item, target) {
    target.items.push(item)
}
function heal(){
    target.health += 25
    if(target.health > 100){
        target.health = 100
    }
    update()
    console.log(target.health)
}

// giveItem(itemsList.berserkStrength, target)
// giveItem(items.armor, target)
// giveItem(items.medKit, target)
// console.log(`Items on ${target.name}: ${target.items[0].name}`)

function addMods(attack) {
    var modRunningTotal = 1
    for (var i = 0; i < target.items.length; i++) {
        var item = target.items[i];
        if (attack == 'punchy') {
            if (item.name == 'Berserk Strength') {
                modRunningTotal *= item.modifier
            }
        }
        if(item.name == 'Armor'){
            modRunningTotal *= item.modifier
        }
    }
    console.log(modRunningTotal)
    return modRunningTotal
}

document.getElementById("demon-health-bar").style.width = `${target.health}%`;
document.getElementById("enemy-name").innerHTML = `Name: ${target.name}<br>`;
document.getElementById("enemy-hits").innerText = `Hits: ${target.hits}`;

function punch() {
    target.health -= 1 * addMods('punchy');
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    update()
}

function shotgun() {
    target.health -= 10 * addMods('shotty'); // ******* Start here finishing the addmod parameters
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    update()
}

function rocket() {
    target.health -= 20 * addMods('rockety');
    target.hits++
    target.health < 0 ? target.health = 0 : target.health = target.health
    // alert(health);
    update()
}

function update() {
    document.getElementById("demon-health-bar").style.width = `${target.health}%`;
    document.getElementById("demon-health-bar").innerText = `${target.health}%`;
    document.getElementById("enemy-hits").innerText = `Hits: ${target.hits}`;
}
update()