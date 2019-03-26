// @flow

import React from 'react'
import type { TFunction } from 'react-i18next'
import { translate } from 'react-i18next'
import type Moment from 'moment'
import styled from 'styled-components/native'

const TimeStampText = styled.Text`
  color: ${props => props.theme.colors.textSecondaryColor};
  /*font-family: ${props => props.theme.fonts.contentFontFamily};*/
  /*font-size: ${props => props.theme.fonts.contentFontSize};*/
`

type PropsType = {
  lastUpdate: Moment,
  t: TFunction,
  language: string
}

export class TimeStamp extends React.PureComponent<PropsType> {
  render () {
    const {lastUpdate, t, language} = this.props
    lastUpdate.locale(language)

    // only show day, month and year
    const timestamp = lastUpdate.format('LL')

    return <TimeStampText>{t('lastUpdate')}{timestamp}</TimeStampText>
  }
}

export default translate('categories')(TimeStamp)