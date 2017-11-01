function SlapController() {
    var slapService = new SlapService()
    //PRIVATE PARTS


    //PUBLIC PARTS
    this.punch = function punch(target) {
        console.log("Punch: " + target)
    }
    this.shotgun = function shotgun(target) {
        console.log("Shotgun: " + target)
    }
    this.rocket = function rocket(target) {
        console.log("Rocket: " + target)
    }
    this.heal = function heal(target) {
        console.log("Heal: " + target)
    }
    this.giveItem = function giveItem(item, target){
        if(slapService.hasNoItem(item, target)){
            document.getElementsByClassName(`item-pickup`)[0].play();
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