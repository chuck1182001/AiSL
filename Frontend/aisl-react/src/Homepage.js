import React from 'react';
import CustomWebcam, { setShowPage, getShowPage } from './CustomWebcam';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHomepage: true,
            currentIndex: 0
        };
        this.stories = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec sagittis aliquam malesuada bibendum arcu. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Facilisi nullam vehicula ipsum a arcu. Duis ultricies lacus sed turpis. Neque egestas congue quisque egestas diam in arcu cursus. Est ullamcorper eget nulla facilisi. Vitae tortor condimentum lacinia quis vel eros donec. Sed euismod nisi porta lorem mollis aliquam. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Eget duis at tellus at. Nibh sed pulvinar proin gravida hendrerit lectus a. Libero enim sed faucibus turpis in eu. Lectus urna duis convallis convallis tellus. Dolor purus non enim praesent elementum facilisis leo. Tincidunt dui ut ornare lectus sit amet est placerat. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Luctus accumsan tortor posuere ac ut consequat. Ac turpis egestas integer eget aliquet nibh. Mus mauris vitae ultricies leo integer. Egestas integer eget aliquet nibh. Lobortis scelerisque fermentum dui faucibus. Enim sed faucibus turpis in eu mi. Aliquam sem et tortor consequat id porta nibh venenatis. Lorem ipsum dolor sit amet.", 
                         "Wow! This is so incredible!", 
                         "So do we!"];
        this.titles = ["Purdue Hackathoners make Forbes 30 Under 30",
                        "AI ASL App Makes Headlines",
                        "Do you love ASL?"]
    }

    componentDidMount() {
        this.checkShowPageInterval = setInterval(() => {
            const showAIPage = getShowPage();
            if (!showAIPage) {
                this.setState({ showHomepage: true });
            }
        }, 1000);

        this.interval = setInterval(() => {
            this.setState(prevState => ({
                currentIndex: (prevState.currentIndex + 1) % this.stories.length
            }));
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.checkShowPageInterval);
        clearInterval(this.interval);
    }

    handleClick = () => {
        this.setState({ showHomepage: false });
        setShowPage(true);
    }

    render() {
        const { showHomepage, currentIndex } = this.state;
         
        return (
        <>
            {showHomepage && (
            <div className="header">
                <p>Account</p>
                <p>Pricing</p>
                <p>Sets</p>
            </div>
            )}
            {showHomepage && (
            <div className="container">
                <div className="stories-container">
                    <story>
                        <h1>{this.titles[currentIndex]}</h1>
                        <p>{this.stories[currentIndex]}</p>

                        <div className="dots-container">
                            {this.stories.map((_, index) => (
                                <div
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                ></div>
                            ))}
                        </div>
                    </story>
                    
                    <div className="lesson-plan-container">
                        <p>Lesson Plan</p> 
                        <button class="circular-button first-button">24/26</button>
                        <button class="circular-button">3/5</button>
                        <button class="circular-button">9/16</button>
                        <button class="circular-button">1/7</button>
                        <div className="lesson-plan-container">
                            <p2>Alphabet</p2>
                            <p2>Greetings</p2>
                            <p2>Groceries</p2>
                            <p2>Continents</p2>
                        </div>
                    </div>
                    
                </div>
                <div className="btn-container-2" >
                    <p>Recent Sets</p>
                    <button>Greetings and Introductions</button>
                    <button>Fruits and Vegetables</button>
                    <div className="ai-container">
                        <panel onClick={this.handleClick}>Test your knowledge with AI</panel>
                    </div>
                </div>
                <div className="ad"></div>
            </div>
            )}
            {!showHomepage && <CustomWebcam />}
        </>
        );
    }
}

export default Homepage;
