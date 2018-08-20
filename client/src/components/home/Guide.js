import React, { Component } from 'react';
import Img from 'react-image';

class Guide extends Component{

    render(){
        const image = '/api/storages/images/download/tle_partners.jpg';

        return(
           
            <div>
                <div className="card mt-3 border-info">
                    <div className="card-header bg-dark text-white">
                        Conversation Guide
                    </div>
                    <div className="card-body">


                        <Img src={ image } className="img-thumbnail img-fluid mx-auto d-block" alt="guide"/> 
                        <br/>

                        
                        <div className="card-group">

                            <div className="card bg-light mb-3" styles="max-width: 18rem;">
                                <div className="card-header text-white bg-warning">Before the first meeting</div>
                                <div className="card-body">
                                    <ul>
                                        <li>Contact your partner through the UCD Tandem Language Exchange to establish a meeting online, by phone, or face to face. If you would like to meet in person, we recommend your first meeting take place at a safe location on campus to ensure both safety and convenience.</li>
                                        <li>Determine a meeting length, for example, one hour each time.</li>
                                    </ ul>
                                </div>
                            </div>

                            <div className="card bg-light mb-3" styles="max-width: 18rem;">
                                <div className="card-header bg-primary text-white">Your first meeting</div>
                                <div className="card-body">
                                    <ul>
                                        <li>Introduce each other. Teach your partner how to say and write your name and discuss topics for conversation.</li>
                                        <li>Establish your language level. Tell your partner your current course level (if applicable) and/or years of experience in the target languages.</li>
                                        <li>Bring learning materials. Use travel guides, pictures, and maps to help you explain your country and culture and give you something to talk about.</li>
                                        <li>Be polite.</li>
                                        <li>Discuss your expectations.</li>
                                    </ul>
                                </div>
                            </div>

                        </div>



                        <div className="card-group">

                            <div className="card bg-light mb-3" styles="max-width: 18rem;">
                                <div className="card-header bg-dark text-white">Language exchange tips</div>
                                <div className="card-body">
                                    <ul>
                                        <li>Meet regularly. Whether it is every day, every week, or once a month, you should have a set, regular time to meet.</li>
                                        <li>Be prepared. You should meet your partner with topics of discussion in mind and/or questions you would like to ask. these topics may be good for your conversations: food, shopping, family, the arts (music, film, painting, dance, and sculpture), sports, hobbies, holidays, etc.</li>
                                        <li>Speak clearly. Ask your partner if you are speaking too fast.</li>
                                        <li>Switch off between languages. Try not to let one partner take over the conversation.</li>
                                        <li>Be aware of slang and idioms. If you use a phrase that cannot be translated literally into your partner's language, write it down and ask your partner if they know it. If they don't, explain it. This can include gesturing, drawing, and other means of explaining the slang or idiomatic term.</li>
                                        <li>Be culturally sensitive. If you do not know whether your question is appropriate or not, say, "May I ask...?"</li>
                                        <li>Show interest. Pay close attention to your partner and invite your partner to participate by asking, "What do you think?"</li>
                                        <li>Be flexible. Most participants are busy people, so try to be understanding and flexible with change, if necessary.</li>
                                    </ul>
                                </div>
                            </div>    

                         </div>
                        </div>
        
                    </div>
            </div>
        )
    }
}

export default Guide;