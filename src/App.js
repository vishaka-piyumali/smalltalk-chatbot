import React, { Component } from 'react';
import './App.css';
import { ApiAiClient } from 'api-ai-javascript';
//import messageHistory from './messageHistory';
import OptusAssistant from './optus/assistant/index';
import teamAvatar from './assets/avatar.png';

const client = new ApiAiClient({accessToken: '075e802f26f741a9b3e1fec0dacac706'})

class App extends Component {
	constructor() {
		super();
		this.state = {
			messageList: [],
			newMessagesCount: 0,
			isOpen: false
		};
	}

	_onMessageWasSent(message) {
		this.setState({
			messageList: [...this.state.messageList, message]
		});
		this._sendMessage(message.data.text);
	}

	createNewMessage (text, author, displayAuthor) {
		this.setState({
			messageList: [...this.state.messageList, {
				author: author,
				displayAuthor: displayAuthor,
				type: 'text',
				data: { text }
			}]
		});
	}

	handleFullfillment (fullfilment, author) {

		var webMessages = this.filterMessages(fullfilment);

		if(webMessages.length > 0) {
			webMessages.forEach((message, index) => {
				var displayAuthor = index === 0 ? true: false;
				this.createNewMessage(message.speech, author, displayAuthor);
			});
		}

	}

	filterMessages (fullfillment) {
		return fullfillment.messages.filter(function (message) {
			return message.platform !== 'facebook';
		});
	}

	_sendMessage(text) {
		if (text.length > 0) {
			this.createNewMessage(text, 'me', false);
			client.textRequest(text)
					.then(function (data) {
						this.handleFullfillment(data.result.fulfillment, 'bot');
					}.bind(this))
					.catch(function(err) {
						console.log(err);
					});
		}
	}

	_handleClick() {
		this.setState({
			isOpen: !this.state.isOpen,
			newMessagesCount: 0
		})
	}

	render() {
		return <div>
			<OptusAssistant
				agentProfile={{
					teamName: 'Optus Assistant',
					imageUrl: teamAvatar
				}}
				isOpen={this.state.isOpen}
				onMessageWasSent={this._onMessageWasSent.bind(this)}
				newMessagesCount={this.state.newMessagesCount}
				messageList={this.state.messageList}
				handleClick={this._handleClick.bind(this)}
				showEmoji
			/>
		</div>
	}
}

export default App;
