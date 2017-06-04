import React from 'react'
import {findDOMNode} from 'react-dom'
import {GalleryItem} from '../component/index'
const imgData = require('../imgData.json');

//获取0-30°之间一个任意正负值
let get30DegRandom = () => {
    let deg = '';
    deg = (Math.random() > 0.5) ? '+' : '-';
    return deg + Math.ceil(Math.random() * 30);
}

//获取区间内的一个随机值
var getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);


export class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.Constant = {
            centerPos: {
                left: 0,
                    right: 0
            },
            hPosRange: {   // 水平方向的取值范围
                leftSecX: [0, 0],
                    rightSecX: [0, 0],
                    y: [0, 0]
            },
            vPosRange: {    // 垂直方向的取值范围
                x: [0, 0],
                    topY: [0, 0]
            }
        }
        this.state = {
            imgsArrangeArr: [
                //{
                //  pos:{
                //    left:'0',
                //    top:'0'
                //  },
                //    rotate:0, //旋转角度
                //isInverse:false //正反面
                //isCenter:false 图片是否居中
                //}
            ]
        };
    }
    render() {
        let imgFigures = [];
        imgData.map((item, index) => {
            imgFigures.push(
                <GalleryItem key={index}
                             title={item.title}
                             ref={node => this.imgFigure = node}
                             desc={item.desc}
                             imgUrl={require(`../images/${index}.jpg`)}/>
            )
        })
        return(
            <div className="container">
                <section className="stage" ref={node => this.stage = node}>
                    <section className="img-sec">
                        {imgFigures}
                    </section>
                </section>
            </div>
        )
    }

    rearrange(centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            imgsArrangTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
            topImgSpiceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        //首先居中centerIndex图片 ,centerIndex图片不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        }
        //取出要布局上测的图片的状态信息
        topImgSpiceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangTopArr = imgsArrangeArr.splice(topImgSpiceIndex, topImgNum);
        //布局位于上侧的图片
        imgsArrangTopArr.forEach((value, index) => {
            imgsArrangTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false

            };
        });

        //布局左两侧的图片
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLORX = null;

            //前半部分布局左边,右边部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        }
        if (imgsArrangTopArr && imgsArrangTopArr[0]) {
            imgsArrangeArr.splice(topImgSpiceIndex, 0, imgsArrangTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }

    componentDidMount() {
        // 首先拿到舞台的大小
        let stageDOM = this.stage,
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        // 拿到一个imageFigure的大小
        let imgFigureDOM = findDOMNode(this .imgFigure),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };

        // 计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        // 计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;
        console.log(this.Constant)
        // this.rearrange(0);
    }

}