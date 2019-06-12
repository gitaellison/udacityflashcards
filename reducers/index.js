import { ADD_CARD, ADD_DECK } from "../actions"

export default function state(state = {}, action) {

    switch (action.type) {

        case ADD_CARD: 
          const cardTitle = action.title.title;
            return {
                ...state,
                [cardTitle]: {
                    title: cardTitle,
                    questions: state[cardTitle].questions === undefined ? [action.card] : state[cardTitle].questions.concat(action.card)
                }
            }
        

        case ADD_DECK:
        const deckTitle = action.title
            return {
                ...state,
                [deckTitle]: {
                    title: deckTitle,
                    questions: []
                }
            }

        default:
            return state
    }
}