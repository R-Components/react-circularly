import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import './style.less';

class CycleScroll extends Component {
    
    static propTypes = {
        content: PropTypes.node.isRequired,
        gap: PropTypes.number,
        speed: PropTypes.number
    }

    static defaultProps = {
        gap: 0,
        speed: 100
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {speed} = this.props;
        const wrap = this.refs.wrap;
        const scrollDiv1 = this.refs.content1;
        const scrollDiv2 = this.refs.content2;
        wrap.style.height = 145 + 'px'; // 初始值
        let MyMar;
        function Marquee() {
            if (scrollDiv2.offsetHeight === wrap.scrollTop) {
                wrap.scrollTop -= scrollDiv1.offsetHeight;
            }
            wrap.scrollTop++;
        }
        
        setTimeout(function() {
            // console.log(scrollDiv1.offsetHeight);
            // 使用定时器 确保DOM已经加载完毕
            wrap.style.height = scrollDiv1.offsetHeight + 'px';
            MyMar = setInterval(Marquee, speed);
        }, 600);
       
        wrap.onmouseover = function StartScroll() {
            clearInterval(MyMar);
        };

        wrap.onmouseout = function StopScroll() {
            MyMar = setInterval(Marquee, speed);
        };
    }

    componentWillReceiveProps(nextProps) {
      
        if (!this.props.content.props.children && nextProps.content.props.children.length > 0) {

            const { speed } = this.props;
            const wrap = this.refs.wrap;
            const scrollDiv1 = this.refs.content1;
            const scrollDiv2 = this.refs.content2;
            
            let MyMar;
            function Marquee() {
                if (scrollDiv2.offsetHeight === wrap.scrollTop) {
                    wrap.scrollTop -= scrollDiv1.offsetHeight;
                }
                wrap.scrollTop++;
            }
            setTimeout(function() {
                // console.log(scrollDiv1.offsetHeight);
                // 使用定时器 确保DOM已经加载完毕
                wrap.style.height = scrollDiv1.offsetHeight + 'px';
                MyMar = setInterval(Marquee, speed);
            }, 600);
        
            wrap.onmouseover = function StartScroll() {
                clearInterval(MyMar);
            };

            wrap.onmouseout = function StopScroll() {
                MyMar = setInterval(Marquee, speed);
            };
        }
    }

    render() {
        const { content } = this.props;
        return (
            <div>
                <div ref="wrap" className="cycle-wrap">
                    <div ref="content1" className="cycle-content">
                        {this.props.content}
                    </div>
                    <div ref="content2" className="cycle-content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default CycleScroll;