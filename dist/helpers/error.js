export class AppError extends Error {
    isOperational;
    constructor(message, statusCode) {
        super(message || "Erreur serveur");
        this.name = this.constructor.name;
        this.isOperational = true;
    }
}
export class BadRequest extends AppError {
    constructor(message) {
        super(message || "Requête invalide", 400);
    }
}
export class Unauthorized extends AppError {
    constructor(message) {
        super(message || "Non autorisé", 401);
    }
}
export class Forbidden extends AppError {
    constructor(message) {
        super(message || "Accès refusé", 403);
    }
}
export class NotFound extends AppError {
    constructor(message) {
        super(message || "Ressource introuvable", 404);
    }
}
export class Conflict extends AppError {
    constructor(message) {
        super(message || "Conflit de ressource", 409);
    }
}
export class InternalServerError extends AppError {
    constructor(message) {
        super(message || "Erreur interne du serveur", 500);
    }
}
export class ValidationError extends AppError {
    constructor(message) {
        super(message || "Données invalides", 422);
    }
}
export class DatabaseError extends AppError {
    constructor(message) {
        super(message || "Erreur de base de données", 500);
    }
}
//# sourceMappingURL=error.js.map