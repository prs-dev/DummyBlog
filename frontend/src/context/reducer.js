import { useReducer } from "react";

export const initialState = {
    loading: '',
    articles: [],
    filtered: null
}

export const setLoading = (payload) => {
    return {type: "loading", payload}
}

export const setToken = () => {
    return {type: "token"}
}

export const getAllArticles = (payload) => {
    return {type: "allArticles", payload}
}

export const removeArticles = () => {
    return {type: "removeArticles"}
}

export const removeArticle = (id) => {
    return {type: "removeArticle", payload: id}
}

export const category = (cat) => {
    return {type: "category", payload: cat}
}

export const reducer = (state, action) => {
    switch(action.type){
        case "loading": 
            return {
                ...state,
                loading: action.payload
            }
        case "allArticles":
            return {
                ...state,
                articles: action.payload
            }
        case "removeArticles":
            return {
                ...state,
                articles: []
            }
        case "removeArticle":
            return {
                ...state,
                articles: state.articles.filter(item => item._id !== action.payload)
            }
        case "category":
            return {
                ...state,
                filtered: state.articles.filter(item => item.cat.includes(action.payload))
            }
        default:
            return state
    }
}

// export const [state, dispatch] = useReducer(reducer, initialState)

// export const stateManage = {state, dispatch}