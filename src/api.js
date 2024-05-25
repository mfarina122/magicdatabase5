const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells() {
  return fetch(BASE_URL + "/api/spells").then((response) => response.json());
}
export async function getASpellInformation(spell){
    console.log(BASE_URL+spell);
    return fetch(BASE_URL+spell).then((response) => response.json());
}
export async function getSpellsByClass(className){
  return fetch(BASE_URL + "/api/classes/"+className+"/spells").then((response) => response.json());
}