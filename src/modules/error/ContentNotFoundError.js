// @flow

import { LoadingError } from '@integreat-app/integreat-api-client'

type NotFoundType = 'category' | 'event' | 'extra'

class ContentNotFoundError extends Error {
  _type: NotFoundType
  _id: string | number
  _city: string
  _language: string

  getMessage = (type: NotFoundType, id: string): string =>
    `The ${type} ${id} does not exist here.`

  constructor (params: { type: NotFoundType, id: string, city: string, language: string }) {
    super()
    this.message = this.getMessage(params.type, params.id)
    this._type = params.type
    this._id = params.id
    this._city = params.city
    this._language = params.language

    // https://github.com/babel/babel/issues/3083
    /* eslint-disable */
    // $FlowFixMe
    this.constructor = ContentNotFoundError
    // $FlowFixMe
    this.__proto__ = ContentNotFoundError.prototype
    /* eslint-enable */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoadingError)
    }
  }

  get type (): NotFoundType {
    return this._type
  }

  get id (): string | number {
    return this._id
  }

  get city (): string {
    return this._city
  }

  get language (): string {
    return this._language
  }
}

export default ContentNotFoundError
