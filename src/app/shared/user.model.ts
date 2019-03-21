export class User{
    public constructor(
        public name: string,
        public email: string,
        public password: string,
        public passwordConfirmation,
        public id?: number // Um atributo opcional sempre deve vir depois de um atributo obrigatório.s 
    ){}
}