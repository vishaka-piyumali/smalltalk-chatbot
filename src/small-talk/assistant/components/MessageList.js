import React, { Component } from 'react';
import Message from './Messages/index';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

class MessageList extends Component {

	componentDidUpdate(prevProps, prevState) {
		setTimeout(this.scrollChat(), 4000);

	}
	scrollChat () {
		this.scrollList.scrollTop = this.scrollList.scrollHeight;
		console.log('scrolling');
	}

	renderMessage (message, i) {
		if (message.author !== 'me') {
		 return (<CSSTransition
			key={i}
			timeout={500}
			classNames="fade"
					>
					<Message message={message} key={i} />
					</CSSTransition>)
		} else {
			return <Message message={message} key={i} />
		}
	}
	render () {
		return (
				<div  className="sc-message-list" ref={el => this.scrollList = el}>
				<TransitionGroup appear={true} >
					{this.props.messages.map((message, i) => {
						return this.renderMessage(message, i);
					})}
				</TransitionGroup>
				</div>
		)
	}
}

export default MessageList;