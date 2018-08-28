import React, { Component } from 'react';
import './styles';
import launcherIconActive from './assets/close-icon.png';
import launcherIcon from './assets/logo-no-bg.svg';

import ChatWindow from './ChatWindow';

class Chat extends Component {
	constructor() {
		super();
		this.state = {
			launcherIcon,
			isOpen: false
		};
	}

	handleClick() {
		if (this.props.handleClick !== undefined) {
			this.props.handleClick();
		} else {
			this.setState({
				isOpen: !this.state.isOpen,
			});
		}
	}

	render() {
		const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
		const classList = [
			'sc-launcher',
			(isOpen ? 'opened' : ''),
		];
		return (
				<div>
					<div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
						<MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
						<img alt="chat closed" className={"sc-open-icon"} src={launcherIconActive} />
						<img alt="chat opened" className={"sc-closed-icon"} src={launcherIcon} />
					</div>
					<ChatWindow
						messageList={this.props.messageList}
						onUserInputSubmit={this.props.onMessageWasSent}
						agentProfile={this.props.agentProfile}
						isOpen={isOpen}
						onClose={this.handleClick.bind(this)}
						showEmoji={this.props.showEmoji}
					/>
				</div>
		);
	}
}

const MessageCount = (props) => {
	if (props.count === 0 || props.isOpen === true) { return null }
	return (
		<div className={"sc-new-messsages-count"}>
			{props.count}
		</div>
	)
}

export default Chat;