// @flow

import * as React from 'react'

import iconPlaceholder from '../assets/IconPlaceholder.svg'
import styled from 'styled-components'
import { Text } from 'react-native-elements'
import type { ThemeType } from '../../../modules/layout/constants/theme'
import CategoryModel from '../../../modules/endpoint/models/CategoryModel'

const Row = styled.View`
  margin: 12px 0;
`

const SubCategory = styled.View`
`

const CategoryThumbnail = styled.Image`
  width: 40px;
  height: 40px;
  resize-mode: contain;
  padding: 8px;
`

const CategoryCaption = styled.Text`
  flex-grow: 1;
  padding: 15px 5px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.colors.themeColor};
`

const SubCategoryCaption = styled(CategoryCaption)`
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.themeColor};
`

const StyledLink = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  justifyContent:center;
  margin: 0 auto;
  width: 80%;
`

type PropsType = {
  category: CategoryModel,
  subCategories: Array<CategoryModel>,
  /** A search query to highlight in the category title */
  query?: string,
  theme: ThemeType,
  onItemPress: (tile: CategoryModel) => void
}

/**
 * Displays a single CategoryListItem
 */
class CategoryListItem extends React.Component<PropsType> {
  onItemPress = () => {
    this.props.onItemPress(this.props.category)
  }

  renderSubCategories (): Array<React.Node> {
    const {subCategories} = this.props
    return subCategories.map(subCategory =>
      <SubCategory key={subCategory.id}>
        <StyledLink onPress={this.onItemPress} underlayColor={this.props.theme.colors.backgroundAccentColor}>
          <SubCategoryCaption search={''}>
            <Text>{subCategory.title}</Text>
          </SubCategoryCaption>
        </StyledLink>
      </SubCategory>
    )
  }

  renderTitle (): React.Node {
    const {query} = this.props
    return <CategoryCaption search={query || ''}>
      <Text>{this.props.category.title}</Text>
    </CategoryCaption>
  }

  render () {
    const {category} = this.props
    return (
      <Row>
        <StyledLink onPress={this.onItemPress} underlayColor={this.props.theme.colors.backgroundAccentColor}>
          <>
            <CategoryThumbnail source={category.thumbnail ? {uri: category.thumbnail} : iconPlaceholder} />
            {this.renderTitle()}
          </>
        </StyledLink>
        {this.renderSubCategories()}
      </Row>
    )
  }
}

export default CategoryListItem