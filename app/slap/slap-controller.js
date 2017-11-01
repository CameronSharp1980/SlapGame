function SlapController() {
    var slapService = new SlapService()
    //PRIVATE PARTS


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
    }
    this.heal = function heal(target) {
        if (slapService.fullHealthCheck(target)) {
            document.getElementsByClassName('item-pickup')[0].play();
        }
        slapService.heal(target)
    }
    this.giveItem = function giveItem(item, target) {
        if (slapService.hasNoItem(item, target)) {
            document.getElementsByClassName('item-pickup')[0].play();
        }
        slapService.giveItem(item, target)
    }
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