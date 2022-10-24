import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { httpClient } from '../../configs';
import { IQuote } from '../../interfaces/quotes.interface';
import {
	Container,
	Content,
	CreateQuoteFormWarper,
	DashSection,
	Header,
	PendingQuotes,
	TextDash,
	ValuesDash,
	ValuesDashLegend,
	ValuesDashWarper
} from './styles';

const Home: React.FC = () => {
	const [quotes, setQuotes] = useState<IQuote[]>([]);
	const [quoteToShow, setQuoteToShow] = useState<IQuote>();
	const [showQuoteDetails, setShowQuoteDetails] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [departure, setDeparture] = useState('');
	const [showDepartureErrorMessage, setShowDepartureErrorMessage] = useState(false);
	const [destination, setDestination] = useState('');
	const [showDestinationErrorMessage, setShowDestinationErrorMessage] = useState(false);
	const [startTravelDate, setStartTravelDate] = useState('');
	const [showStartTravelDateErrorMessage, setShowStartTravelDateErrorMessage] = useState(false);
	const [endTravelDate, setEndTravelDate] = useState('');
	const [showEndTravelDateErrorMessage, setShowEndTravelDateErrorMessage] = useState(false);
	const [transportation, setTransportation] = useState('');
	const [showTransportationErrorMessage, setShowTransportationErrorMessage] = useState(false);
	const [name , setName] = useState('');
	const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);
	const [quantityOfClients, setQuantityOfClients] = useState('');
	const [showQuantityOfClientsErrorMessage, setShowQuantityOfClientsErrorMessage] = useState(false);
	const [price, setPrice] = useState('');
	const [showPriceErrorMessage, setShowPriceErrorMessage] = useState(false);
	const [leads, setLeads] = useState(0);

	const { push } = useRouter();

	useEffect(() => getQuotes(), []);

	const getMinDate = (date = '') => {
		if (!date) {
			const today = new Date();
			const currentYear = today.getFullYear();
			const currentMonth = today.getMonth();
			const currentDate = today.getDate();
			const minDate = new Date(currentYear, currentMonth, currentDate + 7);

			return minDate.toISOString().split('T')[0];
		};

		const startDate = new Date(date.split('-').join('/'));
		const minStartYear = startDate.getFullYear();
		const minStartMonth = startDate.getMonth();
		const minStartDate = startDate.getDate();


		const minDate = new Date(minStartYear, minStartMonth, minStartDate);

		return minDate.toISOString().split('T')[0];
	};


	const formatCurrency = (amount: number) => amount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' });

	const getQuotes = () => {
		httpClient
			.get<IQuote[]>('quotes')
			.then(response => {
				const { data } = response;
				const clientsName = data.map(quote => quote.name);
				const leads = new Set(clientsName).size;
				setQuotes(data);
				setLeads(leads);
			})
			.catch(error => {
				if (error?.response?.data.statusCode === 401)
					push('/');

				setErrorMessage(error?.response?.data?.message);
				setShowErrorMessage(true);
			});
	};

	const createQuote = (event: React.ChangeEvent<HTMLFormElement>) => {
		const priceFormated = price.toString().replace(',', '.');
		event.preventDefault();
		setShowDepartureErrorMessage(!departure);
		setShowDestinationErrorMessage(!destination);
		setShowStartTravelDateErrorMessage(!startTravelDate);
		setShowEndTravelDateErrorMessage(!endTravelDate);
		setShowTransportationErrorMessage(!transportation);
		setShowNameErrorMessage(!name);
		setShowQuantityOfClientsErrorMessage(!quantityOfClients || Number.isNaN(Number(quantityOfClients)));
		setShowPriceErrorMessage(!priceFormated || Number.isNaN(Number(priceFormated)));

		if (!departure || !destination || !startTravelDate || !endTravelDate || !transportation || !name || !quantityOfClients || !price) return;

		const newQuote = {
			departure,
			destination,
			startTravelDate,
			endTravelDate,
			transportation,
			name,
			quantityOfClients,
			price: price.toString().replace(',', '.'),
		};

		httpClient
			.post('quotes', newQuote)
			.then(() => {
				setDeparture('');
				setDestination('');
				setStartTravelDate('');
				setEndTravelDate('');
				setTransportation('');
				setName('');
				setQuantityOfClients('');
				setPrice('');
				getQuotes();
			})
			.catch(error => {
				setErrorMessage(error?.response?.data?.message);
				setShowErrorMessage(true);
			});
	}

	const logout = () => {
		sessionStorage.clear();
		push('/');
	};

	return (
		<>
			<Container>
				<Header>
					<div className="d-flex gap-3">
						<i className="fa-regular fa-compass"></i>
						<h1>
							Wet Bat
							<br />
							<span>TRAVEL</span>
						</h1>
					</div>
					<div className="d-grid align-content-center text-center gap-2">
						<i className="fa-regular fa-user"></i>
						<button
							className="btn btn-danger btn-sm"
							onClick={() => logout()}
						>
							Logout
						</button>
					</div>
				</Header>

				<Content>
					<DashSection>
						<TextDash>
							<h2>
								Welcome to
								<br />
								your dashboard
							</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Fusce mollis posuere imperdiet.
								Duis non eros nibh. Mauris laoreet venenatis
								odio ut rutrum. Pellentesque id metus et velit
								cursus viverra. Suspendisse potenti. Etiam leo
								odio, semper a est a, rhoncus lobortis leo.
								Nulla eu risus nec eros ullamcorper vehicula non
								non lorem.
								<br />
								Aenean sodales tincidunt libero, at mattis sem
								pulvinar ultricies. Suspendisse leo augue,
								maximus sed dapibus ut, varius eget eros.
								Phasellus laoreet volutpat rhoncus. Proin
								interdum nibh ac leo elementum efficitur.
								Integer fermentum nisi ac placerat pellentesque.
								Fusce ultricies elementum elit ut egestas. Class
								aptent taciti sociosqu ad litora torquent per
								conubia nostra, per inceptos himenaeos. Nunc
								fringilla malesuada ultrices. Phasellus
								condimentum, quam eget lacinia fringilla, nunc
								lectus cursus lacus, vitae vehicula tortor lacus
								a tellus.
							</p>
						</TextDash>

						<ValuesDashWarper>
							<ValuesDash>
								{leads}{' '}
								<ValuesDashLegend>
									new
									<br />
									leads
								</ValuesDashLegend>
							</ValuesDash>
							<ValuesDash>
								{quotes?.length || 0}{' '}
								<ValuesDashLegend>
									quotes
									<br />
									created
								</ValuesDashLegend>
							</ValuesDash>
						</ValuesDashWarper>
					</DashSection>

					<CreateQuoteFormWarper>
						<p>Create Quote</p>
						<section>
							<form className="row" onSubmit={createQuote}>
								<span className="col-6">
									<label
										className="form-label"
										htmlFor="departure"
									>
										Departure locale
									</label>
									<input
										className="form-control"
										id="departure"
										placeholder="Where is the departure locale?"
										value={departure}
										onChange={event =>
											setDeparture(event.target.value)
										}
									/>
									{showDepartureErrorMessage && (
										<p className="form-text text-danger">
											Departure locale is required
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="destination"
									>
										Destination
									</label>
									<input
										className="form-control"
										id="destination"
										placeholder="What is your destination?"
										value={destination}
										onChange={event =>
											setDestination(event.target.value)
										}
									/>
									{showDestinationErrorMessage && (
										<p className="form-text text-danger">
											Destination is required
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="startTravelDate"
									>
										Start travel date
									</label>
									<input
										className="form-control"
										id="startTravelDate"
										placeholder="What is your start travel date?"
										type={'date'}
										min={getMinDate()}
										value={startTravelDate}
										onChange={event => {
											setStartTravelDate(
												event.target.value,
											);
											setEndTravelDate('');
										}}
									/>
									{showStartTravelDateErrorMessage && (
										<p className="form-text text-danger">
											Start travel date is required
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="endTravelDate"
									>
										End travel date
									</label>
									<input
										className="form-control"
										id="endTravelDate"
										placeholder="What is your end travel date?"
										disabled={!startTravelDate}
										type={'date'}
										min={getMinDate(startTravelDate)}
										value={endTravelDate}
										onChange={event =>
											setEndTravelDate(event.target.value)
										}
									/>
									{showEndTravelDateErrorMessage && (
										<p className="form-text text-danger">
											End travel date is required
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="transportation"
									>
										Transportation
									</label>
									<input
										className="form-control"
										id="transportation"
										placeholder="What will be the transportation?"
										value={transportation}
										onChange={event =>
											setTransportation(
												event.target.value,
											)
										}
									/>
									{showTransportationErrorMessage && (
										<p className="form-text text-danger">
											Transportation is required
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="name"
									>
										Client name
									</label>
									<input
										className="form-control"
										id="name"
										placeholder="What is your name?"
										value={name}
										onChange={event =>
											setName(event.target.value)
										}
									/>
									{showNameErrorMessage && (
										<p className="form-text text-danger">
											Client name is required
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="quantityOfClients"
									>
										Nº of clients
									</label>
									<input
										className="form-control"
										id="quantityOfClients"
										placeholder="What will be the number of clients?"
										value={quantityOfClients}
										onChange={event =>
											setQuantityOfClients(
												event.target.value,
											)
										}
									/>
									{showQuantityOfClientsErrorMessage && (
										<p className="form-text text-danger">
											Nº of clients is required and should
											be a numerical value
										</p>
									)}
								</span>

								<span className="col-6">
									<label
										className="form-label"
										htmlFor="price"
									>
										Price
									</label>
									<input
										className="form-control"
										id="price"
										placeholder="What is the price?"
										value={price}
										onChange={event =>
											setPrice(event.target.value)
										}
									/>
									{showPriceErrorMessage && (
										<p className="form-text text-danger">
											price is required and should be a
											numerical value
										</p>
									)}
								</span>

								<div className="col-12 d-grid mt-3">
									<button className="btn btn-primary">
										Create quote
									</button>
								</div>
								{showErrorMessage && (
									<p className="form-text text-danger">
										{errorMessage}
									</p>
								)}
							</form>
						</section>
					</CreateQuoteFormWarper>

					<PendingQuotes>
						<p>Pending Quotes</p>
						<div className="table-responsive">
							<table className="table table-striped table-hover table-bordered table-sm">
								<thead>
									<tr>
										<th>Name</th>
										<th>From</th>
										<th>Destination</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>
									{quotes?.map(quote => (
										<tr
											key={quote.id}
											onClick={() => {
												setQuoteToShow(quote);
												setShowQuoteDetails(true);
											}}
										>
											<td>{quote.name}</td>
											<td>{quote.departure}</td>
											<td>{quote.destination}</td>
											<td>
												{formatCurrency(quote?.price)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</PendingQuotes>
				</Content>
			</Container>

			<dialog
				id="quoteDetailsModal"
				tabIndex={-1}
				aria-hidden={showQuoteDetails ? 'false' : 'true'}
				aria-labelledby="titleDialogQuote"
				open={showQuoteDetails}
			>
				<div className="modal d-block w-100">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header justify-content">
								<h1
									className="modal-title"
									id="titleDialogQuote"
								>
									Quote details
								</h1>
							</div>
							<div className="modal-body d-flex flex-row gap-5 flex-wrap">
								{quoteToShow && (
									<>
										<p>Client: {quoteToShow.name}</p>
										<p>From: {quoteToShow.departure}</p>
										<p>To: {quoteToShow.destination}</p>
										<p>
											Start travel:{' '}
											{new Date(
												quoteToShow.startTravelDate,
											).toLocaleDateString('pt-BR')}
										</p>
										<p>
											End travel:{' '}
											{new Date(
												quoteToShow.endTravelDate,
											).toLocaleDateString('pt-BR')}
										</p>
										<p>
											Transportation:{' '}
											{quoteToShow.transportation}
										</p>
										<p>
											Nº of clients:{' '}
											{quoteToShow.quantityOfClients}
										</p>
										<p>
											Price:{' '}
											{formatCurrency(quoteToShow.price)}
										</p>
									</>
								)}
							</div>
							<div className="modal-footer">
								<form method="dialog">
									<button
										className="btn btn-light"
										onClick={() =>
											setShowQuoteDetails(false)
										}
									>
										Close
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default Home;
