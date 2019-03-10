export class User{
    public constructor(
        public name: string,
        public emaill: string,
        public password: string,
        public passwordConfirmation,
        public id?: number
    ){}
}