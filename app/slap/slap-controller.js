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
    this.giveItem = function giveItem(item, target) {
        console.log(item, target)
    }
    this.heal = function heal(target) {
        console.log("Heal: " + target)
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