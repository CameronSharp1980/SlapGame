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

    // *** PUBLIC ***
}