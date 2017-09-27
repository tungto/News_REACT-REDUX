import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedGallery, clearSelectedGallery } from '../actions/gallery'
import { bindActionCreators } from 'redux'
import Slider from 'react-slick'

const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500
}

class GalleryItem extends Component {

    componentDidMount() {
        this.props.selectedGallery(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.clearSelectedGallery()
    }

    renderSlider = ({ selected }) => {
        if (selected) {
            const gallery = selected[0]
            return (
                <div>
                    <h3>The best of {gallery.artist}</h3>
                    <Slider {...settings}>
                        {gallery.images.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="slide-item">
                                    <div
                                        className="image"
                                    style={{background: `url(/images/galleries/${item.img}`}}>
                                    </div>
                                    <div className="description">
                                        <span>{item.desc}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            )
        }
    }

    render() {
        const item = this.props.gallery

        return (
            <div className="slide-item-wrap">
               {this.renderSlider(item)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gallery: state.gallery
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectedGallery, clearSelectedGallery }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem)