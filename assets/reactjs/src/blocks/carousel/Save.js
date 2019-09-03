const { Component } = wp.element
const { InnerBlocks } = wp.editor
import { animationAttr, isObject } from '../../components/HelperFunction'
class Save extends Component {
  responsiveProperties(){
    const { items } = this.props.attributes
    let xs = typeof items.xs === 'undefined' ? items.sm : items.xs
        xs = typeof xs === 'undefined' ? items.md : xs
    return [
      {
          viewport: 1170,
          items: items.md
      },
      {
          viewport: 768,
          items: typeof items.sm === 'undefined' ? items.sm : items.md
      },
      {
          viewport: 480,
          items: xs
      }
  ]
  }
  render() {
    const { 
      uniqueId, 
      items, 
      animation,
      autoplay,
      interval,
      speed,
      dots,
      nav,
      center
    } = this.props.attributes
    
    const options = {autoplay,interval,speed,dots,nav,center}
    if( isObject(items) ){
      options.responsive = this.responsiveProperties()
    }else{
      options.items = items
    }
    return (
        <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)} options={JSON.stringify(options)}>
            <div className={`qubely-block-carousel qubely-slider`}>
                <InnerBlocks.Content />
            </div>
        </div>
    )
  }
}

export default Save