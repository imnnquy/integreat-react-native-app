// @flow

import * as React from 'react'
import { ScrollView } from 'react-native'
import type { TFunction } from 'react-i18next'
import { ExtraModel, WohnenOfferModel } from '@integreat-app/integreat-api-client'
import OfferDetail from './OfferDetail'
import Caption from '../../../modules/common/components/Caption'
import OfferListItem from './OfferListItem'
import List from '../../../modules/common/components/List'
import { hashWohnenOffer } from '../../extras/hashWohnenOffer'
import Failure from '../../../modules/error/components/Failure'
import type { ThemeType } from '../../../modules/theme/constants/theme'

type PropsType = {|
  offers: Array<WohnenOfferModel>,
  offerHash?: WohnenOfferModel,
  wohnenExtra: ExtraModel,
  navigateToOffer: (offerHash: string) => void,
  t: TFunction,
  theme: ThemeType
|}

class WohnenExtra extends React.Component<PropsType> {
  renderOfferListItem = (offer: WohnenOfferModel) => {
    const hashedOffer = hashWohnenOffer(offer)
    return (
      <OfferListItem key={hashedOffer}
                     offer={offer}
                     navigateToOffer={this.navigateToOffer(hashedOffer)}
                     theme={this.props.theme} />)
  }

  navigateToOffer = (offerHash: string) => () => {
    this.props.navigateToOffer(offerHash)
  }

  render () {
    const {offers, wohnenExtra, offerHash, t, theme} = this.props

    if (offerHash) {
      const offer = offers.find(_offer => hashWohnenOffer(_offer) === offerHash)

      if (!offer) {
        return <Failure error={new Error('Angebot nicht gefunden.')} />
      }

      return (
        <OfferDetail offer={offer} theme={theme} />
      )
    }

    return (
      <ScrollView>
        <Caption title={wohnenExtra.title} theme={theme} />
        <List noItemsMessage={t('noOffersAvailable')}
              items={offers}
              renderItem={this.renderOfferListItem}
              theme={theme} />
      </ScrollView>
    )
  }
}

export default WohnenExtra
