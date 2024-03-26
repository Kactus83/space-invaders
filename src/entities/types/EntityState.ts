export enum EntityState {
    Active,
    Inactive, // Pour les entités temporairement inactives
    ToBeRemoved // Marque l'entité pour suppression
}