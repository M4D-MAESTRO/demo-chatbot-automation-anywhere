export interface LocalUserDto {
    email: string; 
    perfil_id: string;
    perfil_nome: string;
    avatar: string; 
    id: string;
    nome: string;
    refresh_token: string;
  }
  
  export interface SuccessLoginDto{
    token: string;
    refresh_token: string;
  }