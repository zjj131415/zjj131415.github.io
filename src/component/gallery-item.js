import React from 'react'

export class GalleryItem extends React.Component {
    render() {
        const {imgUrl, title, desc} = this.props;
        var styleObj = {};

        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片的旋转角度有值并且不为0， 添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        // 如果是居中的图片， z-index设为11
        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        console.log(styleObj)
        return(
            <div className="gallery-item magictime" style={styleObj} ref={node => this.imgBox = node}>
                <section className="gallery-content">
                    <div className="gallery-wrapper">
                        <h2></h2>
                        <p></p>
                    </div>
                </section>
                <section className="">
                    <img onLoad={this.loadImg.bind(this)} src={imgUrl} alt="desc"/>
                </section>

                {/*<figcaption className="gallery-fig">*/}
                    {/*<h2 className="gallery-tit">{title}</h2>*/}
                    {/*<p className="gallery-desc">{desc}</p>*/}
                {/*</figcaption>*/}
            </div>
        )
    }

    loadImg() {
        this.imgBox.className = 'gallery-item magictime puffIn'
    }

    componentDidMount() {

    }

}