import React, { Component } from "react";

class ProfileInfo extends Component {

    render() {

        return(
            <div className="profileInfo">
                <div className="profileInfoHeader">
                    <div className="profileInfoHeaderInside">
                        Profile Information
                    </div>
                </div>
                <div className="profileInfoBody">
                    <div>
                        <p>Paul is a hard working professional, constantly stretching and applying himself in learning the many aspects of website development from front-end UI/UX to full MEAN stack applications. He has pushed himself to learn new technologies such as Socket.io, Passport authentication (Session, Local, Facebook, Google), Firebase, React, and jQuery and is pushing to learn more, including React-Native and Angular2.</p>

                        <p>Paul has worked with TurnkeySocial in Provo, Utah for six months. He enjoyed using his knowledge of Angular to help them re-work portions of their application into an Angular front-end.</p>

                        <p>Paul is dependable and driven to accomplish anything he sets out to do. He learns from mistakes and quickly adapts to any situation he is in to be the best possible. When given any responsibility his determination to succeed is unparalleled. Paul is a team player who is accountable for his part in any task and will help those on his team accomplish their part if needed. Paul can also work autonomously and problem solve to achieve success.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileInfo;