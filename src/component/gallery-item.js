import React from 'react'

export class GalleryItem extends React.Component {
    render() {
        const {imgUrl, title, desc} = this.props;
        return(
            <div className="gallery-item magictime" ref={node => this.imgBox = node}>
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