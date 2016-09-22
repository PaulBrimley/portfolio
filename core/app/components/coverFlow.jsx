import React, { Component } from "react";
import Coverflow from 'react-coverflow';

class CoverFlowComponent extends Component {

    render() {
        return(
            <div>
                <Coverflow
                    width={960}
                    height={250}
                    displayQuantityOfSide={2}
                    navigation={true}
                    enableHeading={false}>
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                    <img src='http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/07/Cool-Nature-Pictures-1.jpg' alt='title or description' />
                </Coverflow>
            </div>

        );
    }
}

export default CoverFlowComponent;