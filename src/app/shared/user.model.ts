export class User{
    public constructor(
        public name: string,
        public login: string, // a variável login representa o campo email no form (devido o plugin AngularToken)
        public password: string,
        public passwordConfirmation: string,
        public id?: number // Um atributo opcional sempre deve vir depois de um atributo obrigatório.s 
    ){ }
}