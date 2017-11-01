function SlapController() {
    var slapService = new SlapService()
    //PRIVATE PARTS

    function update() {
        var updateEnemy = slapService.getTarget('enemy');
        var updatePlayer = slapService.getTarget('player');
        document.getElementsByClassName("enemy-name")[0].innerHTML = `Name: ${updateEnemy.name}<br>`;
        document.getElementsByClassName("enemy-hits")[0].innerText = `Hits: ${updateEnemy.hits}`;
        document.getElementsByClassName("enemy-health-bar")[0].style.width = `${updateEnemy.health}%`;
        document.getElementsByClassName("enemy-health-bar")[0].innerText = `${updateEnemy.health}%`;
        document.getElementsByClassName("player-name")[0].innerHTML = `Name: ${updatePlayer.name}<br>`;
        document.getElementsByClassName("player-hits")[0].innerText = `Hits: ${updatePlayer.hits}`;
        document.getElementsByClassName("player-hits-box")[0].innerText = `${updatePlayer.hits}`;
        document.getElementsByClassName("player-health-box")[0].innerText = `${updatePlayer.health}`;
        // if (playerArmorLevel == 1) {
        //     document.getElementsByClassName("armor-1")[0].style.display = "block";
        // } else if (playerArmorLevel > 1) {
        //     document.getElementsByClassName("armor-2")[0].style.display = "block";
        // }
        // if (playerBerserk == 1) {
        //     document.getElementsByClassName("berserk-img")[0].style.display = "block";
        // }
        if (updatePlayer.health <= 0) {
            document.getElementsByClassName("DoomGuy-death")[0].play();
            // document.getElementsByClassName("actionbar")[0].style.display = "none";
            document.getElementsByClassName("actionbar")[0].innerHTML = `
                <h1>Imp Wins!</h1>
            `;
        }
        if (updateEnemy.health <= 0) {
            document.getElementsByClassName("Imp-death")[0].play();
            // document.getElementsByClassName("actionbar")[0].style.display = "none";
            document.getElementsByClassName("actionbar")[0].innerHTML = `
            <h1>DoomGuy Wins!</h1>
        `;
        }
    }


    //PUBLIC PARTS
    this.punch = function punch(target) {
        slapService.punch(target)
        if (target == 'enemy') {
            document.getElementsByClassName('DoomGuy-punch')[0].play();
            document.getElementsByClassName('Imp-pain')[0].play();
        }
        if (target == 'player') {
            document.getElementsByClassName('Imp-attack')[0].play();
            document.getElementsByClassName('DoomGuy-pain')[0].play();
        }
        update();
    }
    this.shotgun = function shotgun(target) {
        slapService.shotgun(target)
        if (target == 'enemy') {
            document.getElementsByClassName('DoomGuy-shotgun')[0].play();
            document.getElementsByClassName('Imp-pain')[0].play();
        }
        if (target == 'player') {
            document.getElementsByClassName('Imp-soul')[0].play();
            document.getElementsByClassName('DoomGuy-pain')[0].play();
        }
        update();
    }
    this.rocket = function rocket(target) {
        slapService.rocket(target)
        if (target == 'enemy') {
            document.getElementsByClassName('Imp-pain')[0].play();
            document.getElementsByClassName('DoomGuy-explode')[0].play();
        }
        if (target == 'player') {
            document.getElementsByClassName('Imp-fireball')[0].play();
            document.getElementsByClassName('DoomGuy-pain')[0].play();
        }
        update();
    }
    this.heal = function heal(target) {
        if (slapService.fullHealthCheck(target)) {
            document.getElementsByClassName('item-pickup')[0].play();
        }
        slapService.heal(target)
        update();
    }
    this.giveItem = function giveItem(item, target) {
        if (slapService.hasNoItem(item, target)) {
            document.getElementsByClassName('item-pickup')[0].play();
        }
        slapService.giveItem(item, target)
        update();
    }
    update();
}

//PRIVATE VS PUBLIC FUNCTION DECLARATION:
//PUBLIC
// this.functionName = function functionName(){ //public function to the parent (slap-controller)
    //this.variableName = variableValue //only accessible to the parent (functionName)
//}

//PRIVATE
// function functionName(){ //only callable within parent (slap-controller)
//      var variableName = variableValue //lives and dies inside functionName
//}