// @flow

import type { CityContentStateType } from '../../app/StateType'
import { defaultCityContentState } from '../../app/StateType'
import morphContentLanguage from './morphContentLanguage'
import pushCategory from './pushCategory'
import pushEvent from './pushEvent'
import type { CityContentActionType } from '../../app/StoreActionType'
import setCityContentLocalization from './setCityContentLocalization'

export default (
  state: CityContentStateType = defaultCityContentState, action: CityContentActionType
): CityContentStateType => {
  switch (action.type) {
    case 'SET_CITY_CONTENT_LOCALIZATION':
      return setCityContentLocalization(state, action)
    case 'PUSH_LANGUAGES':
      return {...state, languages: action.params.languages}
    case 'PUSH_CATEGORY':
      return pushCategory(state, action)
    case 'PUSH_EVENT':
      return pushEvent(state, action)
    case 'MORPH_CONTENT_LANGUAGE':
      return morphContentLanguage(state, action)
    case 'FETCH_EVENT':
    case 'CLEAR_EVENT': {
      const {key} = action.params
      delete state.eventsRouteMapping[key]
      return state
    }
    case 'FETCH_EVENT_FAILED': {
      const errorMessage: string = action.params.message
      return {...state, eventsRouteMapping: {errorMessage}}
    }
    case 'FETCH_CATEGORY':
    case 'CLEAR_CATEGORY': {
      const {key} = action.params
      delete state.categoriesRouteMapping[key]
      return state
    }
    case 'FETCH_CATEGORY_FAILED': {
      const errorMessage: string = action.params.message
      return {...state, categoriesRouteMapping: {errorMessage}}
    }
    case 'CLEAR_CITY_CONTENT':
      return defaultCityContentState
    case 'RESOURCES_FETCH_FAILED': {
      const errorMessage: string = action.params.message
      return {...state, resourceCache: {errorMessage}}
    }
    default:
      return state
  }
}
