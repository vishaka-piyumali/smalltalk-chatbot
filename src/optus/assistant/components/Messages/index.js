import React, { Component } from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import chatIconUrl from '../../assets/oa_avatar.png'

class Message extends Component {

	_renderMessageOfType (type) {
		switch(type) {
			case 'text':
				return <TextMessage {...this.props.message} />
			case 'emoji':
				return <EmojiMessage {...this.props.message} />
			default : return ''
		}
	}

	render () {
		let contentClassList = [
			"sc-message--content",
			(this.props.message.author === "me" ? "sent" : "received"),
			(this.props.message.displayAuthor ? '': 'hide-avatar')
		];
		return (
		  <div className="sc-message">
			<div className={contentClassList.join(" ")}>
				<div className="sc-message--avatar" style={{
					backgroundImage: `url(${chatIconUrl})`
					}}>
				</div>
				{this._renderMessageOfType(this.props.message.type)}
			</div>
		</div>)
	}
}

export default Message