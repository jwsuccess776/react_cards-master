import React, { useState, useContext, useRef, useEffect } from 'react';
import './index.scss';
import { Accordion, AccordionItem } from 'react-sanfona';
import { ContextApp } from '../../App';
import ReactQuill from 'react-quill';
import ReactResizeDetector from 'react-resize-detector';


const QA = (props) => {
	const [currentQAItems, setCurrentQAItems] = useState([]);
	const { saveQA, saveSize } = useContext(ContextApp);
	const container = useRef();
	const titleInput = useRef(null);

	useEffect(() => {
		if (props.edit === true) {
			titleInput.current.value = props.title;
			if (props.items) setCurrentQAItems(props.items);
		}

	}, [props.edit, props.title])


	const onResize = (w, h) => {

		saveSize(props.p, props.s, props.num, container.current.clientHeight, null);

	};

	const editCurrentQAItem = (n, item) => {
		let items = currentQAItems;
		items[n] = item;
		setCurrentQAItems(items);
	}

	const addCurrentQAItem = (e) => {
		e.preventDefault();
		setCurrentQAItems([...currentQAItems, ""]);
	}

	const [opened, setOpened] = useState(0);
	return (
		<div className="QA grid-stack-item-content">
			<header className="QAHeader">
				<h4>{props.edit ? (props.title.length > 0 ? 'Edit QA' : 'Add QA') : props.title}</h4>
			</header>
			<div ref={container} >
				{!props.edit ? (<div className="QAContent">
					{/* <Accordion> */}
					{props.items.map((item, index) => {
						return (
							<div key={index + "_a"}>
								<div className="QAText" dangerouslySetInnerHTML={{ __html: item }} />
							</div>
						)
					})}
					{/* </Accordion> */}
					<button onClick={props.copyCard}>copy</button>
					<button onClick={() => props.editCard(props.p, props.s, props.num)}>edit</button>
					<button onClick={() => props.deleteCard(props.p, props.s, props.num)}>delete</button>

				</div>

				) : (

						<div className="QAForm">
							<div className="Form">
								<form onSubmit={(e) => saveQA(e, currentQAItems, props.p, props.s, props.num)}>
									<label>Question</label>
									<input type="text" name="title" ref={titleInput} />

									<label>Answer</label>

									<div>
										{currentQAItems.map((item, index) => <ReactQuill key={index + "_a"} value={item} onChange={(value) => editCurrentQAItem(index, value)} />)}

									</div><button onClick={addCurrentQAItem}>+add answer</button>
									<button type="submit">Save</button>
								</form>
							</div>
						</div>)}
				<ReactResizeDetector handleWidth handleHeight onResize={onResize} />
			</div>
		</div>
	);
};

export default QA;