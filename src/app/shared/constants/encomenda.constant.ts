
export enum EncomendaStatus {
    AGUARDANDO='AGUARDANDO',
    RETIRADO_PROPRIO='RETIRADO_PROPRIO',
    RETIRADO_TERCEIRO='RETIRADO_TERCEIRO',
    DELETADO='DELETADO'
}

export const EncomendaStatusList = [
    { label: "Aguardando", value: EncomendaStatus.AGUARDANDO },
    { label: "Retirado pelo próprio", value: EncomendaStatus.RETIRADO_PROPRIO },
    { label: "Retirado por terceiro", value: EncomendaStatus.RETIRADO_TERCEIRO },
    { label: "Deletado", value: EncomendaStatus.DELETADO },
  ];
  