import './App.css';
import './index.css';
import { useState } from 'react';

function App() {
	return (
		<div className='App'>
			<Header />
			<TipCalc />
		</div>
	);
}

const Header = () => {
	return (
		<div className='heading'>
			<p>spli</p>
			<p>tter</p>
		</div>
	);
};

const TipCalc = () => {
	const [bill, setBill] = useState('');
	const [peopleNum, setPeopleNum] = useState('');

	const [selectedTip, setSelectedTip] = useState(null);

	const tipToBill = selectedTip / 100;

	const checkPerPerson =
		bill && peopleNum && selectedTip
			? Number((Number(bill) * (1 + tipToBill)) / Number(peopleNum))
			: 0;

	function handleDefaultSettings() {
		setBill('');
		setPeopleNum('');
		setSelectedTip(null);
	}

	return (
		<div className='tip-calc'>
			<Variables
				bill={bill}
				onSetBill={setBill}
				peopleNum={peopleNum}
				onSetPeopleNum={setPeopleNum}
				selectedTip={selectedTip}
				onSetSelectedTip={setSelectedTip}
			/>
			<ResultBox
				bill={bill}
				peopleNum={peopleNum}
				checkPerPerson={checkPerPerson}
				tipToBill={tipToBill}
				onHandleDefault={handleDefaultSettings}
			/>
		</div>
	);
};

const Variables = ({
	bill,
	onSetBill,
	peopleNum,
	onSetPeopleNum,
	selectedTip,
	onSetSelectedTip,
}) => {
	return (
		<div>
			<Bill bill={bill} onSetBill={onSetBill} />
			<TipAmount
				selectedTip={selectedTip}
				onSetSelectedTip={onSetSelectedTip}
			/>
			<NumberOfPeople onSetPeopleNum={onSetPeopleNum} peopleNum={peopleNum} />
		</div>
	);
};

const Bill = ({ bill, onSetBill }) => {
	return (
		<div className='comp-container'>
			<p className='var-name'>Bill</p>
			<div className='input-content'>
				<label>$</label>
				<input
					type='number'
					className='input'
					value={bill}
					onChange={e => {
						const inputValue = e.target.value;
						const numericValue = Number(inputValue);

						if (
							inputValue === '' ||
							(numericValue > 0 && numericValue <= 9999)
						) {
							onSetBill(inputValue === '' ? '' : numericValue);
						}
					}}
				/>
			</div>
		</div>
	);
};

const NumberOfPeople = ({ peopleNum, onSetPeopleNum }) => {
	return (
		<div className='comp-container'>
			<p className='var-name'>Number of People</p>
			<div className='input-content'>
				<label></label>
				<input
					max={99}
					min={1}
					type='number'
					className='input'
					value={peopleNum}
					onChange={e => {
						const inputValue = e.target.value;
						const numericValue = Number(inputValue);

						if (inputValue === '' || (numericValue > 0 && numericValue <= 99)) {
							onSetPeopleNum(inputValue === '' ? '' : numericValue);
						}
					}}
				/>
			</div>
		</div>
	);
};

const TipAmount = ({ selectedTip, onSetSelectedTip }) => {
	const [customTip, setCustomTip] = useState('');

	function handleSelected(tipValue) {
		onSetSelectedTip(tipValue);
	}

	return (
		<div className='comp-container'>
			<p className='var-name'>Select Tip %</p>
			<div className='tip-amount-container'>
				<TipPercentageBtn
					tipValue='5'
					selectedTip={selectedTip}
					onSetSelected={handleSelected}>
					5%
				</TipPercentageBtn>
				<TipPercentageBtn
					tipValue='10'
					selectedTip={selectedTip}
					onSetSelected={handleSelected}>
					10%
				</TipPercentageBtn>
				<TipPercentageBtn
					tipValue='15'
					selectedTip={selectedTip}
					onSetSelected={handleSelected}>
					15%
				</TipPercentageBtn>
				<TipPercentageBtn
					tipValue='25'
					selectedTip={selectedTip}
					onSetSelected={handleSelected}>
					25%
				</TipPercentageBtn>
				<TipPercentageBtn
					tipValue='50'
					selectedTip={selectedTip}
					onSetSelected={handleSelected}>
					50%
				</TipPercentageBtn>
				<input
					className='input tip-input'
					placeholder='Custom'
					maxLength={2}
					value={customTip}
					onChange={e => {
						const inputValue = e.target.value;
						const numericValue = Number(inputValue);

						if (inputValue === '' || (numericValue > 0 && numericValue <= 50)) {
							setCustomTip(inputValue);
							onSetSelectedTip(inputValue === '' ? null : numericValue);
						}
					}}
				/>
			</div>
		</div>
	);
};

const TipPercentageBtn = ({
	children,
	tipValue,
	selectedTip,
	onSetSelected,
}) => {
	const isSelected = tipValue === selectedTip;

	return (
		<button
			className='tip-btn'
			style={{
				color: isSelected ? '#00474b' : '',
				backgroundColor: isSelected ? '#26c2ae' : '',
			}}
			onClick={() => onSetSelected(tipValue)}>
			{children}
		</button>
	);
};

const ResultBox = ({
	bill,
	peopleNum,
	checkPerPerson,
	tipToBill,
	onHandleDefault,
}) => {
	return (
		<div className='result-box'>
			<div>
				<TipPerPerson
					peopleNum={peopleNum}
					checkPerPerson={checkPerPerson}
					bill={bill}
					tipToBill={tipToBill}
				/>
				<BillPerPerson
					bill={bill}
					checkPerPerson={checkPerPerson}
					tipToBill={tipToBill}
				/>
			</div>
			<ResetBtn onHandleDefault={onHandleDefault} />
		</div>
	);
};

const TipPerPerson = ({ peopleNum, bill, tipToBill }) => {
	const countedTipPerPerson =
		peopleNum && bill && tipToBill ? (bill * tipToBill) / peopleNum : 0;

	return (
		<div className='result-content'>
			<div>
				<p className='bolded-text'>Tip Amount</p>
				<p>/ person</p>
			</div>
			<p className='total'>${Number(countedTipPerPerson.toFixed(2))}</p>
		</div>
	);
};

const BillPerPerson = ({ bill, checkPerPerson, peopleNum }) => {
	const countedBillPerPerson =
		bill !== '' && peopleNum !== '' && checkPerPerson !== 0
			? checkPerPerson
			: 0;

	return (
		<div className='result-content'>
			<div>
				<p className='bolded-text'>Total</p>
				<p>/ person</p>
			</div>
			<p className='total'>${Number(countedBillPerPerson.toFixed(2))}</p>
		</div>
	);
};
const ResetBtn = ({ onHandleDefault }) => {
	return (
		<button className='reset-btn' onClick={onHandleDefault}>
			Reset
		</button>
	);
};

export default App;
