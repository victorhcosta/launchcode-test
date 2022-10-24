export interface IQuote {
	id: string;
	departure: string;
	destination: string;
	startTravelDate: Date;
	endTravelDate: Date;
	transportation: string;
	name: string;
	quantityOfClients: number;
	price: number;
}
