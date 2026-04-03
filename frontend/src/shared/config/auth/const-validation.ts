export class GlobalConsts {
	constructor() {}

	getPasswordRegex(): RegExp {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_)[A-Za-z\d_]+$/
	}

    /*
    getServerURL(): string {
		return 'http://localhost:3000'
		//https
	}
    */

}