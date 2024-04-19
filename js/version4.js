/*************************************
******** INTERFACE
*************************************/

window.onload = function(){
  window.location.href = "#cul-de-chouette";
};

/*************************************
******** WEB
*************************************/

let total = 0;
let stage = 0;
let dés=[];

function RandomDice(){
return Math.ceil(Math.random() * 6);
}

function LaunchDices(){
    switch(stage){
        case 0:
            ResetDice();
            stage = 1;
            document.getElementById("start").innerHTML = "Lancer les chouettes";
        break;
        case 1:
            dés[0] = LaunchDice(1);
            dés[1] = LaunchDice(2);
            stage = 2;
            document.getElementById("start").innerHTML = "Lancer le cul";
        break;
        case 2:
            dés[2] = LaunchDice(3);
            Check();
            stage = 3;
            document.getElementById("start").innerHTML = "Jet suivant";
        break;
        case 3:
            ResetDice();
            if(total < 343){
                stage = 1;
                document.getElementById("start").innerHTML = "Lancer les chouettes";
            }else{
                document.getElementById("start").innerHTML = "Vous avez gagné la partie !";
                document.getElementById("total").innerHTML = "0";
                setTimeout(() =>{
                    stage = 0;
                    total = 0;
                    document.getElementById("start").innerHTML = "Commencer une partie";
                    document.getElementById("total").innerHTML = "0";
                }, 2000);
            }
        break;
    }
}

function LaunchDice(number){
    let dice = RandomDice();
    document.getElementById("Dé"+number).src = "assets/images/dice" + dice + ".png";
    return dice;
}

function Check(){
    let comb = combination(dés[0],dés[1],dés[2]);

    //Vérifie qu'une combinaison fait gagner des points et affiche ces points et la combinaison réalisée ainsi qu'un changement de couleur
    if(comb.value !== undefined){
        total += comb.score;
        document.getElementById("combination").innerHTML = `${comb.name} de ${comb.value}`;
        document.getElementById("combination").style.backgroundColor = '#dda148';
        document.getElementById("points").innerHTML = `+ ${comb.score}`;
        document.getElementById("points").style.backgroundColor = '#9b443f';
    }else{
        //Sinon, affiche la combinaison réalisée ainsi qu'un changement de couleur mais n'affiche rien pour le nombre de points
        document.getElementById("combination").innerHTML = `${comb.name}`;
        document.getElementById("combination").style.backgroundColor = '#dda148';
        document.getElementById("points").innerHTML = ``;
        document.getElementById("points").style.backgroundColor = '';
    }
    document.getElementById("total").innerHTML = `${total}`;
}

function ResetDice(){
    //Réinitialise la valeur des trois dés en affichant des dés vierges
    document.getElementById("Dé1").src = "assets/images/dice0.png";
    document.getElementById("Dé2").src = "assets/images/dice0.png";
    document.getElementById("Dé3").src = "assets/images/dice0.png";

    //Affiche des blocs vierges pour la combinaison effectuée et les points gagnés et réinitialise la couleur
    document.getElementById("combination").innerHTML = ``;
    document.getElementById("combination").style.backgroundColor = '';
    document.getElementById("points").innerHTML = ``;
    document.getElementById("points").style.backgroundColor = '';
}

/*************************************
******** FONCTIONNEMENT DU JEU
*************************************/

//Fonction Cul de Chouette
function CuldeChouette(dice1, dice2, dice3){
  let result = new Object();
  result.name="Cul de Chouette";
  result.score=40+10*dice1;
  result.value=dice1;
  return dice1===dice2 && dice2===dice3 ? result : false;
}

//Fonction Chouette
function Chouette(dice1, dice2, dice3){
  let combination = (dice1===dice2 && dice1!==dice3) ? dice1 : (dice2===dice3 && dice2 !==dice1) ? dice2 : (dice1===dice3 && dice1!==dice2) ? dice1 : 0;
  let result = new Object();
  result.name="Chouette";
  result.score=combination**2;
  result.value=combination;
  return (dice1===dice2 && dice1!==dice3) || (dice2===dice3 && dice2 !==dice1) || (dice1===dice3 && dice1!==dice2) ? result : false;
}

//Fonction Velute
function Velute(dice1, dice2, dice3){
  let result = new Object();
  result.name="Velute";
  result.score=2*Math.max(dice1, dice2, dice3)**2;
  result.value=Math.max(dice1, dice2, dice3);
  return (dice1 + dice2 === dice3) || (dice2 + dice3 === dice1) || (dice1 + dice3 === dice2) ? result : false;
}

//Fonction Chouette-Velute
function ChouetteVelute(dice1, dice2, dice3){
  let result = new Object();
  result.name="Chouette-Velute";
  result.score=2*Math.max(dice1, dice2, dice3)**2;
  result.value=Math.max(dice1, dice2, dice3);
  return Chouette(dice1, dice2, dice3) && Velute(dice1, dice2, dice3) ? result : false;
}

//Fonction Suite
function Suite(dice1, dice2, dice3){
  let dices = [dice1, dice2, dice3];
  dices.sort((a, b) => a - b);
  let result = new Object();
  result.name="Suite";
  result.score=0;
  return dices[1]===dices[0]+1 && dices[2]===dices[1]+1 ? result : false;
}

//Fonction Néant
function Neant(dice1, dice2, dice3){
  let result = new Object();
  result.name="Néant";
  result.score=0;
  return result;
}

function combination(dice1, dice2, dice3){
  if(ChouetteVelute(dice1, dice2, dice3)){
      return ChouetteVelute(dice1, dice2, dice3);
  }else if(Chouette(dice1, dice2, dice3)){
      return Chouette(dice1, dice2, dice3);
  }else if(Velute(dice1, dice2, dice3)){
      return Velute(dice1, dice2, dice3);
  }else if(CuldeChouette(dice1, dice2, dice3)){
      return CuldeChouette(dice1, dice2, dice3);
  }else if(Suite(dice1, dice2, dice3)){
      return Suite(dice1, dice2, dice3);
  }else{
      return Neant(dice1, dice2, dice3);
  }
}