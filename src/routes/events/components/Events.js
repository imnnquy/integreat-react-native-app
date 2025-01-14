// @flow

import * as React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import type { TFunction } from 'react-i18next'
import { EventModel } from '@integreat-app/integreat-api-client'
import Page from '../../../modules/common/components/Page'
import ContentNotFoundError from '../../../modules/error/ContentNotFoundError'
import PageDetail from '../../../modules/common/components/PageDetail'
import EventListItem from './EventListItem'
import List from '../../../modules/common/components/List'
import Caption from '../../../modules/common/components/Caption'
import Failure from '../../../modules/error/components/Failure'
import type { ThemeType } from '../../../modules/theme/constants/theme'
import type { LanguageResourceCacheStateType } from '../../../modules/app/StateType'
import type { NavigationScreenProp } from 'react-navigation'
import type { NavigateToEventParamsType } from '../../../modules/app/createNavigateToEvent'
import type { NavigateToIntegreatUrlParamsType } from '../../../modules/app/createNavigateToIntegreatUrl'

type PropsType = {|
  events: ?Array<EventModel>,
  cityCode: string,
  language: string,
  t: TFunction,
  path?: string,
  theme: ThemeType,
  navigation: NavigationScreenProp<*>,
  navigateToEvent: NavigateToEventParamsType => void,
  navigateToIntegreatUrl: NavigateToIntegreatUrlParamsType => void,
  resourceCache: LanguageResourceCacheStateType
|}

/**
 * Displays a list of events or a single event, matching the route /<location>/<language>/events(/<id>)
 */
export default class Events extends React.Component<PropsType> {
  navigateToEvent = (path: string) => () => {
    const {navigateToEvent, cityCode, language} = this.props
    navigateToEvent({cityCode, language, path})
  }

  renderEventListItem = (language: string) => (event: EventModel) =>
    <EventListItem key={event.path}
                   event={event}
                   language={language}
                   theme={this.props.theme}
                   navigateToEvent={this.navigateToEvent(event.path)} />

  onRefresh = () => {
    const {navigation, navigateToEvent, cityCode, language, path} = this.props
    navigateToEvent({cityCode, language, path, forceUpdate: true, key: navigation.getParam('key')})
  }

  render () {
    const {events, path, cityCode, language, resourceCache, theme, navigateToIntegreatUrl, t, navigation} = this.props
    const loading = !events
    if (events && path) {
      const event: EventModel = events.find(_event => _event.path === path)

      if (event) {
        const files = resourceCache[event.path]
        return <ScrollView refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={loading} />}>
          <Page content={event.content}
                title={event.title}
                lastUpdate={event.lastUpdate}
                language={language}
                files={files}
                theme={theme}
                cityCode={cityCode}
                navigation={navigation}
                navigateToIntegreatUrl={navigateToIntegreatUrl}>
            <>
              <PageDetail identifier={t('date')} information={event.date.toFormattedString(language)} theme={theme} />
              <PageDetail identifier={t('location')} information={event.location.location} theme={theme} />
            </>
          </Page>
        </ScrollView>
      }
      const error = new ContentNotFoundError({type: 'event', id: path, city: cityCode, language})
      return <Failure error={error} />
    }

    return <ScrollView refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={loading} />}>
      {events && <>
        <Caption title={t('news')} theme={theme} />
        <List noItemsMessage={t('currentlyNoEvents')}
              items={events}
              renderItem={this.renderEventListItem(language)}
              theme={theme} />
      </>}
    </ScrollView>
  }
}
