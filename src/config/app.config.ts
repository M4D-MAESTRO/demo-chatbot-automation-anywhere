import { environment } from './../environments/environment';

export const ROOT_DIR = 'stand-plataform-files'
export const IMAGE_DIR = `${ROOT_DIR}/imagens`;
export const DOCS_DIR = `${ROOT_DIR}/documentos`;

export const SYSTEM_NICKNAME = 'System';
export const SYSTEM_SHORT_DESC = 'Plataforma para...';
export const SYSTEM_LONG_DESC = 'Com o objetivo...';
export const SYSTEM_LICENSE = 'Ale';
export const SYSTEM_NAME = 'Empresa ®';
export const SYSTEM_VERSION = '0.0.1';
export const SYSTEM_LOGO = 'assets/imgs/logos/Stand FTW - Icon - NO BG.png';


//DEV || PROD
const CURRENT_MODE = environment.NODE_ENV;
export const MODE = { CURRENT_MODE };

export const SYSTEM_INFO = {
    MODE: MODE.CURRENT_MODE,
    SYSTEM_NICKNAME,
    SYSTEM_NAME,
    SYSTEM_VERSION,
    SYSTEM_LOGO,
    SYSTEM_ENV: environment.environmentName,
};