
import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import avatarPlaceholder from '../assets/avatar_placeholder'
import JavascriptTimeAgo from 'javascript-time-ago'
import fr from 'javascript-time-ago/locale/fr'
JavascriptTimeAgo.locale(fr)

export default class PipelineApplication extends React.Component {

  render() {
    const candidate = this.props.pipelineApplication.candidate;
    return (
      <div className="bg-white rounded-sm border border-gray-300 whitespace-pre-wrap">
        <div className="border-b border-b-gray-300 p-2 flex justify-start items-start">
          <img className="h-16 w-16 rounded-full flex-shrink-0 mr-3" src={candidate['avatar_url'] || avatarPlaceholder } />
          <div className="mt-1 w-full">
            <div className="flex items-top">
              <h3 className="font-bold" data-test-element="user_display_name">{ candidate['display_name'] }</h3>
              <i className="material-icons flex-1 text-right text-gray-600">notifications</i>
            </div>
            <p className="mt-1 text-gray-600">{ candidate['bio'] }</p>
          </div>
        </div>
        <div className="p-2 text-sm font-bold">
          
          <span className="text-gray-500 flex items-center justify-start">
            <span className="bg-welcome-green px-2 rounded-lg text-white mr-2">3.6</span>
            <span className="mr-2 flex items-center">
              <i className="material-icons">thumb_up</i> 5
            </span>
            <span className="mr-2 flex items-center">
            <i className="material-icons">mode_comment</i> 6
            </span>
            <span className="mr-2 flex items-center">
            <i className="material-icons">email</i> 5
            </span>
            <span className="flex-1 text-right font-thin">
              <ReactTimeAgo locale="fr" date={new Date(this.props.pipelineApplication['created_at'])}/>    
            </span>
          </span>
        </div>
      </div>
    )
  }
}

