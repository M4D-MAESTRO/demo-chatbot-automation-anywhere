import { UserDto } from "../users/user.dto";

export interface ArquivoGeralDto {
    id: string;
    nome: string;
    pasta: string;
    file_url: string;
    bucket: string;
    provedor: string;
    tamanho: number;
    tipo: string;
    user_registrou: UserDto;
}