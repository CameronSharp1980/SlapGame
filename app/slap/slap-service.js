function SlapService() {
    // *** PRIVATE ***
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
    var currentTarget = enemy;

    function Item(name, modifier, description) {
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

    function addMods(attack, currentTarget) {
        var modRunningTotal = 1;
        var finalTotal = 1;
        for (var i = 0; i < currentTarget.items.length; i++) {
            var item = currentTarget.items[i];
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
    function checkTarget(targetStr) {
        if (targetStr == 'player') {
            return player
        } else if (targetStr == 'enemy') {
            return enemy
        }
    }
    function checkItem(itemStr) {
        for (var item in itemsList) {
            if (itemsList.hasOwnProperty(item)) {
                var element = itemsList[item];
                // console.log(element)
                if (element.name == itemStr) {
                    // console.log(item)
                    // console.log(player.items)
                    // console.log(enemy.items)
                    return element
                }
            }
        }
    }



    // *** PUBLIC ***
    this.giveItem = function giveItem(item, target) {
        currentTarget = checkTarget(target)
        item = checkItem(item)
        for (var i = 0; i < currentTarget.items.length; i++) {
            var currentTargetItem = currentTarget.items[i].name;
            if (currentTargetItem == item.name) {
                return;
            }
        }
        if (item.name == 'Armor' && currentTarget.name == 'DoomGuy' || item.name == 'Helmet' && target.name == 'DoomGuy') {
            playerArmorLevel++;
        }
        if (item.name == 'Berserk Strength' && currentTarget.name == 'Imp') {
            playerBerserk = 1;
        }
        currentTarget.items.push(item)
        // console.log(target.items)
        // document.getElementsByClassName(`item-pickup`)[0].play(); //need to move function to controller and possible make getter
        // update();
    }
    this.fullHealthCheck = function fullHealthCheck(target){
        currentTarget = checkTarget(target)
        if (currentTarget.health >= 100) {
            return false
        }
        return true
    }
    this.hasNoItem = function hasNoItem(item, target) {
        currentTarget = checkTarget(target)
        if (currentTarget.items.length == 0) {
            return true
        }
        for (var i = 0; i < currentTarget.items.length; i++) {
            var currentItem = currentTarget.items[i];
            if (currentItem.name == item) {
                return false
            }
        }
        return true
    }
    this.punch = function punch(target) {
        currentTarget = checkTarget(target)
        currentTarget.health -= 1 * addMods('punchy', currentTarget);
        currentTarget.health = Math.floor(currentTarget.health);
        currentTarget.hits++
        currentTarget.health < 0 ? currentTarget.health = 0 : currentTarget.health = currentTarget.health
        console.log(currentTarget.health)
        // alert(health);
    }

    this.shotgun = function shotgun(target) {
        currentTarget = checkTarget(target)
        currentTarget.health -= 10 * addMods('shotty', currentTarget);
        currentTarget.health = Math.floor(currentTarget.health);
        currentTarget.hits++
        currentTarget.health < 0 ? currentTarget.health = 0 : currentTarget.health = currentTarget.health
        console.log(currentTarget.health)
        // alert(health);
    }

    this.rocket = function rocket(target) {
        currentTarget = checkTarget(target)
        currentTarget.health -= 20 * addMods('rockety', currentTarget);
        currentTarget.health = Math.floor(currentTarget.health);
        currentTarget.hits++
        currentTarget.health < 0 ? currentTarget.health = 0 : currentTarget.health = currentTarget.health
        console.log(currentTarget.health)
        // alert(health);
    }
    this.heal = function heal(target){
        // checkTarget(target).health - Could you use this? You need to reach the actual object
        currentTarget  = checkTarget(target) // *** I think you have a pass by reference issue here***
        currentTarget.health += 25
        if (currentTarget.health > 100) {
            currentTarget.health = 100
        }
        console.log(currentTarget.health)
    }
}