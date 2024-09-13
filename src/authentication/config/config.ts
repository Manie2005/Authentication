import {ConfigService} from '@nestjs/config'
export class configuration{
    constructor(private configService:ConfigService){

    }
    host(){
        return this.configService.get('HOST')
    }
    port(){return this.configService.get('PORT')}
    username(){return this.configService.get('USERNAME')}
    password(){return this.configService.get('PASSWORD')}

}