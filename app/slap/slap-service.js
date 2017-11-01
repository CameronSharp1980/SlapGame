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
        target = checkTarget(target)
        item = checkItem(item)
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
        // console.log(target.items)
        // document.getElementsByClassName(`item-pickup`)[0].play(); //need to move function to controller and possible make getter
        // update();
    }
    this.hasNoItem = function hasNoItem(item, target) {
        target = checkTarget(target)
        if (target.items.length == 0) {
            return true
        }
        for (var i = 0; i < target.items.length; i++) {
            var currentItem = target.items[i];
            if (currentItem.name == item) {
                return false
            }
        }
        return true
    }

}