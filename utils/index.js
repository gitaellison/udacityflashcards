import {AsyncStorage} from "react-native"

export function saveDeckTitle(title){
    const obj = {title,
                questions : [] }
    return AsyncStorage.setItem(title, JSON.stringify(obj))
}

export function addCardToDeck({title, cards}){
    const obj = {
        questions: cards
    }
    return AsyncStorage.mergeItem(title, JSON.stringify(obj))
}

export function getDeck(title){
    return AsyncStorage.getItem(title)
}

export function getAllDecks(){
  return AsyncStorage.getAllKeys().then((decks) => {
      return AsyncStorage.multiGet(decks)
  })
}

